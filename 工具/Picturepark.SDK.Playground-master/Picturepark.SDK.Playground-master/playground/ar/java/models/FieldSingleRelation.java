/**
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

package foobar.models;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;

/**
 * The FieldSingleRelation model.
 */
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "kind")
@JsonTypeName("FieldSingleRelation")
public class FieldSingleRelation extends FieldBase {
    /**
     * The schemaId property.
     */
    @JsonProperty(value = "schemaId")
    private String schemaId;

    /**
     * The schemaIndexingInfo property.
     */
    @JsonProperty(value = "schemaIndexingInfo")
    private SchemaIndexingInfo schemaIndexingInfo;

    /**
     * The relationTypes property.
     */
    @JsonProperty(value = "relationTypes")
    private List<RelationType> relationTypes;

    /**
     * The maxRecursion property.
     */
    @JsonProperty(value = "maxRecursion", required = true)
    private int maxRecursion;

    /**
     * Get the schemaId value.
     *
     * @return the schemaId value
     */
    public String schemaId() {
        return this.schemaId;
    }

    /**
     * Set the schemaId value.
     *
     * @param schemaId the schemaId value to set
     * @return the FieldSingleRelation object itself.
     */
    public FieldSingleRelation withSchemaId(String schemaId) {
        this.schemaId = schemaId;
        return this;
    }

    /**
     * Get the schemaIndexingInfo value.
     *
     * @return the schemaIndexingInfo value
     */
    public SchemaIndexingInfo schemaIndexingInfo() {
        return this.schemaIndexingInfo;
    }

    /**
     * Set the schemaIndexingInfo value.
     *
     * @param schemaIndexingInfo the schemaIndexingInfo value to set
     * @return the FieldSingleRelation object itself.
     */
    public FieldSingleRelation withSchemaIndexingInfo(SchemaIndexingInfo schemaIndexingInfo) {
        this.schemaIndexingInfo = schemaIndexingInfo;
        return this;
    }

    /**
     * Get the relationTypes value.
     *
     * @return the relationTypes value
     */
    public List<RelationType> relationTypes() {
        return this.relationTypes;
    }

    /**
     * Set the relationTypes value.
     *
     * @param relationTypes the relationTypes value to set
     * @return the FieldSingleRelation object itself.
     */
    public FieldSingleRelation withRelationTypes(List<RelationType> relationTypes) {
        this.relationTypes = relationTypes;
        return this;
    }

    /**
     * Get the maxRecursion value.
     *
     * @return the maxRecursion value
     */
    public int maxRecursion() {
        return this.maxRecursion;
    }

    /**
     * Set the maxRecursion value.
     *
     * @param maxRecursion the maxRecursion value to set
     * @return the FieldSingleRelation object itself.
     */
    public FieldSingleRelation withMaxRecursion(int maxRecursion) {
        this.maxRecursion = maxRecursion;
        return this;
    }

}
