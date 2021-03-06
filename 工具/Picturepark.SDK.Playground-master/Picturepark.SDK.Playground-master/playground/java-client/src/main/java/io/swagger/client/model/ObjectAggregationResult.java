/*
 * Web API Swagger specification
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


package io.swagger.client.model;

import java.util.Objects;
import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.client.model.AggregationResult;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * ObjectAggregationResult
 */
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaClientCodegen", date = "2017-10-04T14:36:42.044Z")
public class ObjectAggregationResult {
  @SerializedName("elapsedMilliseconds")
  private Long elapsedMilliseconds = null;

  @SerializedName("aggregationResults")
  private List<AggregationResult> aggregationResults = null;

  @SerializedName("searchString")
  private String searchString = null;

  @SerializedName("isSearchStringRewritten")
  private Boolean isSearchStringRewritten = null;

  public ObjectAggregationResult elapsedMilliseconds(Long elapsedMilliseconds) {
    this.elapsedMilliseconds = elapsedMilliseconds;
    return this;
  }

   /**
   * Get elapsedMilliseconds
   * @return elapsedMilliseconds
  **/
  @ApiModelProperty(required = true, value = "")
  public Long getElapsedMilliseconds() {
    return elapsedMilliseconds;
  }

  public void setElapsedMilliseconds(Long elapsedMilliseconds) {
    this.elapsedMilliseconds = elapsedMilliseconds;
  }

  public ObjectAggregationResult aggregationResults(List<AggregationResult> aggregationResults) {
    this.aggregationResults = aggregationResults;
    return this;
  }

  public ObjectAggregationResult addAggregationResultsItem(AggregationResult aggregationResultsItem) {
    if (this.aggregationResults == null) {
      this.aggregationResults = new ArrayList<AggregationResult>();
    }
    this.aggregationResults.add(aggregationResultsItem);
    return this;
  }

   /**
   * Get aggregationResults
   * @return aggregationResults
  **/
  @ApiModelProperty(value = "")
  public List<AggregationResult> getAggregationResults() {
    return aggregationResults;
  }

  public void setAggregationResults(List<AggregationResult> aggregationResults) {
    this.aggregationResults = aggregationResults;
  }

  public ObjectAggregationResult searchString(String searchString) {
    this.searchString = searchString;
    return this;
  }

   /**
   * The search string used to query the data
   * @return searchString
  **/
  @ApiModelProperty(value = "The search string used to query the data")
  public String getSearchString() {
    return searchString;
  }

  public void setSearchString(String searchString) {
    this.searchString = searchString;
  }

  public ObjectAggregationResult isSearchStringRewritten(Boolean isSearchStringRewritten) {
    this.isSearchStringRewritten = isSearchStringRewritten;
    return this;
  }

   /**
   * Flag to notify if the SearchString was modified compared to the original requested one
   * @return isSearchStringRewritten
  **/
  @ApiModelProperty(required = true, value = "Flag to notify if the SearchString was modified compared to the original requested one")
  public Boolean getIsSearchStringRewritten() {
    return isSearchStringRewritten;
  }

  public void setIsSearchStringRewritten(Boolean isSearchStringRewritten) {
    this.isSearchStringRewritten = isSearchStringRewritten;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ObjectAggregationResult objectAggregationResult = (ObjectAggregationResult) o;
    return Objects.equals(this.elapsedMilliseconds, objectAggregationResult.elapsedMilliseconds) &&
        Objects.equals(this.aggregationResults, objectAggregationResult.aggregationResults) &&
        Objects.equals(this.searchString, objectAggregationResult.searchString) &&
        Objects.equals(this.isSearchStringRewritten, objectAggregationResult.isSearchStringRewritten);
  }

  @Override
  public int hashCode() {
    return Objects.hash(elapsedMilliseconds, aggregationResults, searchString, isSearchStringRewritten);
  }


  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ObjectAggregationResult {\n");
    
    sb.append("    elapsedMilliseconds: ").append(toIndentedString(elapsedMilliseconds)).append("\n");
    sb.append("    aggregationResults: ").append(toIndentedString(aggregationResults)).append("\n");
    sb.append("    searchString: ").append(toIndentedString(searchString)).append("\n");
    sb.append("    isSearchStringRewritten: ").append(toIndentedString(isSearchStringRewritten)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
  
}

