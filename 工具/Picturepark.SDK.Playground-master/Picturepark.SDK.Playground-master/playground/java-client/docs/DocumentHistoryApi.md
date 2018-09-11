# DocumentHistoryApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**documentHistoryGet**](DocumentHistoryApi.md#documentHistoryGet) | **GET** /V1/History/{Id} | Gets a document history
[**documentHistoryGetDifference**](DocumentHistoryApi.md#documentHistoryGetDifference) | **GET** /V1/History/{Id}/Difference/{OldVersion}/{NewVersion} | Get the difference between tho document history
[**documentHistoryGetDifferenceLatest**](DocumentHistoryApi.md#documentHistoryGetDifferenceLatest) | **GET** /V1/History/{Id}/Difference/{OldVersion} | Get latest difference of document history
[**documentHistoryGetVersion**](DocumentHistoryApi.md#documentHistoryGetVersion) | **GET** /V1/History/{Id}/{Version} | Get document history version
[**documentHistorySearch**](DocumentHistoryApi.md#documentHistorySearch) | **POST** /V1/History/Search | Search for document history


<a name="documentHistoryGet"></a>
# **documentHistoryGet**
> DocumentHistory documentHistoryGet(id)

Gets a document history

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.DocumentHistoryApi;


DocumentHistoryApi apiInstance = new DocumentHistoryApi();
String id = "id_example"; // String | The id
try {
    DocumentHistory result = apiInstance.documentHistoryGet(id);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling DocumentHistoryApi#documentHistoryGet");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| The id |

### Return type

[**DocumentHistory**](DocumentHistory.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="documentHistoryGetDifference"></a>
# **documentHistoryGetDifference**
> DocumentHistoryDifference documentHistoryGetDifference(id, oldVersion, newVersion)

Get the difference between tho document history

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.DocumentHistoryApi;


DocumentHistoryApi apiInstance = new DocumentHistoryApi();
String id = "id_example"; // String | The id
Long oldVersion = 789L; // Long | The old version
Long newVersion = 789L; // Long | The new version
try {
    DocumentHistoryDifference result = apiInstance.documentHistoryGetDifference(id, oldVersion, newVersion);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling DocumentHistoryApi#documentHistoryGetDifference");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| The id |
 **oldVersion** | **Long**| The old version |
 **newVersion** | **Long**| The new version |

### Return type

[**DocumentHistoryDifference**](DocumentHistoryDifference.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="documentHistoryGetDifferenceLatest"></a>
# **documentHistoryGetDifferenceLatest**
> DocumentHistoryDifference documentHistoryGetDifferenceLatest(id, oldVersion)

Get latest difference of document history

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.DocumentHistoryApi;


DocumentHistoryApi apiInstance = new DocumentHistoryApi();
String id = "id_example"; // String | The id
Long oldVersion = 789L; // Long | The old version
try {
    DocumentHistoryDifference result = apiInstance.documentHistoryGetDifferenceLatest(id, oldVersion);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling DocumentHistoryApi#documentHistoryGetDifferenceLatest");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| The id |
 **oldVersion** | **Long**| The old version |

### Return type

[**DocumentHistoryDifference**](DocumentHistoryDifference.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="documentHistoryGetVersion"></a>
# **documentHistoryGetVersion**
> DocumentHistory documentHistoryGetVersion(id, version)

Get document history version

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.DocumentHistoryApi;


DocumentHistoryApi apiInstance = new DocumentHistoryApi();
String id = "id_example"; // String | The id
String version = "version_example"; // String | The version
try {
    DocumentHistory result = apiInstance.documentHistoryGetVersion(id, version);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling DocumentHistoryApi#documentHistoryGetVersion");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| The id |
 **version** | **String**| The version |

### Return type

[**DocumentHistory**](DocumentHistory.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="documentHistorySearch"></a>
# **documentHistorySearch**
> DocumentHistorySearchResult documentHistorySearch(documentHistorySearchRequest)

Search for document history

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.DocumentHistoryApi;


DocumentHistoryApi apiInstance = new DocumentHistoryApi();
DocumentHistorySearchRequest documentHistorySearchRequest = new DocumentHistorySearchRequest(); // DocumentHistorySearchRequest | The document history search request
try {
    DocumentHistorySearchResult result = apiInstance.documentHistorySearch(documentHistorySearchRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling DocumentHistoryApi#documentHistorySearch");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **documentHistorySearchRequest** | [**DocumentHistorySearchRequest**](DocumentHistorySearchRequest.md)| The document history search request |

### Return type

[**DocumentHistorySearchResult**](DocumentHistorySearchResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

