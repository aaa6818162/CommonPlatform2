<?php
namespace Picturepark;
final class SchemaClient
{
    /**
     * @param \Microsoft\Rest\ClientInterface $_client
     */
    public function __construct(\Microsoft\Rest\ClientInterface $_client)
    {
        $this->_Get_operation = $_client->createOperation('SchemaClient_Get');
        $this->_Update_operation = $_client->createOperation('SchemaClient_Update');
        $this->_Delete_operation = $_client->createOperation('SchemaClient_Delete');
        $this->_GetMany_operation = $_client->createOperation('SchemaClient_GetMany');
        $this->_Create_operation = $_client->createOperation('SchemaClient_Create');
        $this->_Search_operation = $_client->createOperation('SchemaClient_Search');
        $this->_Exists_operation = $_client->createOperation('SchemaClient_Exists');
    }
    /**
     * Gets the schema detail information by the schema id.
     * @param string $schemaId
     * @return array
     */
    public function get($schemaId)
    {
        return $this->_Get_operation->call(['schemaId' => $schemaId]);
    }
    /**
     * Updates an existing schema.
The operation is executed asynchronous and is not awaited. Call [WaitForCompletion](#operation/BusinessProcess_WaitForCompletion) to wait for the process to finish.
     * @param string $schemaId
     * @param array $schema
     * @return array
     */
    public function update(
        $schemaId,
        array $schema
    )
    {
        return $this->_Update_operation->call([
            'schemaId' => $schemaId,
            'schema' => $schema
        ]);
    }
    /**
     * Delete a single schemas.
The operation is executed asynchronous and is not awaited. Call [WaitForCompletion](#operation/BusinessProcess_WaitForCompletion) to wait for the process to finish.
     * @param string $schemaId
     * @return array
     */
    public function delete($schemaId)
    {
        return $this->_Delete_operation->call(['schemaId' => $schemaId]);
    }
    /**
     * Gets the schema detail informations by given schema ids.
     * @param string|null $ids
     * @return array[]
     */
    public function getMany($ids = null)
    {
        return $this->_GetMany_operation->call(['ids' => $ids]);
    }
    /**
     * Create a new schema.
The operation is executed asynchronous and is not awaited. Call [WaitForCompletion](#operation/BusinessProcess_WaitForCompletion) to wait for the process to finish.
     * @param array $schema
     * @return array
     */
    public function create(array $schema)
    {
        return $this->_Create_operation->call(['schema' => $schema]);
    }
    /**
     * Searches schemas as specified in the search request.
     * @param array $schemaSearchRequest
     * @return array
     */
    public function search(array $schemaSearchRequest)
    {
        return $this->_Search_operation->call(['schemaSearchRequest' => $schemaSearchRequest]);
    }
    /**
     * Checks if the schema and optionally the schema's field already exists within this schema.
     * @param string $schemaId
     * @param string|null $fieldId
     * @return array
     */
    public function exists(
        $schemaId,
        $fieldId = null
    )
    {
        return $this->_Exists_operation->call([
            'schemaId' => $schemaId,
            'fieldId' => $fieldId
        ]);
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
    private $_Delete_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_GetMany_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Create_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Search_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Exists_operation;
}
