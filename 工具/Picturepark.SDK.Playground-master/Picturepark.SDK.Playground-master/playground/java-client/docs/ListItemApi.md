# ListItemApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listItemAggregate**](ListItemApi.md#listItemAggregate) | **POST** /V1/ListItems/Aggregate | Aggregate
[**listItemCreate**](ListItemApi.md#listItemCreate) | **POST** /V1/ListItems | Create Single
[**listItemCreateMany**](ListItemApi.md#listItemCreateMany) | **POST** /V1/ListItems/Many | Create Many
[**listItemDeleteMany**](ListItemApi.md#listItemDeleteMany) | **DELETE** /V1/ListItems/Many | Delete Many
[**listItemGet**](ListItemApi.md#listItemGet) | **GET** /V1/ListItems/{ListItemId} | Get Single
[**listItemImport**](ListItemApi.md#listItemImport) | **GET** /V1/ListItems/Import | Import
[**listItemSearch**](ListItemApi.md#listItemSearch) | **POST** /V1/ListItems/Search | Search
[**listItemUpdate**](ListItemApi.md#listItemUpdate) | **PUT** /V1/ListItems/{ListItemId} | Update Single
[**listItemUpdateFields**](ListItemApi.md#listItemUpdateFields) | **PUT** /V1/ListItems/Many/Fields | Update - Fields
[**listItemUpdateFieldsByFilter**](ListItemApi.md#listItemUpdateFieldsByFilter) | **PUT** /V1/ListItems/Many/Fields/Filter | Update by filter - Fields
[**listItemUpdateMany**](ListItemApi.md#listItemUpdateMany) | **PUT** /V1/ListItems/Many | Update Many
[**listItemWaitForStates**](ListItemApi.md#listItemWaitForStates) | **GET** /V1/ListItems/{ProcessId}/Wait | Wait For States


<a name="listItemAggregate"></a>
# **listItemAggregate**
> ObjectAggregationResult listItemAggregate(listItemAggregationRequest)

Aggregate

Aggregates list items as specified in the aggregation request.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ListItemApi;


ListItemApi apiInstance = new ListItemApi();
ListItemAggregationRequest listItemAggregationRequest = new ListItemAggregationRequest(); // ListItemAggregationRequest | The list item aggregation request.
try {
    ObjectAggregationResult result = apiInstance.listItemAggregate(listItemAggregationRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ListItemApi#listItemAggregate");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **listItemAggregationRequest** | [**ListItemAggregationRequest**](ListItemAggregationRequest.md)| The list item aggregation request. |

### Return type

[**ObjectAggregationResult**](ObjectAggregationResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listItemCreate"></a>
# **listItemCreate**
> ListItemDetail listItemCreate(listItem, resolve, timeout, patterns)

Create Single

The creation of a single list item is executed asynchronous. However, for the specified timeout completion of the creation process is awaited. If the creation process is not completed by reaching the specified timeout, the creation process continues, but null is returned.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ListItemApi;


ListItemApi apiInstance = new ListItemApi();
ListItemCreateRequest listItem = new ListItemCreateRequest(); // ListItemCreateRequest | List item create request.
Boolean resolve = true; // Boolean | Resolves the data of referenced list items into the list item's content.
Integer timeout = 56; // Integer | Maximum time in milliseconds to wait for the business process completed state.
List<String> patterns = Arrays.asList("patterns_example"); // List<String> | Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
try {
    ListItemDetail result = apiInstance.listItemCreate(listItem, resolve, timeout, patterns);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ListItemApi#listItemCreate");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **listItem** | [**ListItemCreateRequest**](ListItemCreateRequest.md)| List item create request. |
 **resolve** | **Boolean**| Resolves the data of referenced list items into the list item&#39;s content. |
 **timeout** | **Integer**| Maximum time in milliseconds to wait for the business process completed state. | [optional]
 **patterns** | [**List&lt;String&gt;**](String.md)| Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches. | [optional]

### Return type

[**ListItemDetail**](ListItemDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listItemCreateMany"></a>
# **listItemCreateMany**
> BusinessProcess listItemCreateMany(objects)

Create Many

The creation of multiple list items is executed asynchronous. To keep track of the creation progress a business process is returned.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ListItemApi;


ListItemApi apiInstance = new ListItemApi();
List<ListItemCreateRequest> objects = Arrays.asList(new ListItemCreateRequest()); // List<ListItemCreateRequest> | A list of ListItemCreateRequests.
try {
    BusinessProcess result = apiInstance.listItemCreateMany(objects);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ListItemApi#listItemCreateMany");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **objects** | [**List&lt;ListItemCreateRequest&gt;**](ListItemCreateRequest.md)| A list of ListItemCreateRequests. |

### Return type

[**BusinessProcess**](BusinessProcess.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listItemDeleteMany"></a>
# **listItemDeleteMany**
> BusinessProcess listItemDeleteMany(ids)

Delete Many

The deletion of multiple list items is executed asynchronous. To keep track of the deletion progress a business process is returned.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ListItemApi;


ListItemApi apiInstance = new ListItemApi();
List<String> ids = Arrays.asList("ids_example"); // List<String> | The list item id list.
try {
    BusinessProcess result = apiInstance.listItemDeleteMany(ids);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ListItemApi#listItemDeleteMany");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ids** | [**List&lt;String&gt;**](String.md)| The list item id list. | [optional]

### Return type

[**BusinessProcess**](BusinessProcess.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listItemGet"></a>
# **listItemGet**
> ListItemDetail listItemGet(listItemId, resolve, patterns)

Get Single

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ListItemApi;


ListItemApi apiInstance = new ListItemApi();
String listItemId = "listItemId_example"; // String | The list item id.
Boolean resolve = true; // Boolean | Resolves the data of referenced list items into the list item's content.
List<String> patterns = Arrays.asList("patterns_example"); // List<String> | Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
try {
    ListItemDetail result = apiInstance.listItemGet(listItemId, resolve, patterns);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ListItemApi#listItemGet");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **listItemId** | **String**| The list item id. |
 **resolve** | **Boolean**| Resolves the data of referenced list items into the list item&#39;s content. |
 **patterns** | [**List&lt;String&gt;**](String.md)| Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches. | [optional]

### Return type

[**ListItemDetail**](ListItemDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listItemImport"></a>
# **listItemImport**
> listItemImport(contentId, fileTransferId, includeObjects)

Import

Imports all schemas and optionally list items as specified in the json file. Duplicate schemas or list items in the target system will be omitted. 

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ListItemApi;


ListItemApi apiInstance = new ListItemApi();
String contentId = "contentId_example"; // String | The content id.
String fileTransferId = "fileTransferId_example"; // String | The file transfer id.
Boolean includeObjects = true; // Boolean | Imports list items defined in the json import file.
try {
    apiInstance.listItemImport(contentId, fileTransferId, includeObjects);
} catch (ApiException e) {
    System.err.println("Exception when calling ListItemApi#listItemImport");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **contentId** | **String**| The content id. |
 **fileTransferId** | **String**| The file transfer id. |
 **includeObjects** | **Boolean**| Imports list items defined in the json import file. |

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listItemSearch"></a>
# **listItemSearch**
> ListItemSearchResult listItemSearch(listItemSearchRequest)

Search

Searches list items as specified in the search request.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ListItemApi;


ListItemApi apiInstance = new ListItemApi();
ListItemSearchRequest listItemSearchRequest = new ListItemSearchRequest(); // ListItemSearchRequest | The list item search request.
try {
    ListItemSearchResult result = apiInstance.listItemSearch(listItemSearchRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ListItemApi#listItemSearch");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **listItemSearchRequest** | [**ListItemSearchRequest**](ListItemSearchRequest.md)| The list item search request. |

### Return type

[**ListItemSearchResult**](ListItemSearchResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listItemUpdate"></a>
# **listItemUpdate**
> ListItemDetail listItemUpdate(listItemId, updateRequest, resolve, timeout, patterns)

Update Single

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ListItemApi;


ListItemApi apiInstance = new ListItemApi();
String listItemId = "listItemId_example"; // String | The list item id.
ListItemUpdateRequest updateRequest = new ListItemUpdateRequest(); // ListItemUpdateRequest | The list item update request.
Boolean resolve = true; // Boolean | Resolves the data of referenced list items into the list item's content.
Integer timeout = 56; // Integer | Maximum time in milliseconds to wait for the business process completed state.
List<String> patterns = Arrays.asList("patterns_example"); // List<String> | Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
try {
    ListItemDetail result = apiInstance.listItemUpdate(listItemId, updateRequest, resolve, timeout, patterns);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ListItemApi#listItemUpdate");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **listItemId** | **String**| The list item id. |
 **updateRequest** | [**ListItemUpdateRequest**](ListItemUpdateRequest.md)| The list item update request. |
 **resolve** | **Boolean**| Resolves the data of referenced list items into the list item&#39;s content. |
 **timeout** | **Integer**| Maximum time in milliseconds to wait for the business process completed state. | [optional]
 **patterns** | [**List&lt;String&gt;**](String.md)| Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches. | [optional]

### Return type

[**ListItemDetail**](ListItemDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listItemUpdateFields"></a>
# **listItemUpdateFields**
> BusinessProcess listItemUpdateFields(updateRequest)

Update - Fields

Update fields of multiple list items. A list of listItemIds must be provided to limit the update to specific list items.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ListItemApi;


ListItemApi apiInstance = new ListItemApi();
ListItemFieldsUpdateRequest updateRequest = new ListItemFieldsUpdateRequest(); // ListItemFieldsUpdateRequest | The metadata update request.
try {
    BusinessProcess result = apiInstance.listItemUpdateFields(updateRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ListItemApi#listItemUpdateFields");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateRequest** | [**ListItemFieldsUpdateRequest**](ListItemFieldsUpdateRequest.md)| The metadata update request. |

### Return type

[**BusinessProcess**](BusinessProcess.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listItemUpdateFieldsByFilter"></a>
# **listItemUpdateFieldsByFilter**
> BusinessProcess listItemUpdateFieldsByFilter(updateRequest)

Update by filter - Fields

Update fields of multiple list items. A filter must be provided to limit the update to specific list items.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ListItemApi;


ListItemApi apiInstance = new ListItemApi();
ListItemFieldsFilterUpdateRequest updateRequest = new ListItemFieldsFilterUpdateRequest(); // ListItemFieldsFilterUpdateRequest | The metadata update request.
try {
    BusinessProcess result = apiInstance.listItemUpdateFieldsByFilter(updateRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ListItemApi#listItemUpdateFieldsByFilter");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateRequest** | [**ListItemFieldsFilterUpdateRequest**](ListItemFieldsFilterUpdateRequest.md)| The metadata update request. |

### Return type

[**BusinessProcess**](BusinessProcess.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listItemUpdateMany"></a>
# **listItemUpdateMany**
> BusinessProcess listItemUpdateMany(objects)

Update Many

The update of multiple list items is executed asynchronous. To keep track of the update progress a business process is returned.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ListItemApi;


ListItemApi apiInstance = new ListItemApi();
List<ListItemUpdateRequest> objects = Arrays.asList(new ListItemUpdateRequest()); // List<ListItemUpdateRequest> | A list of ListItemUpdateRequests.
try {
    BusinessProcess result = apiInstance.listItemUpdateMany(objects);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ListItemApi#listItemUpdateMany");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **objects** | [**List&lt;ListItemUpdateRequest&gt;**](ListItemUpdateRequest.md)| A list of ListItemUpdateRequests. |

### Return type

[**BusinessProcess**](BusinessProcess.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="listItemWaitForStates"></a>
# **listItemWaitForStates**
> BusinessProcessWaitResult listItemWaitForStates(processId, timeout, states)

Wait For States

Waits for any specified business process states to be hit. If the timeout is reached, the wait process will be stopped and the wait result returned.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ListItemApi;


ListItemApi apiInstance = new ListItemApi();
String processId = "processId_example"; // String | The business process id.
Integer timeout = 56; // Integer | Maximum time in milliseconds to wait for the business process completed state.
List<String> states = Arrays.asList("states_example"); // List<String> | Comma-separated list of business process states to wait for.
try {
    BusinessProcessWaitResult result = apiInstance.listItemWaitForStates(processId, timeout, states);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ListItemApi#listItemWaitForStates");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **processId** | **String**| The business process id. |
 **timeout** | **Integer**| Maximum time in milliseconds to wait for the business process completed state. |
 **states** | [**List&lt;String&gt;**](String.md)| Comma-separated list of business process states to wait for. | [optional]

### Return type

[**BusinessProcessWaitResult**](BusinessProcessWaitResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

