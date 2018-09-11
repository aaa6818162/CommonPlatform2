
# ListItemSearchRequest

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**searchString** | **String** | Limits the search by using a query string filter. The Lucene query string syntax is supported. Defaults to *. |  [optional]
**allowSearchStringRewrite** | **Boolean** | Allow the backend to modify the search string if it generates a non valid query | 
**sort** | [**List&lt;SortInfo&gt;**](SortInfo.md) | Sorts the search results. Sorting on a not indexed field will throw an exception. |  [optional]
**start** | **Integer** | Defines the offset from the first result you want to fetch. Defaults to 0. | 
**limit** | **Integer** | Limits the document count of the result set. Defaults to 30. | 
**includeAllSchemaChildren** | **Boolean** | Broadens the search and include all schema descendant list items. | 
**schemaIds** | **List&lt;String&gt;** | Limits the search to list items of the provided schemas. |  [optional]
**displayLanguage** | **String** | Defines the return language of translation values. Defaults to x-default. |  [optional]
**displayPatternIds** | **List&lt;String&gt;** | Limits the display values included in the search response. Defaults to all display values. |  [optional]
**referencedFieldsDisplayPatternIds** | **List&lt;String&gt;** | Define the display values included in the search response for the referenced fields. Defaults to no display value. |  [optional]
**searchLanguages** | **List&lt;String&gt;** | Only searches the specified language values. Defaults to all metadata languages of the language configuration. |  [optional]
**includeMetadata** | **Boolean** | When set to true the content data is included in the result items. | 



