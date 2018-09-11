# OutputApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**outputGet**](OutputApi.md#outputGet) | **GET** /V1/Outputs/{OutputId} | Get Single
[**outputGetByContentIds**](OutputApi.md#outputGetByContentIds) | **POST** /V1/Outputs | Get outputs by contentIds


<a name="outputGet"></a>
# **outputGet**
> OutputDetail outputGet(outputId)

Get Single

Gets a output document by id.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.OutputApi;


OutputApi apiInstance = new OutputApi();
String outputId = "outputId_example"; // String | The output id.
try {
    OutputDetail result = apiInstance.outputGet(outputId);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling OutputApi#outputGet");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **outputId** | **String**| The output id. |

### Return type

[**OutputDetail**](OutputDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="outputGetByContentIds"></a>
# **outputGetByContentIds**
> List&lt;OutputDetail&gt; outputGetByContentIds(contentsByIdsRequest)

Get outputs by contentIds

Gets output documents related for given contentids

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.OutputApi;


OutputApi apiInstance = new OutputApi();
ContentsByIdsRequest contentsByIdsRequest = new ContentsByIdsRequest(); // ContentsByIdsRequest | Contains the list of contentIds for which the outputs are requested
try {
    List<OutputDetail> result = apiInstance.outputGetByContentIds(contentsByIdsRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling OutputApi#outputGetByContentIds");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **contentsByIdsRequest** | [**ContentsByIdsRequest**](ContentsByIdsRequest.md)| Contains the list of contentIds for which the outputs are requested |

### Return type

[**List&lt;OutputDetail&gt;**](OutputDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

