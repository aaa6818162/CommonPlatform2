
# Schema

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **String** | The schema id. |  [optional]
**parentSchemaId** | **String** | The parent schema id. |  [optional]
**types** | [**List&lt;SchemaType&gt;**](SchemaType.md) | Types control schema usage. |  [optional]
**layerSchemaIds** | **List&lt;String&gt;** | An optional id list of schemas with type layer. |  [optional]
**fieldCount** | **Integer** | The count of all fields. | 
**childCount** | **Integer** | The count of all schema descendants with a immediate inheritance. | 
**level** | **Integer** | The descendancy depth of the schema. | 
**system** | **Boolean** | Is true when schema is system provided. | 



