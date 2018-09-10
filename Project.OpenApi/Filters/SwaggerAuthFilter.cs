using System.Collections.Generic;
using System.Web.Http.Description;
using Project.OpenApi.App_Start;
using Swashbuckle.Swagger;

namespace Project.OpenApi.Filters
{
    /// <summary>
    /// Swagger授权过滤器
    /// </summary>
    public class SwaggerAuthFilter : IOperationFilter
    {
        /// <summary>
        /// 自动添加Token字段到Header
        /// </summary>
        /// <param name="operation"></param>
        /// <param name="schemaRegistry"></param>
        /// <param name="apiDescription"></param>
        public void Apply(Operation operation, SchemaRegistry schemaRegistry, ApiDescription apiDescription)
        {
            if (operation.parameters == null)
            {
                operation.parameters = new List<Parameter>();
            }
            var authRequireAttribute = apiDescription.ActionDescriptor.ControllerDescriptor.GetCustomAttributes<SelfAuthorAttribute>();
            if (authRequireAttribute != null && authRequireAttribute.Count > 0)
            {
                operation.parameters.Add(new Parameter { name = "Token", @in = "header", description = "票据", required = true, type = "string",@default = "1111"});
            }
        }
    }
}