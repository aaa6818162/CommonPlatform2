<?php
namespace Picturepark;
final class UserClient
{
    /**
     * @param \Microsoft\Rest\ClientInterface $_client
     */
    public function __construct(\Microsoft\Rest\ClientInterface $_client)
    {
        $this->_Get_operation = $_client->createOperation('UserClient_Get');
        $this->_Search_operation = $_client->createOperation('UserClient_Search');
        $this->_GetByOwnerToken_operation = $_client->createOperation('UserClient_GetByOwnerToken');
        $this->_GetChannels_operation = $_client->createOperation('UserClient_GetChannels');
    }
    /**
     * @param string $userId
     * @return array
     */
    public function get($userId)
    {
        return $this->_Get_operation->call(['userId' => $userId]);
    }
    /**
     * @param array $searchRequest
     * @return array
     */
    public function search(array $searchRequest)
    {
        return $this->_Search_operation->call(['searchRequest' => $searchRequest]);
    }
    /**
     * @param string $tokenId
     * @return array
     */
    public function getByOwnerToken($tokenId)
    {
        return $this->_GetByOwnerToken_operation->call(['tokenId' => $tokenId]);
    }
    /**
     * @return array[]
     */
    public function getChannels()
    {
        return $this->_GetChannels_operation->call([]);
    }
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Get_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Search_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_GetByOwnerToken_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_GetChannels_operation;
}
