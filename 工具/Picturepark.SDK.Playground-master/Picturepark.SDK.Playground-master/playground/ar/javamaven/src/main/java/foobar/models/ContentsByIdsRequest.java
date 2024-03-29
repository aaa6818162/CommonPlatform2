/**
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

package foobar.models;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * The ContentsByIdsRequest model.
 */
public class ContentsByIdsRequest {
    /**
     * The contentIds property.
     */
    @JsonProperty(value = "contentIds")
    private List<String> contentIds;

    /**
     * Get the contentIds value.
     *
     * @return the contentIds value
     */
    public List<String> contentIds() {
        return this.contentIds;
    }

    /**
     * Set the contentIds value.
     *
     * @param contentIds the contentIds value to set
     * @return the ContentsByIdsRequest object itself.
     */
    public ContentsByIdsRequest withContentIds(List<String> contentIds) {
        this.contentIds = contentIds;
        return this;
    }

}
