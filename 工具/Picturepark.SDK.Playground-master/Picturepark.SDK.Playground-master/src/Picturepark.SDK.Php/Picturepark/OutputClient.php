<?php
namespace Picturepark;
final class OutputClient
{
    /**
     * @param \Microsoft\Rest\ClientInterface $_client
     */
    public function __construct(\Microsoft\Rest\ClientInterface $_client)
    {
        $this->_GetByContentIds_operation = $_client->createOperation('OutputClient_GetByContentIds');
        $this->_Get_operation = $_client->createOperation('OutputClient_Get');
    }
    /**
     * Gets output documents related for given content ids
     * @param array $contentsByIdsRequest
     * @return array[]
     */
    public function getByContentIds(array $contentsByIdsRequest)
    {
        return $this->_GetByContentIds_operation->call(['contentsByIdsRequest' => $contentsByIdsRequest]);
    }
    /**
     * Gets a output document by id.
     * @param string $outputId
     * @return array
     */
    public function get($outputId)
    {
        return $this->_Get_operation->call(['outputId' => $outputId]);
    }
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_GetByContentIds_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Get_operation;
}
