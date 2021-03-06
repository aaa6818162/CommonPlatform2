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
import io.swagger.annotations.ApiModel;
import com.google.gson.annotations.SerializedName;

import java.io.IOException;
import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;

/**
 * Corresponds to tiff.YCbCrPositioningChoice
 */
@JsonAdapter(YCbCrPositioning.Adapter.class)
public enum YCbCrPositioning {
  
  CENTERED("Centered"),
  
  COSITED("Cosited");

  private String value;

  YCbCrPositioning(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String toString() {
    return String.valueOf(value);
  }

  public static YCbCrPositioning fromValue(String text) {
    for (YCbCrPositioning b : YCbCrPositioning.values()) {
      if (String.valueOf(b.value).equals(text)) {
        return b;
      }
    }
    return null;
  }

  public static class Adapter extends TypeAdapter<YCbCrPositioning> {
    @Override
    public void write(final JsonWriter jsonWriter, final YCbCrPositioning enumeration) throws IOException {
      jsonWriter.value(enumeration.getValue());
    }

    @Override
    public YCbCrPositioning read(final JsonReader jsonReader) throws IOException {
      String value = jsonReader.nextString();
      return YCbCrPositioning.fromValue(String.valueOf(value));
    }
  }
}

