# LiveStreamApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**liveStreamSearch**](LiveStreamApi.md#liveStreamSearch) | **POST** /V1/LiveStream/Search | Search LiveStream


<a name="liveStreamSearch"></a>
# **liveStreamSearch**
> ObjectSearchResult liveStreamSearch(liveStreamSearchRequest)

Search LiveStream

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.LiveStreamApi;


LiveStreamApi apiInstance = new LiveStreamApi();
LiveStreamSearchRequest liveStreamSearchRequest = new LiveStreamSearchRequest(); // LiveStreamSearchRequest | The livestream search request
try {
    ObjectSearchResult result = apiInstance.liveStreamSearch(liveStreamSearchRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling LiveStreamApi#liveStreamSearch");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **liveStreamSearchRequest** | [**LiveStreamSearchRequest**](LiveStreamSearchRequest.md)| The livestream search request |

### Return type

[**ObjectSearchResult**](ObjectSearchResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

