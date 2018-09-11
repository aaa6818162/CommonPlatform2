# ShareApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**shareAggregate**](ShareApi.md#shareAggregate) | **POST** /V1/Shares/Aggregate | Aggregate
[**shareCreate**](ShareApi.md#shareCreate) | **POST** /V1/Shares | Create single
[**shareGet**](ShareApi.md#shareGet) | **GET** /V1/Shares/{Id} | Get single
[**shareSearch**](ShareApi.md#shareSearch) | **POST** /V1/Shares/Search | Search
[**shareUpdate**](ShareApi.md#shareUpdate) | **PUT** /V1/Shares/{Id} | Update single


<a name="shareAggregate"></a>
# **shareAggregate**
> ObjectAggregationResult shareAggregate(request)

Aggregate

Aggregates own shares

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ShareApi;


ShareApi apiInstance = new ShareApi();
ShareAggregationRequest request = new ShareAggregationRequest(); // ShareAggregationRequest | Aggregation request
try {
    ObjectAggregationResult result = apiInstance.shareAggregate(request);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ShareApi#shareAggregate");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**ShareAggregationRequest**](ShareAggregationRequest.md)| Aggregation request |

### Return type

[**ObjectAggregationResult**](ObjectAggregationResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="shareCreate"></a>
# **shareCreate**
> CreateShareResult shareCreate(request)

Create single

Create a new share (basic or embed).

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ShareApi;


ShareApi apiInstance = new ShareApi();
ShareBaseCreateRequest request = new ShareBaseCreateRequest(); // ShareBaseCreateRequest | Polymorph create contract. Use either ShareBasicCreateRequest or ShareEmbedCreateRequest
try {
    CreateShareResult result = apiInstance.shareCreate(request);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ShareApi#shareCreate");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**ShareBaseCreateRequest**](ShareBaseCreateRequest.md)| Polymorph create contract. Use either ShareBasicCreateRequest or ShareEmbedCreateRequest |

### Return type

[**CreateShareResult**](CreateShareResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="shareGet"></a>
# **shareGet**
> ShareBaseDetail shareGet(id)

Get single

Get share by id (basic or embed)

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ShareApi;


ShareApi apiInstance = new ShareApi();
String id = "id_example"; // String | Share Id (not token, use PublicAccess to get share by token)
try {
    ShareBaseDetail result = apiInstance.shareGet(id);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ShareApi#shareGet");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| Share Id (not token, use PublicAccess to get share by token) |

### Return type

[**ShareBaseDetail**](ShareBaseDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="shareSearch"></a>
# **shareSearch**
> ShareSearchResult shareSearch(request)

Search

Search own shares

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ShareApi;


ShareApi apiInstance = new ShareApi();
ShareSearchRequest request = new ShareSearchRequest(); // ShareSearchRequest | Search request
try {
    ShareSearchResult result = apiInstance.shareSearch(request);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ShareApi#shareSearch");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**ShareSearchRequest**](ShareSearchRequest.md)| Search request |

### Return type

[**ShareSearchResult**](ShareSearchResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="shareUpdate"></a>
# **shareUpdate**
> BaseResultOfShareBase shareUpdate(id, updateRequest, resolve, timeout)

Update single

The update of share is executed asynchronous. However, for the specified timeout completion of the update process is awaited. If the update process is not completed by reaching the specified timeout, the update process continues, but null is returned.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ShareApi;


ShareApi apiInstance = new ShareApi();
String id = "id_example"; // String | The share id.
ShareBaseUpdateRequest updateRequest = new ShareBaseUpdateRequest(); // ShareBaseUpdateRequest | The share update request.
Boolean resolve = true; // Boolean | Resolves the data of referenced list items into the shares content.
Integer timeout = 56; // Integer | Maximum time in milliseconds to wait for the business process completed state.
try {
    BaseResultOfShareBase result = apiInstance.shareUpdate(id, updateRequest, resolve, timeout);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ShareApi#shareUpdate");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| The share id. |
 **updateRequest** | [**ShareBaseUpdateRequest**](ShareBaseUpdateRequest.md)| The share update request. |
 **resolve** | **Boolean**| Resolves the data of referenced list items into the shares content. |
 **timeout** | **Integer**| Maximum time in milliseconds to wait for the business process completed state. | [optional]

### Return type

[**BaseResultOfShareBase**](BaseResultOfShareBase.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

