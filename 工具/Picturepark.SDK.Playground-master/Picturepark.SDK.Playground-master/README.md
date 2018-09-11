# Picturepark.SDK.Playground

Repository with experimental Picturepark SDKs.

## Java

The [Swagger spec from Picturepark.SDK.DotNet](https://github.com/Picturepark/Picturepark.SDK.DotNet/blob/master/swagger/PictureparkSwagger.json) has to be transformed with `AutoRestTransformer` to "swagger/PictureparkSwaggerAutoRest.json".

See https://github.com/Picturepark/Picturepark.SDK.Playground/blob/master/src/AutoRestTransformer/Program.cs 

Generate: 

```
cd Picturepark.SDK.Playground
npm install
npm run autorest
```

After the generation process, the Java classes have to be manually fixed: 

- Remove @override
- Add missing imports 

```
import okhttp3.MediaType;
import okhttp3.RequestBody;
```

Issue here: https://github.com/Azure/autorest/issues/2665

in TransferClientsImpl.java
