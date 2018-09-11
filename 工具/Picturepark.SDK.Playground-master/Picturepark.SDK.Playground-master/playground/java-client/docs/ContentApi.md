# ContentApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**contentAggregate**](ContentApi.md#contentAggregate) | **POST** /V1/Contents/Aggregate | Aggregate
[**contentAggregateByChannel**](ContentApi.md#contentAggregateByChannel) | **POST** /V1/Contents/{ChannelId}/Aggregate | Aggregate by Channel
[**contentCreateContent**](ContentApi.md#contentCreateContent) | **POST** /V1/Contents | Create Single
[**contentCreateDownloadLink**](ContentApi.md#contentCreateDownloadLink) | **POST** /V1/Contents/CreateBatchContentDownload | Creates a content batch download
[**contentDeactivate**](ContentApi.md#contentDeactivate) | **PUT** /V1/Contents/{ContentId}/Deactivate | Deactivates a content
[**contentDeactivateMany**](ContentApi.md#contentDeactivateMany) | **POST** /V1/Contents/Many/Deactivate | Dactivate Many - Content
[**contentDownload**](ContentApi.md#contentDownload) | **GET** /V1/Contents/Downloads/{ContentId}/{OutputFormatId} | Downloads content in a specific outputformat
[**contentDownloadResized**](ContentApi.md#contentDownloadResized) | **GET** /V1/Contents/Downloads/{ContentId}/{OutputFormatId}/{Width}/{Height} | Download resized content
[**contentDownloadThumbnail**](ContentApi.md#contentDownloadThumbnail) | **GET** /V1/Contents/Thumbnails/{ContentId}/{Size} | Get Thumbnail
[**contentGet**](ContentApi.md#contentGet) | **GET** /V1/Contents/{ContentId} | Get Single
[**contentGetMany**](ContentApi.md#contentGetMany) | **GET** /V1/Contents/Many | Get Many
[**contentReactivate**](ContentApi.md#contentReactivate) | **PUT** /V1/Contents/{ContentId}/Reactivate | Reactivate - Content
[**contentReactivateMany**](ContentApi.md#contentReactivateMany) | **POST** /V1/Contents/Many/Reactivate | Reactivate Many - Content
[**contentSearch**](ContentApi.md#contentSearch) | **POST** /V1/Contents/Search | Search
[**contentSearchByChannel**](ContentApi.md#contentSearchByChannel) | **POST** /V1/Contents/{ChannelId}/Search | Search By Channel
[**contentTransferOwnershipMany**](ContentApi.md#contentTransferOwnershipMany) | **POST** /V1/Contents/Many/Ownership/Transfer | Process many ownership trasnfer request
[**contentUpdateFile**](ContentApi.md#contentUpdateFile) | **PUT** /V1/Contents/{ContentId}/File | Update Single - File
[**contentUpdateMetadata**](ContentApi.md#contentUpdateMetadata) | **PUT** /V1/Contents/{ContentId} | Update Single - Metadata
[**contentUpdateMetadataByFilter**](ContentApi.md#contentUpdateMetadataByFilter) | **PUT** /V1/Contents/Many/Metadata/Filter | Update by filter - Metadata
[**contentUpdateMetadataMany**](ContentApi.md#contentUpdateMetadataMany) | **PUT** /V1/Contents/Many/Metadata | Update Many - Metadata
[**contentUpdatePermissions**](ContentApi.md#contentUpdatePermissions) | **PUT** /V1/Contents/{ContentId}/Permissions | Update Single - Permissions
[**contentUpdatePermissionsMany**](ContentApi.md#contentUpdatePermissionsMany) | **PUT** /V1/Contents/Many/Permissions | Update Many - Permissions
[**contentUpdateTransferOwnership**](ContentApi.md#contentUpdateTransferOwnership) | **PUT** /V1/Contents/{ContentId}/Ownership/Transfer | Update Single - OwnershipTransfer


<a name="contentAggregate"></a>
# **contentAggregate**
> ObjectAggregationResult contentAggregate(contentAggregationRequest)

Aggregate

Aggregates content as specified in the aggregation request.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
ContentAggregationRequest contentAggregationRequest = new ContentAggregationRequest(); // ContentAggregationRequest | The aggregation request.
try {
    ObjectAggregationResult result = apiInstance.contentAggregate(contentAggregationRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentAggregate");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **contentAggregationRequest** | [**ContentAggregationRequest**](ContentAggregationRequest.md)| The aggregation request. |

### Return type

[**ObjectAggregationResult**](ObjectAggregationResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentAggregateByChannel"></a>
# **contentAggregateByChannel**
> ObjectAggregationResult contentAggregateByChannel(channelId, contentAggregationRequest)

Aggregate by Channel

Aggregates content as specified in the aggregation request and limits the aggregation results to the specified channel.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
String channelId = "channelId_example"; // String | The channel id
ContentAggregationRequest contentAggregationRequest = new ContentAggregationRequest(); // ContentAggregationRequest | The content aggregation request.
try {
    ObjectAggregationResult result = apiInstance.contentAggregateByChannel(channelId, contentAggregationRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentAggregateByChannel");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **channelId** | **String**| The channel id |
 **contentAggregationRequest** | [**ContentAggregationRequest**](ContentAggregationRequest.md)| The content aggregation request. |

### Return type

[**ObjectAggregationResult**](ObjectAggregationResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentCreateContent"></a>
# **contentCreateContent**
> ContentDetail contentCreateContent(createRequest, resolve, timeout, patterns)

Create Single

The creation of content is executed asynchronous. However, for the specified timeout completion of the creation process is awaited. If the creation process is not completed by reaching the specified timeout, the creation process continues, but null is returned.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
CreateContentRequest createRequest = new CreateContentRequest(); // CreateContentRequest | The content create request.
Boolean resolve = true; // Boolean | Resolves the data of referenced list items into the contents's content.
Integer timeout = 56; // Integer | Maximum time in milliseconds to wait for the business process completed state.
List<String> patterns = Arrays.asList("patterns_example"); // List<String> | Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
try {
    ContentDetail result = apiInstance.contentCreateContent(createRequest, resolve, timeout, patterns);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentCreateContent");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createRequest** | [**CreateContentRequest**](CreateContentRequest.md)| The content create request. |
 **resolve** | **Boolean**| Resolves the data of referenced list items into the contents&#39;s content. |
 **timeout** | **Integer**| Maximum time in milliseconds to wait for the business process completed state. | [optional]
 **patterns** | [**List&lt;String&gt;**](String.md)| Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches. | [optional]

### Return type

[**ContentDetail**](ContentDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentCreateDownloadLink"></a>
# **contentCreateDownloadLink**
> ContentBatchDownloadItem contentCreateDownloadLink(request)

Creates a content batch download

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
ContentBatchDownloadRequest request = new ContentBatchDownloadRequest(); // ContentBatchDownloadRequest | The content batch download request
try {
    ContentBatchDownloadItem result = apiInstance.contentCreateDownloadLink(request);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentCreateDownloadLink");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**ContentBatchDownloadRequest**](ContentBatchDownloadRequest.md)| The content batch download request |

### Return type

[**ContentBatchDownloadItem**](ContentBatchDownloadItem.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentDeactivate"></a>
# **contentDeactivate**
> contentDeactivate(contentId, timeout)

Deactivates a content

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
String contentId = "contentId_example"; // String | the id of the content to deactivate
Integer timeout = 56; // Integer | Maximum time in milliseconds to wait for the business process completed state.
try {
    apiInstance.contentDeactivate(contentId, timeout);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentDeactivate");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **contentId** | **String**| the id of the content to deactivate |
 **timeout** | **Integer**| Maximum time in milliseconds to wait for the business process completed state. |

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentDeactivateMany"></a>
# **contentDeactivateMany**
> BusinessProcess contentDeactivateMany(deactivationRequest)

Dactivate Many - Content

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
ContentDeactivationRequest deactivationRequest = new ContentDeactivationRequest(); // ContentDeactivationRequest | The deactivation request
try {
    BusinessProcess result = apiInstance.contentDeactivateMany(deactivationRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentDeactivateMany");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **deactivationRequest** | [**ContentDeactivationRequest**](ContentDeactivationRequest.md)| The deactivation request |

### Return type

[**BusinessProcess**](BusinessProcess.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentDownload"></a>
# **contentDownload**
> File contentDownload(contentId, outputFormatId, range)

Downloads content in a specific outputformat

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
String contentId = "contentId_example"; // String | The content id
String outputFormatId = "outputFormatId_example"; // String | The output format id
String range = "range_example"; // String | the range
try {
    File result = apiInstance.contentDownload(contentId, outputFormatId, range);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentDownload");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **contentId** | **String**| The content id |
 **outputFormatId** | **String**| The output format id |
 **range** | **String**| the range | [optional]

### Return type

[**File**](File.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentDownloadResized"></a>
# **contentDownloadResized**
> File contentDownloadResized(contentId, outputFormatId, width, height)

Download resized content

Provides a endpoint to get reseized content

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
String contentId = "contentId_example"; // String | The Content id
String outputFormatId = "outputFormatId_example"; // String | The output format id
Integer width = 56; // Integer | The content width
Integer height = 56; // Integer | The content height
try {
    File result = apiInstance.contentDownloadResized(contentId, outputFormatId, width, height);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentDownloadResized");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **contentId** | **String**| The Content id |
 **outputFormatId** | **String**| The output format id |
 **width** | **Integer**| The content width |
 **height** | **Integer**| The content height |

### Return type

[**File**](File.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentDownloadThumbnail"></a>
# **contentDownloadThumbnail**
> File contentDownloadThumbnail(contentId, size)

Get Thumbnail

Provides a lightweight endpoint to get content thumbnails

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
String contentId = "contentId_example"; // String | The Content id
String size = "size_example"; // String | Thumbnail size. Either small, medium or large
try {
    File result = apiInstance.contentDownloadThumbnail(contentId, size);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentDownloadThumbnail");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **contentId** | **String**| The Content id |
 **size** | **String**| Thumbnail size. Either small, medium or large |

### Return type

[**File**](File.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentGet"></a>
# **contentGet**
> ContentDetail contentGet(contentId, resolve, patterns)

Get Single

Gets a content document by id.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
String contentId = "contentId_example"; // String | The content id.
Boolean resolve = true; // Boolean | Resolves the data of referenced list items into the contents's content.
List<String> patterns = Arrays.asList("patterns_example"); // List<String> | Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
try {
    ContentDetail result = apiInstance.contentGet(contentId, resolve, patterns);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentGet");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **contentId** | **String**| The content id. |
 **resolve** | **Boolean**| Resolves the data of referenced list items into the contents&#39;s content. |
 **patterns** | [**List&lt;String&gt;**](String.md)| Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches. | [optional]

### Return type

[**ContentDetail**](ContentDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentGetMany"></a>
# **contentGetMany**
> List&lt;ContentDetail&gt; contentGetMany(ids, resolve, patterns)

Get Many

Gets multiple content documents by ids.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
List<String> ids = Arrays.asList("ids_example"); // List<String> | Comma-separated list of contentIds
Boolean resolve = true; // Boolean | Resolves the data of referenced list items into the contents's content.
List<String> patterns = Arrays.asList("patterns_example"); // List<String> | Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
try {
    List<ContentDetail> result = apiInstance.contentGetMany(ids, resolve, patterns);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentGetMany");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ids** | [**List&lt;String&gt;**](String.md)| Comma-separated list of contentIds |
 **resolve** | **Boolean**| Resolves the data of referenced list items into the contents&#39;s content. |
 **patterns** | [**List&lt;String&gt;**](String.md)| Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches. | [optional]

### Return type

[**List&lt;ContentDetail&gt;**](ContentDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentReactivate"></a>
# **contentReactivate**
> ContentDetail contentReactivate(contentId, resolve, timeout, patterns)

Reactivate - Content

The reactivation of content is executed asynchronous. However, for the specified timeout completion of the reactivation process is awaited. If the reactivation process is not completed by reaching the specified timeout, the reactivation process continues, but null is returned.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
String contentId = "contentId_example"; // String | The content id.
Boolean resolve = true; // Boolean | Resolves the data of referenced list items into the contents's content.
Integer timeout = 56; // Integer | Maximum time in milliseconds to wait for the business process completed state.
List<String> patterns = Arrays.asList("patterns_example"); // List<String> | Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
try {
    ContentDetail result = apiInstance.contentReactivate(contentId, resolve, timeout, patterns);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentReactivate");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **contentId** | **String**| The content id. |
 **resolve** | **Boolean**| Resolves the data of referenced list items into the contents&#39;s content. |
 **timeout** | **Integer**| Maximum time in milliseconds to wait for the business process completed state. | [optional]
 **patterns** | [**List&lt;String&gt;**](String.md)| Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches. | [optional]

### Return type

[**ContentDetail**](ContentDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentReactivateMany"></a>
# **contentReactivateMany**
> BusinessProcess contentReactivateMany(reactivationRequest)

Reactivate Many - Content

The reactivation multiple contents documents is executed asynchronous. To keep track of the update progress a business process is returned.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
ContentReactivationRequest reactivationRequest = new ContentReactivationRequest(); // ContentReactivationRequest | The content reactivation request.
try {
    BusinessProcess result = apiInstance.contentReactivateMany(reactivationRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentReactivateMany");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **reactivationRequest** | [**ContentReactivationRequest**](ContentReactivationRequest.md)| The content reactivation request. |

### Return type

[**BusinessProcess**](BusinessProcess.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentSearch"></a>
# **contentSearch**
> ContentSearchResult contentSearch(contentSearchRequest)

Search

Searches contents as specified in the search request.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
ContentSearchRequest contentSearchRequest = new ContentSearchRequest(); // ContentSearchRequest | The content search request.
try {
    ContentSearchResult result = apiInstance.contentSearch(contentSearchRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentSearch");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **contentSearchRequest** | [**ContentSearchRequest**](ContentSearchRequest.md)| The content search request. |

### Return type

[**ContentSearchResult**](ContentSearchResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentSearchByChannel"></a>
# **contentSearchByChannel**
> ContentSearchResult contentSearchByChannel(channelId, contentSearchRequest)

Search By Channel

Searches contents as specified in the search request and limits the search results to the specified channel.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
String channelId = "channelId_example"; // String | The channel id.
ContentSearchRequest contentSearchRequest = new ContentSearchRequest(); // ContentSearchRequest | The content search request.
try {
    ContentSearchResult result = apiInstance.contentSearchByChannel(channelId, contentSearchRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentSearchByChannel");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **channelId** | **String**| The channel id. |
 **contentSearchRequest** | [**ContentSearchRequest**](ContentSearchRequest.md)| The content search request. |

### Return type

[**ContentSearchResult**](ContentSearchResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentTransferOwnershipMany"></a>
# **contentTransferOwnershipMany**
> BusinessProcess contentTransferOwnershipMany(contentsOwnershipTransferRequest)

Process many ownership trasnfer request

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
ContentsOwnershipTransferRequest contentsOwnershipTransferRequest = new ContentsOwnershipTransferRequest(); // ContentsOwnershipTransferRequest | The content ownership transfer request request.
try {
    BusinessProcess result = apiInstance.contentTransferOwnershipMany(contentsOwnershipTransferRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentTransferOwnershipMany");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **contentsOwnershipTransferRequest** | [**ContentsOwnershipTransferRequest**](ContentsOwnershipTransferRequest.md)| The content ownership transfer request request. |

### Return type

[**BusinessProcess**](BusinessProcess.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentUpdateFile"></a>
# **contentUpdateFile**
> BusinessProcess contentUpdateFile(contentId, updateRequest)

Update Single - File

Update binary file of existing content. The file must already be uploaded before calling this endpoint.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
String contentId = "contentId_example"; // String | The id of the content to replace
ContentFileUpdateRequest updateRequest = new ContentFileUpdateRequest(); // ContentFileUpdateRequest | Update request
try {
    BusinessProcess result = apiInstance.contentUpdateFile(contentId, updateRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentUpdateFile");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **contentId** | **String**| The id of the content to replace |
 **updateRequest** | [**ContentFileUpdateRequest**](ContentFileUpdateRequest.md)| Update request |

### Return type

[**BusinessProcess**](BusinessProcess.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentUpdateMetadata"></a>
# **contentUpdateMetadata**
> ContentDetail contentUpdateMetadata(contentId, updateRequest, resolve, timeout, patterns)

Update Single - Metadata

The update of content metadata is executed asynchronous. However, for the specified timeout completion of the update process is awaited. If the update process is not completed by reaching the specified timeout, the update process continues, but null is returned.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
String contentId = "contentId_example"; // String | The content id.
UpdateContentMetadataRequest updateRequest = new UpdateContentMetadataRequest(); // UpdateContentMetadataRequest | The metadata update request.
Boolean resolve = true; // Boolean | Resolves the data of referenced list items into the contents's content.
Integer timeout = 56; // Integer | Maximum time in milliseconds to wait for the business process completed state.
List<String> patterns = Arrays.asList("patterns_example"); // List<String> | Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
try {
    ContentDetail result = apiInstance.contentUpdateMetadata(contentId, updateRequest, resolve, timeout, patterns);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentUpdateMetadata");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **contentId** | **String**| The content id. |
 **updateRequest** | [**UpdateContentMetadataRequest**](UpdateContentMetadataRequest.md)| The metadata update request. |
 **resolve** | **Boolean**| Resolves the data of referenced list items into the contents&#39;s content. |
 **timeout** | **Integer**| Maximum time in milliseconds to wait for the business process completed state. | [optional]
 **patterns** | [**List&lt;String&gt;**](String.md)| Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches. | [optional]

### Return type

[**ContentDetail**](ContentDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentUpdateMetadataByFilter"></a>
# **contentUpdateMetadataByFilter**
> BusinessProcess contentUpdateMetadataByFilter(updateRequest)

Update by filter - Metadata

Update metadata of multiple contents. A filter must be provided to limit the update to specific contents.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
FilterContentsMetadataUpdateRequest updateRequest = new FilterContentsMetadataUpdateRequest(); // FilterContentsMetadataUpdateRequest | The metadata update request.
try {
    BusinessProcess result = apiInstance.contentUpdateMetadataByFilter(updateRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentUpdateMetadataByFilter");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateRequest** | [**FilterContentsMetadataUpdateRequest**](FilterContentsMetadataUpdateRequest.md)| The metadata update request. |

### Return type

[**BusinessProcess**](BusinessProcess.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentUpdateMetadataMany"></a>
# **contentUpdateMetadataMany**
> BusinessProcess contentUpdateMetadataMany(updateRequest)

Update Many - Metadata

The metadata update of multiple contents documents is executed asynchronous. To keep track of the update progress a business process is returned.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
ContentsMetadataUpdateRequest updateRequest = new ContentsMetadataUpdateRequest(); // ContentsMetadataUpdateRequest | The metadata update request.
try {
    BusinessProcess result = apiInstance.contentUpdateMetadataMany(updateRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentUpdateMetadataMany");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateRequest** | [**ContentsMetadataUpdateRequest**](ContentsMetadataUpdateRequest.md)| The metadata update request. |

### Return type

[**BusinessProcess**](BusinessProcess.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentUpdatePermissions"></a>
# **contentUpdatePermissions**
> ContentDetail contentUpdatePermissions(contentId, updateRequest, resolve, timeout, patterns)

Update Single - Permissions

The update of content permissions is executed asynchronous. However, for the specified timeout completion of the update process is awaited. If the update process is not completed by reaching the specified timeout, the update process continues, but null is returned.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
String contentId = "contentId_example"; // String | The content id.
UpdateContentPermissionsRequest updateRequest = new UpdateContentPermissionsRequest(); // UpdateContentPermissionsRequest | The content permission update request.
Boolean resolve = true; // Boolean | Resolves the data of referenced list items into the contents's content.
Integer timeout = 56; // Integer | Maximum time in milliseconds to wait for the business process completed state.
List<String> patterns = Arrays.asList("patterns_example"); // List<String> | Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches.
try {
    ContentDetail result = apiInstance.contentUpdatePermissions(contentId, updateRequest, resolve, timeout, patterns);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentUpdatePermissions");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **contentId** | **String**| The content id. |
 **updateRequest** | [**UpdateContentPermissionsRequest**](UpdateContentPermissionsRequest.md)| The content permission update request. |
 **resolve** | **Boolean**| Resolves the data of referenced list items into the contents&#39;s content. |
 **timeout** | **Integer**| Maximum time in milliseconds to wait for the business process completed state. | [optional]
 **patterns** | [**List&lt;String&gt;**](String.md)| Comma-separated list of display pattern ids. Resolves display values of referenced list items where the display pattern id matches. | [optional]

### Return type

[**ContentDetail**](ContentDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentUpdatePermissionsMany"></a>
# **contentUpdatePermissionsMany**
> BusinessProcess contentUpdatePermissionsMany(updateRequest)

Update Many - Permissions

The permission update of multiple contents documents is executed asynchronous. To keep track of the update progress a business process is returned.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
List<UpdateContentPermissionsRequest> updateRequest = Arrays.asList(new UpdateContentPermissionsRequest()); // List<UpdateContentPermissionsRequest> | The permissions update request.
try {
    BusinessProcess result = apiInstance.contentUpdatePermissionsMany(updateRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentUpdatePermissionsMany");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateRequest** | [**List&lt;UpdateContentPermissionsRequest&gt;**](UpdateContentPermissionsRequest.md)| The permissions update request. |

### Return type

[**BusinessProcess**](BusinessProcess.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="contentUpdateTransferOwnership"></a>
# **contentUpdateTransferOwnership**
> ContentDetail contentUpdateTransferOwnership(contentId, updateRequest, timeout)

Update Single - OwnershipTransfer

The update of content transfer is executed asynchronous. However, for the specified timeout completion of the update process is awaited. If the update process is not completed by reaching the specified timeout, the update process continues, but null is returned.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.ContentApi;


ContentApi apiInstance = new ContentApi();
String contentId = "contentId_example"; // String | The content id.
ContentOwnershipTransferRequest updateRequest = new ContentOwnershipTransferRequest(); // ContentOwnershipTransferRequest | The content ownership transfer request update request.
Integer timeout = 56; // Integer | Maximum time in milliseconds to wait for the business process completed state.
try {
    ContentDetail result = apiInstance.contentUpdateTransferOwnership(contentId, updateRequest, timeout);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling ContentApi#contentUpdateTransferOwnership");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **contentId** | **String**| The content id. |
 **updateRequest** | [**ContentOwnershipTransferRequest**](ContentOwnershipTransferRequest.md)| The content ownership transfer request update request. |
 **timeout** | **Integer**| Maximum time in milliseconds to wait for the business process completed state. | [optional]

### Return type

[**ContentDetail**](ContentDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

