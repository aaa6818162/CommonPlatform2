<?php
namespace Picturepark;
final class ProfileClient
{
    /**
     * @param \Microsoft\Rest\ClientInterface $_client
     */
    public function __construct(\Microsoft\Rest\ClientInterface $_client)
    {
        $this->_Get_operation = $_client->createOperation('ProfileClient_Get');
        $this->_Update_operation = $_client->createOperation('ProfileClient_Update');
    }
    /**
     * Get profile of currently logged in user
     * @return array
     */
    public function get()
    {
        return $this->_Get_operation->call([]);
    }
    /**
     * Updates profile of currently logged in user
     * @param array $profile
     * @return array
     */
    public function update(array $profile)
    {
        return $this->_Update_operation->call(['profile' => $profile]);
    }
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Get_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Update_operation;
}
