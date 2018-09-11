
# SchemaSearchRequest

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**searchString** | **String** | Limits the search by using a query string filter. The Lucene query string syntax is supported. Defaults to *. |  [optional]
**allowSearchStringRewrite** | **Boolean** | Allow the backend to modify the search string if it generates a non valid query | 
**sort** | [**List&lt;SortInfo&gt;**](SortInfo.md) | Sorts the search results. Sorting on a not indexed field will throw an exception. |  [optional]
**start** | **Integer** | Defines the offset from the first result you want to fetch. Defaults to 0. | 
**limit** | **Integer** | Limits the document count of the result set. Defaults to 30. | 



