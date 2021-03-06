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
import com.fasterxml.jackson.annotation.JsonSubTypes;

/**
 * The FieldString model.
 */
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "kind")
@JsonTypeName("FieldString")
@JsonSubTypes({
    @JsonSubTypes.Type(name = "FieldStringArray", value = FieldStringArray.class)
})
public class FieldString extends FieldBase {
    /**
     * The template property.
     */
    @JsonProperty(value = "template")
    private String template;

    /**
     * The keepFieldValue property.
     */
    @JsonProperty(value = "keepFieldValue", required = true)
    private boolean keepFieldValue;

    /**
     * The pattern property.
     */
    @JsonProperty(value = "pattern")
    private String pattern;

    /**
     * The minimumLength property.
     */
    @JsonProperty(value = "minimumLength")
    private Integer minimumLength;

    /**
     * The maximumLength property.
     */
    @JsonProperty(value = "maximumLength")
    private Integer maximumLength;

    /**
     * The analyzers property.
     */
    @JsonProperty(value = "analyzers")
    private List<AnalyzerBase> analyzers;

    /**
     * The multiLine property.
     */
    @JsonProperty(value = "multiLine", required = true)
    private boolean multiLine;

    /**
     * The grantedValues property.
     */
    @JsonProperty(value = "grantedValues")
    private List<String> grantedValues;

    /**
     * Get the template value.
     *
     * @return the template value
     */
    public String template() {
        return this.template;
    }

    /**
     * Set the template value.
     *
     * @param template the template value to set
     * @return the FieldString object itself.
     */
    public FieldString withTemplate(String template) {
        this.template = template;
        return this;
    }

    /**
     * Get the keepFieldValue value.
     *
     * @return the keepFieldValue value
     */
    public boolean keepFieldValue() {
        return this.keepFieldValue;
    }

    /**
     * Set the keepFieldValue value.
     *
     * @param keepFieldValue the keepFieldValue value to set
     * @return the FieldString object itself.
     */
    public FieldString withKeepFieldValue(boolean keepFieldValue) {
        this.keepFieldValue = keepFieldValue;
        return this;
    }

    /**
     * Get the pattern value.
     *
     * @return the pattern value
     */
    public String pattern() {
        return this.pattern;
    }

    /**
     * Set the pattern value.
     *
     * @param pattern the pattern value to set
     * @return the FieldString object itself.
     */
    public FieldString withPattern(String pattern) {
        this.pattern = pattern;
        return this;
    }

    /**
     * Get the minimumLength value.
     *
     * @return the minimumLength value
     */
    public Integer minimumLength() {
        return this.minimumLength;
    }

    /**
     * Set the minimumLength value.
     *
     * @param minimumLength the minimumLength value to set
     * @return the FieldString object itself.
     */
    public FieldString withMinimumLength(Integer minimumLength) {
        this.minimumLength = minimumLength;
        return this;
    }

    /**
     * Get the maximumLength value.
     *
     * @return the maximumLength value
     */
    public Integer maximumLength() {
        return this.maximumLength;
    }

    /**
     * Set the maximumLength value.
     *
     * @param maximumLength the maximumLength value to set
     * @return the FieldString object itself.
     */
    public FieldString withMaximumLength(Integer maximumLength) {
        this.maximumLength = maximumLength;
        return this;
    }

    /**
     * Get the analyzers value.
     *
     * @return the analyzers value
     */
    public List<AnalyzerBase> analyzers() {
        return this.analyzers;
    }

    /**
     * Set the analyzers value.
     *
     * @param analyzers the analyzers value to set
     * @return the FieldString object itself.
     */
    public FieldString withAnalyzers(List<AnalyzerBase> analyzers) {
        this.analyzers = analyzers;
        return this;
    }

    /**
     * Get the multiLine value.
     *
     * @return the multiLine value
     */
    public boolean multiLine() {
        return this.multiLine;
    }

    /**
     * Set the multiLine value.
     *
     * @param multiLine the multiLine value to set
     * @return the FieldString object itself.
     */
    public FieldString withMultiLine(boolean multiLine) {
        this.multiLine = multiLine;
        return this;
    }

    /**
     * Get the grantedValues value.
     *
     * @return the grantedValues value
     */
    public List<String> grantedValues() {
        return this.grantedValues;
    }

    /**
     * Set the grantedValues value.
     *
     * @param grantedValues the grantedValues value to set
     * @return the FieldString object itself.
     */
    public FieldString withGrantedValues(List<String> grantedValues) {
        this.grantedValues = grantedValues;
        return this;
    }

}
