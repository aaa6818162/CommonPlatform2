
# Channel

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** |  |  [optional]
**sortOrder** | **Integer** |  | 
**searchIndexId** | **String** | The search index id. |  [optional]
**entityType** | [**EntityType**](EntityType.md) |  | 
**schemaIds** | **List&lt;String&gt;** | An id list of schemas with schema type content whose content documents should be found by the simple search. The search by filters and aggregations are unaffected. |  [optional]
**sort** | [**List&lt;SortInfo&gt;**](SortInfo.md) |  |  [optional]
**aggregations** | [**List&lt;AggregatorBase&gt;**](AggregatorBase.md) | An optional list of aggregators. These aggregations are added by default on each aggregation requests. |  [optional]
**extendedSimpleSearchFields** | **List&lt;String&gt;** | An Optional list of fields. These fields extend the list of simple search fields outside the bounds of any schema field configuration. |  [optional]



