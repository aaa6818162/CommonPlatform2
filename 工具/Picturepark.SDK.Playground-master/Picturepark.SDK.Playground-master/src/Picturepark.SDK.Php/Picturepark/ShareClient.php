<?php
namespace Picturepark;
final class ShareClient
{
    /**
     * @param \Microsoft\Rest\ClientInterface $_client
     */
    public function __construct(\Microsoft\Rest\ClientInterface $_client)
    {
        $this->_Get_operation = $_client->createOperation('ShareClient_Get');
        $this->_Update_operation = $_client->createOperation('ShareClient_Update');
        $this->_Search_operation = $_client->createOperation('ShareClient_Search');
        $this->_Aggregate_operation = $_client->createOperation('ShareClient_Aggregate');
        $this->_Create_operation = $_client->createOperation('ShareClient_Create');
        $this->_DeleteMany_operation = $_client->createOperation('ShareClient_DeleteMany');
    }
    /**
     * Get share by id (basic or embed)
     * @param string $id
     * @return array
     */
    public function get($id)
    {
        return $this->_Get_operation->call(['id' => $id]);
    }
    /**
     * Updates a single share.
     * @param string $id
     * @param array $updateRequest
     * @return array
     */
    public function update(
        $id,
        array $updateRequest
    )
    {
        return $this->_Update_operation->call([
            'id' => $id,
            'updateRequest' => $updateRequest
        ]);
    }
    /**
     * Search own shares
     * @param array $request
     * @return array
     */
    public function search(array $request)
    {
        return $this->_Search_operation->call(['request' => $request]);
    }
    /**
     * Aggregates own shares
     * @param array $request
     * @return array
     */
    public function aggregate(array $request)
    {
        return $this->_Aggregate_operation->call(['request' => $request]);
    }
    /**
     * Create a new share (basic or embed).
     * @param array $request
     * @return array
     */
    public function create(array $request)
    {
        return $this->_Create_operation->call(['request' => $request]);
    }
    /**
     * Deletes multiple shares. Returnes a bulk reponse with information about successful and failed rows.
     * @param string $ids
     * @return array
     */
    public function deleteMany($ids)
    {
        return $this->_DeleteMany_operation->call(['ids' => $ids]);
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
    private $_DeleteMany_operation;
}
