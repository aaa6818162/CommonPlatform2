# SchemaApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**schemaCreate**](SchemaApi.md#schemaCreate) | **POST** /V1/Schemas | Create Single
[**schemaDelete**](SchemaApi.md#schemaDelete) | **DELETE** /V1/Schemas/{SchemaId} | Delete Single
[**schemaExists**](SchemaApi.md#schemaExists) | **GET** /V1/Schemas/{SchemaId}/Exists | Exists
[**schemaGet**](SchemaApi.md#schemaGet) | **GET** /V1/Schemas/{SchemaId} | Get Single
[**schemaGetAll**](SchemaApi.md#schemaGetAll) | **GET** /V1/Schemas | Get Many
[**schemaSearch**](SchemaApi.md#schemaSearch) | **POST** /V1/Schemas/Search | Search
[**schemaUpdate**](SchemaApi.md#schemaUpdate) | **PUT** /V1/Schemas/{SchemaId} | Update Single


<a name="schemaCreate"></a>
# **schemaCreate**
> BusinessProcess schemaCreate(schema)

Create Single

The creation of a single schema is executed asynchronous. To keep track of the creation progress a business process is returned.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.SchemaApi;


SchemaApi apiInstance = new SchemaApi();
SchemaCreateRequest schema = new SchemaCreateRequest(); // SchemaCreateRequest | The schema create request.
try {
    BusinessProcess result = apiInstance.schemaCreate(schema);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling SchemaApi#schemaCreate");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **schema** | [**SchemaCreateRequest**](SchemaCreateRequest.md)| The schema create request. |

### Return type

[**BusinessProcess**](BusinessProcess.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="schemaDelete"></a>
# **schemaDelete**
> BusinessProcess schemaDelete(schemaId)

Delete Single

The deletion of a single schema is executed asynchronous. To keep track of the deletion progress a business process is returned.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.SchemaApi;


SchemaApi apiInstance = new SchemaApi();
String schemaId = "schemaId_example"; // String | The schema id.
try {
    BusinessProcess result = apiInstance.schemaDelete(schemaId);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling SchemaApi#schemaDelete");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **schemaId** | **String**| The schema id. |

### Return type

[**BusinessProcess**](BusinessProcess.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="schemaExists"></a>
# **schemaExists**
> ExistsResponse schemaExists(schemaId, fieldId)

Exists

Checks if the schema or optionally the schema&#39;s field already exists.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.SchemaApi;


SchemaApi apiInstance = new SchemaApi();
String schemaId = "schemaId_example"; // String | The schema id.
String fieldId = "fieldId_example"; // String | The optional field id.
try {
    ExistsResponse result = apiInstance.schemaExists(schemaId, fieldId);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling SchemaApi#schemaExists");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **schemaId** | **String**| The schema id. |
 **fieldId** | **String**| The optional field id. |

### Return type

[**ExistsResponse**](ExistsResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="schemaGet"></a>
# **schemaGet**
> SchemaDetail schemaGet(schemaId)

Get Single

Gets the schema detail information by the schema id.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.SchemaApi;


SchemaApi apiInstance = new SchemaApi();
String schemaId = "schemaId_example"; // String | The schema id.
try {
    SchemaDetail result = apiInstance.schemaGet(schemaId);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling SchemaApi#schemaGet");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **schemaId** | **String**| The schema id. |

### Return type

[**SchemaDetail**](SchemaDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="schemaGetAll"></a>
# **schemaGetAll**
> List&lt;SchemaDetail&gt; schemaGetAll(ids)

Get Many

Gets the schema detail informations by given schema ids.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.SchemaApi;


SchemaApi apiInstance = new SchemaApi();
List<String> ids = Arrays.asList("ids_example"); // List<String> | Comma separated list of schema ids
try {
    List<SchemaDetail> result = apiInstance.schemaGetAll(ids);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling SchemaApi#schemaGetAll");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ids** | [**List&lt;String&gt;**](String.md)| Comma separated list of schema ids | [optional]

### Return type

[**List&lt;SchemaDetail&gt;**](SchemaDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="schemaSearch"></a>
# **schemaSearch**
> SchemaSearchResult schemaSearch(schemaSearchRequest)

Search

Searches schemas as specified in the search request.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.SchemaApi;


SchemaApi apiInstance = new SchemaApi();
SchemaSearchRequest schemaSearchRequest = new SchemaSearchRequest(); // SchemaSearchRequest | The schema search request.
try {
    SchemaSearchResult result = apiInstance.schemaSearch(schemaSearchRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling SchemaApi#schemaSearch");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **schemaSearchRequest** | [**SchemaSearchRequest**](SchemaSearchRequest.md)| The schema search request. |

### Return type

[**SchemaSearchResult**](SchemaSearchResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="schemaUpdate"></a>
# **schemaUpdate**
> BusinessProcess schemaUpdate(schemaId, schema)

Update Single

The update of a single schema is executed asynchronous. To keep track of the update progress a business process is returned.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.SchemaApi;


SchemaApi apiInstance = new SchemaApi();
String schemaId = "schemaId_example"; // String | The schema id.
SchemaUpdateRequest schema = new SchemaUpdateRequest(); // SchemaUpdateRequest | The schema update request.
try {
    BusinessProcess result = apiInstance.schemaUpdate(schemaId, schema);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling SchemaApi#schemaUpdate");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **schemaId** | **String**| The schema id. |
 **schema** | [**SchemaUpdateRequest**](SchemaUpdateRequest.md)| The schema update request. |

### Return type

[**BusinessProcess**](BusinessProcess.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

