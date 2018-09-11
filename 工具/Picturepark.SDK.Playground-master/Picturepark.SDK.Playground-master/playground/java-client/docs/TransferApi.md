# TransferApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**transferCancelTransfer**](TransferApi.md#transferCancelTransfer) | **GET** /V1/Transfers/{TransferId}/Cancel | Cancels an active transfer. Valid states: TODO
[**transferCreate**](TransferApi.md#transferCreate) | **POST** /V1/Transfers | Create Transfer
[**transferDelete**](TransferApi.md#transferDelete) | **DELETE** /V1/Transfers/{TransferId} | Delete Transfer
[**transferDeleteFiles**](TransferApi.md#transferDeleteFiles) | **POST** /V1/Transfers/Files/Delete | Delete Files
[**transferGet**](TransferApi.md#transferGet) | **GET** /V1/Transfers/{TransferId} | Get Transferdetail
[**transferGetBlacklist**](TransferApi.md#transferGetBlacklist) | **GET** /V1/Transfers/Files/Blacklist | Get Blacklist
[**transferGetFile**](TransferApi.md#transferGetFile) | **GET** /V1/Transfers/Files/{FileTransferId} | Get File
[**transferImportTransfer**](TransferApi.md#transferImportTransfer) | **POST** /V1/Transfers/{TransferId}/Import | Delete Transfer
[**transferPartialImport**](TransferApi.md#transferPartialImport) | **POST** /V1/Transfers/{TransferId}/PartialImport | Create a partial import
[**transferSearch**](TransferApi.md#transferSearch) | **POST** /V1/Transfers/Search | Search 
[**transferSearchFiles**](TransferApi.md#transferSearchFiles) | **POST** /V1/Transfers/Files/Search | Search for files
[**transferUploadFile**](TransferApi.md#transferUploadFile) | **POST** /V1/Transfers/{TransferId}/Files/{Identifier}/Upload | 


<a name="transferCancelTransfer"></a>
# **transferCancelTransfer**
> transferCancelTransfer(transferId)

Cancels an active transfer. Valid states: TODO

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.TransferApi;


TransferApi apiInstance = new TransferApi();
String transferId = "transferId_example"; // String | 
try {
    apiInstance.transferCancelTransfer(transferId);
} catch (ApiException e) {
    System.err.println("Exception when calling TransferApi#transferCancelTransfer");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **transferId** | **String**|  |

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="transferCreate"></a>
# **transferCreate**
> Transfer transferCreate(request)

Create Transfer

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.TransferApi;


TransferApi apiInstance = new TransferApi();
CreateTransferRequest request = new CreateTransferRequest(); // CreateTransferRequest | The create transfer request
try {
    Transfer result = apiInstance.transferCreate(request);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling TransferApi#transferCreate");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**CreateTransferRequest**](CreateTransferRequest.md)| The create transfer request |

### Return type

[**Transfer**](Transfer.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="transferDelete"></a>
# **transferDelete**
> transferDelete(transferId)

Delete Transfer

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.TransferApi;


TransferApi apiInstance = new TransferApi();
String transferId = "transferId_example"; // String | The tranfer id
try {
    apiInstance.transferDelete(transferId);
} catch (ApiException e) {
    System.err.println("Exception when calling TransferApi#transferDelete");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **transferId** | **String**| The tranfer id |

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="transferDeleteFiles"></a>
# **transferDeleteFiles**
> transferDeleteFiles(request)

Delete Files

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.TransferApi;


TransferApi apiInstance = new TransferApi();
FileTransferDeleteRequest request = new FileTransferDeleteRequest(); // FileTransferDeleteRequest | The filetransfer delete request
try {
    apiInstance.transferDeleteFiles(request);
} catch (ApiException e) {
    System.err.println("Exception when calling TransferApi#transferDeleteFiles");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**FileTransferDeleteRequest**](FileTransferDeleteRequest.md)| The filetransfer delete request |

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="transferGet"></a>
# **transferGet**
> TransferDetail transferGet(transferId)

Get Transferdetail

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.TransferApi;


TransferApi apiInstance = new TransferApi();
String transferId = "transferId_example"; // String | The tranfer id
try {
    TransferDetail result = apiInstance.transferGet(transferId);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling TransferApi#transferGet");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **transferId** | **String**| The tranfer id |

### Return type

[**TransferDetail**](TransferDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="transferGetBlacklist"></a>
# **transferGetBlacklist**
> Blacklist transferGetBlacklist()

Get Blacklist

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.TransferApi;


TransferApi apiInstance = new TransferApi();
try {
    Blacklist result = apiInstance.transferGetBlacklist();
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling TransferApi#transferGetBlacklist");
    e.printStackTrace();
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**Blacklist**](Blacklist.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="transferGetFile"></a>
# **transferGetFile**
> FileTransferDetail transferGetFile(fileTransferId)

Get File

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.TransferApi;


TransferApi apiInstance = new TransferApi();
String fileTransferId = "fileTransferId_example"; // String | The filetransfer id
try {
    FileTransferDetail result = apiInstance.transferGetFile(fileTransferId);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling TransferApi#transferGetFile");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **fileTransferId** | **String**| The filetransfer id |

### Return type

[**FileTransferDetail**](FileTransferDetail.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="transferImportTransfer"></a>
# **transferImportTransfer**
> Transfer transferImportTransfer(transferId, request)

Delete Transfer

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.TransferApi;


TransferApi apiInstance = new TransferApi();
String transferId = "transferId_example"; // String | The tranfer id
FileTransfer2ContentCreateRequest request = new FileTransfer2ContentCreateRequest(); // FileTransfer2ContentCreateRequest | The filetransfer to content create request
try {
    Transfer result = apiInstance.transferImportTransfer(transferId, request);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling TransferApi#transferImportTransfer");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **transferId** | **String**| The tranfer id |
 **request** | [**FileTransfer2ContentCreateRequest**](FileTransfer2ContentCreateRequest.md)| The filetransfer to content create request |

### Return type

[**Transfer**](Transfer.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="transferPartialImport"></a>
# **transferPartialImport**
> Transfer transferPartialImport(transferId, request)

Create a partial import

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.TransferApi;


TransferApi apiInstance = new TransferApi();
String transferId = "transferId_example"; // String | The transfer id
FileTransferPartial2ContentCreateRequest request = new FileTransferPartial2ContentCreateRequest(); // FileTransferPartial2ContentCreateRequest | The filetransfer partial to content create request
try {
    Transfer result = apiInstance.transferPartialImport(transferId, request);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling TransferApi#transferPartialImport");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **transferId** | **String**| The transfer id |
 **request** | [**FileTransferPartial2ContentCreateRequest**](FileTransferPartial2ContentCreateRequest.md)| The filetransfer partial to content create request |

### Return type

[**Transfer**](Transfer.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="transferSearch"></a>
# **transferSearch**
> TransferSearchResult transferSearch(request)

Search 

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.TransferApi;


TransferApi apiInstance = new TransferApi();
TransferSearchRequest request = new TransferSearchRequest(); // TransferSearchRequest | The transfer search request
try {
    TransferSearchResult result = apiInstance.transferSearch(request);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling TransferApi#transferSearch");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**TransferSearchRequest**](TransferSearchRequest.md)| The transfer search request |

### Return type

[**TransferSearchResult**](TransferSearchResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="transferSearchFiles"></a>
# **transferSearchFiles**
> FileTransferSearchResult transferSearchFiles(request)

Search for files

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.TransferApi;


TransferApi apiInstance = new TransferApi();
FileTransferSearchRequest request = new FileTransferSearchRequest(); // FileTransferSearchRequest | The file transfer search request
try {
    FileTransferSearchResult result = apiInstance.transferSearchFiles(request);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling TransferApi#transferSearchFiles");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**FileTransferSearchRequest**](FileTransferSearchRequest.md)| The file transfer search request |

### Return type

[**FileTransferSearchResult**](FileTransferSearchResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="transferUploadFile"></a>
# **transferUploadFile**
> transferUploadFile(transferId, identifier, formFile, relativePath, chunkNumber, currentChunkSize, totalSize, totalChunks)



### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.TransferApi;


TransferApi apiInstance = new TransferApi();
String transferId = "transferId_example"; // String | 
String identifier = "identifier_example"; // String | 
File formFile = new File("/path/to/file.txt"); // File | Gets or sets the form file.
String relativePath = "relativePath_example"; // String | Relative path of the uploading file
Long chunkNumber = 789L; // Long | Current chunk number. starts with 1
Long currentChunkSize = 789L; // Long | Size in bytes of the current chunk
Long totalSize = 789L; // Long | Total size in bytes of the uploading file
Long totalChunks = 789L; // Long | Total chunks of the uploading file
try {
    apiInstance.transferUploadFile(transferId, identifier, formFile, relativePath, chunkNumber, currentChunkSize, totalSize, totalChunks);
} catch (ApiException e) {
    System.err.println("Exception when calling TransferApi#transferUploadFile");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **transferId** | **String**|  |
 **identifier** | **String**|  |
 **formFile** | **File**| Gets or sets the form file. | [optional]
 **relativePath** | **String**| Relative path of the uploading file | [optional]
 **chunkNumber** | **Long**| Current chunk number. starts with 1 | [optional]
 **currentChunkSize** | **Long**| Size in bytes of the current chunk | [optional]
 **totalSize** | **Long**| Total size in bytes of the uploading file | [optional]
 **totalChunks** | **Long**| Total chunks of the uploading file | [optional]

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json

