<?php
namespace Picturepark;
final class DocumentHistoryClient
{
    /**
     * @param \Microsoft\Rest\ClientInterface $_client
     */
    public function __construct(\Microsoft\Rest\ClientInterface $_client)
    {
        $this->_Search_operation = $_client->createOperation('DocumentHistoryClient_Search');
        $this->_Get_operation = $_client->createOperation('DocumentHistoryClient_Get');
        $this->_GetVersion_operation = $_client->createOperation('DocumentHistoryClient_GetVersion');
        $this->_GetDifferenceLatest_operation = $_client->createOperation('DocumentHistoryClient_GetDifferenceLatest');
        $this->_GetDifference_operation = $_client->createOperation('DocumentHistoryClient_GetDifference');
    }
    /**
     * Search the document history.
     * @param array $documentHistorySearchRequest
     * @return array
     */
    public function search(array $documentHistorySearchRequest)
    {
        return $this->_Search_operation->call(['documentHistorySearchRequest' => $documentHistorySearchRequest]);
    }
    /**
     * Gets the latest version of a document.
     * @param string $id
     * @return array
     */
    public function get($id)
    {
        return $this->_Get_operation->call(['id' => $id]);
    }
    /**
     * Gets the latest version of a document by specifiying a specific document version.
     * @param string $id
     * @param string $version
     * @return array
     */
    public function getVersion(
        $id,
        $version
    )
    {
        return $this->_GetVersion_operation->call([
            'id' => $id,
            'version' => $version
        ]);
    }
    /**
     * Gets the difference on a document by comparing the provided version against the latest versions
     * @param string $id
     * @param string $oldVersion
     * @return array
     */
    public function getDifferenceLatest(
        $id,
        $oldVersion
    )
    {
        return $this->_GetDifferenceLatest_operation->call([
            'id' => $id,
            'oldVersion' => $oldVersion
        ]);
    }
    /**
     * Gets the difference on a document by comparing two document versions
     * @param string $id
     * @param string $oldVersion
     * @param string $newVersion
     * @return array
     */
    public function getDifference(
        $id,
        $oldVersion,
        $newVersion
    )
    {
        return $this->_GetDifference_operation->call([
            'id' => $id,
            'oldVersion' => $oldVersion,
            'newVersion' => $newVersion
        ]);
    }
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Search_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Get_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_GetVersion_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_GetDifferenceLatest_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_GetDifference_operation;
}
