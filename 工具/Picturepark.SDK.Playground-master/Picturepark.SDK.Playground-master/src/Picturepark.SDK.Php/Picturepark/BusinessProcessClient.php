<?php
namespace Picturepark;
final class BusinessProcessClient
{
    /**
     * @param \Microsoft\Rest\ClientInterface $_client
     */
    public function __construct(\Microsoft\Rest\ClientInterface $_client)
    {
        $this->_Search_operation = $_client->createOperation('BusinessProcessClient_Search');
        $this->_Wait_operation = $_client->createOperation('BusinessProcessClient_Wait');
        $this->_WaitForCompletion_operation = $_client->createOperation('BusinessProcessClient_WaitForCompletion');
        $this->_GetDetails_operation = $_client->createOperation('BusinessProcessClient_GetDetails');
    }
    /**
     * Search for business processes
     * @param array $businessProcessSearchRequest
     * @return array
     */
    public function search(array $businessProcessSearchRequest)
    {
        return $this->_Search_operation->call(['businessProcessSearchRequest' => $businessProcessSearchRequest]);
    }
    /**
     * Wait for given process state or lifeCycle. LifeCycles are the same over all business processes. States depend on specific states of the business process.
     * @param string $processId
     * @param string|null $states
     * @param string|null $lifeCycleIds
     * @param string|null $timeout
     * @return array
     */
    public function wait(
        $processId,
        $states = null,
        $lifeCycleIds = null,
        $timeout = null
    )
    {
        return $this->_Wait_operation->call([
            'processId' => $processId,
            'states' => $states,
            'lifeCycleIds' => $lifeCycleIds,
            'timeout' => $timeout
        ]);
    }
    /**
     * Wait for given process to complete with lifeCycle "Succeeded", "Cancelled" or "Failed".
     * @param string $processId
     * @param string|null $timeout
     * @return array
     */
    public function waitForCompletion(
        $processId,
        $timeout = null
    )
    {
        return $this->_WaitForCompletion_operation->call([
            'processId' => $processId,
            'timeout' => $timeout
        ]);
    }
    /**
     * Get details of a given business process.
     * @param string $processId
     * @return array
     */
    public function getDetails($processId)
    {
        return $this->_GetDetails_operation->call(['processId' => $processId]);
    }
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Search_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Wait_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_WaitForCompletion_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_GetDetails_operation;
}
