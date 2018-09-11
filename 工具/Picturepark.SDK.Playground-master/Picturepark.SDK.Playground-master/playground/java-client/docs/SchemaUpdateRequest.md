
# SchemaUpdateRequest

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**displayPatterns** | [**List&lt;DisplayPattern&gt;**](DisplayPattern.md) | Language specific DotLiquid templates. These templates will be resolved into display values in content documents and/or list items. |  [optional]
**fields** | [**List&lt;FieldBase&gt;**](FieldBase.md) | The schema fields. |  [optional]
**aggregations** | [**List&lt;AggregatorBase&gt;**](AggregatorBase.md) | An optional list of aggregations to group content documents and list items. |  [optional]
**sortOrder** | **Integer** | A simple ordering property for schemas. | 
**sort** | [**List&lt;SortInfo&gt;**](SortInfo.md) | Sorts content documents and/or list items. |  [optional]
**_public** | **Boolean** | Opens schema accessibility. | 
**schemaPermissionSetIds** | **List&lt;String&gt;** | An optional id list of schema permission sets which control list item permissions. When not empty Public must be false. |  [optional]
**layerSchemaIds** | **List&lt;String&gt;** | An optional id list of schemas with type layer. |  [optional]
**referencedInContentSchemaIds** | **List&lt;String&gt;** | An optional id list of schemas with type content for a schema with type layer. |  [optional]
**types** | [**List&lt;SchemaType&gt;**](SchemaType.md) | Types control schema usage. Schema types can only be added, but not removed. |  [optional]



