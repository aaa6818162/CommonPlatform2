# BusinessProcessApi

All URIs are relative to *https://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**businessProcessMarkAsEnded**](BusinessProcessApi.md#businessProcessMarkAsEnded) | **POST** /v1/businessProcesses/processes/{processId}/markAsEnded | Mark as ended
[**businessProcessSearch**](BusinessProcessApi.md#businessProcessSearch) | **POST** /v1/businessProcesses/search | Search
[**businessProcessSendMessage**](BusinessProcessApi.md#businessProcessSendMessage) | **POST** /v1/businessProcesses/processes/{processId}/message | Send message
[**businessProcessStart**](BusinessProcessApi.md#businessProcessStart) | **POST** /v1/businessProcesses/processDefinitions/{processDefinitionId}/start | Start
[**businessProcessWaitForStates**](BusinessProcessApi.md#businessProcessWaitForStates) | **GET** /v1/businessProcesses/{processId}/wait | Wait for states


<a name="businessProcessMarkAsEnded"></a>
# **businessProcessMarkAsEnded**
> businessProcessMarkAsEnded(processId)

Mark as ended

Mark a given process as ended

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.BusinessProcessApi;


BusinessProcessApi apiInstance = new BusinessProcessApi();
String processId = "processId_example"; // String | The process id
try {
    apiInstance.businessProcessMarkAsEnded(processId);
} catch (ApiException e) {
    System.err.println("Exception when calling BusinessProcessApi#businessProcessMarkAsEnded");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **processId** | **String**| The process id |

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="businessProcessSearch"></a>
# **businessProcessSearch**
> BusinessProcessSearchResult businessProcessSearch(businessProcessSearchRequest)

Search

Search for business processes

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.BusinessProcessApi;


BusinessProcessApi apiInstance = new BusinessProcessApi();
BusinessProcessSearchRequest businessProcessSearchRequest = new BusinessProcessSearchRequest(); // BusinessProcessSearchRequest | The business process request
try {
    BusinessProcessSearchResult result = apiInstance.businessProcessSearch(businessProcessSearchRequest);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling BusinessProcessApi#businessProcessSearch");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **businessProcessSearchRequest** | [**BusinessProcessSearchRequest**](BusinessProcessSearchRequest.md)| The business process request |

### Return type

[**BusinessProcessSearchResult**](BusinessProcessSearchResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="businessProcessSendMessage"></a>
# **businessProcessSendMessage**
> businessProcessSendMessage(processId, request)

Send message

Send message to given process 

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.BusinessProcessApi;


BusinessProcessApi apiInstance = new BusinessProcessApi();
String processId = "processId_example"; // String | The process id
SendMessageRequest request = new SendMessageRequest(); // SendMessageRequest | The send message request
try {
    apiInstance.businessProcessSendMessage(processId, request);
} catch (ApiException e) {
    System.err.println("Exception when calling BusinessProcessApi#businessProcessSendMessage");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **processId** | **String**| The process id |
 **request** | [**SendMessageRequest**](SendMessageRequest.md)| The send message request |

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="businessProcessStart"></a>
# **businessProcessStart**
> BusinessProcess businessProcessStart(processDefinitionId, request)

Start

Starts a process with given definition 

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.BusinessProcessApi;


BusinessProcessApi apiInstance = new BusinessProcessApi();
String processDefinitionId = "processDefinitionId_example"; // String | The process definition id
StartProcessRequest request = new StartProcessRequest(); // StartProcessRequest | The start process request
try {
    BusinessProcess result = apiInstance.businessProcessStart(processDefinitionId, request);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling BusinessProcessApi#businessProcessStart");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **processDefinitionId** | **String**| The process definition id |
 **request** | [**StartProcessRequest**](StartProcessRequest.md)| The start process request |

### Return type

[**BusinessProcess**](BusinessProcess.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="businessProcessWaitForStates"></a>
# **businessProcessWaitForStates**
> BusinessProcessWaitResult businessProcessWaitForStates(processId, states, timeout)

Wait for states

Wait for given process states.

### Example
```java
// Import classes:
//import io.swagger.client.ApiException;
//import io.swagger.client.api.BusinessProcessApi;


BusinessProcessApi apiInstance = new BusinessProcessApi();
String processId = "processId_example"; // String | The process id
String states = "states_example"; // String | The states to wait for
Integer timeout = 56; // Integer | The timeout in ms
try {
    BusinessProcessWaitResult result = apiInstance.businessProcessWaitForStates(processId, states, timeout);
    System.out.println(result);
} catch (ApiException e) {
    System.err.println("Exception when calling BusinessProcessApi#businessProcessWaitForStates");
    e.printStackTrace();
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **processId** | **String**| The process id |
 **states** | **String**| The states to wait for |
 **timeout** | **Integer**| The timeout in ms |

### Return type

[**BusinessProcessWaitResult**](BusinessProcessWaitResult.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

