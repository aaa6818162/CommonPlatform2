
# ContentSearchRequest

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**channelIds** | **List&lt;String&gt;** | Limits the simple search fields to the fields available in the specified channel. |  [optional]
**displayLanguage** | **String** | Defines the return language of translation values. Defaults to x-default. |  [optional]
**displayPatternIds** | **List&lt;String&gt;** | Limits the display values included in the search response. Defaults to all display values. |  [optional]
**searchLanguages** | **List&lt;String&gt;** | Only searches the specified language values. Defaults to all metadata languages of the language configuration. |  [optional]
**collectionId** | **String** | The collection id. |  [optional]
**searchString** | **String** | Limits the search by using a query string filter. The Lucene query string syntax is supported. Defaults to *. |  [optional]
**allowSearchStringRewrite** | **Boolean** | Allow the backend to modify the search string if it generates a non valid query | 
**sort** | [**List&lt;SortInfo&gt;**](SortInfo.md) | Sorts the search results. Sorting on a not indexed field will throw an exception. |  [optional]
**start** | **Integer** | Defines the offset from the first result you want to fetch. Defaults to 0. | 
**limit** | **Integer** | Limits the document count of the result set. Defaults to 30. | 
**rightsFilter** | [**List&lt;ContentRight&gt;**](ContentRight.md) | Limits the content document result set to specific ContentRights the user has |  [optional]



