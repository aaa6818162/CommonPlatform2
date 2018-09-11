# swagger-java-client

## Requirements

Building the API client library requires [Maven](https://maven.apache.org/) to be installed.

## Installation

To install the API client library to your local Maven repository, simply execute:

```shell
mvn install
```

To deploy it to a remote Maven repository instead, configure the settings of the repository and execute:

```shell
mvn deploy
```

Refer to the [official documentation](https://maven.apache.org/plugins/maven-deploy-plugin/usage.html) for more information.

### Maven users

Add this dependency to your project's POM:

```xml
<dependency>
    <groupId>io.swagger</groupId>
    <artifactId>swagger-java-client</artifactId>
    <version>1.0.0</version>
    <scope>compile</scope>
</dependency>
```

### Gradle users

Add this dependency to your project's build file:

```groovy
compile "io.swagger:swagger-java-client:1.0.0"
```

### Others

At first generate the JAR by executing:

    mvn package

Then manually install the following JARs:

* target/swagger-java-client-1.0.0.jar
* target/lib/*.jar

## Getting Started

Please follow the [installation](#installation) instruction and execute the following Java code:

```java

import io.swagger.client.*;
import io.swagger.client.auth.*;
import io.swagger.client.model.*;
import io.swagger.client.api.BusinessProcessApi;

import java.io.File;
import java.util.*;

public class BusinessProcessApiExample {

    public static void main(String[] args) {
        
        BusinessProcessApi apiInstance = new BusinessProcessApi();
        String processId = "processId_example"; // String | The process id
        try {
            apiInstance.businessProcessMarkAsEnded(processId);
        } catch (ApiException e) {
            System.err.println("Exception when calling BusinessProcessApi#businessProcessMarkAsEnded");
            e.printStackTrace();
        }
    }
}

```

## Documentation for API Endpoints

All URIs are relative to *https://localhost*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*BusinessProcessApi* | [**businessProcessMarkAsEnded**](docs/BusinessProcessApi.md#businessProcessMarkAsEnded) | **POST** /v1/businessProcesses/processes/{processId}/markAsEnded | Mark as ended
*BusinessProcessApi* | [**businessProcessSearch**](docs/BusinessProcessApi.md#businessProcessSearch) | **POST** /v1/businessProcesses/search | Search
*BusinessProcessApi* | [**businessProcessSendMessage**](docs/BusinessProcessApi.md#businessProcessSendMessage) | **POST** /v1/businessProcesses/processes/{processId}/message | Send message
*BusinessProcessApi* | [**businessProcessStart**](docs/BusinessProcessApi.md#businessProcessStart) | **POST** /v1/businessProcesses/processDefinitions/{processDefinitionId}/start | Start
*BusinessProcessApi* | [**businessProcessWaitForStates**](docs/BusinessProcessApi.md#businessProcessWaitForStates) | **GET** /v1/businessProcesses/{processId}/wait | Wait for states
*ContentApi* | [**contentAggregate**](docs/ContentApi.md#contentAggregate) | **POST** /V1/Contents/Aggregate | Aggregate
*ContentApi* | [**contentAggregateByChannel**](docs/ContentApi.md#contentAggregateByChannel) | **POST** /V1/Contents/{ChannelId}/Aggregate | Aggregate by Channel
*ContentApi* | [**contentCreateContent**](docs/ContentApi.md#contentCreateContent) | **POST** /V1/Contents | Create Single
*ContentApi* | [**contentCreateDownloadLink**](docs/ContentApi.md#contentCreateDownloadLink) | **POST** /V1/Contents/CreateBatchContentDownload | Creates a content batch download
*ContentApi* | [**contentDeactivate**](docs/ContentApi.md#contentDeactivate) | **PUT** /V1/Contents/{ContentId}/Deactivate | Deactivates a content
*ContentApi* | [**contentDeactivateMany**](docs/ContentApi.md#contentDeactivateMany) | **POST** /V1/Contents/Many/Deactivate | Dactivate Many - Content
*ContentApi* | [**contentDownload**](docs/ContentApi.md#contentDownload) | **GET** /V1/Contents/Downloads/{ContentId}/{OutputFormatId} | Downloads content in a specific outputformat
*ContentApi* | [**contentDownloadResized**](docs/ContentApi.md#contentDownloadResized) | **GET** /V1/Contents/Downloads/{ContentId}/{OutputFormatId}/{Width}/{Height} | Download resized content
*ContentApi* | [**contentDownloadThumbnail**](docs/ContentApi.md#contentDownloadThumbnail) | **GET** /V1/Contents/Thumbnails/{ContentId}/{Size} | Get Thumbnail
*ContentApi* | [**contentGet**](docs/ContentApi.md#contentGet) | **GET** /V1/Contents/{ContentId} | Get Single
*ContentApi* | [**contentGetMany**](docs/ContentApi.md#contentGetMany) | **GET** /V1/Contents/Many | Get Many
*ContentApi* | [**contentReactivate**](docs/ContentApi.md#contentReactivate) | **PUT** /V1/Contents/{ContentId}/Reactivate | Reactivate - Content
*ContentApi* | [**contentReactivateMany**](docs/ContentApi.md#contentReactivateMany) | **POST** /V1/Contents/Many/Reactivate | Reactivate Many - Content
*ContentApi* | [**contentSearch**](docs/ContentApi.md#contentSearch) | **POST** /V1/Contents/Search | Search
*ContentApi* | [**contentSearchByChannel**](docs/ContentApi.md#contentSearchByChannel) | **POST** /V1/Contents/{ChannelId}/Search | Search By Channel
*ContentApi* | [**contentTransferOwnershipMany**](docs/ContentApi.md#contentTransferOwnershipMany) | **POST** /V1/Contents/Many/Ownership/Transfer | Process many ownership trasnfer request
*ContentApi* | [**contentUpdateFile**](docs/ContentApi.md#contentUpdateFile) | **PUT** /V1/Contents/{ContentId}/File | Update Single - File
*ContentApi* | [**contentUpdateMetadata**](docs/ContentApi.md#contentUpdateMetadata) | **PUT** /V1/Contents/{ContentId} | Update Single - Metadata
*ContentApi* | [**contentUpdateMetadataByFilter**](docs/ContentApi.md#contentUpdateMetadataByFilter) | **PUT** /V1/Contents/Many/Metadata/Filter | Update by filter - Metadata
*ContentApi* | [**contentUpdateMetadataMany**](docs/ContentApi.md#contentUpdateMetadataMany) | **PUT** /V1/Contents/Many/Metadata | Update Many - Metadata
*ContentApi* | [**contentUpdatePermissions**](docs/ContentApi.md#contentUpdatePermissions) | **PUT** /V1/Contents/{ContentId}/Permissions | Update Single - Permissions
*ContentApi* | [**contentUpdatePermissionsMany**](docs/ContentApi.md#contentUpdatePermissionsMany) | **PUT** /V1/Contents/Many/Permissions | Update Many - Permissions
*ContentApi* | [**contentUpdateTransferOwnership**](docs/ContentApi.md#contentUpdateTransferOwnership) | **PUT** /V1/Contents/{ContentId}/Ownership/Transfer | Update Single - OwnershipTransfer
*DocumentHistoryApi* | [**documentHistoryGet**](docs/DocumentHistoryApi.md#documentHistoryGet) | **GET** /V1/History/{Id} | Gets a document history
*DocumentHistoryApi* | [**documentHistoryGetDifference**](docs/DocumentHistoryApi.md#documentHistoryGetDifference) | **GET** /V1/History/{Id}/Difference/{OldVersion}/{NewVersion} | Get the difference between tho document history
*DocumentHistoryApi* | [**documentHistoryGetDifferenceLatest**](docs/DocumentHistoryApi.md#documentHistoryGetDifferenceLatest) | **GET** /V1/History/{Id}/Difference/{OldVersion} | Get latest difference of document history
*DocumentHistoryApi* | [**documentHistoryGetVersion**](docs/DocumentHistoryApi.md#documentHistoryGetVersion) | **GET** /V1/History/{Id}/{Version} | Get document history version
*DocumentHistoryApi* | [**documentHistorySearch**](docs/DocumentHistoryApi.md#documentHistorySearch) | **POST** /V1/History/Search | Search for document history
*JsonSchemaApi* | [**jsonSchemaGet**](docs/JsonSchemaApi.md#jsonSchemaGet) | **GET** /V1/JsonSchemas/{SchemaId} | Get Json Schema
*ListItemApi* | [**listItemAggregate**](docs/ListItemApi.md#listItemAggregate) | **POST** /V1/ListItems/Aggregate | Aggregate
*ListItemApi* | [**listItemCreate**](docs/ListItemApi.md#listItemCreate) | **POST** /V1/ListItems | Create Single
*ListItemApi* | [**listItemCreateMany**](docs/ListItemApi.md#listItemCreateMany) | **POST** /V1/ListItems/Many | Create Many
*ListItemApi* | [**listItemDeleteMany**](docs/ListItemApi.md#listItemDeleteMany) | **DELETE** /V1/ListItems/Many | Delete Many
*ListItemApi* | [**listItemGet**](docs/ListItemApi.md#listItemGet) | **GET** /V1/ListItems/{ListItemId} | Get Single
*ListItemApi* | [**listItemImport**](docs/ListItemApi.md#listItemImport) | **GET** /V1/ListItems/Import | Import
*ListItemApi* | [**listItemSearch**](docs/ListItemApi.md#listItemSearch) | **POST** /V1/ListItems/Search | Search
*ListItemApi* | [**listItemUpdate**](docs/ListItemApi.md#listItemUpdate) | **PUT** /V1/ListItems/{ListItemId} | Update Single
*ListItemApi* | [**listItemUpdateFields**](docs/ListItemApi.md#listItemUpdateFields) | **PUT** /V1/ListItems/Many/Fields | Update - Fields
*ListItemApi* | [**listItemUpdateFieldsByFilter**](docs/ListItemApi.md#listItemUpdateFieldsByFilter) | **PUT** /V1/ListItems/Many/Fields/Filter | Update by filter - Fields
*ListItemApi* | [**listItemUpdateMany**](docs/ListItemApi.md#listItemUpdateMany) | **PUT** /V1/ListItems/Many | Update Many
*ListItemApi* | [**listItemWaitForStates**](docs/ListItemApi.md#listItemWaitForStates) | **GET** /V1/ListItems/{ProcessId}/Wait | Wait For States
*LiveStreamApi* | [**liveStreamSearch**](docs/LiveStreamApi.md#liveStreamSearch) | **POST** /V1/LiveStream/Search | Search LiveStream
*OutputApi* | [**outputGet**](docs/OutputApi.md#outputGet) | **GET** /V1/Outputs/{OutputId} | Get Single
*OutputApi* | [**outputGetByContentIds**](docs/OutputApi.md#outputGetByContentIds) | **POST** /V1/Outputs | Get outputs by contentIds
*PermissionApi* | [**permissionGetContentPermissions**](docs/PermissionApi.md#permissionGetContentPermissions) | **GET** /V1/Permission/ContentPermissionSets/{PermissionSetId} | Get Content Permission Single
*PermissionApi* | [**permissionGetSchemaPermissions**](docs/PermissionApi.md#permissionGetSchemaPermissions) | **GET** /V1/Permission/SchemaPermissionSets/{PermissionSetId} | Get Schema Permission Single
*PermissionApi* | [**permissionGetUserPermissions**](docs/PermissionApi.md#permissionGetUserPermissions) | **GET** /V1/Permission/UserPermissions/{Permission} | Get UserRight validation result
*PermissionApi* | [**permissionSearchContentPermissions**](docs/PermissionApi.md#permissionSearchContentPermissions) | **POST** /V1/Permission/ContentPermissionSets/Search | Search Content Permissions
*PermissionApi* | [**permissionSearchSchemaPermissions**](docs/PermissionApi.md#permissionSearchSchemaPermissions) | **POST** /V1/Permission/SchemaPermissionSets/Search | Search Schema Permissions
*ProfileApi* | [**profileGet**](docs/ProfileApi.md#profileGet) | **GET** /V1/Profile | Get
*ProfileApi* | [**profileUpdate**](docs/ProfileApi.md#profileUpdate) | **PUT** /V1/Profile | Update
*PublicAccessApi* | [**publicAccessGetShare**](docs/PublicAccessApi.md#publicAccessGetShare) | **GET** /V1/PublicAccess/GetShare | Get Share
*PublicAccessApi* | [**publicAccessGetVersion**](docs/PublicAccessApi.md#publicAccessGetVersion) | **GET** /V1/PublicAccess/Version | Get Version
*SchemaApi* | [**schemaCreate**](docs/SchemaApi.md#schemaCreate) | **POST** /V1/Schemas | Create Single
*SchemaApi* | [**schemaDelete**](docs/SchemaApi.md#schemaDelete) | **DELETE** /V1/Schemas/{SchemaId} | Delete Single
*SchemaApi* | [**schemaExists**](docs/SchemaApi.md#schemaExists) | **GET** /V1/Schemas/{SchemaId}/Exists | Exists
*SchemaApi* | [**schemaGet**](docs/SchemaApi.md#schemaGet) | **GET** /V1/Schemas/{SchemaId} | Get Single
*SchemaApi* | [**schemaGetAll**](docs/SchemaApi.md#schemaGetAll) | **GET** /V1/Schemas | Get Many
*SchemaApi* | [**schemaSearch**](docs/SchemaApi.md#schemaSearch) | **POST** /V1/Schemas/Search | Search
*SchemaApi* | [**schemaUpdate**](docs/SchemaApi.md#schemaUpdate) | **PUT** /V1/Schemas/{SchemaId} | Update Single
*ShareApi* | [**shareAggregate**](docs/ShareApi.md#shareAggregate) | **POST** /V1/Shares/Aggregate | Aggregate
*ShareApi* | [**shareCreate**](docs/ShareApi.md#shareCreate) | **POST** /V1/Shares | Create single
*ShareApi* | [**shareGet**](docs/ShareApi.md#shareGet) | **GET** /V1/Shares/{Id} | Get single
*ShareApi* | [**shareSearch**](docs/ShareApi.md#shareSearch) | **POST** /V1/Shares/Search | Search
*ShareApi* | [**shareUpdate**](docs/ShareApi.md#shareUpdate) | **PUT** /V1/Shares/{Id} | Update single
*TransferApi* | [**transferCancelTransfer**](docs/TransferApi.md#transferCancelTransfer) | **GET** /V1/Transfers/{TransferId}/Cancel | Cancels an active transfer. Valid states: TODO
*TransferApi* | [**transferCreate**](docs/TransferApi.md#transferCreate) | **POST** /V1/Transfers | Create Transfer
*TransferApi* | [**transferDelete**](docs/TransferApi.md#transferDelete) | **DELETE** /V1/Transfers/{TransferId} | Delete Transfer
*TransferApi* | [**transferDeleteFiles**](docs/TransferApi.md#transferDeleteFiles) | **POST** /V1/Transfers/Files/Delete | Delete Files
*TransferApi* | [**transferGet**](docs/TransferApi.md#transferGet) | **GET** /V1/Transfers/{TransferId} | Get Transferdetail
*TransferApi* | [**transferGetBlacklist**](docs/TransferApi.md#transferGetBlacklist) | **GET** /V1/Transfers/Files/Blacklist | Get Blacklist
*TransferApi* | [**transferGetFile**](docs/TransferApi.md#transferGetFile) | **GET** /V1/Transfers/Files/{FileTransferId} | Get File
*TransferApi* | [**transferImportTransfer**](docs/TransferApi.md#transferImportTransfer) | **POST** /V1/Transfers/{TransferId}/Import | Delete Transfer
*TransferApi* | [**transferPartialImport**](docs/TransferApi.md#transferPartialImport) | **POST** /V1/Transfers/{TransferId}/PartialImport | Create a partial import
*TransferApi* | [**transferSearch**](docs/TransferApi.md#transferSearch) | **POST** /V1/Transfers/Search | Search 
*TransferApi* | [**transferSearchFiles**](docs/TransferApi.md#transferSearchFiles) | **POST** /V1/Transfers/Files/Search | Search for files
*TransferApi* | [**transferUploadFile**](docs/TransferApi.md#transferUploadFile) | **POST** /V1/Transfers/{TransferId}/Files/{Identifier}/Upload | 
*UserApi* | [**userGetByOwnerToken**](docs/UserApi.md#userGetByOwnerToken) | **GET** /V1/Users/Owner/{TokenId} | Get userdetail by owner token
*UserApi* | [**userGetChannels**](docs/UserApi.md#userGetChannels) | **GET** /V1/Users/Channels | Get List of Channels
*UserApi* | [**userGetUser**](docs/UserApi.md#userGetUser) | **GET** /V1/Users/GetUser/{UserId} | Get Userdetail by id
*UserApi* | [**userSearch**](docs/UserApi.md#userSearch) | **POST** /V1/Users/Search | Search for users


## Documentation for Models

 - [AggregationFilter](docs/AggregationFilter.md)
 - [AggregationResult](docs/AggregationResult.md)
 - [AggregationResultItem](docs/AggregationResultItem.md)
 - [AggregatorBase](docs/AggregatorBase.md)
 - [AnalyzerBase](docs/AnalyzerBase.md)
 - [AndFilter](docs/AndFilter.md)
 - [ArtworkOrObjectInfo](docs/ArtworkOrObjectInfo.md)
 - [AudioChannelType](docs/AudioChannelType.md)
 - [AudioMetadata](docs/AudioMetadata.md)
 - [AudioMusicalKey](docs/AudioMusicalKey.md)
 - [AudioMusicalScaleType](docs/AudioMusicalScaleType.md)
 - [AudioSampleType](docs/AudioSampleType.md)
 - [AudioStream](docs/AudioStream.md)
 - [AudioStretchMode](docs/AudioStretchMode.md)
 - [AuthorizationState](docs/AuthorizationState.md)
 - [BaseResultOfBusinessProcess](docs/BaseResultOfBusinessProcess.md)
 - [BaseResultOfContent](docs/BaseResultOfContent.md)
 - [BaseResultOfFileTransfer](docs/BaseResultOfFileTransfer.md)
 - [BaseResultOfListItem](docs/BaseResultOfListItem.md)
 - [BaseResultOfObject](docs/BaseResultOfObject.md)
 - [BaseResultOfPermissionSet](docs/BaseResultOfPermissionSet.md)
 - [BaseResultOfSchema](docs/BaseResultOfSchema.md)
 - [BaseResultOfShareBase](docs/BaseResultOfShareBase.md)
 - [BaseResultOfTransfer](docs/BaseResultOfTransfer.md)
 - [BaseResultOfUser](docs/BaseResultOfUser.md)
 - [BasicTemplate](docs/BasicTemplate.md)
 - [BeatSpliceStretch](docs/BeatSpliceStretch.md)
 - [Blacklist](docs/Blacklist.md)
 - [BlacklistItem](docs/BlacklistItem.md)
 - [BulkResponse](docs/BulkResponse.md)
 - [BulkResponseRow](docs/BulkResponseRow.md)
 - [BusinessProcess](docs/BusinessProcess.md)
 - [BusinessProcessBulkResponse](docs/BusinessProcessBulkResponse.md)
 - [BusinessProcessDefinitionCreateException](docs/BusinessProcessDefinitionCreateException.md)
 - [BusinessProcessDefinitionNotFoundException](docs/BusinessProcessDefinitionNotFoundException.md)
 - [BusinessProcessLifeCylce](docs/BusinessProcessLifeCylce.md)
 - [BusinessProcessNotFoundException](docs/BusinessProcessNotFoundException.md)
 - [BusinessProcessScope](docs/BusinessProcessScope.md)
 - [BusinessProcessSearchRequest](docs/BusinessProcessSearchRequest.md)
 - [BusinessProcessSearchResult](docs/BusinessProcessSearchResult.md)
 - [BusinessProcessStateItem](docs/BusinessProcessStateItem.md)
 - [BusinessProcessWaitResult](docs/BusinessProcessWaitResult.md)
 - [CFAPattern](docs/CFAPattern.md)
 - [CameraAngle](docs/CameraAngle.md)
 - [CameraMove](docs/CameraMove.md)
 - [CardTemplate](docs/CardTemplate.md)
 - [Channel](docs/Channel.md)
 - [ChildFilter](docs/ChildFilter.md)
 - [ColorMode](docs/ColorMode.md)
 - [ColorSpace](docs/ColorSpace.md)
 - [ColorantMode](docs/ColorantMode.md)
 - [ColorantType](docs/ColorantType.md)
 - [Compression](docs/Compression.md)
 - [Content](docs/Content.md)
 - [ContentAggregationRequest](docs/ContentAggregationRequest.md)
 - [ContentBatchDownloadItem](docs/ContentBatchDownloadItem.md)
 - [ContentBatchDownloadRequest](docs/ContentBatchDownloadRequest.md)
 - [ContentBatchDownloadRequestItem](docs/ContentBatchDownloadRequestItem.md)
 - [ContentDeactivationRequest](docs/ContentDeactivationRequest.md)
 - [ContentDetail](docs/ContentDetail.md)
 - [ContentDetail2](docs/ContentDetail2.md)
 - [ContentFileUpdateRequest](docs/ContentFileUpdateRequest.md)
 - [ContentNotFoundException](docs/ContentNotFoundException.md)
 - [ContentOwnershipTransferRequest](docs/ContentOwnershipTransferRequest.md)
 - [ContentPermissionSetDetail](docs/ContentPermissionSetDetail.md)
 - [ContentReactivationRequest](docs/ContentReactivationRequest.md)
 - [ContentRight](docs/ContentRight.md)
 - [ContentSearchRequest](docs/ContentSearchRequest.md)
 - [ContentSearchResult](docs/ContentSearchResult.md)
 - [ContentSearchType](docs/ContentSearchType.md)
 - [ContentType](docs/ContentType.md)
 - [ContentsByIdsRequest](docs/ContentsByIdsRequest.md)
 - [ContentsMetadataUpdateRequest](docs/ContentsMetadataUpdateRequest.md)
 - [ContentsOwnershipTransferRequest](docs/ContentsOwnershipTransferRequest.md)
 - [Contrast](docs/Contrast.md)
 - [CopyrightOwnerInfo](docs/CopyrightOwnerInfo.md)
 - [CreateContentRequest](docs/CreateContentRequest.md)
 - [CreateShareResult](docs/CreateShareResult.md)
 - [CreateTransferRequest](docs/CreateTransferRequest.md)
 - [CreatorContactInfo](docs/CreatorContactInfo.md)
 - [CropUnit](docs/CropUnit.md)
 - [Crs](docs/Crs.md)
 - [CustomRendered](docs/CustomRendered.md)
 - [CustomerHostNotFoundException](docs/CustomerHostNotFoundException.md)
 - [CustomerNotFoundException](docs/CustomerNotFoundException.md)
 - [DataDictionary](docs/DataDictionary.md)
 - [DateRange](docs/DateRange.md)
 - [DateRangeAggregator](docs/DateRangeAggregator.md)
 - [DateRangeFilter](docs/DateRangeFilter.md)
 - [Dc](docs/Dc.md)
 - [DeviceSettings](docs/DeviceSettings.md)
 - [Dimension](docs/Dimension.md)
 - [DisplayPattern](docs/DisplayPattern.md)
 - [DisplayPatternType](docs/DisplayPatternType.md)
 - [DisplayValueDictionary](docs/DisplayValueDictionary.md)
 - [DocumentHistory](docs/DocumentHistory.md)
 - [DocumentHistoryDifference](docs/DocumentHistoryDifference.md)
 - [DocumentHistorySearchRequest](docs/DocumentHistorySearchRequest.md)
 - [DocumentHistorySearchResult](docs/DocumentHistorySearchResult.md)
 - [DocumentMetadata](docs/DocumentMetadata.md)
 - [DocumentNotFoundException](docs/DocumentNotFoundException.md)
 - [DocumentVersionNotFoundException](docs/DocumentVersionNotFoundException.md)
 - [DownloadItem](docs/DownloadItem.md)
 - [Drive](docs/Drive.md)
 - [DriveMetadata](docs/DriveMetadata.md)
 - [DriveMetadataAudit](docs/DriveMetadataAudit.md)
 - [DriveRequestException](docs/DriveRequestException.md)
 - [DuplicateAggregatorException](docs/DuplicateAggregatorException.md)
 - [DuplicateDocumentException](docs/DuplicateDocumentException.md)
 - [DuplicateRightException](docs/DuplicateRightException.md)
 - [EdgeNGramAnalyzer](docs/EdgeNGramAnalyzer.md)
 - [EmbedContentDetail](docs/EmbedContentDetail.md)
 - [EndUserInfo](docs/EndUserInfo.md)
 - [EntityType](docs/EntityType.md)
 - [EpsMetadata](docs/EpsMetadata.md)
 - [ErrorResponse](docs/ErrorResponse.md)
 - [Event](docs/Event.md)
 - [EventAction](docs/EventAction.md)
 - [Exception](docs/Exception.md)
 - [Exif](docs/Exif.md)
 - [ExifAux](docs/ExifAux.md)
 - [ExifMetadata](docs/ExifMetadata.md)
 - [ExifVersion](docs/ExifVersion.md)
 - [ExistsFilter](docs/ExistsFilter.md)
 - [ExistsResponse](docs/ExistsResponse.md)
 - [ExposureMode](docs/ExposureMode.md)
 - [ExposureProgram](docs/ExposureProgram.md)
 - [FailedToLockException](docs/FailedToLockException.md)
 - [FieldBase](docs/FieldBase.md)
 - [FieldBoolean](docs/FieldBoolean.md)
 - [FieldDate](docs/FieldDate.md)
 - [FieldDateTime](docs/FieldDateTime.md)
 - [FieldDateTimeArray](docs/FieldDateTimeArray.md)
 - [FieldDecimal](docs/FieldDecimal.md)
 - [FieldDictionary](docs/FieldDictionary.md)
 - [FieldDictionaryArray](docs/FieldDictionaryArray.md)
 - [FieldGeoPoint](docs/FieldGeoPoint.md)
 - [FieldIndexingInfo](docs/FieldIndexingInfo.md)
 - [FieldLong](docs/FieldLong.md)
 - [FieldLongArray](docs/FieldLongArray.md)
 - [FieldMultiFieldset](docs/FieldMultiFieldset.md)
 - [FieldMultiRelation](docs/FieldMultiRelation.md)
 - [FieldMultiTagbox](docs/FieldMultiTagbox.md)
 - [FieldSingleFieldset](docs/FieldSingleFieldset.md)
 - [FieldSingleRelation](docs/FieldSingleRelation.md)
 - [FieldSingleTagbox](docs/FieldSingleTagbox.md)
 - [FieldString](docs/FieldString.md)
 - [FieldStringArray](docs/FieldStringArray.md)
 - [FieldTranslatedString](docs/FieldTranslatedString.md)
 - [FileMetadata](docs/FileMetadata.md)
 - [FileSource](docs/FileSource.md)
 - [FileTransfer](docs/FileTransfer.md)
 - [FileTransfer2ContentCreateRequest](docs/FileTransfer2ContentCreateRequest.md)
 - [FileTransferCreateItem](docs/FileTransferCreateItem.md)
 - [FileTransferDeleteRequest](docs/FileTransferDeleteRequest.md)
 - [FileTransferDetail](docs/FileTransferDetail.md)
 - [FileTransferPartial2ContentCreateRequest](docs/FileTransferPartial2ContentCreateRequest.md)
 - [FileTransferSearchRequest](docs/FileTransferSearchRequest.md)
 - [FileTransferSearchResult](docs/FileTransferSearchResult.md)
 - [FileTransferState](docs/FileTransferState.md)
 - [FilterAggregator](docs/FilterAggregator.md)
 - [FilterBase](docs/FilterBase.md)
 - [FilterContentsMetadataUpdateRequest](docs/FilterContentsMetadataUpdateRequest.md)
 - [Flash](docs/Flash.md)
 - [FlashMode](docs/FlashMode.md)
 - [FlashReturn](docs/FlashReturn.md)
 - [FlashpixVersion](docs/FlashpixVersion.md)
 - [FocalPlaneResolutionUnit](docs/FocalPlaneResolutionUnit.md)
 - [Font](docs/Font.md)
 - [FontType](docs/FontType.md)
 - [GPSAltitudeRef](docs/GPSAltitudeRef.md)
 - [GPSCoordinate](docs/GPSCoordinate.md)
 - [GPSDestBearingRef](docs/GPSDestBearingRef.md)
 - [GPSDestDistanceRef](docs/GPSDestDistanceRef.md)
 - [GPSDifferential](docs/GPSDifferential.md)
 - [GPSImgDirectionRef](docs/GPSImgDirectionRef.md)
 - [GPSSpeedRef](docs/GPSSpeedRef.md)
 - [GPSStatus](docs/GPSStatus.md)
 - [GainControl](docs/GainControl.md)
 - [GeoBoundingBoxFilter](docs/GeoBoundingBoxFilter.md)
 - [GeoDistanceAggregator](docs/GeoDistanceAggregator.md)
 - [GeoDistanceFilter](docs/GeoDistanceFilter.md)
 - [GeoDistanceRangeFilter](docs/GeoDistanceRangeFilter.md)
 - [GeoLocation](docs/GeoLocation.md)
 - [HistoryAudit](docs/HistoryAudit.md)
 - [ImageCreatorInfo](docs/ImageCreatorInfo.md)
 - [ImageMetadata](docs/ImageMetadata.md)
 - [ImageSupplierInfo](docs/ImageSupplierInfo.md)
 - [ImgFormat](docs/ImgFormat.md)
 - [IndexException](docs/IndexException.md)
 - [InternalRecipient](docs/InternalRecipient.md)
 - [InvalidArgumentException](docs/InvalidArgumentException.md)
 - [InvalidCustomerException](docs/InvalidCustomerException.md)
 - [InvalidStateException](docs/InvalidStateException.md)
 - [InvalidStateTransitionException](docs/InvalidStateTransitionException.md)
 - [InvalidUserOrPasswordException](docs/InvalidUserOrPasswordException.md)
 - [IptcCore](docs/IptcCore.md)
 - [IptcExt](docs/IptcExt.md)
 - [IptcIIM](docs/IptcIIM.md)
 - [Job](docs/Job.md)
 - [LanguageAnalyzer](docs/LanguageAnalyzer.md)
 - [LicenseeInfo](docs/LicenseeInfo.md)
 - [LicensorInfo](docs/LicensorInfo.md)
 - [LifeCycleFilter](docs/LifeCycleFilter.md)
 - [LightSource](docs/LightSource.md)
 - [ListItem](docs/ListItem.md)
 - [ListItemAggregationRequest](docs/ListItemAggregationRequest.md)
 - [ListItemCreateRequest](docs/ListItemCreateRequest.md)
 - [ListItemDetail](docs/ListItemDetail.md)
 - [ListItemFieldsFilterUpdateRequest](docs/ListItemFieldsFilterUpdateRequest.md)
 - [ListItemFieldsUpdateRequest](docs/ListItemFieldsUpdateRequest.md)
 - [ListItemSearchRequest](docs/ListItemSearchRequest.md)
 - [ListItemSearchResult](docs/ListItemSearchResult.md)
 - [ListItemUpdateRequest](docs/ListItemUpdateRequest.md)
 - [ListTemplate](docs/ListTemplate.md)
 - [LiveStreamSearchRequest](docs/LiveStreamSearchRequest.md)
 - [LocationInfo](docs/LocationInfo.md)
 - [Lr](docs/Lr.md)
 - [MailRecipient](docs/MailRecipient.md)
 - [Marker](docs/Marker.md)
 - [MarkerType](docs/MarkerType.md)
 - [MaskMarkers](docs/MaskMarkers.md)
 - [Media](docs/Media.md)
 - [MessagePerformerTaskCanceledException](docs/MessagePerformerTaskCanceledException.md)
 - [MetadataError](docs/MetadataError.md)
 - [MetadataRight](docs/MetadataRight.md)
 - [MetadataValuesChangeCommandBase](docs/MetadataValuesChangeCommandBase.md)
 - [MetadataValuesChangeRequestBase](docs/MetadataValuesChangeRequestBase.md)
 - [MetadataValuesFieldRemoveCommand](docs/MetadataValuesFieldRemoveCommand.md)
 - [MetadataValuesSchemaItemAddCommand](docs/MetadataValuesSchemaItemAddCommand.md)
 - [MetadataValuesSchemaItemRemoveCommand](docs/MetadataValuesSchemaItemRemoveCommand.md)
 - [MetadataValuesSchemaRemoveCommand](docs/MetadataValuesSchemaRemoveCommand.md)
 - [MetadataValuesSchemaUpdateCommand](docs/MetadataValuesSchemaUpdateCommand.md)
 - [MetadataValuesSchemaUpsertCommand](docs/MetadataValuesSchemaUpsertCommand.md)
 - [MeteringMode](docs/MeteringMode.md)
 - [NGramAnalyzer](docs/NGramAnalyzer.md)
 - [NestedAggregator](docs/NestedAggregator.md)
 - [NestedFilter](docs/NestedFilter.md)
 - [NotFilter](docs/NotFilter.md)
 - [NotFoundException](docs/NotFoundException.md)
 - [NumericRange](docs/NumericRange.md)
 - [NumericRangeAggregator](docs/NumericRangeAggregator.md)
 - [NumericRangeFilter](docs/NumericRangeFilter.md)
 - [OECF](docs/OECF.md)
 - [ObjectAggregationResult](docs/ObjectAggregationResult.md)
 - [ObjectSearchResult](docs/ObjectSearchResult.md)
 - [ObjectStoreException](docs/ObjectStoreException.md)
 - [ObjectStoreResponseException](docs/ObjectStoreResponseException.md)
 - [OperationTimeoutException](docs/OperationTimeoutException.md)
 - [OrFilter](docs/OrFilter.md)
 - [Orientation](docs/Orientation.md)
 - [Output](docs/Output.md)
 - [OutputAccess](docs/OutputAccess.md)
 - [OutputDetail](docs/OutputDetail.md)
 - [OutputDetailAudio](docs/OutputDetailAudio.md)
 - [OutputDetailBase](docs/OutputDetailBase.md)
 - [OutputDetailDefault](docs/OutputDetailDefault.md)
 - [OutputDetailDocument](docs/OutputDetailDocument.md)
 - [OutputDetailImage](docs/OutputDetailImage.md)
 - [OutputDetailVideo](docs/OutputDetailVideo.md)
 - [OutputItem](docs/OutputItem.md)
 - [OutputNotFoundException](docs/OutputNotFoundException.md)
 - [OutputSource](docs/OutputSource.md)
 - [OwnerToken](docs/OwnerToken.md)
 - [ParentFilter](docs/ParentFilter.md)
 - [PathHierarchyAnalyzer](docs/PathHierarchyAnalyzer.md)
 - [Pdf](docs/Pdf.md)
 - [PermissionException](docs/PermissionException.md)
 - [PermissionSet](docs/PermissionSet.md)
 - [PermissionSetDetailOfContentRight](docs/PermissionSetDetailOfContentRight.md)
 - [PermissionSetDetailOfMetadataRight](docs/PermissionSetDetailOfMetadataRight.md)
 - [PermissionSetRight](docs/PermissionSetRight.md)
 - [PermissionSetSearchRequest](docs/PermissionSetSearchRequest.md)
 - [PermissionSetSearchResult](docs/PermissionSetSearchResult.md)
 - [PermissionUserRoleRightsOfContentRight](docs/PermissionUserRoleRightsOfContentRight.md)
 - [PermissionUserRoleRightsOfMetadataRight](docs/PermissionUserRoleRightsOfMetadataRight.md)
 - [PermissionUserRoleRightsOfPermissionSetRight](docs/PermissionUserRoleRightsOfPermissionSetRight.md)
 - [PhotometricInterpretation](docs/PhotometricInterpretation.md)
 - [Photoshop](docs/Photoshop.md)
 - [PhotoshopLayer](docs/PhotoshopLayer.md)
 - [PictureparkApplicationException](docs/PictureparkApplicationException.md)
 - [PictureparkArgumentNullException](docs/PictureparkArgumentNullException.md)
 - [PictureparkBusinessException](docs/PictureparkBusinessException.md)
 - [PictureparkException](docs/PictureparkException.md)
 - [PictureparkInvalidMetadataException](docs/PictureparkInvalidMetadataException.md)
 - [PictureparkMappingException](docs/PictureparkMappingException.md)
 - [PictureparkOperationCanceledException](docs/PictureparkOperationCanceledException.md)
 - [PlanarConfiguration](docs/PlanarConfiguration.md)
 - [Plus](docs/Plus.md)
 - [PrefixFilter](docs/PrefixFilter.md)
 - [ProjectLink](docs/ProjectLink.md)
 - [ProjectLinkType](docs/ProjectLinkType.md)
 - [Quality](docs/Quality.md)
 - [QueryException](docs/QueryException.md)
 - [Rating](docs/Rating.md)
 - [Reference](docs/Reference.md)
 - [RegistryEntryInfo](docs/RegistryEntryInfo.md)
 - [RelationType](docs/RelationType.md)
 - [RenderingException](docs/RenderingException.md)
 - [RenderingJobItemNotSetException](docs/RenderingJobItemNotSetException.md)
 - [ResampleStretch](docs/ResampleStretch.md)
 - [ResolutionUnit](docs/ResolutionUnit.md)
 - [RewritableBaseResultOfObject](docs/RewritableBaseResultOfObject.md)
 - [RewritableBaseResultOfPermissionSet](docs/RewritableBaseResultOfPermissionSet.md)
 - [RewritableBaseResultOfSchema](docs/RewritableBaseResultOfSchema.md)
 - [RewritableBaseResultOfShareBase](docs/RewritableBaseResultOfShareBase.md)
 - [RewritableBaseResultOfUser](docs/RewritableBaseResultOfUser.md)
 - [SFR](docs/SFR.md)
 - [Saturation](docs/Saturation.md)
 - [SceneCaptureType](docs/SceneCaptureType.md)
 - [SceneType](docs/SceneType.md)
 - [Schema](docs/Schema.md)
 - [SchemaCreateRequest](docs/SchemaCreateRequest.md)
 - [SchemaDetail](docs/SchemaDetail.md)
 - [SchemaIndexingInfo](docs/SchemaIndexingInfo.md)
 - [SchemaPermissionSetDetail](docs/SchemaPermissionSetDetail.md)
 - [SchemaSearchRequest](docs/SchemaSearchRequest.md)
 - [SchemaSearchResult](docs/SchemaSearchResult.md)
 - [SchemaType](docs/SchemaType.md)
 - [SchemaUpdateRequest](docs/SchemaUpdateRequest.md)
 - [SearchFieldCount](docs/SearchFieldCount.md)
 - [SendMessageRequest](docs/SendMessageRequest.md)
 - [SensingMethod](docs/SensingMethod.md)
 - [ServiceProviderCreateException](docs/ServiceProviderCreateException.md)
 - [ServiceProviderDeleteException](docs/ServiceProviderDeleteException.md)
 - [ServiceProviderNotFoundException](docs/ServiceProviderNotFoundException.md)
 - [ShareAggregationRequest](docs/ShareAggregationRequest.md)
 - [ShareBase](docs/ShareBase.md)
 - [ShareBaseCreateRequest](docs/ShareBaseCreateRequest.md)
 - [ShareBaseDetail](docs/ShareBaseDetail.md)
 - [ShareBaseUpdateRequest](docs/ShareBaseUpdateRequest.md)
 - [ShareBasic](docs/ShareBasic.md)
 - [ShareBasicCreateRequest](docs/ShareBasicCreateRequest.md)
 - [ShareBasicDetail](docs/ShareBasicDetail.md)
 - [ShareBasicUpdateRequest](docs/ShareBasicUpdateRequest.md)
 - [ShareContent](docs/ShareContent.md)
 - [ShareEmbed](docs/ShareEmbed.md)
 - [ShareEmbedCreateRequest](docs/ShareEmbedCreateRequest.md)
 - [ShareEmbedDetail](docs/ShareEmbedDetail.md)
 - [ShareEmbedUpdateRequest](docs/ShareEmbedUpdateRequest.md)
 - [ShareSearchRequest](docs/ShareSearchRequest.md)
 - [ShareSearchResult](docs/ShareSearchResult.md)
 - [Sharpness](docs/Sharpness.md)
 - [ShotSize](docs/ShotSize.md)
 - [SimpleAnalyzer](docs/SimpleAnalyzer.md)
 - [SortDirection](docs/SortDirection.md)
 - [SortInfo](docs/SortInfo.md)
 - [Sprite](docs/Sprite.md)
 - [StartProcessRequest](docs/StartProcessRequest.md)
 - [StorageCausedBy](docs/StorageCausedBy.md)
 - [StorageError](docs/StorageError.md)
 - [StorageRootCause](docs/StorageRootCause.md)
 - [StorageServerError](docs/StorageServerError.md)
 - [StoreAudit](docs/StoreAudit.md)
 - [SubjectDistanceRange](docs/SubjectDistanceRange.md)
 - [TargetContext](docs/TargetContext.md)
 - [TemplateBase](docs/TemplateBase.md)
 - [TemplateEngine](docs/TemplateEngine.md)
 - [TermFilter](docs/TermFilter.md)
 - [TermsAggregator](docs/TermsAggregator.md)
 - [TermsEnumAggregator](docs/TermsEnumAggregator.md)
 - [TermsFilter](docs/TermsFilter.md)
 - [TermsRelationAggregator](docs/TermsRelationAggregator.md)
 - [TermsRelationAggregatorDocumentType](docs/TermsRelationAggregatorDocumentType.md)
 - [ThumbnailSize](docs/ThumbnailSize.md)
 - [Tiff](docs/Tiff.md)
 - [Time](docs/Time.md)
 - [TimeCode](docs/TimeCode.md)
 - [TimeFormat](docs/TimeFormat.md)
 - [TimeScaleStretch](docs/TimeScaleStretch.md)
 - [TimeSignature](docs/TimeSignature.md)
 - [TokenValidationException](docs/TokenValidationException.md)
 - [ToneCurve](docs/ToneCurve.md)
 - [TraceLevel](docs/TraceLevel.md)
 - [Track](docs/Track.md)
 - [Transfer](docs/Transfer.md)
 - [TransferDetail](docs/TransferDetail.md)
 - [TransferDriveFile](docs/TransferDriveFile.md)
 - [TransferFile](docs/TransferFile.md)
 - [TransferSearchRequest](docs/TransferSearchRequest.md)
 - [TransferSearchResult](docs/TransferSearchResult.md)
 - [TransferState](docs/TransferState.md)
 - [TransferType](docs/TransferType.md)
 - [TransferUploadFile](docs/TransferUploadFile.md)
 - [TransferWebLink](docs/TransferWebLink.md)
 - [TranslatedStringDictionary](docs/TranslatedStringDictionary.md)
 - [Unit](docs/Unit.md)
 - [UnknownException](docs/UnknownException.md)
 - [UpdateContentMetadataRequest](docs/UpdateContentMetadataRequest.md)
 - [UpdateContentPermissionsRequest](docs/UpdateContentPermissionsRequest.md)
 - [User](docs/User.md)
 - [UserAddress](docs/UserAddress.md)
 - [UserDetail](docs/UserDetail.md)
 - [UserEmail](docs/UserEmail.md)
 - [UserItem](docs/UserItem.md)
 - [UserNotFoundException](docs/UserNotFoundException.md)
 - [UserPermanentlyRemovedException](docs/UserPermanentlyRemovedException.md)
 - [UserProfile](docs/UserProfile.md)
 - [UserRight](docs/UserRight.md)
 - [UserRole](docs/UserRole.md)
 - [UserRoleAssignedException](docs/UserRoleAssignedException.md)
 - [UserRolesRightsAssignedException](docs/UserRolesRightsAssignedException.md)
 - [UserSearchRequest](docs/UserSearchRequest.md)
 - [UserSearchResult](docs/UserSearchResult.md)
 - [VersionInfo](docs/VersionInfo.md)
 - [VideoAlphaMode](docs/VideoAlphaMode.md)
 - [VideoColorSpace](docs/VideoColorSpace.md)
 - [VideoFieldOrder](docs/VideoFieldOrder.md)
 - [VideoFrameRate](docs/VideoFrameRate.md)
 - [VideoMetadata](docs/VideoMetadata.md)
 - [VideoPixelDepth](docs/VideoPixelDepth.md)
 - [VideoPullDown](docs/VideoPullDown.md)
 - [VideoStream](docs/VideoStream.md)
 - [WhiteBalance](docs/WhiteBalance.md)
 - [WhiteBalanceExif](docs/WhiteBalanceExif.md)
 - [Xmp](docs/Xmp.md)
 - [XmpBJ](docs/XmpBJ.md)
 - [XmpDM](docs/XmpDM.md)
 - [XmpG](docs/XmpG.md)
 - [XmpGImg](docs/XmpGImg.md)
 - [XmpMM](docs/XmpMM.md)
 - [XmpMetadata](docs/XmpMetadata.md)
 - [XmpNote](docs/XmpNote.md)
 - [XmpRights](docs/XmpRights.md)
 - [XmpTPg](docs/XmpTPg.md)
 - [Xmpidq](docs/Xmpidq.md)
 - [YCbCrPositioning](docs/YCbCrPositioning.md)
 - [YCbCrSubSampling](docs/YCbCrSubSampling.md)


## Documentation for Authorization

All endpoints do not require authorization.
Authentication schemes defined for the API:

## Recommendation

It's recommended to create an instance of `ApiClient` per thread in a multithreaded environment to avoid any potential issues.

## Author



