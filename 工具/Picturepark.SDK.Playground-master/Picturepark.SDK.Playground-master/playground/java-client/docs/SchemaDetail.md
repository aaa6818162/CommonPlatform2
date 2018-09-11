
# SchemaDetail

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | The schema id. |  [optional]
**parentSchemaId** | **String** | The parent schema id. |  [optional]
**types** | [**List&lt;SchemaType&gt;**](SchemaType.md) | Types control schema usage. |  [optional]
**layerSchemaIds** | **List&lt;String&gt;** | An optional id list of schemas with type layer. |  [optional]
**displayPatterns** | [**List&lt;DisplayPattern&gt;**](DisplayPattern.md) | Language specific DotLiquid templates. These templates will be resolved into display values in content documents and/or list items. |  [optional]
**fields** | [**List&lt;FieldBase&gt;**](FieldBase.md) | The schema fields. |  [optional]
**sort** | [**List&lt;SortInfo&gt;**](SortInfo.md) | Sorts content documents and/or list items. |  [optional]
**aggregations** | [**List&lt;AggregatorBase&gt;**](AggregatorBase.md) | An optional list of aggregations to group content documents and list items. |  [optional]
**sortOrder** | **Integer** | A simple ordering property for schemas. | 
**system** | **Boolean** | Is true when schema is system provided. | 
**ownerTokenId** | **String** | The owner token id. Defines the schema owner. |  [optional]
**_public** | **Boolean** | Opens list item document accessibility. If true the SchemaPermissionSetIds must be empty. | 
**schemaPermissionSetIds** | **List&lt;String&gt;** | An optional id list of schema permission sets which control list item permissions. When not empty Public must be false. |  [optional]
**referencedInContentSchemaIds** | **List&lt;String&gt;** | An optional id list of schemas with type content for a schema with type layer. |  [optional]
**descendantSchemaIds** | **List&lt;String&gt;** | A complete id list of all descendant schemas. |  [optional]
**audit** | [**StoreAudit**](StoreAudit.md) |  |  [optional]



