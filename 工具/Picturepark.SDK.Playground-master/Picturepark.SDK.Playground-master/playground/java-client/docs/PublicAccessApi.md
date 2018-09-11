# PublicAccessApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**publicAccessGetShare**](PublicAccessApi.md#publicAccessGetShare) | **GET** /V1/PublicAccess/GetShare | Get Share
[**publicAccessGetVersion**](PublicAccessApi.md#publicAccessGetVersion) | **GET** /V1/PublicAccess/Version | Get Version


<a name="publicAccessGetShare"></a>
# **publicAccessGetShare**
> ShareBaseDetail publicAccessGetShare(token)

Get Share

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.PublicAccessApi;


PublicAccessApi apiInstance = new PublicAccessApi();
String token = "token_example"; // String | The token
try {
    ShareBaseDetail result = apiInstance.publicAccessGetShare(token);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling PublicAccessApi#publicAccessGetShare");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **token** | **String**| The token |

### Return type

[**ShareBaseDetail**](ShareBaseDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="publicAccessGetVersion"></a>
# **publicAccessGetVersion**
> VersionInfo publicAccessGetVersion()

Get Version

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.PublicAccessApi;


PublicAccessApi apiInstance = new PublicAccessApi();
try {
    VersionInfo result = apiInstance.publicAccessGetVersion();
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling PublicAccessApi#publicAccessGetVersion");
    e.printStackTrace();
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**VersionInfo**](VersionInfo.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

