<?php
namespace Picturepark;
final class LiveStreamClient
{
    /**
     * @param \Microsoft\Rest\ClientInterface $_client
     */
    public function __construct(\Microsoft\Rest\ClientInterface $_client)
    {
        $this->_Search_operation = $_client->createOperation('LiveStreamClient_Search');
    }
    /**
     * @param array $liveStreamSearchRequest
     * @return array
     */
    public function search(array $liveStreamSearchRequest)
    {
        return $this->_Search_operation->call(['liveStreamSearchRequest' => $liveStreamSearchRequest]);
    }
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Search_operation;
}
