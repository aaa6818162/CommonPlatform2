# JsonSchemaApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**jsonSchemaGet**](JsonSchemaApi.md#jsonSchemaGet) | **GET** /V1/JsonSchemas/{SchemaId} | Get Json Schema


<a name="jsonSchemaGet"></a>
# **jsonSchemaGet**
> jsonSchemaGet(schemaId)

Get Json Schema

Get the json schema schematics for the provided schema.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.JsonSchemaApi;


JsonSchemaApi apiInstance = new JsonSchemaApi();
String schemaId = "schemaId_example"; // String | Schema Id
try {
    apiInstance.jsonSchemaGet(schemaId);
} catch (ApiException e) {
    System.err.println("Exception when calling JsonSchemaApi#jsonSchemaGet");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **schemaId** | **String**| Schema Id |

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

