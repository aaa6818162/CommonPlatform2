/**
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

package picturepark.models;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.fasterxml.jackson.annotation.JsonSubTypes;

/**
 * The TermsAggregator is a multi-bucket value aggregation where buckets are
 * dynamically built - one per unique value.
 */
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "kind")
@JsonTypeName("TermsAggregator")
@JsonSubTypes({
    @JsonSubTypes.Type(name = "TermsRelationAggregator", value = TermsRelationAggregator.class),
    @JsonSubTypes.Type(name = "TermsEnumAggregator", value = TermsEnumAggregator.class)
})
public class TermsAggregator extends AggregatorBase {
    /**
     * The elastic search index field (not analyzed) to execute the aggregation
     * on.
     */
    @JsonProperty(value = "field")
    private String field;

    /**
     * The size parameter can be set to define how many term buckets should be
     * returned out of the overall terms list.
     */
    @JsonProperty(value = "size")
    private Integer size;

    /**
     * Includes values for which buckets will be created. Supports regular
     * expression strings or arrays of exact values.
     */
    @JsonProperty(value = "includes")
    private List<String> includes;

    /**
     * Excludes values for which buckets will be created. Supports regular
     * expression strings or arrays of exact values.
     */
    @JsonProperty(value = "excludes")
    private List<String> excludes;

    /**
     * Get the field value.
     *
     * @return the field value
     */
    public String field() {
        return this.field;
    }

    /**
     * Set the field value.
     *
     * @param field the field value to set
     * @return the TermsAggregator object itself.
     */
    public TermsAggregator withField(String field) {
        this.field = field;
        return this;
    }

    /**
     * Get the size value.
     *
     * @return the size value
     */
    public Integer size() {
        return this.size;
    }

    /**
     * Set the size value.
     *
     * @param size the size value to set
     * @return the TermsAggregator object itself.
     */
    public TermsAggregator withSize(Integer size) {
        this.size = size;
        return this;
    }

    /**
     * Get the includes value.
     *
     * @return the includes value
     */
    public List<String> includes() {
        return this.includes;
    }

    /**
     * Set the includes value.
     *
     * @param includes the includes value to set
     * @return the TermsAggregator object itself.
     */
    public TermsAggregator withIncludes(List<String> includes) {
        this.includes = includes;
        return this;
    }

    /**
     * Get the excludes value.
     *
     * @return the excludes value
     */
    public List<String> excludes() {
        return this.excludes;
    }

    /**
     * Set the excludes value.
     *
     * @param excludes the excludes value to set
     * @return the TermsAggregator object itself.
     */
    public TermsAggregator withExcludes(List<String> excludes) {
        this.excludes = excludes;
        return this;
    }

}
