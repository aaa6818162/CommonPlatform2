<?php
namespace Picturepark;
final class JsonSchemaClient
{
    /**
     * @param \Microsoft\Rest\ClientInterface $_client
     */
    public function __construct(\Microsoft\Rest\ClientInterface $_client)
    {
        $this->_Get_operation = $_client->createOperation('JsonSchemaClient_Get');
    }
    /**
     * Get the json schema schematics for the provided schema.
     * @param string $schemaId
     * @return array
     */
    public function get($schemaId)
    {
        return $this->_Get_operation->call(['schemaId' => $schemaId]);
    }
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Get_operation;
}
