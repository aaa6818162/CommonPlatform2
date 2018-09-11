<?php
namespace Picturepark;
final class ListItemClient
{
    /**
     * @param \Microsoft\Rest\ClientInterface $_client
     */
    public function __construct(\Microsoft\Rest\ClientInterface $_client)
    {
        $this->_Get_operation = $_client->createOperation('ListItemClient_Get');
        $this->_Update_operation = $_client->createOperation('ListItemClient_Update');
        $this->_Search_operation = $_client->createOperation('ListItemClient_Search');
        $this->_Aggregate_operation = $_client->createOperation('ListItemClient_Aggregate');
        $this->_Create_operation = $_client->createOperation('ListItemClient_Create');
        $this->_CreateMany_operation = $_client->createOperation('ListItemClient_CreateMany');
        $this->_UpdateMany_operation = $_client->createOperation('ListItemClient_UpdateMany');
        $this->_Deactivate_operation = $_client->createOperation('ListItemClient_Deactivate');
        $this->_DeactivateMany_operation = $_client->createOperation('ListItemClient_DeactivateMany');
        $this->_Reactivate_operation = $_client->createOperation('ListItemClient_Reactivate');
        $this->_ReactivateMany_operation = $_client->createOperation('ListItemClient_ReactivateMany');
        $this->_BatchUpdateFieldsByIds_operation = $_client->createOperation('ListItemClient_BatchUpdateFieldsByIds');
        $this->_BatchUpdateFieldsByFilter_operation = $_client->createOperation('ListItemClient_BatchUpdateFieldsByFilter');
        $this->_GetReferencesToListItem_operation = $_client->createOperation('ListItemClient_GetReferencesToListItem');
        $this->_GetReferencesToListItems_operation = $_client->createOperation('ListItemClient_GetReferencesToListItems');
    }
    /**
     * @param string $listItemId
     * @param string $resolve
     * @param string|null $patterns
     * @return array
     */
    public function get(
        $listItemId,
        $resolve,
        $patterns = null
    )
    {
        return $this->_Get_operation->call([
            'listItemId' => $listItemId,
            'resolve' => $resolve,
            'patterns' => $patterns
        ]);
    }
    /**
     * Updates a single list item
     * @param string $listItemId
     * @param array $updateRequest
     * @param string $resolve
     * @param string|null $allowMissingDependencies
     * @param string|null $timeout
     * @param string|null $patterns
     * @return array
     */
    public function update(
        $listItemId,
        array $updateRequest,
        $resolve,
        $allowMissingDependencies = null,
        $timeout = null,
        $patterns = null
    )
    {
        return $this->_Update_operation->call([
            'listItemId' => $listItemId,
            'updateRequest' => $updateRequest,
            'resolve' => $resolve,
            'allowMissingDependencies' => $allowMissingDependencies,
            'timeout' => $timeout,
            'patterns' => $patterns
        ]);
    }
    /**
     * Searches list items as specified in the search request.
     * @param array $listItemSearchRequest
     * @return array
     */
    public function search(array $listItemSearchRequest)
    {
        return $this->_Search_operation->call(['listItemSearchRequest' => $listItemSearchRequest]);
    }
    /**
     * Aggregates list items as specified in the aggregation request.
     * @param array $listItemAggregationRequest
     * @return array
     */
    public function aggregate(array $listItemAggregationRequest)
    {
        return $this->_Aggregate_operation->call(['listItemAggregationRequest' => $listItemAggregationRequest]);
    }
    /**
     * Create a single list item.
     * @param array $listItemCreateRequest
     * @param string $resolve
     * @param string|null $allowMissingDependencies
     * @param string|null $timeout
     * @param string|null $patterns
     * @return array
     */
    public function create(
        array $listItemCreateRequest,
        $resolve,
        $allowMissingDependencies = null,
        $timeout = null,
        $patterns = null
    )
    {
        return $this->_Create_operation->call([
            'listItemCreateRequest' => $listItemCreateRequest,
            'resolve' => $resolve,
            'allowMissingDependencies' => $allowMissingDependencies,
            'timeout' => $timeout,
            'patterns' => $patterns
        ]);
    }
    /**
     * Create multiple list items.
The operation is executed asynchronous and is not awaited. Call [WaitForCompletion](#operation/BusinessProcess_WaitForCompletion) to wait for the process to finish.
     * @param array $listItemCreateManyRequest
     * @return array
     */
    public function createMany(array $listItemCreateManyRequest)
    {
        return $this->_CreateMany_operation->call(['listItemCreateManyRequest' => $listItemCreateManyRequest]);
    }
    /**
     * Updates multiple list items.
The operation is executed asynchronous and is not awaited. Call [WaitForCompletion](#operation/BusinessProcess_WaitForCompletion) to wait for the process to finish.
     * @param array $listItemUpdateManyRequest
     * @return array
     */
    public function updateMany(array $listItemUpdateManyRequest)
    {
        return $this->_UpdateMany_operation->call(['listItemUpdateManyRequest' => $listItemUpdateManyRequest]);
    }
    /**
     * Deactivates a single listitem. The lifecycle is changed to Inactive. After a customer instance specified time (default 30 days), the list item and all files will be deleted.
     * @param string $listItemId
     * @param string $timeout
     * @param string|null $forceReferenceRemoval
     * @return array
     */
    public function deactivate(
        $listItemId,
        $timeout,
        $forceReferenceRemoval = null
    )
    {
        return $this->_Deactivate_operation->call([
            'listItemId' => $listItemId,
            'timeout' => $timeout,
            'forceReferenceRemoval' => $forceReferenceRemoval
        ]);
    }
    /**
     * Deactivates multiple list items. The lifecycle is changed to Inactive. After a customer instance specified time (default 30 days), the list item and all files will be deleted.
The operation is executed asynchronous and is not awaited. Call [WaitForCompletion](#operation/BusinessProcess_WaitForCompletion) to wait for the process to finish.
     * @param array $deactivateRequest
     * @return array
     */
    public function deactivateMany(array $deactivateRequest)
    {
        return $this->_DeactivateMany_operation->call(['deactivateRequest' => $deactivateRequest]);
    }
    /**
     * Reactivate a previously deactivated list item.
     * @param string $listItemId
     * @param string|null $timeout
     * @param string|null $patterns
     * @param string|null $allowMissingDependencies
     * @return array
     */
    public function reactivate(
        $listItemId,
        $timeout = null,
        $patterns = null,
        $allowMissingDependencies = null
    )
    {
        return $this->_Reactivate_operation->call([
            'listItemId' => $listItemId,
            'timeout' => $timeout,
            'patterns' => $patterns,
            'allowMissingDependencies' => $allowMissingDependencies
        ]);
    }
    /**
     * Reactivate previously deactivated list items.
The operation is executed asynchronous and is not awaited. Call [WaitForCompletion](#operation/BusinessProcess_WaitForCompletion) to wait for the process to finish.
     * @param array $reactivateRequest
     * @return array
     */
    public function reactivateMany(array $reactivateRequest)
    {
        return $this->_ReactivateMany_operation->call(['reactivateRequest' => $reactivateRequest]);
    }
    /**
     * Update fields of multiple list items. A list of listItemIds must be provided to limit the update to specific list items.
The operation is executed asynchronous and is not awaited. Call [WaitForCompletion](#operation/BusinessProcess_WaitForCompletion) to wait for the process to finish.
     * @param array $updateRequest
     * @return array
     */
    public function batchUpdateFieldsByIds(array $updateRequest)
    {
        return $this->_BatchUpdateFieldsByIds_operation->call(['updateRequest' => $updateRequest]);
    }
    /**
     * Update fields of multiple list items. A filter must be provided to limit the update to specific list items.
The operation is executed asynchronous and is not awaited. Call [WaitForCompletion](#operation/BusinessProcess_WaitForCompletion) to wait for the process to finish.
     * @param array $updateRequest
     * @return array
     */
    public function batchUpdateFieldsByFilter(array $updateRequest)
    {
        return $this->_BatchUpdateFieldsByFilter_operation->call(['updateRequest' => $updateRequest]);
    }
    /**
     * @param string $listItemId
     * @return array
     */
    public function getReferencesToListItem($listItemId)
    {
        return $this->_GetReferencesToListItem_operation->call(['listItemId' => $listItemId]);
    }
    /**
     * @param string $ids
     * @return array[]
     */
    public function getReferencesToListItems($ids)
    {
        return $this->_GetReferencesToListItems_operation->call(['ids' => $ids]);
    }
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Get_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Update_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Search_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Aggregate_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Create_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_CreateMany_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_UpdateMany_operation;
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
    private $_BatchUpdateFieldsByIds_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_BatchUpdateFieldsByFilter_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_GetReferencesToListItem_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_GetReferencesToListItems_operation;
}
