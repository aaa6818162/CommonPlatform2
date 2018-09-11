<?php
namespace Picturepark;
final class PermissionClient
{
    /**
     * @param \Microsoft\Rest\ClientInterface $_client
     */
    public function __construct(\Microsoft\Rest\ClientInterface $_client)
    {
        $this->_SearchContentPermissionSets_operation = $_client->createOperation('PermissionClient_SearchContentPermissionSets');
        $this->_GetContentPermissionSet_operation = $_client->createOperation('PermissionClient_GetContentPermissionSet');
        $this->_SearchSchemaPermissionSets_operation = $_client->createOperation('PermissionClient_SearchSchemaPermissionSets');
        $this->_GetSchemaPermissionSet_operation = $_client->createOperation('PermissionClient_GetSchemaPermissionSet');
        $this->_GetUserRights_operation = $_client->createOperation('PermissionClient_GetUserRights');
        $this->_HasUserRight_operation = $_client->createOperation('PermissionClient_HasUserRight');
    }
    /**
     * Searches content permission sets as specified in the search request.
     * @param array $request
     * @return array
     */
    public function searchContentPermissionSets(array $request)
    {
        return $this->_SearchContentPermissionSets_operation->call(['request' => $request]);
    }
    /**
     * Gets the content permission set detail information by the content permission set id.
     * @param string $permissionSetId
     * @return array
     */
    public function getContentPermissionSet($permissionSetId)
    {
        return $this->_GetContentPermissionSet_operation->call(['permissionSetId' => $permissionSetId]);
    }
    /**
     * Searches schema permission sets as specified in the search request.
     * @param array $request
     * @return array
     */
    public function searchSchemaPermissionSets(array $request)
    {
        return $this->_SearchSchemaPermissionSets_operation->call(['request' => $request]);
    }
    /**
     * Gets the schema permission set detail information by the schema permission set id.
     * @param string $permissionSetId
     * @return array
     */
    public function getSchemaPermissionSet($permissionSetId)
    {
        return $this->_GetSchemaPermissionSet_operation->call(['permissionSetId' => $permissionSetId]);
    }
    /**
     * Get all UserRights the current user has
     * @return string[]
     */
    public function getUserRights()
    {
        return $this->_GetUserRights_operation->call([]);
    }
    /**
     * Validates if the User has a given UserRight
     * @param string $userRight
     * @return boolean
     */
    public function hasUserRight($userRight)
    {
        return $this->_HasUserRight_operation->call(['userRight' => $userRight]);
    }
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_SearchContentPermissionSets_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_GetContentPermissionSet_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_SearchSchemaPermissionSets_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_GetSchemaPermissionSet_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_GetUserRights_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_HasUserRight_operation;
}
