# PermissionApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**permissionGetContentPermissions**](PermissionApi.md#permissionGetContentPermissions) | **GET** /V1/Permission/ContentPermissionSets/{PermissionSetId} | Get Content Permission Single
[**permissionGetSchemaPermissions**](PermissionApi.md#permissionGetSchemaPermissions) | **GET** /V1/Permission/SchemaPermissionSets/{PermissionSetId} | Get Schema Permission Single
[**permissionGetUserPermissions**](PermissionApi.md#permissionGetUserPermissions) | **GET** /V1/Permission/UserPermissions/{Permission} | Get UserRight validation result
[**permissionSearchContentPermissions**](PermissionApi.md#permissionSearchContentPermissions) | **POST** /V1/Permission/ContentPermissionSets/Search | Search Content Permissions
[**permissionSearchSchemaPermissions**](PermissionApi.md#permissionSearchSchemaPermissions) | **POST** /V1/Permission/SchemaPermissionSets/Search | Search Schema Permissions


<a name="permissionGetContentPermissions"></a>
# **permissionGetContentPermissions**
> ContentPermissionSetDetail permissionGetContentPermissions(permissionSetId)

Get Content Permission Single

Gets the content permission set detail information by the content permission set id.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.PermissionApi;


PermissionApi apiInstance = new PermissionApi();
String permissionSetId = "permissionSetId_example"; // String | The content permission set id.
try {
    ContentPermissionSetDetail result = apiInstance.permissionGetContentPermissions(permissionSetId);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling PermissionApi#permissionGetContentPermissions");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **permissionSetId** | **String**| The content permission set id. |

### Return type

[**ContentPermissionSetDetail**](ContentPermissionSetDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="permissionGetSchemaPermissions"></a>
# **permissionGetSchemaPermissions**
> SchemaPermissionSetDetail permissionGetSchemaPermissions(permissionSetId)

Get Schema Permission Single

Gets the schema permission set detail information by the schema permission set id.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.PermissionApi;


PermissionApi apiInstance = new PermissionApi();
String permissionSetId = "permissionSetId_example"; // String | The schema permission set id.
try {
    SchemaPermissionSetDetail result = apiInstance.permissionGetSchemaPermissions(permissionSetId);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling PermissionApi#permissionGetSchemaPermissions");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **permissionSetId** | **String**| The schema permission set id. |

### Return type

[**SchemaPermissionSetDetail**](SchemaPermissionSetDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="permissionGetUserPermissions"></a>
# **permissionGetUserPermissions**
> Boolean permissionGetUserPermissions(permission)

Get UserRight validation result

Validates if the User has a given UserRight

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.PermissionApi;


PermissionApi apiInstance = new PermissionApi();
String permission = "permission_example"; // String | The UserRight to validate
try {
    Boolean result = apiInstance.permissionGetUserPermissions(permission);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling PermissionApi#permissionGetUserPermissions");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **permission** | **String**| The UserRight to validate |

### Return type

**Boolean**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="permissionSearchContentPermissions"></a>
# **permissionSearchContentPermissions**
> PermissionSetSearchResult permissionSearchContentPermissions(request)

Search Content Permissions

Searches content permission sets as specified in the search request.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.PermissionApi;


PermissionApi apiInstance = new PermissionApi();
PermissionSetSearchRequest request = new PermissionSetSearchRequest(); // PermissionSetSearchRequest | The permission search request.
try {
    PermissionSetSearchResult result = apiInstance.permissionSearchContentPermissions(request);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling PermissionApi#permissionSearchContentPermissions");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**PermissionSetSearchRequest**](PermissionSetSearchRequest.md)| The permission search request. |

### Return type

[**PermissionSetSearchResult**](PermissionSetSearchResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="permissionSearchSchemaPermissions"></a>
# **permissionSearchSchemaPermissions**
> PermissionSetSearchResult permissionSearchSchemaPermissions(request)

Search Schema Permissions

Searches schema permission sets as specified in the search request.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.PermissionApi;


PermissionApi apiInstance = new PermissionApi();
PermissionSetSearchRequest request = new PermissionSetSearchRequest(); // PermissionSetSearchRequest | The permission search request.
try {
    PermissionSetSearchResult result = apiInstance.permissionSearchSchemaPermissions(request);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling PermissionApi#permissionSearchSchemaPermissions");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**PermissionSetSearchRequest**](PermissionSetSearchRequest.md)| The permission search request. |

### Return type

[**PermissionSetSearchResult**](PermissionSetSearchResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

