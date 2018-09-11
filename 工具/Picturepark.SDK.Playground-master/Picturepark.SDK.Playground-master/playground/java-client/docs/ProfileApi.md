# ProfileApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**profileGet**](ProfileApi.md#profileGet) | **GET** /V1/Profile | Get
[**profileUpdate**](ProfileApi.md#profileUpdate) | **PUT** /V1/Profile | Update


<a name="profileGet"></a>
# **profileGet**
> UserProfile profileGet()

Get

Get profile of currently logged in user

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ProfileApi;


ProfileApi apiInstance = new ProfileApi();
try {
    UserProfile result = apiInstance.profileGet();
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ProfileApi#profileGet");
    e.printStackTrace();
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**UserProfile**](UserProfile.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="profileUpdate"></a>
# **profileUpdate**
> UserProfile profileUpdate(profile)

Update

Updates profile of currently logged in user

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ProfileApi;


ProfileApi apiInstance = new ProfileApi();
UserProfile profile = new UserProfile(); // UserProfile | 
try {
    UserProfile result = apiInstance.profileUpdate(profile);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ProfileApi#profileUpdate");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **profile** | [**UserProfile**](UserProfile.md)|  |

### Return type

[**UserProfile**](UserProfile.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

