
# ListItemAggregationRequest

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**searchString** | **String** | Limits the search by using a query string filter. The Lucene query string syntax is supported. Defaults to *. |  [optional]
**allowSearchStringRewrite** | **Boolean** | Allow the backend to modify the search string if it generates a non valid query | 
**aggregationFilters** | [**List&lt;AggregationFilter&gt;**](AggregationFilter.md) | Special filters used to filter down on a specific aggregated value. |  [optional]
**aggregators** | [**List&lt;AggregatorBase&gt;**](AggregatorBase.md) | Defines the aggregation resultset. |  [optional]
**includeAllSchemaChildren** | **Boolean** | Broadens the aggregation and include all schema descendant list items. | 
**schemaIds** | **List&lt;String&gt;** | Limits the aggregation to list items of the provided schemas. |  [optional]
**displayLanguage** | **String** | Defines the return language of translation values. Defaults to x-default. |  [optional]
**searchLanguages** | **List&lt;String&gt;** | Only searches the specified language values. Defaults to all metadata languages of the language configuration. |  [optional]



