using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Schema;
using NJsonSchema;
using NSwag;

namespace AutoRestTransformer
{
    class Program
    {
        // Input: https://github.com/Picturepark/Picturepark.SDK.DotNet/blob/master/swagger/PictureparkSwagger.json
        // Output: https://github.com/Picturepark/Picturepark.SDK.Playground/blob/master/swagger/PictureparkSwaggerAutoRest.json

        static void Main(string[] args)
        {
            RunAsync(args[0], args[1]).GetAwaiter().GetResult();
        }

        private static async Task RunAsync(string source, string target)
        {
            var document = await SwaggerDocument.FromFileAsync(source);

            // See https://github.com/Azure/autorest/issues/2649
            foreach (var o in document.Operations.ToArray())
            {
                foreach (var r in o.Operation.Responses.ToArray())
                {
                    var code = int.Parse(r.Key);
                    if (code >= 300)
                    {
                        o.Operation.Responses.Remove(r.Key);
                    }
                }

                // Remove "items" when paramaeter in query => TODO: How to fix this in NSwag
                foreach (var p in o.Operation.Parameters)
                {
                    if (p.Kind == SwaggerParameterKind.Query)
                    {
                        p.Type = JsonObjectType.String;
                        p.Item = null;
                        p.Items.Clear();
                    }
                }

                // Rename operation id so that eg BusinessProcessClient instead of BusinessProcess is generated (nameclash of interface BusinessProcess and DTO BusinessProcess)
                var segments = o.Operation.OperationId.Split('_');
                o.Operation.OperationId = segments[0] + "Client_" + segments[1];
            }

            var visitor = new MyVisitor();
            await visitor.VisitAsync(document);

            document.SecurityDefinitions.Clear();

            var json = document.ToJson();
            File.WriteAllText(target, json);
        }
    }

    public class MyVisitor : JsonSchemaVisitor
    {
        protected override async Task<JsonSchema4> VisitSchemaAsync(JsonSchema4 schema, string path, string typeNameHint)
        {
            // See https://github.com/Azure/autorest/issues/2652
            if (schema is SwaggerParameter || schema is JsonProperty)
            {
                if (schema.Type == JsonObjectType.None && 
                    schema.AllOf.Count == 1 &&
                    schema.AllOf.All(s => s.HasReference))
                {
                    schema.Reference = schema.AllOf.First().ActualSchema;
                    schema.AllOf.Clear();
                }
            }

            // TODO: How to fix this in NSwag? => Error in Autorest code gen: "long does not have default value!"
            if (schema is SwaggerParameter parameter)
            {
                if (parameter.Kind == SwaggerParameterKind.Query &&
                    parameter.IsNullable(SchemaType.Swagger2) == false &&
                    parameter.Format == "int64")
                {
                    parameter.IsNullableRaw = true;
                }
            }

            return schema;
        }
    }
}
