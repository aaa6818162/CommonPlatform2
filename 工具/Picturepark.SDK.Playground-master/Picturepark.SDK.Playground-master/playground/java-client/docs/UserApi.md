# UserApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**userGetByOwnerToken**](UserApi.md#userGetByOwnerToken) | **GET** /V1/Users/Owner/{TokenId} | Get userdetail by owner token
[**userGetChannels**](UserApi.md#userGetChannels) | **GET** /V1/Users/Channels | Get List of Channels
[**userGetUser**](UserApi.md#userGetUser) | **GET** /V1/Users/GetUser/{UserId} | Get Userdetail by id
[**userSearch**](UserApi.md#userSearch) | **POST** /V1/Users/Search | Search for users


<a name="userGetByOwnerToken"></a>
# **userGetByOwnerToken**
> UserDetail userGetByOwnerToken(tokenId)

Get userdetail by owner token

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.UserApi;


UserApi apiInstance = new UserApi();
String tokenId = "tokenId_example"; // String | The token id
try {
    UserDetail result = apiInstance.userGetByOwnerToken(tokenId);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling UserApi#userGetByOwnerToken");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tokenId** | **String**| The token id |

### Return type

[**UserDetail**](UserDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="userGetChannels"></a>
# **userGetChannels**
> List&lt;Channel&gt; userGetChannels()

Get List of Channels

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.UserApi;


UserApi apiInstance = new UserApi();
try {
    List<Channel> result = apiInstance.userGetChannels();
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling UserApi#userGetChannels");
    e.printStackTrace();
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**List&lt;Channel&gt;**](Channel.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="userGetUser"></a>
# **userGetUser**
> UserDetail userGetUser(userId)

Get Userdetail by id

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.UserApi;


UserApi apiInstance = new UserApi();
String userId = "userId_example"; // String | The user id
try {
    UserDetail result = apiInstance.userGetUser(userId);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling UserApi#userGetUser");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**| The user id |

### Return type

[**UserDetail**](UserDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="userSearch"></a>
# **userSearch**
> UserSearchResult userSearch(searchRequest)

Search for users

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.UserApi;


UserApi apiInstance = new UserApi();
UserSearchRequest searchRequest = new UserSearchRequest(); // UserSearchRequest | The user search request
try {
    UserSearchResult result = apiInstance.userSearch(searchRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling UserApi#userSearch");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **searchRequest** | [**UserSearchRequest**](UserSearchRequest.md)| The user search request |

### Return type

[**UserSearchResult**](UserSearchResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

