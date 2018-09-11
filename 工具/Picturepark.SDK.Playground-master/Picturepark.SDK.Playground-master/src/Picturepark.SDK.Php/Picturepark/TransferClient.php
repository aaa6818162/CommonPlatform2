<?php
namespace Picturepark;
final class TransferClient
{
    /**
     * @param \Microsoft\Rest\ClientInterface $_client
     */
    public function __construct(\Microsoft\Rest\ClientInterface $_client)
    {
        $this->_Get_operation = $_client->createOperation('TransferClient_Get');
        $this->_Delete_operation = $_client->createOperation('TransferClient_Delete');
        $this->_Search_operation = $_client->createOperation('TransferClient_Search');
        $this->_CancelTransfer_operation = $_client->createOperation('TransferClient_CancelTransfer');
        $this->_Create_operation = $_client->createOperation('TransferClient_Create');
        $this->_GetFile_operation = $_client->createOperation('TransferClient_GetFile');
        $this->_SearchFiles_operation = $_client->createOperation('TransferClient_SearchFiles');
        $this->_GetBlacklist_operation = $_client->createOperation('TransferClient_GetBlacklist');
        $this->_DeleteFiles_operation = $_client->createOperation('TransferClient_DeleteFiles');
        $this->_ImportTransfer_operation = $_client->createOperation('TransferClient_ImportTransfer');
        $this->_PartialImport_operation = $_client->createOperation('TransferClient_PartialImport');
        $this->_UploadFile_operation = $_client->createOperation('TransferClient_UploadFile');
    }
    /**
     * @param string $transferId
     * @return array
     */
    public function get($transferId)
    {
        return $this->_Get_operation->call(['transferId' => $transferId]);
    }
    /**
     * @param string $transferId
     */
    public function delete($transferId)
    {
        return $this->_Delete_operation->call(['transferId' => $transferId]);
    }
    /**
     * @param array $request
     * @return array
     */
    public function search(array $request)
    {
        return $this->_Search_operation->call(['request' => $request]);
    }
    /**
     * @param string $transferId
     */
    public function cancelTransfer($transferId)
    {
        return $this->_CancelTransfer_operation->call(['transferId' => $transferId]);
    }
    /**
     * @param array $request
     * @return array
     */
    public function create(array $request)
    {
        return $this->_Create_operation->call(['request' => $request]);
    }
    /**
     * @param string $fileTransferId
     * @return array
     */
    public function getFile($fileTransferId)
    {
        return $this->_GetFile_operation->call(['fileTransferId' => $fileTransferId]);
    }
    /**
     * @param array $request
     * @return array
     */
    public function searchFiles(array $request)
    {
        return $this->_SearchFiles_operation->call(['request' => $request]);
    }
    /**
     * @return array
     */
    public function getBlacklist()
    {
        return $this->_GetBlacklist_operation->call([]);
    }
    /**
     * @param array $request
     */
    public function deleteFiles(array $request)
    {
        return $this->_DeleteFiles_operation->call(['request' => $request]);
    }
    /**
     * @param string $transferId
     * @param array $request
     * @return array
     */
    public function importTransfer(
        $transferId,
        array $request
    )
    {
        return $this->_ImportTransfer_operation->call([
            'transferId' => $transferId,
            'request' => $request
        ]);
    }
    /**
     * @param string $transferId
     * @param array $request
     * @return array
     */
    public function partialImport(
        $transferId,
        array $request
    )
    {
        return $this->_PartialImport_operation->call([
            'transferId' => $transferId,
            'request' => $request
        ]);
    }
    /**
     * @param string|null $formFile
     * @param string|null $relativePath
     * @param string|null $chunkNumber
     * @param string|null $currentChunkSize
     * @param string|null $totalSize
     * @param string|null $totalChunks
     * @param string $transferId
     * @param string $identifier
     */
    public function uploadFile(
        $formFile = null,
        $relativePath = null,
        $chunkNumber = null,
        $currentChunkSize = null,
        $totalSize = null,
        $totalChunks = null,
        $transferId,
        $identifier
    )
    {
        return $this->_UploadFile_operation->call([
            'formFile' => $formFile,
            'relativePath' => $relativePath,
            'chunkNumber' => $chunkNumber,
            'currentChunkSize' => $currentChunkSize,
            'totalSize' => $totalSize,
            'totalChunks' => $totalChunks,
            'transferId' => $transferId,
            'identifier' => $identifier
        ]);
    }
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Get_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Delete_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Search_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_CancelTransfer_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_Create_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_GetFile_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_SearchFiles_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_GetBlacklist_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_DeleteFiles_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_ImportTransfer_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_PartialImport_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_UploadFile_operation;
}
