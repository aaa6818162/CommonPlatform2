<?php
namespace Picturepark;
final class ContentClient
{
    /**
     * @param \Microsoft\Rest\ClientInterface $_client
     */
    public function __construct(\Microsoft\Rest\ClientInterface $_client)
    {
        $this->_Get_operation = $_client->createOperation('ContentClient_Get');
        $this->_GetMany_operation = $_client->createOperation('ContentClient_GetMany');
        $this->_CreateMany_operation = $_client->createOperation('ContentClient_CreateMany');
        $this->_Search_operation = $_client->createOperation('ContentClient_Search');
        $this->_SearchByChannel_operation = $_client->createOperation('ContentClient_SearchByChannel');
        $this->_Aggregate_operation = $_client->createOperation('ContentClient_Aggregate');
        $this->_AggregateByChannel_operation = $_client->createOperation('ContentClient_AggregateByChannel');
        $this->_CreateDownloadLink_operation = $_client->createOperation('ContentClient_CreateDownloadLink');
        $this->_Download_operation = $_client->createOperation('ContentClient_Download');
        $this->_DownloadThumbnail_operation = $_client->createOperation('ContentClient_DownloadThumbnail');
        $this->_Create_operation = $_client->createOperation('ContentClient_Create');
        $this->_Deactivate_operation = $_client->createOperation('ContentClient_Deactivate');
        $this->_DeactivateMany_operation = $_client->createOperation('ContentClient_DeactivateMany');
        $this->_Reactivate_operation = $_client->createOperation('ContentClient_Reactivate');
        $this->_ReactivateMany_operation = $_client->createOperation('ContentClient_ReactivateMany');
        $this->_UpdateFile_operation = $_client->createOperation('ContentClient_UpdateFile');
        $this->_UpdateMetadata_operation = $_client->createOperation('ContentClient_UpdateMetadata');
        $this->_UpdatePermissions_operation = $_client->createOperation('ContentClient_UpdatePermissions');
        $this->_UpdateMetadataMany_operation = $_client->createOperation('ContentClient_UpdateMetadataMany');
        $this->_UpdatePermissionsMany_operation = $_client->createOperation('ContentClient_UpdatePermissionsMany');
        $this->_TransferOwnership_operation = $_client->createOperation('ContentClient_TransferOwnership');
        $this->_TransferOwnershipMany_operation = $_client->createOperation('ContentClient_TransferOwnershipMany');
        $this->_BatchUpdateFieldsByIds_operation = $_client->createOperation('ContentClient_BatchUpdateFieldsByIds');
        $this->_BatchUpdateFieldsByFilter_operation = $_client->createOperation('ContentClient_BatchUpdateFieldsByFilter');
    }
    /**
     * Gets a content document by id.
     * @param string $contentId
     * @param string $resolve
     * @param string|null $patterns
     * @return array
     */
    public function get(
        $contentId,
        $resolve,
        $patterns = null
    )
    {
        return $this->_Get_operation->call([
            'contentId' => $contentId,
            'resolve' => $resolve,
            'patterns' => $patterns
        ]);
    }
    /**
     * Gets multiple content documents by ids.
     * @param string $ids
     * @param string $resolve
     * @param string|null $patterns
     * @return array[]
     */
    public function getMany(
        $ids,
        $resolve,
        $patterns = null
    )
    {
        return $this->_GetMany_operation->call([
            'ids' => $ids,
            'resolve' => $resolve,
            'patterns' => $patterns
        ]);
    }
    /**
     * Create multiple file-less content items. To import files, see [Transfer](#section/Transfer)
The operation is executed asynchronous and is not awaited. Call [WaitForCompletion](#operation/BusinessProcess_WaitForCompletion) to wait for the process to finish.
     * @param array $contentCreateManyRequest
     * @return array
     */
    public function createMany(array $contentCreateManyRequest)
    {
        return $this->_CreateMany_operation->call(['contentCreateManyRequest' => $contentCreateManyRequest]);
    }
    /**
     * Searches contents as specified in the search request.
     * @param array $contentSearchRequest
     * @return array
     */
    public function search(array $contentSearchRequest)
    {
        return $this->_Search_operation->call(['contentSearchRequest' => $contentSearchRequest]);
    }
    /**
     * Searches contents as specified in the search request and limits the search results to the specified channel.
     * @param string $channelId
     * @param array $contentSearchRequest
     * @return array
     */
    public function searchByChannel(
        $channelId,
        array $contentSearchRequest
    )
    {
        return $this->_SearchByChannel_operation->call([
            'channelId' => $channelId,
            'contentSearchRequest' => $contentSearchRequest
        ]);
    }
    /**
     * Aggregates content fields as specified in the aggregation request.
     * @param array $contentAggregationRequest
     * @return array
     */
    public function aggregate(array $contentAggregationRequest)
    {
        return $this->_Aggregate_operation->call(['contentAggregationRequest' => $contentAggregationRequest]);
    }
    /**
     * Aggregates content fields as specified in the aggregation request and limits the aggregation results to the specified channel.
     * @param string $channelId
     * @param array $contentAggregationRequest
     * @return array
     */
    public function aggregateByChannel(
        $channelId,
        array $contentAggregationRequest
    )
    {
        return $this->_AggregateByChannel_operation->call([
            'channelId' => $channelId,
            'contentAggregationRequest' => $contentAggregationRequest
        ]);
    }
    /**
     * Creates a download link for one or more contents.
     * @param array $request
     * @return array
     */
    public function createDownloadLink(array $request)
    {
        return $this->_CreateDownloadLink_operation->call(['request' => $request]);
    }
    /**
     * Download single content in a specific outputformat. To resize images on download specify target width &amp; height. To download only a portion of the file, specify the range parameter.
     * @param string $contentId
     * @param string $outputFormatId
     * @param string|null $width
     * @param string|null $height
     * @param string|null $range
     * @return string
     */
    public function download(
        $contentId,
        $outputFormatId,
        $width = null,
        $height = null,
        $range = null
    )
    {
        return $this->_Download_operation->call([
            'contentId' => $contentId,
            'outputFormatId' => $outputFormatId,
            'width' => $width,
            'height' => $height,
            'range' => $range
        ]);
    }
    /**
     * Provides a lightweight endpoint to get content thumbnails.
     * @param string $contentId
     * @param string $size
     * @param string|null $width
     * @param string|null $height
     * @return string
     */
    public function downloadThumbnail(
        $contentId,
        $size,
        $width = null,
        $height = null
    )
    {
        return $this->_DownloadThumbnail_operation->call([
            'contentId' => $contentId,
            'size' => $size,
            'width' => $width,
            'height' => $height
        ]);
    }
    /**
     * Create a single file-less content item. To import files, see [Transfer](#section/Transfer)
     * @param array $contentCreateRequest
     * @param string $resolve
     * @param string|null $allowMissingDependencies
     * @param string|null $timeout
     * @param string|null $patterns
     * @return array
     */
    public function create(
        array $contentCreateRequest,
        $resolve,
        $allowMissingDependencies = null,
        $timeout = null,
        $patterns = null
    )
    {
        return $this->_Create_operation->call([
            'contentCreateRequest' => $contentCreateRequest,
            'resolve' => $resolve,
            'allowMissingDependencies' => $allowMissingDependencies,
            'timeout' => $timeout,
            'patterns' => $patterns
        ]);
    }
    /**
     * Deactivates a single content. The lifecycle is changed to Inactive. After a customer instance specified time (default 30 days), the content and all files will be deleted.
     * @param string $contentId
     * @param string $timeout
     * @return array
     */
    public function deactivate(
        $contentId,
        $timeout
    )
    {
        return $this->_Deactivate_operation->call([
            'contentId' => $contentId,
            'timeout' => $timeout
        ]);
    }
    /**
     * Deactivates multiple contents. The lifecycle is changed to Inactive. After a customer instance specified time (default 30 days), the content and all files will be deleted.
The operation is executed asynchronous and is not awaited. Call [WaitForCompletion](#operation/BusinessProcess_WaitForCompletion) to wait for the process to finish.
     * @param array $deactivateRequest
     * @return array
     */
    public function deactivateMany(array $deactivateRequest)
    {
        return $this->_DeactivateMany_operation->call(['deactivateRequest' => $deactivateRequest]);
    }
    /**
     * Reactivate a previously deactivated content.
     * @param string $contentId
     * @param string $resolve
     * @param string|null $timeout
     * @param string|null $patterns
     * @param string|null $allowMissingDependencies
     * @return array
     */
    public function reactivate(
        $contentId,
        $resolve,
        $timeout = null,
        $patterns = null,
        $allowMissingDependencies = null
    )
    {
        return $this->_Reactivate_operation->call([
            'contentId' => $contentId,
            'resolve' => $resolve,
            'timeout' => $timeout,
            'patterns' => $patterns,
            'allowMissingDependencies' => $allowMissingDependencies
        ]);
    }
    /**
     * Reactivate previously deactivated contents.
The operation is executed asynchronous and is not awaited. Call [WaitForCompletion](#operation/BusinessProcess_WaitForCompletion) to wait for the process to finish.
     * @param array $reactivateRequest
     * @return array
     */
    public function reactivateMany(array $reactivateRequest)
    {
        return $this->_ReactivateMany_operation->call(['reactivateRequest' => $reactivateRequest]);
    }
    /**
     * Update binary file of existing content. The file must already be uploaded before calling this endpoint. See [Transfer](#section/Transfer)
The operation is executed asynchronous and is not awaited. Call [WaitForCompletion](#operation/BusinessProcess_WaitForCompletion) to wait for the process to finish.
     * @param string $contentId
     * @param array $updateRequest
     * @return array
     */
    public function updateFile(
        $contentId,
        array $updateRequest
    )
    {
        return $this->_UpdateFile_operation->call([
            'contentId' => $contentId,
            'updateRequest' => $updateRequest
        ]);
    }
    /**
     * Updates metadata layers of a specified content. For file-less contents, the content itself can be updated aswell. See [ShouldUpdateMetadata](https://github.com/Picturepark/Picturepark.SDK.DotNet/blob/master/src/Picturepark.SDK.V1.Tests/Clients/ContentTests.cs) tests.
     * @param string $contentId
     * @param array $updateRequest
     * @param string $resolve
     * @param string|null $allowMissingDependencies
     * @param string|null $timeout
     * @param string|null $patterns
     * @return array
     */
    public function updateMetadata(
        $contentId,
        array $updateRequest,
        $resolve,
        $allowMissingDependencies = null,
        $timeout = null,
        $patterns = null
    )
    {
        return $this->_UpdateMetadata_operation->call([
            'contentId' => $contentId,
            'updateRequest' => $updateRequest,
            'resolve' => $resolve,
            'allowMissingDependencies' => $allowMissingDependencies,
            'timeout' => $timeout,
            'patterns' => $patterns
        ]);
    }
    /**
     * Updates the content permission sets of a single content. To get a list of available content permission sets, see [Permissions](operation/Permission_SearchContentPermissions)
     * @param string $contentId
     * @param array $updateRequest
     * @param string $resolve
     * @param string|null $timeout
     * @param string|null $patterns
     * @return array
     */
    public function updatePermissions(
        $contentId,
        array $updateRequest,
        $resolve,
        $timeout = null,
        $patterns = null
    )
    {
        return $this->_UpdatePermissions_operation->call([
            'contentId' => $contentId,
            'updateRequest' => $updateRequest,
            'resolve' => $resolve,
            'timeout' => $timeout,
            'patterns' => $patterns
        ]);
    }
    /**
     * Updates metadata layers of a specified content. For file-less contents, the content itself can be updated aswell. See [ShouldUpdateMetadata](https://github.com/Picturepark/Picturepark.SDK.DotNet/blob/master/src/Picturepark.SDK.V1.Tests/Clients/ContentTests.cs) tests.
The operation is executed asynchronous and is not awaited. Call [WaitForCompletion](#operation/BusinessProcess_WaitForCompletion) to wait for the process to finish.
     * @param array $updateRequest
     * @return array
     */
    public function updateMetadataMany(array $updateRequest)
    {
        return $this->_UpdateMetadataMany_operation->call(['updateRequest' => $updateRequest]);
    }
    /**
     * Updates the content permission sets of specified contents. To get a list of available content permission sets, see [Permissions](#operation/Permission_SearchContentPermissions)
The operation is executed asynchronous and is not awaited. Call [WaitForCompletion](#operation/BusinessProcess_WaitForCompletion) to wait for the process to finish.
     * @param array[] $updateRequest
     * @return array
     */
    public function updatePermissionsMany(array $updateRequest)
    {
        return $this->_UpdatePermissionsMany_operation->call(['updateRequest' => $updateRequest]);
    }
    /**
     * Transfer ownership of a content to another user. The user must have the ManageContent UserRight.
     * @param string $contentId
     * @param array $updateRequest
     * @param string|null $timeout
     * @return array
     */
    public function transferOwnership(
        $contentId,
        array $updateRequest,
        $timeout = null
    )
    {
        return $this->_TransferOwnership_operation->call([
            'contentId' => $contentId,
            'updateRequest' => $updateRequest,
            'timeout' => $timeout
        ]);
    }
    /**
     * Transfer ownership of multiple contents to another user. The user must have the ManageContent UserRight.
The operation is executed asynchronous and is not awaited. Call [WaitForCompletion](#operation/BusinessProcess_WaitForCompletion) to wait for the process to finish.
     * @param array $contentsOwnershipTransferRequest
     * @return array
     */
    public function transferOwnershipMany(array $contentsOwnershipTransferRequest)
    {
        return $this->_TransferOwnershipMany_operation->call(['contentsOwnershipTransferRequest' => $contentsOwnershipTransferRequest]);
    }
    /**
     * Updates metadata layers of specified contents. For file-less contents, the content itself can be updated aswell. See [ShouldUpdateMetadataMany](https://github.com/Picturepark/Picturepark.SDK.DotNet/blob/master/src/Picturepark.SDK.V1.Tests/Clients/ContentTests.cs) tests.
The operation is executed asynchronous and is not awaited. Call [WaitForCompletion](#operation/BusinessProcess_WaitForCompletion) to wait for the process to finish.
     * @param array $updateRequest
     * @return array
     */
    public function batchUpdateFieldsByIds(array $updateRequest)
    {
        return $this->_BatchUpdateFieldsByIds_operation->call(['updateRequest' => $updateRequest]);
    }
    /**
     * Updates metadata layers of specified contents. For file-less contents, the content itself can be updated aswell. A filter must be provided to limit the update to specific contents.
The operation is executed asynchronous and is not awaited. Call [WaitForCompletion](#operation/BusinessProcess_WaitForCompletion) to wait for the process to finish.
     * @param array $updateRequest
     * @return array
     */
    public function batchUpdateFieldsByFilter(array $updateRequest)
    {
        return $this->_BatchUpdateFieldsByFilter_operation->call(['updateRequest' => $updateRequest]);
    }
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Get_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_GetMany_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_CreateMany_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Search_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_SearchByChannel_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Aggregate_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_AggregateByChannel_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_CreateDownloadLink_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Download_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_DownloadThumbnail_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Create_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Deactivate_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_DeactivateMany_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Reactivate_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_ReactivateMany_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_UpdateFile_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_UpdateMetadata_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_UpdatePermissions_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_UpdateMetadataMany_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_UpdatePermissionsMany_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_TransferOwnership_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_TransferOwnershipMany_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_BatchUpdateFieldsByIds_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_BatchUpdateFieldsByFilter_operation;
}
