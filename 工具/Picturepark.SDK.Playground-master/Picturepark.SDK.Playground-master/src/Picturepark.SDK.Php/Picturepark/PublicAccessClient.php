<?php
namespace Picturepark;
final class PublicAccessClient
{
    /**
     * @param \Microsoft\Rest\ClientInterface $_client
     */
    public function __construct(\Microsoft\Rest\ClientInterface $_client)
    {
        $this->_GetVersion_operation = $_client->createOperation('PublicAccessClient_GetVersion');
        $this->_GetShare_operation = $_client->createOperation('PublicAccessClient_GetShare');
    }
    /**
     * @return array
     */
    public function getVersion()
    {
        return $this->_GetVersion_operation->call([]);
    }
    /**
     * @param string $token
     * @return array
     */
    public function getShare($token)
    {
        return $this->_GetShare_operation->call(['token' => $token]);
    }
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_GetVersion_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_GetShare_operation;
}
