<?php
namespace Picturepark;
final class WebAPISwaggerspecification
{
    /**
     * @param \Microsoft\Rest\RunTimeInterface $_runTime
     * @param string $subscriptionId
     */
    public function __construct(
        \Microsoft\Rest\RunTimeInterface $_runTime,
        $subscriptionId
    )
    {
        $_client = $_runTime->createClientFromData(
            self::_SWAGGER_OBJECT_DATA,
            ['subscriptionId' => $subscriptionId]
        );
        $this->_ContentClient_group = new \Picturepark\ContentClient($_client);
        $this->_BusinessProcessClient_group = new \Picturepark\BusinessProcessClient($_client);
        $this->_DocumentHistoryClient_group = new \Picturepark\DocumentHistoryClient($_client);
        $this->_JsonSchemaClient_group = new \Picturepark\JsonSchemaClient($_client);
        $this->_ListItemClient_group = new \Picturepark\ListItemClient($_client);
        $this->_LiveStreamClient_group = new \Picturepark\LiveStreamClient($_client);
        $this->_SchemaClient_group = new \Picturepark\SchemaClient($_client);
        $this->_PermissionClient_group = new \Picturepark\PermissionClient($_client);
        $this->_PublicAccessClient_group = new \Picturepark\PublicAccessClient($_client);
        $this->_ShareClient_group = new \Picturepark\ShareClient($_client);
        $this->_ServiceProviderClient_group = new \Picturepark\ServiceProviderClient($_client);
        $this->_TransferClient_group = new \Picturepark\TransferClient($_client);
        $this->_UserClient_group = new \Picturepark\UserClient($_client);
        $this->_OutputClient_group = new \Picturepark\OutputClient($_client);
        $this->_ProfileClient_group = new \Picturepark\ProfileClient($_client);
    }
    /**
     * @return \Picturepark\ContentClient
     */
    public function getContentClient()
    {
        return $this->_ContentClient_group;
    }
    /**
     * @return \Picturepark\BusinessProcessClient
     */
    public function getBusinessProcessClient()
    {
        return $this->_BusinessProcessClient_group;
    }
    /**
     * @return \Picturepark\DocumentHistoryClient
     */
    public function getDocumentHistoryClient()
    {
        return $this->_DocumentHistoryClient_group;
    }
    /**
     * @return \Picturepark\JsonSchemaClient
     */
    public function getJsonSchemaClient()
    {
        return $this->_JsonSchemaClient_group;
    }
    /**
     * @return \Picturepark\ListItemClient
     */
    public function getListItemClient()
    {
        return $this->_ListItemClient_group;
    }
    /**
     * @return \Picturepark\LiveStreamClient
     */
    public function getLiveStreamClient()
    {
        return $this->_LiveStreamClient_group;
    }
    /**
     * @return \Picturepark\SchemaClient
     */
    public function getSchemaClient()
    {
        return $this->_SchemaClient_group;
    }
    /**
     * @return \Picturepark\PermissionClient
     */
    public function getPermissionClient()
    {
        return $this->_PermissionClient_group;
    }
    /**
     * @return \Picturepark\PublicAccessClient
     */
    public function getPublicAccessClient()
    {
        return $this->_PublicAccessClient_group;
    }
    /**
     * @return \Picturepark\ShareClient
     */
    public function getShareClient()
    {
        return $this->_ShareClient_group;
    }
    /**
     * @return \Picturepark\ServiceProviderClient
     */
    public function getServiceProviderClient()
    {
        return $this->_ServiceProviderClient_group;
    }
    /**
     * @return \Picturepark\TransferClient
     */
    public function getTransferClient()
    {
        return $this->_TransferClient_group;
    }
    /**
     * @return \Picturepark\UserClient
     */
    public function getUserClient()
    {
        return $this->_UserClient_group;
    }
    /**
     * @return \Picturepark\OutputClient
     */
    public function getOutputClient()
    {
        return $this->_OutputClient_group;
    }
    /**
     * @return \Picturepark\ProfileClient
     */
    public function getProfileClient()
    {
        return $this->_ProfileClient_group;
    }
    /**
     * @var \Picturepark\ContentClient
     */
    private $_ContentClient_group;
    /**
     * @var \Picturepark\BusinessProcessClient
     */
    private $_BusinessProcessClient_group;
    /**
     * @var \Picturepark\DocumentHistoryClient
     */
    private $_DocumentHistoryClient_group;
    /**
     * @var \Picturepark\JsonSchemaClient
     */
    private $_JsonSchemaClient_group;
    /**
     * @var \Picturepark\ListItemClient
     */
    private $_ListItemClient_group;
    /**
     * @var \Picturepark\LiveStreamClient
     */
    private $_LiveStreamClient_group;
    /**
     * @var \Picturepark\SchemaClient
     */
    private $_SchemaClient_group;
    /**
     * @var \Picturepark\PermissionClient
     */
    private $_PermissionClient_group;
    /**
     * @var \Picturepark\PublicAccessClient
     */
    private $_PublicAccessClient_group;
    /**
     * @var \Picturepark\ShareClient
     */
    private $_ShareClient_group;
    /**
     * @var \Picturepark\ServiceProviderClient
     */
    private $_ServiceProviderClient_group;
    /**
     * @var \Picturepark\TransferClient
     */
    private $_TransferClient_group;
    /**
     * @var \Picturepark\UserClient
     */
    private $_UserClient_group;
    /**
     * @var \Picturepark\OutputClient
     */
    private $_OutputClient_group;
    /**
     * @var \Picturepark\ProfileClient
     */
    private $_ProfileClient_group;
    const _SWAGGER_OBJECT_DATA = [
        'host' => 'localhost',
        'paths' => [
            '/V1/Contents/{ContentId}/Ownership/Transfer' => ['put' => [
                'operationId' => 'ContentClient_UpdateTransferOwnership',
                'parameters' => [
                    [
                        'name' => 'ContentId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'updateRequest',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/ContentOwnershipTransferRequest']
                    ],
                    [
                        'name' => 'timeout',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ContentDetail']]]
            ]],
            '/V1/Contents/Many' => ['get' => [
                'operationId' => 'ContentClient_GetMany',
                'parameters' => [
                    [
                        'name' => 'ids',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    [
                        'name' => 'resolve',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'boolean'
                    ],
                    [
                        'name' => 'patterns',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'responses' => ['200' => ['schema' => [
                    'type' => 'array',
                    'items' => ['$ref' => '#/definitions/ContentDetail']
                ]]]
            ]],
            '/V1/Contents/Many/Ownership/Transfer' => ['post' => [
                'operationId' => 'ContentClient_TransferOwnershipMany',
                'parameters' => [[
                    'name' => 'contentsOwnershipTransferRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ContentsOwnershipTransferRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/V1/Contents/Aggregate' => ['post' => [
                'operationId' => 'ContentClient_Aggregate',
                'parameters' => [[
                    'name' => 'contentAggregationRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ContentAggregationRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ObjectAggregationResult']]]
            ]],
            '/V1/Contents/{ChannelId}/Aggregate' => ['post' => [
                'operationId' => 'ContentClient_AggregateByChannel',
                'parameters' => [
                    [
                        'name' => 'ChannelId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'contentAggregationRequest',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/ContentAggregationRequest']
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ObjectAggregationResult']]]
            ]],
            '/V1/Contents/CreateBatchContentDownload' => ['post' => [
                'operationId' => 'ContentClient_CreateDownloadLink',
                'parameters' => [[
                    'name' => 'request',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ContentBatchDownloadRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ContentBatchDownloadItem']]]
            ]],
            '/V1/Contents' => ['post' => [
                'operationId' => 'ContentClient_CreateContent',
                'parameters' => [
                    [
                        'name' => 'createRequest',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/CreateContentRequest']
                    ],
                    [
                        'name' => 'resolve',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'boolean'
                    ],
                    [
                        'name' => 'timeout',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    [
                        'name' => 'patterns',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ContentDetail']]]
            ]],
            '/V1/Contents/Downloads/{ContentId}/{OutputFormatId}' => ['get' => [
                'operationId' => 'ContentClient_Download',
                'parameters' => [
                    [
                        'name' => 'ContentId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'OutputFormatId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'Range',
                        'in' => 'header',
                        'required' => FALSE,
                        'type' => 'string'
                    ]
                ],
                'responses' => [
                    '200' => ['schema' => ['type' => 'file']],
                    '206' => ['schema' => ['type' => 'file']]
                ]
            ]],
            '/V1/Contents/Thumbnails/{ContentId}/{Size}' => ['get' => [
                'operationId' => 'ContentClient_DownloadThumbnail',
                'parameters' => [
                    [
                        'name' => 'ContentId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'Size',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['type' => 'file']]]
            ]],
            '/V1/Contents/Downloads/{ContentId}/{OutputFormatId}/{Width}/{Height}' => ['get' => [
                'operationId' => 'ContentClient_DownloadResized',
                'parameters' => [
                    [
                        'name' => 'ContentId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'OutputFormatId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'Width',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    [
                        'name' => 'Height',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['type' => 'file']]]
            ]],
            '/V1/Contents/{ContentId}' => [
                'get' => [
                    'operationId' => 'ContentClient_Get',
                    'parameters' => [
                        [
                            'name' => 'ContentId',
                            'in' => 'path',
                            'required' => TRUE,
                            'type' => 'string'
                        ],
                        [
                            'name' => 'resolve',
                            'in' => 'query',
                            'required' => TRUE,
                            'type' => 'boolean'
                        ],
                        [
                            'name' => 'patterns',
                            'in' => 'query',
                            'required' => FALSE,
                            'type' => 'array',
                            'items' => ['type' => 'string']
                        ]
                    ],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ContentDetail']]]
                ],
                'put' => [
                    'operationId' => 'ContentClient_UpdateMetadata',
                    'parameters' => [
                        [
                            'name' => 'ContentId',
                            'in' => 'path',
                            'required' => TRUE,
                            'type' => 'string'
                        ],
                        [
                            'name' => 'updateRequest',
                            'in' => 'body',
                            'required' => TRUE,
                            'schema' => ['$ref' => '#/definitions/UpdateContentMetadataRequest']
                        ],
                        [
                            'name' => 'resolve',
                            'in' => 'query',
                            'required' => TRUE,
                            'type' => 'boolean'
                        ],
                        [
                            'name' => 'timeout',
                            'in' => 'query',
                            'required' => FALSE,
                            'type' => 'integer',
                            'format' => 'int32'
                        ],
                        [
                            'name' => 'patterns',
                            'in' => 'query',
                            'required' => FALSE,
                            'type' => 'array',
                            'items' => ['type' => 'string']
                        ]
                    ],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ContentDetail']]]
                ]
            ],
            '/V1/Contents/{ContentId}/Permissions' => ['put' => [
                'operationId' => 'ContentClient_UpdatePermissions',
                'parameters' => [
                    [
                        'name' => 'ContentId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'updateRequest',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/UpdateContentPermissionsRequest']
                    ],
                    [
                        'name' => 'resolve',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'boolean'
                    ],
                    [
                        'name' => 'timeout',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    [
                        'name' => 'patterns',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ContentDetail']]]
            ]],
            '/V1/Contents/Search' => ['post' => [
                'operationId' => 'ContentClient_Search',
                'parameters' => [[
                    'name' => 'contentSearchRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ContentSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ContentSearchResult']]]
            ]],
            '/V1/Contents/{ChannelId}/Search' => ['post' => [
                'operationId' => 'ContentClient_SearchByChannel',
                'parameters' => [
                    [
                        'name' => 'ChannelId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'contentSearchRequest',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/ContentSearchRequest']
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ContentSearchResult']]]
            ]],
            '/V1/Contents/{ContentId}/Deactivate' => ['put' => [
                'operationId' => 'ContentClient_Deactivate',
                'parameters' => [
                    [
                        'name' => 'ContentId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'timeout',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'responses' => ['200' => []]
            ]],
            '/V1/Contents/{ContentId}/File' => ['put' => [
                'operationId' => 'ContentClient_UpdateFile',
                'parameters' => [
                    [
                        'name' => 'ContentId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'updateRequest',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/ContentFileUpdateRequest']
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/V1/Contents/{ContentId}/Reactivate' => ['put' => [
                'operationId' => 'ContentClient_Reactivate',
                'parameters' => [
                    [
                        'name' => 'ContentId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'resolve',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'boolean'
                    ],
                    [
                        'name' => 'timeout',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    [
                        'name' => 'patterns',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ContentDetail']]]
            ]],
            '/V1/Contents/Many/Deactivate' => ['post' => [
                'operationId' => 'ContentClient_DeactivateMany',
                'parameters' => [[
                    'name' => 'deactivationRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ContentDeactivationRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/V1/Contents/Many/Reactivate' => ['post' => [
                'operationId' => 'ContentClient_ReactivateMany',
                'parameters' => [[
                    'name' => 'reactivationRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ContentReactivationRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/V1/Contents/Many/Metadata' => ['put' => [
                'operationId' => 'ContentClient_UpdateMetadataMany',
                'parameters' => [[
                    'name' => 'updateRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ContentsMetadataUpdateRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/V1/Contents/Many/Metadata/Filter' => ['put' => [
                'operationId' => 'ContentClient_UpdateMetadataByFilter',
                'parameters' => [[
                    'name' => 'updateRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/FilterContentsMetadataUpdateRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/V1/Contents/Many/Permissions' => ['put' => [
                'operationId' => 'ContentClient_UpdatePermissionsMany',
                'parameters' => [[
                    'name' => 'updateRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/UpdateContentPermissionsRequest']
                    ]
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/v1/businessProcesses/search' => ['post' => [
                'operationId' => 'BusinessProcessClient_Search',
                'parameters' => [[
                    'name' => 'businessProcessSearchRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/BusinessProcessSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcessSearchResult']]]
            ]],
            '/v1/businessProcesses/processDefinitions/{processDefinitionId}/start' => ['post' => [
                'operationId' => 'BusinessProcessClient_Start',
                'parameters' => [
                    [
                        'name' => 'processDefinitionId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'request',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/StartProcessRequest']
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/v1/businessProcesses/processes/{processId}/markAsEnded' => ['post' => [
                'operationId' => 'BusinessProcessClient_MarkAsEnded',
                'parameters' => [[
                    'name' => 'processId',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['204' => []]
            ]],
            '/v1/businessProcesses/processes/{processId}/message' => ['post' => [
                'operationId' => 'BusinessProcessClient_SendMessage',
                'parameters' => [
                    [
                        'name' => 'processId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'request',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/SendMessageRequest']
                    ]
                ],
                'responses' => ['204' => []]
            ]],
            '/v1/businessProcesses/{processId}/wait' => ['get' => [
                'operationId' => 'BusinessProcessClient_WaitForStates',
                'parameters' => [
                    [
                        'name' => 'processId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'states',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'timeout',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcessWaitResult']]]
            ]],
            '/V1/History/Search' => ['post' => [
                'operationId' => 'DocumentHistoryClient_Search',
                'parameters' => [[
                    'name' => 'documentHistorySearchRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/DocumentHistorySearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/DocumentHistorySearchResult']]]
            ]],
            '/V1/History/{Id}' => ['get' => [
                'operationId' => 'DocumentHistoryClient_Get',
                'parameters' => [[
                    'name' => 'Id',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/DocumentHistory']]]
            ]],
            '/V1/History/{Id}/{Version}' => ['get' => [
                'operationId' => 'DocumentHistoryClient_GetVersion',
                'parameters' => [
                    [
                        'name' => 'Id',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'Version',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/DocumentHistory']]]
            ]],
            '/V1/History/{Id}/Difference/{OldVersion}' => ['get' => [
                'operationId' => 'DocumentHistoryClient_GetDifferenceLatest',
                'parameters' => [
                    [
                        'name' => 'Id',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'OldVersion',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'integer',
                        'format' => 'int64'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/DocumentHistoryDifference']]]
            ]],
            '/V1/History/{Id}/Difference/{OldVersion}/{NewVersion}' => ['get' => [
                'operationId' => 'DocumentHistoryClient_GetDifference',
                'parameters' => [
                    [
                        'name' => 'Id',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'OldVersion',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    [
                        'name' => 'NewVersion',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'integer',
                        'format' => 'int64'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/DocumentHistoryDifference']]]
            ]],
            '/V1/JsonSchemas/{SchemaId}' => ['get' => [
                'operationId' => 'JsonSchemaClient_Get',
                'parameters' => [[
                    'name' => 'SchemaId',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['type' => 'object']]]
            ]],
            '/V1/ListItems' => ['post' => [
                'operationId' => 'ListItemClient_Create',
                'parameters' => [
                    [
                        'name' => 'listItem',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/ListItemCreateRequest']
                    ],
                    [
                        'name' => 'resolve',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'boolean'
                    ],
                    [
                        'name' => 'timeout',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    [
                        'name' => 'patterns',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ListItemDetail']]]
            ]],
            '/V1/ListItems/Many' => [
                'post' => [
                    'operationId' => 'ListItemClient_CreateMany',
                    'parameters' => [[
                        'name' => 'objects',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => [
                            'type' => 'array',
                            'items' => ['$ref' => '#/definitions/ListItemCreateRequest']
                        ]
                    ]],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
                ],
                'delete' => [
                    'operationId' => 'ListItemClient_DeleteMany',
                    'parameters' => [[
                        'name' => 'ids',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
                ],
                'put' => [
                    'operationId' => 'ListItemClient_UpdateMany',
                    'parameters' => [[
                        'name' => 'objects',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => [
                            'type' => 'array',
                            'items' => ['$ref' => '#/definitions/ListItemUpdateRequest']
                        ]
                    ]],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
                ]
            ],
            '/V1/ListItems/Aggregate' => ['post' => [
                'operationId' => 'ListItemClient_Aggregate',
                'parameters' => [[
                    'name' => 'listItemAggregationRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ListItemAggregationRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ObjectAggregationResult']]]
            ]],
            '/V1/ListItems/Search' => ['post' => [
                'operationId' => 'ListItemClient_Search',
                'parameters' => [[
                    'name' => 'listItemSearchRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ListItemSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ListItemSearchResult']]]
            ]],
            '/V1/ListItems/{ObjectId}' => ['delete' => [
                'operationId' => 'ListItemClient_Delete',
                'parameters' => [
                    [
                        'name' => 'ObjectId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'timeout',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'responses' => ['200' => []]
            ]],
            '/V1/ListItems/{ListItemId}' => [
                'get' => [
                    'operationId' => 'ListItemClient_Get',
                    'parameters' => [
                        [
                            'name' => 'ListItemId',
                            'in' => 'path',
                            'required' => TRUE,
                            'type' => 'string'
                        ],
                        [
                            'name' => 'resolve',
                            'in' => 'query',
                            'required' => TRUE,
                            'type' => 'boolean'
                        ],
                        [
                            'name' => 'patterns',
                            'in' => 'query',
                            'required' => FALSE,
                            'type' => 'array',
                            'items' => ['type' => 'string']
                        ]
                    ],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ListItemDetail']]]
                ],
                'put' => [
                    'operationId' => 'ListItemClient_Update',
                    'parameters' => [
                        [
                            'name' => 'ListItemId',
                            'in' => 'path',
                            'required' => TRUE,
                            'type' => 'string'
                        ],
                        [
                            'name' => 'updateRequest',
                            'in' => 'body',
                            'required' => TRUE,
                            'schema' => ['$ref' => '#/definitions/ListItemUpdateRequest']
                        ],
                        [
                            'name' => 'resolve',
                            'in' => 'query',
                            'required' => TRUE,
                            'type' => 'boolean'
                        ],
                        [
                            'name' => 'timeout',
                            'in' => 'query',
                            'required' => FALSE,
                            'type' => 'integer',
                            'format' => 'int32'
                        ],
                        [
                            'name' => 'patterns',
                            'in' => 'query',
                            'required' => FALSE,
                            'type' => 'array',
                            'items' => ['type' => 'string']
                        ]
                    ],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ListItemDetail']]]
                ]
            ],
            '/V1/ListItems/Many/Fields/Filter' => ['put' => [
                'operationId' => 'ListItemClient_UpdateFieldsByFilter',
                'parameters' => [[
                    'name' => 'updateRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ListItemFieldsFilterUpdateRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/V1/ListItems/Many/Fields' => ['put' => [
                'operationId' => 'ListItemClient_UpdateFields',
                'parameters' => [[
                    'name' => 'updateRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ListItemFieldsUpdateRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/V1/ListItems/{ProcessId}/Wait' => ['get' => [
                'operationId' => 'ListItemClient_WaitForStates',
                'parameters' => [
                    [
                        'name' => 'ProcessId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'States',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    [
                        'name' => 'timeout',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcessWaitResult']]]
            ]],
            '/V1/LiveStream/Search' => ['post' => [
                'operationId' => 'LiveStreamClient_Search',
                'parameters' => [[
                    'name' => 'liveStreamSearchRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/LiveStreamSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ObjectSearchResult']]]
            ]],
            '/V1/Schemas' => [
                'get' => [
                    'operationId' => 'SchemaClient_GetMany',
                    'parameters' => [[
                        'name' => 'ids',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]],
                    'responses' => ['200' => ['schema' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/SchemaDetail']
                    ]]]
                ],
                'post' => [
                    'operationId' => 'SchemaClient_Create',
                    'parameters' => [[
                        'name' => 'schema',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/SchemaCreateRequest']
                    ]],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
                ]
            ],
            '/V1/Schemas/{SchemaId}' => [
                'get' => [
                    'operationId' => 'SchemaClient_Get',
                    'parameters' => [[
                        'name' => 'SchemaId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ]],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/SchemaDetail']]]
                ],
                'put' => [
                    'operationId' => 'SchemaClient_Update',
                    'parameters' => [
                        [
                            'name' => 'SchemaId',
                            'in' => 'path',
                            'required' => TRUE,
                            'type' => 'string'
                        ],
                        [
                            'name' => 'schema',
                            'in' => 'body',
                            'required' => TRUE,
                            'schema' => ['$ref' => '#/definitions/SchemaUpdateRequest']
                        ]
                    ],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
                ],
                'delete' => [
                    'operationId' => 'SchemaClient_Delete',
                    'parameters' => [[
                        'name' => 'SchemaId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ]],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
                ]
            ],
            '/V1/Schemas/{SchemaId}/Exists' => ['get' => [
                'operationId' => 'SchemaClient_Exists',
                'parameters' => [
                    [
                        'name' => 'SchemaId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'fieldId',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ExistsResponse']]]
            ]],
            '/V1/Schemas/Search' => ['post' => [
                'operationId' => 'SchemaClient_Search',
                'parameters' => [[
                    'name' => 'schemaSearchRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/SchemaSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/SchemaSearchResult']]]
            ]],
            '/V1/Permission/UserPermissions/{Permission}' => ['get' => [
                'operationId' => 'PermissionClient_GetUserPermissions',
                'parameters' => [[
                    'name' => 'Permission',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['type' => 'boolean']]]
            ]],
            '/V1/Permission/ContentPermissionSets/Search' => ['post' => [
                'operationId' => 'PermissionClient_SearchContentPermissions',
                'parameters' => [[
                    'name' => 'request',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/PermissionSetSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/PermissionSetSearchResult']]]
            ]],
            '/V1/Permission/ContentPermissionSets/{PermissionSetId}' => ['get' => [
                'operationId' => 'PermissionClient_GetContentPermissions',
                'parameters' => [[
                    'name' => 'PermissionSetId',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ContentPermissionSetDetail']]]
            ]],
            '/V1/Permission/SchemaPermissionSets/Search' => ['post' => [
                'operationId' => 'PermissionClient_SearchSchemaPermissions',
                'parameters' => [[
                    'name' => 'request',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/PermissionSetSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/PermissionSetSearchResult']]]
            ]],
            '/V1/Permission/SchemaPermissionSets/{PermissionSetId}' => ['get' => [
                'operationId' => 'PermissionClient_GetSchemaPermissions',
                'parameters' => [[
                    'name' => 'PermissionSetId',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/SchemaPermissionSetDetail']]]
            ]],
            '/V1/PublicAccess/Version' => ['get' => [
                'operationId' => 'PublicAccessClient_GetVersion',
                'parameters' => [],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/VersionInfo']]]
            ]],
            '/V1/PublicAccess/GetShare' => ['get' => [
                'operationId' => 'PublicAccessClient_GetShare',
                'parameters' => [[
                    'name' => 'token',
                    'in' => 'query',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ShareBaseDetail']]]
            ]],
            '/V1/Shares/{Id}' => [
                'put' => [
                    'operationId' => 'ShareClient_Update',
                    'parameters' => [
                        [
                            'name' => 'Id',
                            'in' => 'path',
                            'required' => TRUE,
                            'type' => 'string'
                        ],
                        [
                            'name' => 'updateRequest',
                            'in' => 'body',
                            'required' => TRUE,
                            'schema' => ['$ref' => '#/definitions/ShareBaseUpdateRequest']
                        ],
                        [
                            'name' => 'resolve',
                            'in' => 'query',
                            'required' => TRUE,
                            'type' => 'boolean'
                        ],
                        [
                            'name' => 'timeout',
                            'in' => 'query',
                            'required' => FALSE,
                            'type' => 'integer',
                            'format' => 'int32'
                        ]
                    ],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BaseResultOfShareBase']]]
                ],
                'get' => [
                    'operationId' => 'ShareClient_Get',
                    'parameters' => [[
                        'name' => 'Id',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ]],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ShareBaseDetail']]]
                ]
            ],
            '/V1/Shares/DeleteMany' => ['post' => [
                'operationId' => 'ShareClient_DeleteMany',
                'parameters' => [[
                    'name' => 'shareIds',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/V1/Shares/Aggregate' => ['post' => [
                'operationId' => 'ShareClient_Aggregate',
                'parameters' => [[
                    'name' => 'request',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ShareAggregationRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ObjectAggregationResult']]]
            ]],
            '/V1/Shares' => ['post' => [
                'operationId' => 'ShareClient_Create',
                'parameters' => [[
                    'name' => 'request',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ShareBaseCreateRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/CreateShareResult']]]
            ]],
            '/V1/Shares/Search' => ['post' => [
                'operationId' => 'ShareClient_Search',
                'parameters' => [[
                    'name' => 'request',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ShareSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ShareSearchResult']]]
            ]],
            '/V1/ServiceProviders/{ServiceProviderId}/Message' => ['post' => [
                'operationId' => 'ServiceProviderClient_SendMessage',
                'parameters' => [
                    [
                        'name' => 'ServiceProviderId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'request',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/SendMessageRequest2']
                    ]
                ],
                'responses' => ['204' => []]
            ]],
            '/V1/ServiceProviders/{ServiceProviderId}/Configuration' => [
                'get' => [
                    'operationId' => 'ServiceProviderClient_GetConfiguration',
                    'parameters' => [[
                        'name' => 'ServiceProviderId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ]],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/CustomerServiceProviderConfiguration']]]
                ],
                'put' => [
                    'operationId' => 'ServiceProviderClient_UpdateConfiguration',
                    'parameters' => [
                        [
                            'name' => 'ServiceProviderId',
                            'in' => 'path',
                            'required' => TRUE,
                            'type' => 'string'
                        ],
                        [
                            'name' => 'configuration',
                            'in' => 'body',
                            'required' => TRUE,
                            'schema' => ['$ref' => '#/definitions/ServiceProviderConfigurationUpdateRequest']
                        ]
                    ],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/CustomerServiceProviderConfiguration']]]
                ]
            ],
            '/V1/Transfers/Files/Delete' => ['post' => [
                'operationId' => 'TransferClient_DeleteFiles',
                'parameters' => [[
                    'name' => 'request',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/FileTransferDeleteRequest']
                ]],
                'responses' => [
                    '200' => [],
                    '204' => []
                ]
            ]],
            '/V1/Transfers/Files/Blacklist' => ['get' => [
                'operationId' => 'TransferClient_GetBlacklist',
                'parameters' => [],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/Blacklist']]]
            ]],
            '/V1/Transfers/{TransferId}/Cancel' => ['get' => [
                'operationId' => 'TransferClient_CancelTransfer',
                'parameters' => [[
                    'name' => 'TransferId',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['204' => []]
            ]],
            '/V1/Transfers' => ['post' => [
                'operationId' => 'TransferClient_Create',
                'parameters' => [[
                    'name' => 'request',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/CreateTransferRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/Transfer']]]
            ]],
            '/V1/Transfers/{TransferId}' => [
                'delete' => [
                    'operationId' => 'TransferClient_Delete',
                    'parameters' => [[
                        'name' => 'TransferId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ]],
                    'responses' => ['204' => []]
                ],
                'get' => [
                    'operationId' => 'TransferClient_Get',
                    'parameters' => [[
                        'name' => 'TransferId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ]],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/TransferDetail']]]
                ]
            ],
            '/V1/Transfers/Files/{FileTransferId}' => ['get' => [
                'operationId' => 'TransferClient_GetFile',
                'parameters' => [[
                    'name' => 'FileTransferId',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/FileTransferDetail']]]
            ]],
            '/V1/Transfers/{TransferId}/Import' => ['post' => [
                'operationId' => 'TransferClient_ImportTransfer',
                'parameters' => [
                    [
                        'name' => 'TransferId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'request',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/FileTransfer2ContentCreateRequest']
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/Transfer']]]
            ]],
            '/V1/Transfers/{TransferId}/PartialImport' => ['post' => [
                'operationId' => 'TransferClient_PartialImport',
                'parameters' => [
                    [
                        'name' => 'TransferId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'request',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/FileTransferPartial2ContentCreateRequest']
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/Transfer']]]
            ]],
            '/V1/Transfers/Search' => ['post' => [
                'operationId' => 'TransferClient_Search',
                'parameters' => [[
                    'name' => 'request',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/TransferSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/TransferSearchResult']]]
            ]],
            '/V1/Transfers/Files/Search' => ['post' => [
                'operationId' => 'TransferClient_SearchFiles',
                'parameters' => [[
                    'name' => 'request',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/FileTransferSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/FileTransferSearchResult']]]
            ]],
            '/V1/Transfers/{TransferId}/Files/{Identifier}/Upload' => ['post' => [
                'operationId' => 'TransferClient_UploadFile',
                'parameters' => [
                    [
                        'name' => 'formFile',
                        'in' => 'formdata',
                        'required' => FALSE,
                        'type' => 'file'
                    ],
                    [
                        'name' => 'relativePath',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'chunkNumber',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    [
                        'name' => 'currentChunkSize',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    [
                        'name' => 'totalSize',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    [
                        'name' => 'totalChunks',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    [
                        'name' => 'TransferId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'Identifier',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => []]
            ]],
            '/V1/Users/Search' => ['post' => [
                'operationId' => 'UserClient_Search',
                'parameters' => [[
                    'name' => 'searchRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/UserSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/UserSearchResult']]]
            ]],
            '/V1/Users/GetUser/{UserId}' => ['get' => [
                'operationId' => 'UserClient_GetUser',
                'parameters' => [[
                    'name' => 'UserId',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/UserDetail']]]
            ]],
            '/V1/Users/Owner/{TokenId}' => ['get' => [
                'operationId' => 'UserClient_GetByOwnerToken',
                'parameters' => [[
                    'name' => 'TokenId',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/UserDetail']]]
            ]],
            '/V1/Users/Channels' => ['get' => [
                'operationId' => 'UserClient_GetChannels',
                'parameters' => [],
                'responses' => ['200' => ['schema' => [
                    'type' => 'array',
                    'items' => ['$ref' => '#/definitions/Channel']
                ]]]
            ]],
            '/V1/Outputs' => ['post' => [
                'operationId' => 'OutputClient_GetByContentIds',
                'parameters' => [[
                    'name' => 'contentsByIdsRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ContentsByIdsRequest']
                ]],
                'responses' => ['200' => ['schema' => [
                    'type' => 'array',
                    'items' => ['$ref' => '#/definitions/OutputDetail']
                ]]]
            ]],
            '/V1/Outputs/{OutputId}' => ['get' => [
                'operationId' => 'OutputClient_Get',
                'parameters' => [[
                    'name' => 'OutputId',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/OutputDetail']]]
            ]],
            '/V1/Profile' => [
                'get' => [
                    'operationId' => 'ProfileClient_Get',
                    'parameters' => [],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/UserProfile']]]
                ],
                'put' => [
                    'operationId' => 'ProfileClient_Update',
                    'parameters' => [[
                        'name' => 'profile',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/UserProfile']
                    ]],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/UserProfile']]]
                ]
            ]
        ],
        'definitions' => [
            'ContentOwnershipTransferRequest' => [
                'properties' => [
                    'contentId' => ['type' => 'string'],
                    'transferUserId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'UserAudit' => [
                'properties' => [
                    'creationDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'modificationDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'createdByUser' => ['type' => 'string'],
                    'modifiedByUser' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'creationDate',
                    'modificationDate'
                ]
            ],
            'OutputDetailBase' => [
                'properties' => [
                    'fileExtension' => ['type' => 'string'],
                    'fileName' => ['type' => 'string'],
                    'filePath' => ['type' => 'string'],
                    'fileSizeInBytes' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'sha1Hash' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Output' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'outputFormatId' => ['type' => 'string'],
                    'contentId' => ['type' => 'string'],
                    'detail' => ['$ref' => '#/definitions/OutputDetailBase']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ContentDetail' => [
                'properties' => [
                    'audit' => ['$ref' => '#/definitions/UserAudit'],
                    'content' => ['type' => 'object'],
                    'contentPermissionSetIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'contentSchemaId' => ['type' => 'string'],
                    'contentType' => [
                        'type' => 'string',
                        'enum' => [
                            'Unknown',
                            'Bitmap',
                            'VectorGraphic',
                            'RawImage',
                            'InterchangeDocument',
                            'WordProcessingDocument',
                            'TextDocument',
                            'DesktopPublishingDocument',
                            'Presentation',
                            'Spreadsheet',
                            'Archive',
                            'Audio',
                            'Video',
                            'Font',
                            'Multimedia',
                            'Application',
                            'SourceCode',
                            'Database',
                            'Cad',
                            'Model3d'
                        ]
                    ],
                    'displayValues' => ['type' => 'object'],
                    'entityType' => [
                        'type' => 'string',
                        'enum' => [
                            'Content',
                            'BasicShare',
                            'EmbedShare',
                            'Metadata',
                            'FileTransfer'
                        ]
                    ],
                    'id' => ['type' => 'string'],
                    'layerSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'metadata' => ['type' => 'object'],
                    'outputs' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/Output']
                    ],
                    'ownerTokenId' => ['type' => 'string'],
                    'trashed' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'contentType',
                    'entityType',
                    'trashed'
                ]
            ],
            'OutputDetailImage' => [
                'properties' => [
                    'width' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'height' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'width',
                    'height'
                ]
            ],
            'OutputDetailAudio' => [
                'properties' => ['durationInSeconds' => [
                    'type' => 'number',
                    'format' => 'double'
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Sprite' => [
                'properties' => [
                    'width' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'height' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'y' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'x' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'start' => ['type' => 'string'],
                    'end' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'width',
                    'height',
                    'y',
                    'x',
                    'start',
                    'end'
                ]
            ],
            'OutputDetailVideo' => [
                'properties' => [
                    'durationInSeconds' => [
                        'type' => 'number',
                        'format' => 'double'
                    ],
                    'width' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'height' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'sprites' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/Sprite']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'durationInSeconds',
                    'width',
                    'height'
                ]
            ],
            'OutputDetailDocument' => [
                'properties' => ['pageCount' => [
                    'type' => 'integer',
                    'format' => 'int32'
                ]],
                'additionalProperties' => FALSE,
                'required' => ['pageCount']
            ],
            'OutputDetailDefault' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'OutputDetail' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PictureparkException' => [
                'properties' => [
                    'traceLevel' => [
                        'type' => 'string',
                        'enum' => [
                            'Critical',
                            'Error',
                            'Warning',
                            'Information',
                            'Verbose'
                        ]
                    ],
                    'traceId' => ['type' => 'string'],
                    'traceJobId' => ['type' => 'string'],
                    'httpStatusCode' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'traceLevel',
                    'httpStatusCode'
                ]
            ],
            'Exception' => [
                'properties' => [
                    'message' => ['type' => 'string'],
                    'innerException' => ['$ref' => '#/definitions/Exception'],
                    'stackTrace' => ['type' => 'string'],
                    'source' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PictureparkApplicationException' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PictureparkBusinessException' => [
                'properties' => [
                    'customerId' => ['type' => 'string'],
                    'customerAlias' => ['type' => 'string'],
                    'userId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PictureparkArgumentNullException' => [
                'properties' => ['argumentName' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ContentNotFoundException' => [
                'properties' => ['contentId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'BusinessProcessDefinitionCreateException' => [
                'properties' => ['processDefinitionIds' => [
                    'type' => 'array',
                    'items' => ['type' => 'string']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'BusinessProcessDefinitionNotFoundException' => [
                'properties' => ['processDefinitionId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'BusinessProcessNotFoundException' => [
                'properties' => ['businessProcessId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'CustomerHostNotFoundException' => [
                'properties' => ['hostName' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'CustomerNotFoundException' => [
                'properties' => ['customerId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DocumentNotFoundException' => [
                'properties' => ['documentId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DocumentVersionNotFoundException' => [
                'properties' => [
                    'documentId' => ['type' => 'string'],
                    'documentVersion' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DriveRequestException' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DuplicateRightException' => [
                'properties' => ['permissionSetId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DuplicateDocumentException' => [
                'properties' => [
                    'documentId' => ['type' => 'string'],
                    'documentType' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DuplicateAggregatorException' => [
                'properties' => ['aggregatorName' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FailedToLockException' => [
                'properties' => ['resourceId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'IndexException' => [
                'properties' => [
                    'indexName' => ['type' => 'string'],
                    'debugInformation' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'InvalidArgumentException' => [
                'properties' => [
                    'argumentName' => ['type' => 'string'],
                    'argumentValue' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'InvalidCustomerException' => [
                'properties' => ['customerId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'MetadataError' => [
                'properties' => [
                    'errorType' => ['type' => 'string'],
                    'lineNumber' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'linePosition' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'path' => ['type' => 'string'],
                    'message' => ['type' => 'string'],
                    'schemaId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'lineNumber',
                    'linePosition'
                ]
            ],
            'PictureparkInvalidMetadataException' => [
                'properties' => ['metadataErrors' => [
                    'type' => 'array',
                    'items' => ['$ref' => '#/definitions/MetadataError']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'InvalidStateTransitionException' => [
                'properties' => ['transition' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'InvalidStateException' => [
                'properties' => [
                    'resourceId' => ['type' => 'string'],
                    'state' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'InvalidUserOrPasswordException' => [
                'properties' => ['customerId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PictureparkMappingException' => [
                'properties' => [
                    'indexName' => ['type' => 'string'],
                    'debugInformation' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'MessagePerformerTaskCanceledException' => [
                'properties' => [
                    'messageId' => ['type' => 'string'],
                    'customerId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'NotFoundException' => [
                'properties' => ['reference' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ObjectStoreException' => [
                'properties' => [
                    'rowErrorMessages' => ['type' => 'string'],
                    'errorMessage' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ObjectStoreResponseException' => [
                'properties' => ['rowErrorMessages' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PictureparkOperationCanceledException' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'OperationTimeoutException' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'OutputNotFoundException' => [
                'properties' => [
                    'contentId' => ['type' => 'string'],
                    'outputFormatId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PermissionException' => [
                'properties' => [
                    'permission' => ['type' => 'string'],
                    'operation' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'StorageRootCause' => [
                'properties' => [
                    'index' => ['type' => 'string'],
                    'reason' => ['type' => 'string'],
                    'resourceId' => ['type' => 'string'],
                    'resourceType' => ['type' => 'string'],
                    'type' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'StorageCausedBy' => [
                'properties' => [
                    'reason' => ['type' => 'string'],
                    'type' => ['type' => 'string'],
                    'innerCausedBy' => ['$ref' => '#/definitions/StorageCausedBy']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'StorageError' => [
                'properties' => [
                    'index' => ['type' => 'string'],
                    'reason' => ['type' => 'string'],
                    'resourceId' => ['type' => 'string'],
                    'resourceType' => ['type' => 'string'],
                    'type' => ['type' => 'string'],
                    'rootCause' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/StorageRootCause']
                    ],
                    'causedBy' => ['$ref' => '#/definitions/StorageCausedBy']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'StorageServerError' => [
                'properties' => [
                    'error' => ['$ref' => '#/definitions/StorageError'],
                    'status' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['status']
            ],
            'QueryException' => [
                'properties' => [
                    'debugInformation' => ['type' => 'string'],
                    'serverError' => ['$ref' => '#/definitions/StorageServerError']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'RenderingException' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'RenderingJobItemNotSetException' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ServiceProviderCreateException' => [
                'properties' => [
                    'userId' => ['type' => 'string'],
                    'externalId' => ['type' => 'string'],
                    'virtualHost' => ['type' => 'string'],
                    'detailErrorMessage' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ServiceProviderDeleteException' => [
                'properties' => [
                    'serviceProviderId' => ['type' => 'string'],
                    'detailedErrorMessage' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ServiceProviderNotFoundException' => [
                'properties' => ['missingServiceProviderId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'TokenValidationException' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'UnknownException' => [
                'properties' => ['exceptionDetail' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'UserNotFoundException' => [
                'properties' => ['missingUserId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'UserPermanentlyRemovedException' => [
                'properties' => ['removedUserId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'UserRoleAssignedException' => [
                'properties' => ['userRoleId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'UserRolesRightsAssignedException' => [
                'properties' => ['contentPermissionSetId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ContentsOwnershipTransferRequest' => [
                'properties' => [
                    'contentIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'transferUserId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ErrorResponse' => [
                'properties' => [
                    'exception' => ['type' => 'string'],
                    'traceId' => ['type' => 'string'],
                    'traceJobId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'BusinessProcessStateItem' => [
                'properties' => [
                    'state' => ['type' => 'string'],
                    'timestamp' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'error' => ['$ref' => '#/definitions/ErrorResponse']
                ],
                'additionalProperties' => FALSE,
                'required' => ['timestamp']
            ],
            'BusinessProcess' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'processDefinitionId' => ['type' => 'string'],
                    'referenceId' => ['type' => 'string'],
                    'referenceDocType' => ['type' => 'string'],
                    'notificationId' => ['type' => 'string'],
                    'businessProcessScope' => [
                        'type' => 'string',
                        'enum' => [
                            'System',
                            'User'
                        ]
                    ],
                    'lifeCycle' => [
                        'type' => 'string',
                        'enum' => [
                            'Draft',
                            'Started',
                            'Ended',
                            'Cancelled'
                        ]
                    ],
                    'startDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'endDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'stateHistory' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/BusinessProcessStateItem']
                    ],
                    'processDefinitionName' => ['type' => 'string'],
                    'currentState' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'businessProcessScope',
                    'lifeCycle',
                    'startDate',
                    'endDate'
                ]
            ],
            'BulkResponseRow' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'version' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'error' => ['type' => 'string'],
                    'reason' => ['type' => 'string'],
                    'succeeded' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'version',
                    'succeeded'
                ]
            ],
            'BulkResponse' => [
                'properties' => ['rows' => [
                    'type' => 'array',
                    'items' => ['$ref' => '#/definitions/BulkResponseRow']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'BusinessProcessBulkResponse' => [
                'properties' => ['response' => ['$ref' => '#/definitions/BulkResponse']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FilterBase' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'AggregationFilter' => [
                'properties' => [
                    'aggregationName' => ['type' => 'string'],
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'temporaryAggregatorRequestId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'AggregatorBase' => [
                'properties' => [
                    'name' => ['type' => 'string'],
                    'names' => ['type' => 'object'],
                    'aggregators' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/AggregatorBase']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ContentAggregationRequest' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'searchBehaviours' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'DropInvalidCharactersOnFailure',
                                'WildcardOnSingleTerm'
                            ]
                        ]
                    ],
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'aggregationFilters' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/AggregationFilter']
                    ],
                    'aggregators' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/AggregatorBase']
                    ],
                    'channelId' => ['type' => 'string'],
                    'displayLanguage' => ['type' => 'string'],
                    'searchLanguages' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'collectionId' => ['type' => 'string'],
                    'lifeCycleFilter' => [
                        'type' => 'string',
                        'enum' => [
                            'ActiveOnly',
                            'All',
                            'InactiveOnly'
                        ]
                    ],
                    'searchType' => [
                        'type' => 'string',
                        'enum' => [
                            'Metadata',
                            'FullText',
                            'MetadataAndFullText'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'lifeCycleFilter',
                    'searchType'
                ]
            ],
            'AndFilter' => [
                'properties' => ['filters' => [
                    'type' => 'array',
                    'items' => ['$ref' => '#/definitions/FilterBase']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'OrFilter' => [
                'properties' => ['filters' => [
                    'type' => 'array',
                    'items' => ['$ref' => '#/definitions/FilterBase']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'NotFilter' => [
                'properties' => ['filter' => ['$ref' => '#/definitions/FilterBase']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DateRange' => [
                'properties' => [
                    'names' => ['type' => 'object'],
                    'from' => ['type' => 'string'],
                    'to' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DateRangeFilter' => [
                'properties' => [
                    'field' => ['type' => 'string'],
                    'range' => ['$ref' => '#/definitions/DateRange']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ExistsFilter' => [
                'properties' => ['field' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'GeoLocation' => [
                'properties' => [
                    'lat' => [
                        'type' => 'number',
                        'format' => 'double'
                    ],
                    'lon' => [
                        'type' => 'number',
                        'format' => 'double'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'lat',
                    'lon'
                ]
            ],
            'GeoBoundingBoxFilter' => [
                'properties' => [
                    'field' => ['type' => 'string'],
                    'topLeft' => ['$ref' => '#/definitions/GeoLocation'],
                    'bottomRight' => ['$ref' => '#/definitions/GeoLocation']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'GeoDistanceFilter' => [
                'properties' => [
                    'field' => ['type' => 'string'],
                    'location' => ['$ref' => '#/definitions/GeoLocation'],
                    'distance' => [
                        'type' => 'number',
                        'format' => 'double'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['distance']
            ],
            'NumericRange' => [
                'properties' => [
                    'names' => ['type' => 'object'],
                    'from' => [
                        'type' => 'number',
                        'format' => 'double'
                    ],
                    'to' => [
                        'type' => 'number',
                        'format' => 'double'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'GeoDistanceRangeFilter' => [
                'properties' => [
                    'field' => ['type' => 'string'],
                    'location' => ['$ref' => '#/definitions/GeoLocation'],
                    'range' => ['$ref' => '#/definitions/NumericRange']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'NestedFilter' => [
                'properties' => [
                    'path' => ['type' => 'string'],
                    'filter' => ['$ref' => '#/definitions/FilterBase']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'NumericRangeFilter' => [
                'properties' => [
                    'field' => ['type' => 'string'],
                    'range' => ['$ref' => '#/definitions/NumericRange']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PrefixFilter' => [
                'properties' => [
                    'field' => ['type' => 'string'],
                    'prefix' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'TermFilter' => [
                'properties' => [
                    'field' => ['type' => 'string'],
                    'term' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'TermsFilter' => [
                'properties' => [
                    'field' => ['type' => 'string'],
                    'terms' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ChildFilter' => [
                'properties' => [
                    'childType' => ['type' => 'string'],
                    'filter' => ['$ref' => '#/definitions/FilterBase']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ParentFilter' => [
                'properties' => [
                    'parentType' => ['type' => 'string'],
                    'filter' => ['$ref' => '#/definitions/FilterBase']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DateRangeAggregator' => [
                'properties' => [
                    'field' => ['type' => 'string'],
                    'ranges' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/DateRange']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FilterAggregator' => [
                'properties' => ['filter' => ['$ref' => '#/definitions/FilterBase']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'GeoDistanceAggregator' => [
                'properties' => [
                    'field' => ['type' => 'string'],
                    'location' => ['$ref' => '#/definitions/GeoLocation'],
                    'ranges' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/NumericRange']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'NestedAggregator' => [
                'properties' => ['path' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'NumericRangeAggregator' => [
                'properties' => [
                    'field' => ['type' => 'string'],
                    'ranges' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/NumericRange']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'TermsAggregator' => [
                'properties' => [
                    'field' => ['type' => 'string'],
                    'size' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'includes' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'excludes' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'TermsRelationAggregator' => [
                'properties' => ['documentType' => [
                    'type' => 'string',
                    'enum' => [
                        'Content',
                        'ListItem',
                        'Schema',
                        'User',
                        'ContentPermissionSet',
                        'Owner'
                    ]
                ]],
                'additionalProperties' => FALSE,
                'required' => ['documentType']
            ],
            'TermsEnumAggregator' => [
                'properties' => ['enumType' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'AggregationResultItem' => [
                'properties' => [
                    'name' => ['type' => 'string'],
                    'count' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'filter' => ['$ref' => '#/definitions/AggregationFilter'],
                    'active' => ['type' => 'boolean'],
                    'aggregationResults' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/AggregationResult']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'count',
                    'active'
                ]
            ],
            'AggregationResult' => [
                'properties' => [
                    'name' => ['type' => 'string'],
                    'sumOtherDocCount' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'temporaryRequestId' => ['type' => 'string'],
                    'aggregationResultItems' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/AggregationResultItem']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ObjectAggregationResult' => [
                'properties' => [
                    'elapsedMilliseconds' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'aggregationResults' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/AggregationResult']
                    ],
                    'searchString' => ['type' => 'string'],
                    'isSearchStringRewritten' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'elapsedMilliseconds',
                    'isSearchStringRewritten'
                ]
            ],
            'ContentBatchDownloadRequestItem' => [
                'properties' => [
                    'contentId' => ['type' => 'string'],
                    'outputFormatId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ContentBatchDownloadRequest' => [
                'properties' => ['contents' => [
                    'type' => 'array',
                    'items' => ['$ref' => '#/definitions/ContentBatchDownloadRequestItem']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ContentBatchDownloadItem' => [
                'properties' => [
                    'downloadToken' => ['type' => 'string'],
                    'downloadUrl' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DownloadItem' => [
                'properties' => ['dummy' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'CreateContentRequest' => [
                'properties' => [
                    'contentSchemaId' => ['type' => 'string'],
                    'layerSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'content' => ['type' => 'object'],
                    'metadata' => ['type' => 'object'],
                    'contentPermissionSetIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'UpdateContentPermissionsRequest' => [
                'properties' => [
                    'contentId' => ['type' => 'string'],
                    'contentPermissionSetIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SortInfo' => [
                'properties' => [
                    'field' => ['type' => 'string'],
                    'direction' => [
                        'type' => 'string',
                        'enum' => [
                            'Asc',
                            'Desc'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['direction']
            ],
            'ContentSearchRequest' => [
                'properties' => [
                    'channelIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'displayLanguage' => ['type' => 'string'],
                    'displayPatternIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'searchLanguages' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'collectionId' => ['type' => 'string'],
                    'searchString' => ['type' => 'string'],
                    'searchBehaviours' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'DropInvalidCharactersOnFailure',
                                'WildcardOnSingleTerm'
                            ]
                        ]
                    ],
                    'sort' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/SortInfo']
                    ],
                    'start' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'limit' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'lifeCycleFilter' => [
                        'type' => 'string',
                        'enum' => [
                            'ActiveOnly',
                            'All',
                            'InactiveOnly'
                        ]
                    ],
                    'rightsFilter' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'View',
                                'Edit',
                                'Update',
                                'Manage',
                                'Trash'
                            ]
                        ]
                    ],
                    'searchType' => [
                        'type' => 'string',
                        'enum' => [
                            'Metadata',
                            'FullText',
                            'MetadataAndFullText'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'start',
                    'limit',
                    'lifeCycleFilter',
                    'searchType'
                ]
            ],
            'ContentSearchResult' => [
                'properties' => [
                    'aggregationResults' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/AggregationResult']
                    ],
                    'elapsedMilliseconds' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['elapsedMilliseconds']
            ],
            'SearchBehaviourBaseResultOfContent' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'isSearchStringRewritten' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => ['isSearchStringRewritten']
            ],
            'Content' => [
                'properties' => [
                    'audit' => ['$ref' => '#/definitions/UserAudit'],
                    'entityType' => [
                        'type' => 'string',
                        'enum' => [
                            'Content',
                            'BasicShare',
                            'EmbedShare',
                            'Metadata',
                            'FileTransfer'
                        ]
                    ],
                    'contentSchemaId' => ['type' => 'string'],
                    'layerSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'displayValues' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'id' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => ['entityType']
            ],
            'BaseResultOfContent' => [
                'properties' => [
                    'totalResults' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'results' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/Content']
                    ],
                    'pageToken' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalResults']
            ],
            'ContentFileUpdateRequest' => [
                'properties' => [
                    'contentId' => ['type' => 'string'],
                    'fileTransferId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'UpdateContentMetadataRequest' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'schemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'metadata' => ['type' => 'object']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ContentDeactivationRequest' => [
                'properties' => ['contentIds' => [
                    'type' => 'array',
                    'items' => ['type' => 'string']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ContentReactivationRequest' => [
                'properties' => ['contentIds' => [
                    'type' => 'array',
                    'items' => ['type' => 'string']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ContentsMetadataUpdateRequest' => [
                'properties' => ['contentIds' => [
                    'type' => 'array',
                    'items' => ['type' => 'string']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'MetadataValuesChangeCommandBase' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'MetadataValuesChangeRequestBase' => [
                'properties' => ['changeCommands' => [
                    'type' => 'array',
                    'items' => ['$ref' => '#/definitions/MetadataValuesChangeCommandBase']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'MetadataValuesSchemaUpdateCommand' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'value' => ['type' => 'object']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'MetadataValuesSchemaUpsertCommand' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'value' => ['type' => 'object']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'MetadataValuesSchemaRemoveCommand' => [
                'properties' => ['schemaId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'MetadataValuesFieldRemoveCommand' => [
                'properties' => ['fieldNamespace' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'MetadataValuesSchemaItemAddCommand' => [
                'properties' => [
                    'fieldNamespace' => ['type' => 'string'],
                    'referenceId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'MetadataValuesSchemaItemRemoveCommand' => [
                'properties' => [
                    'fieldNamespace' => ['type' => 'string'],
                    'referenceId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ContentFilterRequest' => [
                'properties' => [
                    'channelIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'searchLanguages' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'displayLanguage' => ['type' => 'string'],
                    'searchString' => ['type' => 'string'],
                    'searchType' => [
                        'type' => 'string',
                        'enum' => [
                            'Metadata',
                            'FullText',
                            'MetadataAndFullText'
                        ]
                    ],
                    'collectionId' => ['type' => 'string'],
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'lifeCycleFilter' => [
                        'type' => 'string',
                        'enum' => [
                            'ActiveOnly',
                            'All',
                            'InactiveOnly'
                        ]
                    ],
                    'rightsFilter' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'View',
                                'Edit',
                                'Update',
                                'Manage',
                                'Trash'
                            ]
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'searchType',
                    'lifeCycleFilter'
                ]
            ],
            'FilterContentsMetadataUpdateRequest' => [
                'properties' => [
                    'contentFilterRequest' => ['$ref' => '#/definitions/ContentFilterRequest'],
                    'totalItemsCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalItemsCount']
            ],
            'BusinessProcessSearchRequest' => [
                'properties' => [
                    'start' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'limit' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'searchString' => ['type' => 'string'],
                    'searchBehaviours' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'DropInvalidCharactersOnFailure',
                                'WildcardOnSingleTerm'
                            ]
                        ]
                    ],
                    'sort' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/SortInfo']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'start',
                    'limit'
                ]
            ],
            'BusinessProcessSearchResult' => [
                'properties' => ['elapsedMilliseconds' => [
                    'type' => 'integer',
                    'format' => 'int64'
                ]],
                'additionalProperties' => FALSE,
                'required' => ['elapsedMilliseconds']
            ],
            'SearchBehaviourBaseResultOfBusinessProcess' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'isSearchStringRewritten' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => ['isSearchStringRewritten']
            ],
            'BaseResultOfBusinessProcess' => [
                'properties' => [
                    'totalResults' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'results' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/BusinessProcess']
                    ],
                    'pageToken' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalResults']
            ],
            'StartProcessRequest' => [
                'properties' => ['variables' => ['type' => 'object']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SendMessageRequest' => [
                'properties' => [
                    'messageName' => ['type' => 'string'],
                    'variables' => ['type' => 'object']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'BusinessProcessWaitResult' => [
                'properties' => [
                    'hasStateHit' => ['type' => 'boolean'],
                    'processEnded' => ['type' => 'boolean'],
                    'stateHit' => ['type' => 'string'],
                    'businessProcess' => ['$ref' => '#/definitions/BusinessProcess']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'hasStateHit',
                    'processEnded'
                ]
            ],
            'DocumentHistorySearchRequest' => [
                'properties' => [
                    'from' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'to' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'start' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'limit' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'pageToken' => ['type' => 'string'],
                    'id' => ['type' => 'string'],
                    'documentId' => ['type' => 'string'],
                    'documentVersion' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'documentType' => ['type' => 'string'],
                    'sort' => ['$ref' => '#/definitions/SortInfo']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'from',
                    'to',
                    'start',
                    'limit',
                    'documentVersion'
                ]
            ],
            'UserAuditHistory' => [
                'properties' => [
                    'modificationDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'modifiedByUser' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => ['modificationDate']
            ],
            'DocumentHistory' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'documentId' => ['type' => 'string'],
                    'documentVersion' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'documentType' => ['type' => 'string'],
                    'documentTypeContract' => ['type' => 'string'],
                    'documentDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'document' => ['type' => 'string'],
                    'timestamp' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'audit' => ['$ref' => '#/definitions/UserAuditHistory'],
                    'deleted' => ['type' => 'boolean'],
                    'action' => [
                        'type' => 'string',
                        'enum' => [
                            'Create',
                            'Update',
                            'Delete',
                            'Activate',
                            'Deactivate'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'documentVersion',
                    'documentDate',
                    'timestamp',
                    'deleted',
                    'action'
                ]
            ],
            'DocumentHistorySearchResult' => [
                'properties' => [
                    'totalResults' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'results' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/DocumentHistory']
                    ],
                    'pageToken' => ['type' => 'string'],
                    'elapsedMilliseconds' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'totalResults',
                    'elapsedMilliseconds'
                ]
            ],
            'DocumentHistoryDifference' => [
                'properties' => [
                    'documentId' => ['type' => 'string'],
                    'oldDocumentVersion' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'newDocumentVersion' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'oldValues' => ['type' => 'object'],
                    'newValues' => ['type' => 'object']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'oldDocumentVersion',
                    'newDocumentVersion'
                ]
            ],
            'ListItemCreateRequest' => [
                'properties' => [
                    'content' => ['type' => 'object'],
                    'contentSchemaId' => ['type' => 'string'],
                    'listItemId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ListItemDetail' => [
                'properties' => [
                    'content' => ['type' => 'object'],
                    'contentSchemaId' => ['type' => 'string'],
                    'displayValues' => ['type' => 'object'],
                    'entityType' => [
                        'type' => 'string',
                        'enum' => [
                            'Content',
                            'BasicShare',
                            'EmbedShare',
                            'Metadata',
                            'FileTransfer'
                        ]
                    ],
                    'id' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => ['entityType']
            ],
            'ListItemAggregationRequest' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'searchBehaviours' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'DropInvalidCharactersOnFailure',
                                'WildcardOnSingleTerm'
                            ]
                        ]
                    ],
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'aggregationFilters' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/AggregationFilter']
                    ],
                    'aggregators' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/AggregatorBase']
                    ],
                    'includeAllSchemaChildren' => ['type' => 'boolean'],
                    'schemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'displayLanguage' => ['type' => 'string'],
                    'searchLanguages' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['includeAllSchemaChildren']
            ],
            'ListItemSearchRequest' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'searchBehaviours' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'DropInvalidCharactersOnFailure',
                                'WildcardOnSingleTerm'
                            ]
                        ]
                    ],
                    'sort' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/SortInfo']
                    ],
                    'start' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'limit' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'includeAllSchemaChildren' => ['type' => 'boolean'],
                    'schemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'displayLanguage' => ['type' => 'string'],
                    'displayPatternIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'referencedFieldsDisplayPatternIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'searchLanguages' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'includeMetadata' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'start',
                    'limit',
                    'includeAllSchemaChildren',
                    'includeMetadata'
                ]
            ],
            'ListItemSearchResult' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ListItem' => [
                'properties' => [
                    'content' => ['type' => 'object'],
                    'contentSchemaId' => ['type' => 'string'],
                    'displayValues' => ['type' => 'object'],
                    'entityType' => [
                        'type' => 'string',
                        'enum' => [
                            'Content',
                            'BasicShare',
                            'EmbedShare',
                            'Metadata',
                            'FileTransfer'
                        ]
                    ],
                    'id' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => ['entityType']
            ],
            'BaseResultOfListItem' => [
                'properties' => [
                    'totalResults' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'results' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/ListItem']
                    ],
                    'pageToken' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalResults']
            ],
            'ListItemUpdateRequest' => [
                'properties' => [
                    'content' => ['type' => 'object'],
                    'id' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ListItemFilterRequest' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'includeAllSchemaChildren' => ['type' => 'boolean'],
                    'schemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'displayLanguage' => ['type' => 'string'],
                    'searchLanguages' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['includeAllSchemaChildren']
            ],
            'ListItemFieldsFilterUpdateRequest' => [
                'properties' => [
                    'listItemFilterRequest' => ['$ref' => '#/definitions/ListItemFilterRequest'],
                    'changeCommands' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/MetadataValuesSchemaUpdateCommand']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ListItemFieldsUpdateRequest' => [
                'properties' => [
                    'listItemIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'changeCommands' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/MetadataValuesSchemaUpdateCommand']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'LiveStreamSearchRequest' => [
                'properties' => [
                    'from' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'to' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'start' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'limit' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'pageToken' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'from',
                    'to',
                    'start',
                    'limit'
                ]
            ],
            'ObjectSearchResult' => [
                'properties' => ['elapsedMilliseconds' => [
                    'type' => 'integer',
                    'format' => 'int64'
                ]],
                'additionalProperties' => FALSE,
                'required' => ['elapsedMilliseconds']
            ],
            'SearchBehaviourBaseResultOfObject' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'isSearchStringRewritten' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => ['isSearchStringRewritten']
            ],
            'BaseResultOfObject' => [
                'properties' => [
                    'totalResults' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'results' => [
                        'type' => 'array',
                        'items' => ['type' => 'object']
                    ],
                    'pageToken' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalResults']
            ],
            'DisplayPattern' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'templateEngine' => ['type' => 'string'],
                    'displayPatternType' => [
                        'type' => 'string',
                        'enum' => [
                            'Thumbnail',
                            'List',
                            'Detail',
                            'Custom',
                            'Name'
                        ]
                    ],
                    'templates' => ['type' => 'object']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'templateEngine',
                    'displayPatternType'
                ]
            ],
            'FieldBase' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'indexId' => ['type' => 'string'],
                    'fieldNamespace' => ['type' => 'string'],
                    'names' => ['type' => 'object'],
                    'descriptions' => ['type' => 'object'],
                    'required' => ['type' => 'boolean'],
                    'fixed' => ['type' => 'boolean'],
                    'index' => ['type' => 'boolean'],
                    'simpleSearch' => ['type' => 'boolean'],
                    'boost' => [
                        'type' => 'number',
                        'format' => 'double'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'required',
                    'fixed',
                    'index',
                    'simpleSearch',
                    'boost'
                ]
            ],
            'SearchFieldCount' => [
                'properties' => [
                    'dataField' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'indexedField' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'simpleSearchField' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'dataField',
                    'indexedField',
                    'simpleSearchField'
                ]
            ],
            'SchemaDetail' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'parentSchemaId' => ['type' => 'string'],
                    'types' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'Content',
                                'Layer',
                                'List',
                                'Struct'
                            ]
                        ]
                    ],
                    'names' => ['type' => 'object'],
                    'descriptions' => ['type' => 'object'],
                    'layerSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'displayPatterns' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/DisplayPattern']
                    ],
                    'fields' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/FieldBase']
                    ],
                    'sort' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/SortInfo']
                    ],
                    'aggregations' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/AggregatorBase']
                    ],
                    'sortOrder' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'system' => ['type' => 'boolean'],
                    'ownerTokenId' => ['type' => 'string'],
                    'public' => ['type' => 'boolean'],
                    'schemaPermissionSetIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'referencedInContentSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'descendantSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'audit' => ['$ref' => '#/definitions/UserAudit'],
                    'searchFieldCount' => ['$ref' => '#/definitions/SearchFieldCount']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'sortOrder',
                    'system',
                    'public'
                ]
            ],
            'FieldBoolean' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FieldDate' => [
                'properties' => ['format' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FieldDateTime' => [
                'properties' => ['format' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FieldDateTimeArray' => [
                'properties' => [
                    'uniqueItems' => ['type' => 'boolean'],
                    'maximumItems' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'minimumItems' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['uniqueItems']
            ],
            'FieldDecimal' => [
                'properties' => [
                    'pattern' => ['type' => 'string'],
                    'minimum' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'maximum' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FieldDictionary' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FieldDictionaryArray' => [
                'properties' => [
                    'uniqueItems' => ['type' => 'boolean'],
                    'maximumItems' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'minimumItems' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['uniqueItems']
            ],
            'FieldGeoPoint' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FieldLong' => [
                'properties' => [
                    'pattern' => ['type' => 'string'],
                    'minimum' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'maximum' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FieldLongArray' => [
                'properties' => [
                    'uniqueItems' => ['type' => 'boolean'],
                    'maximumItems' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'minimumItems' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['uniqueItems']
            ],
            'FieldIndexingInfo' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'index' => ['type' => 'boolean'],
                    'simpleSearch' => ['type' => 'boolean'],
                    'boost' => [
                        'type' => 'number',
                        'format' => 'double'
                    ],
                    'relatedSchemaIndexing' => ['$ref' => '#/definitions/SchemaIndexingInfo']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'index',
                    'simpleSearch',
                    'boost'
                ]
            ],
            'SchemaIndexingInfo' => [
                'properties' => ['fields' => [
                    'type' => 'array',
                    'items' => ['$ref' => '#/definitions/FieldIndexingInfo']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FieldSingleFieldset' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'schemaIndexingInfo' => ['$ref' => '#/definitions/SchemaIndexingInfo'],
                    'maxRecursion' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['maxRecursion']
            ],
            'FieldMultiFieldset' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'schemaIndexingInfo' => ['$ref' => '#/definitions/SchemaIndexingInfo'],
                    'maxRecursion' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'uniqueItems' => ['type' => 'boolean'],
                    'maximumItems' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'minimumItems' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'maxRecursion',
                    'uniqueItems'
                ]
            ],
            'FieldSingleTagbox' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'schemaIndexingInfo' => ['$ref' => '#/definitions/SchemaIndexingInfo'],
                    'maxRecursion' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'listItemCreateTemplate' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => ['maxRecursion']
            ],
            'FieldMultiTagbox' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'schemaIndexingInfo' => ['$ref' => '#/definitions/SchemaIndexingInfo'],
                    'maxRecursion' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'uniqueItems' => ['type' => 'boolean'],
                    'maximumItems' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'minimumItems' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'listItemCreateTemplate' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'maxRecursion',
                    'uniqueItems'
                ]
            ],
            'AnalyzerBase' => [
                'properties' => ['simpleSearch' => ['type' => 'boolean']],
                'additionalProperties' => FALSE,
                'required' => ['simpleSearch']
            ],
            'FieldString' => [
                'properties' => [
                    'template' => ['type' => 'string'],
                    'keepFieldValue' => ['type' => 'boolean'],
                    'pattern' => ['type' => 'string'],
                    'minimumLength' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'maximumLength' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'analyzers' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/AnalyzerBase']
                    ],
                    'multiLine' => ['type' => 'boolean'],
                    'grantedValues' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'keepFieldValue',
                    'multiLine'
                ]
            ],
            'EdgeNGramAnalyzer' => [
                'properties' => ['fieldSuffix' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'LanguageAnalyzer' => [
                'properties' => ['fieldSuffix' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'NGramAnalyzer' => [
                'properties' => ['fieldSuffix' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PathHierarchyAnalyzer' => [
                'properties' => ['fieldSuffix' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SimpleAnalyzer' => [
                'properties' => ['fieldSuffix' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FieldStringArray' => [
                'properties' => [
                    'uniqueItems' => ['type' => 'boolean'],
                    'maximumItems' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'minimumItems' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['uniqueItems']
            ],
            'FieldTranslatedString' => [
                'properties' => [
                    'pattern' => ['type' => 'string'],
                    'minimumLength' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'maximumLength' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'analyzers' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/AnalyzerBase']
                    ],
                    'multiLine' => ['type' => 'boolean'],
                    'requiredMetadataLanguages' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'template' => ['type' => 'string'],
                    'keepFieldValue' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'multiLine',
                    'keepFieldValue'
                ]
            ],
            'RelationType' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'names' => ['type' => 'object'],
                    'targetContext' => [
                        'type' => 'string',
                        'enum' => [
                            'Content',
                            'ListItem',
                            'User',
                            'Custom'
                        ]
                    ],
                    'schemaId' => ['type' => 'string'],
                    'filter' => ['$ref' => '#/definitions/FilterBase']
                ],
                'additionalProperties' => FALSE,
                'required' => ['targetContext']
            ],
            'FieldSingleRelation' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'schemaIndexingInfo' => ['$ref' => '#/definitions/SchemaIndexingInfo'],
                    'relationTypes' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/RelationType']
                    ],
                    'maxRecursion' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['maxRecursion']
            ],
            'FieldMultiRelation' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'schemaIndexingInfo' => ['$ref' => '#/definitions/SchemaIndexingInfo'],
                    'relationTypes' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/RelationType']
                    ],
                    'maxRecursion' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'uniqueItems' => ['type' => 'boolean'],
                    'maximumItems' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'minimumItems' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'maxRecursion',
                    'uniqueItems'
                ]
            ],
            'ExistsResponse' => [
                'properties' => ['exists' => ['type' => 'boolean']],
                'additionalProperties' => FALSE,
                'required' => ['exists']
            ],
            'SchemaCreateRequest' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'parentSchemaId' => ['type' => 'string'],
                    'types' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'Content',
                                'Layer',
                                'List',
                                'Struct'
                            ]
                        ]
                    ],
                    'names' => ['type' => 'object'],
                    'descriptions' => ['type' => 'object'],
                    'displayPatterns' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/DisplayPattern']
                    ],
                    'fields' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/FieldBase']
                    ],
                    'aggregations' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/AggregatorBase']
                    ],
                    'sortOrder' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'sort' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/SortInfo']
                    ],
                    'public' => ['type' => 'boolean'],
                    'schemaPermissionSetIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'layerSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'referencedInContentSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'sortOrder',
                    'public'
                ]
            ],
            'SchemaUpdateRequest' => [
                'properties' => [
                    'names' => ['type' => 'object'],
                    'descriptions' => ['type' => 'object'],
                    'displayPatterns' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/DisplayPattern']
                    ],
                    'fields' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/FieldBase']
                    ],
                    'aggregations' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/AggregatorBase']
                    ],
                    'sortOrder' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'sort' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/SortInfo']
                    ],
                    'public' => ['type' => 'boolean'],
                    'schemaPermissionSetIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'layerSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'referencedInContentSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'types' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'Content',
                                'Layer',
                                'List',
                                'Struct'
                            ]
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'sortOrder',
                    'public'
                ]
            ],
            'SchemaSearchRequest' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'searchBehaviours' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'DropInvalidCharactersOnFailure',
                                'WildcardOnSingleTerm'
                            ]
                        ]
                    ],
                    'sort' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/SortInfo']
                    ],
                    'start' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'limit' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'filter' => ['$ref' => '#/definitions/FilterBase']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'start',
                    'limit'
                ]
            ],
            'SchemaSearchResult' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SearchBehaviourBaseResultOfSchema' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'isSearchStringRewritten' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => ['isSearchStringRewritten']
            ],
            'Schema' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'parentSchemaId' => ['type' => 'string'],
                    'types' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'Content',
                                'Layer',
                                'List',
                                'Struct'
                            ]
                        ]
                    ],
                    'names' => ['type' => 'object'],
                    'descriptions' => ['type' => 'object'],
                    'layerSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'fieldCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'childCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'level' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'system' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'fieldCount',
                    'childCount',
                    'level',
                    'system'
                ]
            ],
            'BaseResultOfSchema' => [
                'properties' => [
                    'totalResults' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'results' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/Schema']
                    ],
                    'pageToken' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalResults']
            ],
            'PermissionSetSearchRequest' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'searchBehaviours' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'DropInvalidCharactersOnFailure',
                                'WildcardOnSingleTerm'
                            ]
                        ]
                    ],
                    'sort' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/SortInfo']
                    ],
                    'start' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'limit' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'rightFilter' => [
                        'type' => 'string',
                        'enum' => ['Apply']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'start',
                    'limit'
                ]
            ],
            'PermissionSetSearchResult' => [
                'properties' => [
                    'aggregationResults' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/AggregationResult']
                    ],
                    'elapsedMilliseconds' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['elapsedMilliseconds']
            ],
            'SearchBehaviourBaseResultOfPermissionSet' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'isSearchStringRewritten' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => ['isSearchStringRewritten']
            ],
            'PermissionSet' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'trashed' => ['type' => 'boolean'],
                    'names' => ['type' => 'object']
                ],
                'additionalProperties' => FALSE,
                'required' => ['trashed']
            ],
            'BaseResultOfPermissionSet' => [
                'properties' => [
                    'totalResults' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'results' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/PermissionSet']
                    ],
                    'pageToken' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalResults']
            ],
            'ContentPermissionSetDetail' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PermissionUserRoleRightsOfContentRight' => [
                'properties' => [
                    'userRoleId' => ['type' => 'string'],
                    'names' => ['type' => 'object'],
                    'rights' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'View',
                                'Edit',
                                'Update',
                                'Manage',
                                'Trash'
                            ]
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PermissionUserRoleRightsOfPermissionSetRight' => [
                'properties' => [
                    'userRoleId' => ['type' => 'string'],
                    'names' => ['type' => 'object'],
                    'rights' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => ['Apply']
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PermissionSetDetailOfContentRight' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'names' => ['type' => 'object'],
                    'trashed' => ['type' => 'boolean'],
                    'userRolesRights' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/PermissionUserRoleRightsOfContentRight']
                    ],
                    'userRolesPermissionSetRights' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/PermissionUserRoleRightsOfPermissionSetRight']
                    ],
                    'exclusive' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'trashed',
                    'exclusive'
                ]
            ],
            'SchemaPermissionSetDetail' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PermissionUserRoleRightsOfMetadataRight' => [
                'properties' => [
                    'userRoleId' => ['type' => 'string'],
                    'names' => ['type' => 'object'],
                    'rights' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'View',
                                'Edit',
                                'Manage'
                            ]
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PermissionSetDetailOfMetadataRight' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'names' => ['type' => 'object'],
                    'trashed' => ['type' => 'boolean'],
                    'userRolesRights' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/PermissionUserRoleRightsOfMetadataRight']
                    ],
                    'userRolesPermissionSetRights' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/PermissionUserRoleRightsOfPermissionSetRight']
                    ],
                    'exclusive' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'trashed',
                    'exclusive'
                ]
            ],
            'Event' => [
                'properties' => [
                    'action' => [
                        'type' => 'string',
                        'enum' => [
                            'Converted',
                            'Copied',
                            'Created',
                            'Cropped',
                            'Edited',
                            'Filtered',
                            'Formatted',
                            'VersionUpdated',
                            'Printed',
                            'Published',
                            'Managed',
                            'Produced',
                            'Resized',
                            'Saved',
                            'Derived'
                        ]
                    ],
                    'changed' => ['type' => 'string'],
                    'instanceID' => ['type' => 'string'],
                    'parameters' => ['type' => 'string'],
                    'softwareAgent' => ['type' => 'string'],
                    'when' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'VersionInfo' => [
                'properties' => [
                    'comments' => ['type' => 'string'],
                    'event' => ['$ref' => '#/definitions/Event'],
                    'modifier' => ['type' => 'string'],
                    'modifyDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'version' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ContentDetail2' => [
                'properties' => [
                    'trashed' => ['type' => 'boolean'],
                    'entityType' => [
                        'type' => 'string',
                        'enum' => [
                            'Content',
                            'BasicShare',
                            'EmbedShare',
                            'Metadata',
                            'FileTransfer'
                        ]
                    ],
                    'contentSchemaId' => ['type' => 'string'],
                    'layerSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'content' => ['type' => 'object'],
                    'metadata' => ['type' => 'object'],
                    'id' => ['type' => 'string'],
                    'contentPermissionSetIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'outputs' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/Output']
                    ],
                    'audit' => ['$ref' => '#/definitions/UserAudit'],
                    'ownerTokenId' => ['type' => 'string'],
                    'contentType' => [
                        'type' => 'string',
                        'enum' => [
                            'Unknown',
                            'Bitmap',
                            'VectorGraphic',
                            'RawImage',
                            'InterchangeDocument',
                            'WordProcessingDocument',
                            'TextDocument',
                            'DesktopPublishingDocument',
                            'Presentation',
                            'Spreadsheet',
                            'Archive',
                            'Audio',
                            'Video',
                            'Font',
                            'Multimedia',
                            'Application',
                            'SourceCode',
                            'Database',
                            'Cad',
                            'Model3d'
                        ]
                    ],
                    'displayValues' => ['type' => 'object']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'trashed',
                    'entityType',
                    'contentType'
                ]
            ],
            'TemplateBase' => [
                'properties' => [
                    'width' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'height' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ShareBaseDetail' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'name' => ['type' => 'string'],
                    'description' => ['type' => 'string'],
                    'audit' => ['$ref' => '#/definitions/UserAudit'],
                    'entityType' => [
                        'type' => 'string',
                        'enum' => [
                            'Content',
                            'BasicShare',
                            'EmbedShare',
                            'Metadata',
                            'FileTransfer'
                        ]
                    ],
                    'contentSelections' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/ContentDetail2']
                    ],
                    'layerSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'mailTemplateId' => ['type' => 'string'],
                    'expirationDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'template' => ['$ref' => '#/definitions/TemplateBase'],
                    'outputAccess' => [
                        'type' => 'string',
                        'enum' => [
                            'Full',
                            'Preview',
                            'None'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'entityType',
                    'outputAccess'
                ]
            ],
            'CardTemplate' => [
                'properties' => [
                    'showNavigation' => ['type' => 'boolean'],
                    'showOverlay' => ['type' => 'boolean'],
                    'showLogo' => ['type' => 'boolean'],
                    'showFooter' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'showNavigation',
                    'showOverlay',
                    'showLogo',
                    'showFooter'
                ]
            ],
            'ListTemplate' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'BasicTemplate' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'UserEmail' => [
                'properties' => [
                    'firstName' => ['type' => 'string'],
                    'lastName' => ['type' => 'string'],
                    'emailAddress' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'MailRecipient' => [
                'properties' => [
                    'userEmail' => ['$ref' => '#/definitions/UserEmail'],
                    'token' => ['type' => 'string'],
                    'url' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'UserItem' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'firstName' => ['type' => 'string'],
                    'lastName' => ['type' => 'string'],
                    'emailAddress' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'InternalRecipient' => [
                'properties' => [
                    'recipient' => ['$ref' => '#/definitions/UserItem'],
                    'token' => ['type' => 'string'],
                    'url' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ShareBasicDetail' => [
                'properties' => [
                    'url' => ['type' => 'string'],
                    'mailRecipients' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/MailRecipient']
                    ],
                    'internalRecipients' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/InternalRecipient']
                    ],
                    'languageCode' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'EmbedContentDetail' => [
                'properties' => [
                    'contentId' => ['type' => 'string'],
                    'outputFormatId' => ['type' => 'string'],
                    'token' => ['type' => 'string'],
                    'url' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ShareEmbedDetail' => [
                'properties' => [
                    'embedContentItems' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/EmbedContentDetail']
                    ],
                    'token' => ['type' => 'string'],
                    'url' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ShareContent' => [
                'properties' => [
                    'contentId' => ['type' => 'string'],
                    'outputFormatIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ShareBaseUpdateRequest' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'name' => ['type' => 'string'],
                    'expirationDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'description' => ['type' => 'string'],
                    'shareContentItems' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/ShareContent']
                    ],
                    'layerSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'template' => ['$ref' => '#/definitions/TemplateBase'],
                    'outputAccess' => [
                        'type' => 'string',
                        'enum' => [
                            'Full',
                            'Preview',
                            'None'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['outputAccess']
            ],
            'ShareBasicUpdateRequest' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ShareEmbedUpdateRequest' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ShareBase' => [
                'properties' => [
                    'name' => ['type' => 'string'],
                    'contentIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'id' => ['type' => 'string'],
                    'audit' => ['$ref' => '#/definitions/UserAudit'],
                    'entityType' => [
                        'type' => 'string',
                        'enum' => [
                            'Content',
                            'BasicShare',
                            'EmbedShare',
                            'Metadata',
                            'FileTransfer'
                        ]
                    ],
                    'expirationDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['entityType']
            ],
            'BaseResultOfShareBase' => [
                'properties' => [
                    'totalResults' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'results' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/ShareBase']
                    ],
                    'pageToken' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalResults']
            ],
            'ShareBasic' => [
                'properties' => [
                    'mailRecipients' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/MailRecipient']
                    ],
                    'internalRecipients' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/InternalRecipient']
                    ],
                    'description' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ShareEmbed' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ShareAggregationRequest' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'searchBehaviours' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'DropInvalidCharactersOnFailure',
                                'WildcardOnSingleTerm'
                            ]
                        ]
                    ],
                    'sort' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/SortInfo']
                    ],
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'aggregationFilters' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/AggregationFilter']
                    ],
                    'aggregators' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/AggregatorBase']
                    ],
                    'displayLanguage' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ShareBaseCreateRequest' => [
                'properties' => [
                    'name' => ['type' => 'string'],
                    'description' => ['type' => 'string'],
                    'expirationDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'contents' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/ShareContent']
                    ],
                    'layerSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'template' => ['$ref' => '#/definitions/TemplateBase'],
                    'outputAccess' => [
                        'type' => 'string',
                        'enum' => [
                            'Full',
                            'Preview',
                            'None'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['outputAccess']
            ],
            'UserRole' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'trashed' => ['type' => 'boolean'],
                    'names' => ['type' => 'object'],
                    'userRights' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'ManageContent',
                                'ManageSharings',
                                'ManageDrives',
                                'ManageTransfer',
                                'ManageChannels',
                                'ManageSchemas',
                                'ManageUsers',
                                'ManageUserRoles',
                                'ManagePermissions',
                                'ManageSearchIndexes',
                                'ManageRecipients',
                                'ManageCollections',
                                'ManageListItems',
                                'ManageServiceProviders',
                                'ManageEmbeds',
                                'ManageTemplates'
                            ]
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['trashed']
            ],
            'ShareBasicCreateRequest' => [
                'properties' => [
                    'recipientsEmail' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/UserEmail']
                    ],
                    'recipientsUser' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/UserItem']
                    ],
                    'recipientsGroup' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/UserRole']
                    ],
                    'languageCode' => ['type' => 'string'],
                    'mailTemplateId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ShareEmbedCreateRequest' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'CreateShareResult' => [
                'properties' => ['shareId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ShareSearchRequest' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'searchBehaviours' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'DropInvalidCharactersOnFailure',
                                'WildcardOnSingleTerm'
                            ]
                        ]
                    ],
                    'sort' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/SortInfo']
                    ],
                    'start' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'limit' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'filter' => ['$ref' => '#/definitions/FilterBase']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'start',
                    'limit'
                ]
            ],
            'ShareSearchResult' => [
                'properties' => ['elapsedMilliseconds' => [
                    'type' => 'integer',
                    'format' => 'int64'
                ]],
                'additionalProperties' => FALSE,
                'required' => ['elapsedMilliseconds']
            ],
            'SearchBehaviourBaseResultOfShareBase' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'isSearchStringRewritten' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => ['isSearchStringRewritten']
            ],
            'SendMessageRequest2' => [
                'properties' => [
                    'messageName' => ['type' => 'string'],
                    'businessProcessId' => ['type' => 'string'],
                    'variables' => ['type' => 'object']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'CustomerServiceProviderConfiguration' => [
                'properties' => [
                    'serviceProviderId' => ['type' => 'string'],
                    'customerId' => ['type' => 'string'],
                    'userRoleIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'settings' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ServiceProviderConfigurationUpdateRequest' => [
                'properties' => [
                    'customerId' => ['type' => 'string'],
                    'serviceProviderId' => ['type' => 'string'],
                    'settings' => ['type' => 'string'],
                    'userRoleIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FileTransferDeleteRequest' => [
                'properties' => [
                    'transferId' => ['type' => 'string'],
                    'fileTransferIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'BlacklistItem' => [
                'properties' => [
                    'name' => ['type' => 'string'],
                    'match' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Blacklist' => [
                'properties' => ['items' => [
                    'type' => 'array',
                    'items' => ['$ref' => '#/definitions/BlacklistItem']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'TransferUploadFile' => [
                'properties' => ['fileName' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'TransferDriveFile' => [
                'properties' => [
                    'driveId' => ['type' => 'string'],
                    'fileId' => ['type' => 'string'],
                    'name' => ['type' => 'string'],
                    'externalOutputFolderId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'TransferWebLink' => [
                'properties' => ['url' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'CreateTransferRequest' => [
                'properties' => [
                    'name' => ['type' => 'string'],
                    'transferType' => [
                        'type' => 'string',
                        'enum' => [
                            'FileUpload',
                            'DriveImport',
                            'DriveExport',
                            'WebDownload',
                            'SchemaImport'
                        ]
                    ],
                    'files' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/TransferUploadFile']
                    ],
                    'driveFiles' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/TransferDriveFile']
                    ],
                    'webLinks' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/TransferWebLink']
                    ],
                    'collectionName' => ['type' => 'string'],
                    'createCollection' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'transferType',
                    'createCollection'
                ]
            ],
            'TransferFile' => [
                'properties' => ['identifier' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Transfer' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'name' => ['type' => 'string'],
                    'state' => [
                        'type' => 'string',
                        'enum' => [
                            'Draft',
                            'UploadInProgress',
                            'UploadCompleted',
                            'ImportInProgress',
                            'ImportCompleted',
                            'UploadCancelled',
                            'ImportCancelled',
                            'ImportFailed',
                            'Created',
                            'UploadFailed',
                            'Deleted',
                            'TransferReady',
                            'FileDeleteInProgress',
                            'TransferCleanup'
                        ]
                    ],
                    'transferType' => [
                        'type' => 'string',
                        'enum' => [
                            'FileUpload',
                            'DriveImport',
                            'DriveExport',
                            'WebDownload',
                            'SchemaImport'
                        ]
                    ],
                    'businessProcessId' => ['type' => 'string'],
                    'fileTransferCount' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'state',
                    'transferType',
                    'fileTransferCount'
                ]
            ],
            'TransferDetail' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'rev' => ['type' => 'string'],
                    'audit' => ['$ref' => '#/definitions/UserAudit'],
                    'name' => ['type' => 'string'],
                    'state' => [
                        'type' => 'string',
                        'enum' => [
                            'Draft',
                            'UploadInProgress',
                            'UploadCompleted',
                            'ImportInProgress',
                            'ImportCompleted',
                            'UploadCancelled',
                            'ImportCancelled',
                            'ImportFailed',
                            'Created',
                            'UploadFailed',
                            'Deleted',
                            'TransferReady',
                            'FileDeleteInProgress',
                            'TransferCleanup'
                        ]
                    ],
                    'businessProcessId' => ['type' => 'string'],
                    'transferType' => [
                        'type' => 'string',
                        'enum' => [
                            'FileUpload',
                            'DriveImport',
                            'DriveExport',
                            'WebDownload',
                            'SchemaImport'
                        ]
                    ],
                    'itemProgress' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'itemCount' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'itemsFailed' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'itemsCancelled' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'lastProgressStamp' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'fileTransferCount' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'state',
                    'transferType',
                    'itemProgress',
                    'itemCount',
                    'itemsFailed',
                    'itemsCancelled',
                    'lastProgressStamp',
                    'fileTransferCount'
                ]
            ],
            'Dc' => [
                'properties' => [
                    'contributor' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'coverage' => ['type' => 'string'],
                    'creator' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'date' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'format' => 'date-time'
                        ]
                    ],
                    'description' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'format' => ['type' => 'string'],
                    'identifier' => ['type' => 'string'],
                    'language' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'publisher' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'relation' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'rights' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'source' => ['type' => 'string'],
                    'subject' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'title' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'type' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Crs' => [
                'properties' => [
                    'autoBrightness' => ['type' => 'boolean'],
                    'autoContrast' => ['type' => 'boolean'],
                    'autoExposure' => ['type' => 'boolean'],
                    'autoShadows' => ['type' => 'boolean'],
                    'blueHue' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'blueSaturation' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'brightness' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'cameraProfile' => ['type' => 'string'],
                    'chromaticAberrationB' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'chromaticAberrationR' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'colorNoiseReduction' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'contrast' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'cropTop' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'cropLeft' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'cropBottom' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'cropRight' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'cropAngle' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'cropWidth' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'cropHeight' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'cropUnits' => [
                        'type' => 'string',
                        'enum' => [
                            'Pixels',
                            'Inches',
                            'Centimeters'
                        ]
                    ],
                    'exposure' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'greenHue' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'greenSaturation' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'hasCrop' => ['type' => 'boolean'],
                    'hasSettings' => ['type' => 'boolean'],
                    'luminanceSmoothing' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'rawFileName' => ['type' => 'string'],
                    'redHue' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'redSaturation' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'saturation' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'shadows' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'shadowTint' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'sharpness' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'temperature' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'tint' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'toneCurve' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'toneCurveName' => [
                        'type' => 'string',
                        'enum' => [
                            'Linear',
                            'MediumContrast',
                            'StrongContrast',
                            'Custom'
                        ]
                    ],
                    'version' => ['type' => 'string'],
                    'vignetteAmount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'vignetteMidpoint' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'whiteBalance' => [
                        'type' => 'string',
                        'enum' => [
                            'AsShot',
                            'Auto',
                            'Daylight',
                            'Cloudy',
                            'Shade',
                            'Tungsten',
                            'Fluorescent',
                            'Flash',
                            'Custom'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'CreatorContactInfo' => [
                'properties' => [
                    'address' => ['type' => 'string'],
                    'city' => ['type' => 'string'],
                    'country' => ['type' => 'string'],
                    'emailAddress' => ['type' => 'string'],
                    'phoneNumber' => ['type' => 'string'],
                    'postalCode' => ['type' => 'string'],
                    'region' => ['type' => 'string'],
                    'url' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'IptcCore' => [
                'properties' => [
                    'countryCode' => ['type' => 'string'],
                    'intellectualGenre' => ['type' => 'string'],
                    'scene' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'subjectCode' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'location' => ['type' => 'string'],
                    'creatorContactInfo' => ['$ref' => '#/definitions/CreatorContactInfo']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ArtworkOrObjectInfo' => [
                'properties' => [
                    'copyrightNotice' => ['type' => 'string'],
                    'creator' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'dateCreated' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'source' => ['type' => 'string'],
                    'sourceInventoryNumber' => ['type' => 'string'],
                    'title' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'LocationInfo' => [
                'properties' => [
                    'city' => ['type' => 'string'],
                    'countryCode' => ['type' => 'string'],
                    'countryName' => ['type' => 'string'],
                    'provinceState' => ['type' => 'string'],
                    'sublocation' => ['type' => 'string'],
                    'worldRegion' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'RegistryEntryInfo' => [
                'properties' => [
                    'registryItemIdentifier' => ['type' => 'string'],
                    'registryOrganisationIdentifier' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'IptcExt' => [
                'properties' => [
                    'additionalModelInformation' => ['type' => 'string'],
                    'artworkOrObject' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/ArtworkOrObjectInfo']
                    ],
                    'organisationInImageCode' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'controlledVocabularyTerm' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'locationShown' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/LocationInfo']
                    ],
                    'modelAge' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'integer',
                            'format' => 'int32'
                        ]
                    ],
                    'organisationInImageName' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'personInImage' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'digitalImageGUID' => ['type' => 'string'],
                    'digitalSourceType' => ['type' => 'string'],
                    'event' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'imageRegistryEntry' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/RegistryEntryInfo']
                    ],
                    'metadataLastEdited' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'locationCreated' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/LocationInfo']
                    ],
                    'maxAvailHeight' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'maxAvailWidth' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'IptcIIM' => [
                'properties' => [
                    'modelVersion' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'destination' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'fileFormat' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'fileFormatVersion' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'serviceIdentifier' => ['type' => 'string'],
                    'envelopeNumber' => ['type' => 'string'],
                    'productID' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'envelopePriority' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'dateSent' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'timeSent' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'uno' => ['type' => 'string'],
                    'recordVersion' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'objectTypeReference' => ['type' => 'string'],
                    'objectAttributeReference' => ['type' => 'string'],
                    'objectName' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'editStatus' => ['type' => 'string'],
                    'urgency' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'subjectReference' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'category' => ['type' => 'string'],
                    'supplementalCategory' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'fixtureIdentifier' => ['type' => 'string'],
                    'keywords' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'contentLocationCode' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'contentLocationName' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'releaseDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'releaseTime' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'expirationDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'expirationTime' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'specialInstruction' => ['type' => 'string'],
                    'actionAdvised' => ['type' => 'string'],
                    'referenceService' => ['type' => 'string'],
                    'referenceDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'referenceNumber' => ['type' => 'string'],
                    'dateCreated' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'timeCreated' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'digitalCreationDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'digitalCreationTime' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'originatingProgram' => ['type' => 'string'],
                    'programVersion' => ['type' => 'string'],
                    'byline' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'bylineTitle' => ['type' => 'string'],
                    'city' => ['type' => 'string'],
                    'sublocation' => ['type' => 'string'],
                    'provinceState' => ['type' => 'string'],
                    'countryPrimaryLocationCode' => ['type' => 'string'],
                    'countryPrimaryLocationName' => ['type' => 'string'],
                    'originalTransmissionReference' => ['type' => 'string'],
                    'headline' => ['type' => 'string'],
                    'credit' => ['type' => 'string'],
                    'source' => ['type' => 'string'],
                    'copyrightNotice' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'captionAbstract' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'writerEditor' => ['type' => 'string'],
                    'imageType' => ['type' => 'string'],
                    'imageOrientation' => ['type' => 'string'],
                    'languageIdentifier' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Lr' => [
                'properties' => ['hierarchicalSubject' => [
                    'type' => 'array',
                    'items' => ['type' => 'string']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Pdf' => [
                'properties' => [
                    'keywords' => ['type' => 'string'],
                    'pdfVersion' => ['type' => 'string'],
                    'producer' => ['type' => 'string'],
                    'trapped' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PhotoshopLayer' => [
                'properties' => [
                    'layerName' => ['type' => 'string'],
                    'layerText' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Photoshop' => [
                'properties' => [
                    'authorsPosition' => ['type' => 'string'],
                    'captionWriter' => ['type' => 'string'],
                    'category' => ['type' => 'string'],
                    'city' => ['type' => 'string'],
                    'colorMode' => [
                        'type' => 'string',
                        'enum' => [
                            'Bitmap',
                            'Grayscale',
                            'Indexed',
                            'RGB',
                            'CMYK',
                            'Multichannel',
                            'Duotone',
                            'LAB'
                        ]
                    ],
                    'country' => ['type' => 'string'],
                    'credit' => ['type' => 'string'],
                    'dateCreated' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'documentAncestors' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'headline' => ['type' => 'string'],
                    'history' => ['type' => 'string'],
                    'iccProfile' => ['type' => 'string'],
                    'instructions' => ['type' => 'string'],
                    'source' => ['type' => 'string'],
                    'state' => ['type' => 'string'],
                    'supplementalCategories' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'textLayers' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/PhotoshopLayer']
                    ],
                    'transmissionReference' => ['type' => 'string'],
                    'urgency' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'legacyIPTCDigest' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'LicenseeInfo' => [
                'properties' => [
                    'licenseeName' => ['type' => 'string'],
                    'licenseeID' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'EndUserInfo' => [
                'properties' => [
                    'endUserName' => ['type' => 'string'],
                    'endUserID' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'LicensorInfo' => [
                'properties' => [
                    'licensorName' => ['type' => 'string'],
                    'licensorID' => ['type' => 'string'],
                    'licensorStreetAddress' => ['type' => 'string'],
                    'licensorExtendedAddress' => ['type' => 'string'],
                    'licensorCity' => ['type' => 'string'],
                    'licensorRegion' => ['type' => 'string'],
                    'licensorPostalCode' => ['type' => 'string'],
                    'licensorCountry' => ['type' => 'string'],
                    'licensorTelephoneType1' => ['type' => 'string'],
                    'licensorTelephone1' => ['type' => 'string'],
                    'licensorTelephoneType2' => ['type' => 'string'],
                    'licensorTelephone2' => ['type' => 'string'],
                    'licensorEmail' => ['type' => 'string'],
                    'licensorURL' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'CopyrightOwnerInfo' => [
                'properties' => [
                    'copyrightOwnerName' => ['type' => 'string'],
                    'copyrightOwnerID' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ImageCreatorInfo' => [
                'properties' => [
                    'imageCreatorName' => ['type' => 'string'],
                    'imageCreatorID' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ImageSupplierInfo' => [
                'properties' => [
                    'imageSupplierName' => ['type' => 'string'],
                    'imageSupplierID' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Plus' => [
                'properties' => [
                    'version' => ['type' => 'string'],
                    'licensee' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/LicenseeInfo']
                    ],
                    'licenseeID' => ['type' => 'string'],
                    'licenseeName' => ['type' => 'string'],
                    'endUser' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/EndUserInfo']
                    ],
                    'endUserID' => ['type' => 'string'],
                    'endUserName' => ['type' => 'string'],
                    'licensor' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/LicensorInfo']
                    ],
                    'licensorNotes' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'mediaSummaryCode' => ['type' => 'string'],
                    'licenseStartDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'licenseEndDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'mediaConstraints' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'regionConstraints' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'productOrServiceConstraints' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'imageFileConstraints' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'imageAlterationConstraints' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'imageDuplicationConstraints' => ['type' => 'string'],
                    'modelReleaseStatus' => ['type' => 'string'],
                    'modelReleaseID' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'minorModelAgeDisclosure' => ['type' => 'string'],
                    'propertyReleaseStatus' => ['type' => 'string'],
                    'propertyReleaseID' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'otherConstraints' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'creditLineRequired' => ['type' => 'string'],
                    'adultContentWarning' => ['type' => 'string'],
                    'otherLicenseRequirements' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'termsAndConditionsText' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'termsAndConditionsURL' => ['type' => 'string'],
                    'otherConditions' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'imageType' => ['type' => 'string'],
                    'licensorImageID' => ['type' => 'string'],
                    'fileNameAsDelivered' => ['type' => 'string'],
                    'imageFileFormatAsDelivered' => ['type' => 'string'],
                    'imageFileSizeAsDelivered' => ['type' => 'string'],
                    'copyrightStatus' => ['type' => 'string'],
                    'copyrightRegistrationNumber' => ['type' => 'string'],
                    'firstPublicationDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'copyrightOwner' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/CopyrightOwnerInfo']
                    ],
                    'copyrightOwnerImageID' => ['type' => 'string'],
                    'imageCreator' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/ImageCreatorInfo']
                    ],
                    'imageCreatorImageID' => ['type' => 'string'],
                    'imageSupplier' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/ImageSupplierInfo']
                    ],
                    'imageSupplierImageID' => ['type' => 'string'],
                    'licenseeImageID' => ['type' => 'string'],
                    'licenseeImageNotes' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'otherImageInfo' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'licenseID' => ['type' => 'string'],
                    'licensorTransactionID' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'licenseeTransactionID' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'licenseeProjectReference' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'licenseTransactionDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'reuse' => ['type' => 'string'],
                    'otherLicenseDocuments' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'otherLicenseInfo' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'custom1' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'object',
                            'additionalProperties' => ['type' => 'string']
                        ]
                    ],
                    'custom2' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'object',
                            'additionalProperties' => ['type' => 'string']
                        ]
                    ],
                    'custom3' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'object',
                            'additionalProperties' => ['type' => 'string']
                        ]
                    ],
                    'custom4' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'object',
                            'additionalProperties' => ['type' => 'string']
                        ]
                    ],
                    'custom5' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'object',
                            'additionalProperties' => ['type' => 'string']
                        ]
                    ],
                    'custom6' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'object',
                            'additionalProperties' => ['type' => 'string']
                        ]
                    ],
                    'custom7' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'object',
                            'additionalProperties' => ['type' => 'string']
                        ]
                    ],
                    'custom8' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'object',
                            'additionalProperties' => ['type' => 'string']
                        ]
                    ],
                    'custom9' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'object',
                            'additionalProperties' => ['type' => 'string']
                        ]
                    ],
                    'custom10' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'object',
                            'additionalProperties' => ['type' => 'string']
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Tiff' => [
                'properties' => [
                    'artist' => ['type' => 'string'],
                    'bitsPerSample' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'integer',
                            'format' => 'int32'
                        ]
                    ],
                    'compression' => [
                        'type' => 'string',
                        'enum' => [
                            'Uncompressed',
                            'CCITT',
                            'T4',
                            'T6',
                            'LZW',
                            'OJPEG',
                            'JPEG',
                            'Deflate',
                            'T82',
                            'T43',
                            'NeXT',
                            'ARW',
                            'RAW',
                            'SRW',
                            'Group3_1D',
                            'PackBits',
                            'ThunderScan',
                            'KDC',
                            'RasterPadding',
                            'LineWork',
                            'HighContinuous',
                            'BinaryLineWork',
                            'PixarFilm',
                            'PixarLog',
                            'DCS',
                            'JBIG',
                            'JPEG2000',
                            'NEF',
                            'JBIG2',
                            'DCR',
                            'PEF'
                        ]
                    ],
                    'copyright' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'dateTime' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'imageDescription' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'imageLength' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'imageWidth' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'make' => ['type' => 'string'],
                    'model' => ['type' => 'string'],
                    'orientation' => [
                        'type' => 'string',
                        'enum' => [
                            'None',
                            'TopRowLeftColumn',
                            'TopRowRightColumn',
                            'BottomRowLeftColumn',
                            'BottomRowRightColumn',
                            'LeftRowTopColumn',
                            'RightRowTopColumn',
                            'RightRowBottomColumn',
                            'LeftRowBottomColumn',
                            'Unknown'
                        ]
                    ],
                    'photometricInterpretation' => [
                        'type' => 'string',
                        'enum' => [
                            'WhiteIsZero',
                            'BlackIsZero',
                            'RGB',
                            'Palette',
                            'TransparencyMask',
                            'CMYK',
                            'YCbCr',
                            'CIELab',
                            'ICCLab',
                            'ITULab',
                            'ColorFilterArray',
                            'LogL',
                            'LogLUV',
                            'LinearRaw'
                        ]
                    ],
                    'planarConfiguration' => [
                        'type' => 'string',
                        'enum' => [
                            'Chunky',
                            'Planar',
                            'Line'
                        ]
                    ],
                    'primaryChromaticities' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'referenceBlackWhite' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'resolutionUnit' => [
                        'type' => 'string',
                        'enum' => [
                            'None',
                            'Inch',
                            'Centimeter'
                        ]
                    ],
                    'samplesPerPixel' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'software' => ['type' => 'string'],
                    'transferFunction' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'integer',
                            'format' => 'int32'
                        ]
                    ],
                    'whitePoint' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'xResolution' => ['type' => 'string'],
                    'yResolution' => ['type' => 'string'],
                    'yCbCrCoefficients' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'yCbCrPositioning' => [
                        'type' => 'string',
                        'enum' => [
                            'Centered',
                            'Cosited'
                        ]
                    ],
                    'yCbCrSubSampling' => [
                        'type' => 'string',
                        'enum' => [
                            'YCbCr111',
                            'YCbCr422',
                            'YCbCr420'
                        ]
                    ],
                    'nativeDigest' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'XmpGImg' => [
                'properties' => [
                    'format' => [
                        'type' => 'string',
                        'enum' => ['JPEG']
                    ],
                    'width' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'height' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'image' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Xmp' => [
                'properties' => [
                    'baseURL' => ['type' => 'string'],
                    'createDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'creatorTool' => ['type' => 'string'],
                    'identifier' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'label' => ['type' => 'string'],
                    'metadataDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'modifyDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'nickname' => ['type' => 'string'],
                    'rating' => [
                        'type' => 'string',
                        'enum' => [
                            'Rejected',
                            'Unrated',
                            'One',
                            'Two',
                            'Three',
                            'Four',
                            'Five'
                        ]
                    ],
                    'thumbnails' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/XmpGImg']
                    ],
                    'pageInfo' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/XmpGImg']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Job' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'name' => ['type' => 'string'],
                    'url' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'XmpBJ' => [
                'properties' => ['jobRef' => [
                    'type' => 'array',
                    'items' => ['$ref' => '#/definitions/Job']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'TimeCode' => [
                'properties' => [
                    'timeFormat' => [
                        'type' => 'string',
                        'enum' => [
                            'Timecode24',
                            'Timecode25',
                            'Timecode2997Drop',
                            'Timecode2997NonDrop',
                            'Timecode30',
                            'Timecode50',
                            'Timecode5994Drop',
                            'Timecode5994NonDrop',
                            'Timecode60',
                            'Timecode23976'
                        ]
                    ],
                    'timeValue' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Time' => [
                'properties' => [
                    'scale' => ['type' => 'string'],
                    'value' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'BeatSpliceStretch' => [
                'properties' => [
                    'riseInDecibel' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'riseInTimeDuration' => ['$ref' => '#/definitions/Time'],
                    'useFileBeatsMarker' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Media' => [
                'properties' => [
                    'duration' => ['$ref' => '#/definitions/Time'],
                    'managed' => ['type' => 'boolean'],
                    'path' => ['type' => 'string'],
                    'startTime' => ['$ref' => '#/definitions/Time'],
                    'track' => ['type' => 'string'],
                    'webStatement' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Marker' => [
                'properties' => [
                    'comment' => ['type' => 'string'],
                    'cuePointParams' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'cuePointType' => ['type' => 'string'],
                    'duration' => ['type' => 'string'],
                    'location' => ['type' => 'string'],
                    'name' => ['type' => 'string'],
                    'probability' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'speaker' => ['type' => 'string'],
                    'startTime' => ['type' => 'string'],
                    'target' => ['type' => 'string'],
                    'type' => [
                        'type' => 'string',
                        'enum' => [
                            'Chapter',
                            'Cue',
                            'Index',
                            'Speech',
                            'Track'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ProjectLink' => [
                'properties' => [
                    'path' => ['type' => 'string'],
                    'type' => [
                        'type' => 'string',
                        'enum' => [
                            'Movie',
                            'Still',
                            'Audio',
                            'Custom'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ResampleStretch' => [
                'properties' => ['quality' => [
                    'type' => 'string',
                    'enum' => [
                        'High',
                        'Medium',
                        'Low'
                    ]
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'TimeScaleStretch' => [
                'properties' => [
                    'frameOverlappingPercentage' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'frameSize' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'quality' => [
                        'type' => 'string',
                        'enum' => [
                            'High',
                            'Medium',
                            'Low'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Track' => [
                'properties' => [
                    'frameRate' => ['type' => 'string'],
                    'markers' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/Marker']
                    ],
                    'trackName' => ['type' => 'string'],
                    'trackType' => [
                        'type' => 'string',
                        'enum' => [
                            'Chapter',
                            'Cue',
                            'Index',
                            'Speech',
                            'Track'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'XmpG' => [
                'properties' => [
                    'a' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'b' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'l' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'black' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'cyan' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'magenta' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'yellow' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'blue' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'green' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'red' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'mode' => [
                        'type' => 'string',
                        'enum' => [
                            'CMYK',
                            'RGB',
                            'LAB'
                        ]
                    ],
                    'swatchName' => ['type' => 'string'],
                    'type' => [
                        'type' => 'string',
                        'enum' => [
                            'Process',
                            'Spot'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Dimension' => [
                'properties' => [
                    'height' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'width' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'unit' => [
                        'type' => 'string',
                        'enum' => [
                            'Inch',
                            'Millimeter',
                            'Centimeter',
                            'Pixel',
                            'Pica',
                            'Point'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'XmpDM' => [
                'properties' => [
                    'absPeakAudioFilePath' => ['type' => 'string'],
                    'artist' => ['type' => 'string'],
                    'album' => ['type' => 'string'],
                    'altTapeName' => ['type' => 'string'],
                    'altTimecode' => ['$ref' => '#/definitions/TimeCode'],
                    'audioChannelType' => [
                        'type' => 'string',
                        'enum' => [
                            'CHANNEL_MONO',
                            'CHANNEL_STEREO',
                            'CHANNEL_5_1',
                            'CHANNEL_7_1',
                            'CHANNEL_16',
                            'CHANNEL_OTHER'
                        ]
                    ],
                    'audioCompressor' => ['type' => 'string'],
                    'audioSampleRate' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'audioSampleType' => [
                        'type' => 'string',
                        'enum' => [
                            'SAMPLE_8_INT',
                            'SAMPLE_16_INT',
                            'SAMPLE_24_INT',
                            'SAMPLE_32_INT',
                            'SAMPLE_32_FLOAT',
                            'SAMPLE_COMPRESSED',
                            'SAMPLE_PACKED',
                            'SAMPLE_OTHER'
                        ]
                    ],
                    'beatSpliceParams' => ['$ref' => '#/definitions/BeatSpliceStretch'],
                    'cameraAngle' => [
                        'type' => 'string',
                        'enum' => [
                            'ANGLE_LOW',
                            'ANGLE_EYE_LEVEL',
                            'ANGLE_HIGH',
                            'ANGLE_OVERHEAD_SHOT',
                            'ANGLE_BIRDS_EYE_SHOT',
                            'ANGLE_DUTCH',
                            'ANGLE_POV',
                            'ANGLE_OVER_THE_SHOULDER',
                            'ANGLE_REACTION_SHOT'
                        ]
                    ],
                    'cameraLabel' => ['type' => 'string'],
                    'cameraModel' => ['type' => 'string'],
                    'cameraMove' => [
                        'type' => 'string',
                        'enum' => [
                            'MOVE_AERIAL',
                            'MOVE_BOOM_UP',
                            'MOVE_BOOM_DOWN',
                            'MOVE_CRANE_UP',
                            'MOVE_CRANE_DOWN',
                            'MOVE_DOLLY_IN',
                            'MOVE_DOLLY_OUT',
                            'MOVE_PAN_LEFT',
                            'MOVE_PAN_RIGHT',
                            'MOVE_PEDESTAL_UP',
                            'MOVE_PEDESTAL_DOWN',
                            'MOVE_TILT_UP',
                            'MOVE_TILT_DOWN',
                            'MOVE_TRACKING',
                            'MOVE_TRUCK_LEFT',
                            'MOVE_TRUCK_RIGHT',
                            'MOVE_ZOOM_IN',
                            'MOVE_ZOOM_OUT'
                        ]
                    ],
                    'client' => ['type' => 'string'],
                    'comment' => ['type' => 'string'],
                    'composer' => ['type' => 'string'],
                    'contributedMedia' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/Media']
                    ],
                    'director' => ['type' => 'string'],
                    'directorPhotography' => ['type' => 'string'],
                    'duration' => ['$ref' => '#/definitions/Time'],
                    'engineer' => ['type' => 'string'],
                    'fileDataRate' => ['type' => 'string'],
                    'genre' => ['type' => 'string'],
                    'good' => ['type' => 'boolean'],
                    'instrument' => ['type' => 'string'],
                    'introTime' => ['$ref' => '#/definitions/Time'],
                    'key' => [
                        'type' => 'string',
                        'enum' => [
                            'KEY_C',
                            'KEY_C_SHARP',
                            'KEY_D',
                            'KEY_D_SHARP',
                            'KEY_E',
                            'KEY_F',
                            'KEY_F_SHARP',
                            'KEY_G',
                            'KEY_G_SHARP',
                            'KEY_A',
                            'KEY_A_SHARP',
                            'KEY_B'
                        ]
                    ],
                    'logComment' => ['type' => 'string'],
                    'loop' => ['type' => 'boolean'],
                    'numberOfBeats' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'markers' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/Marker']
                    ],
                    'outCue' => ['$ref' => '#/definitions/Time'],
                    'projectName' => ['type' => 'string'],
                    'projectRef' => ['$ref' => '#/definitions/ProjectLink'],
                    'pullDown' => [
                        'type' => 'string',
                        'enum' => [
                            'PULLDOWN_WSSWW',
                            'PULLDOWN_SSWWW',
                            'PULLDOWN_SWWWS',
                            'PULLDOWN_WWWSS',
                            'PULLDOWN_WWSSW',
                            'PULLDOWN_WWWSW',
                            'PULLDOWN_WWSWW',
                            'PULLDOWN_WSWWW',
                            'PULLDOWN_SWWWW',
                            'PULLDOWN_WWWWS'
                        ]
                    ],
                    'relativePeakAudioFilePath' => ['type' => 'string'],
                    'relativeTimestamp' => ['$ref' => '#/definitions/Time'],
                    'releaseDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'resampleParams' => ['$ref' => '#/definitions/ResampleStretch'],
                    'scaleType' => [
                        'type' => 'string',
                        'enum' => [
                            'SCALE_MAJOR',
                            'SCALE_MINOR',
                            'SCALE_BOTH',
                            'SCALE_NEITHER'
                        ]
                    ],
                    'scene' => ['type' => 'string'],
                    'shotDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'shotDay' => ['type' => 'string'],
                    'shotLocation' => ['type' => 'string'],
                    'shotName' => ['type' => 'string'],
                    'shotNumber' => ['type' => 'string'],
                    'shotSize' => [
                        'type' => 'string',
                        'enum' => [
                            'SHOT_ECU',
                            'SHOT_MCU',
                            'SHOT_CU',
                            'SHOT_MS',
                            'SHOT_WS',
                            'SHOT_MWS',
                            'SHOT_EWS'
                        ]
                    ],
                    'speakerPlacement' => ['type' => 'string'],
                    'startTimecode' => ['$ref' => '#/definitions/TimeCode'],
                    'stretchMode' => [
                        'type' => 'string',
                        'enum' => [
                            'STRETCH_FIXED_LENGTH',
                            'STRETCH_TIME_SCALE',
                            'STRETCH_RESAMPLE',
                            'STRETCH_BEAT_SPLICE',
                            'STRETCH_HYBRID'
                        ]
                    ],
                    'takeNumber' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'tapeName' => ['type' => 'string'],
                    'tempo' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'timeScaleParams' => ['$ref' => '#/definitions/TimeScaleStretch'],
                    'timeSignature' => [
                        'type' => 'string',
                        'enum' => [
                            'TIME_2_4',
                            'TIME_3_4',
                            'TIME_4_4',
                            'TIME_5_4',
                            'TIME_7_4',
                            'TIME_6_8',
                            'TIME_9_8',
                            'TIME_12_8',
                            'TIME_OTHER'
                        ]
                    ],
                    'trackNumber' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'tracks' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/Track']
                    ],
                    'videoAlphaMode' => [
                        'type' => 'string',
                        'enum' => [
                            'ALPHA_MODE_STRAIGHT',
                            'ALPHA_MODE_PREMULTIPLIED',
                            'ALPHA_MODE_NONE'
                        ]
                    ],
                    'videoAlphaPremultipleColor' => ['$ref' => '#/definitions/XmpG'],
                    'videoAlphaUnityIsTransparent' => ['type' => 'boolean'],
                    'videoColorSpace' => [
                        'type' => 'string',
                        'enum' => [
                            'COLOR_SPACE_SRGB',
                            'COLOR_SPACE_CCIR_601',
                            'COLOR_SPACE_CCIR_709'
                        ]
                    ],
                    'videoCompressor' => ['type' => 'string'],
                    'videoFieldOrder' => [
                        'type' => 'string',
                        'enum' => [
                            'FIELD_ORDER_UPPER',
                            'FIELD_ORDER_LOWER',
                            'FIELD_ORDER_PROGRESSIVE'
                        ]
                    ],
                    'videoFrameRate' => [
                        'type' => 'string',
                        'enum' => [
                            'FRAME_RATE_24',
                            'FRAME_RATE_NTSC',
                            'FRAME_RATE_PAL'
                        ]
                    ],
                    'videoFrameSize' => ['$ref' => '#/definitions/Dimension'],
                    'videoPixelDepth' => [
                        'type' => 'string',
                        'enum' => [
                            'PIXEL_DEPTH_8_INT',
                            'PIXEL_DEPTH_16_INT',
                            'PIXEL_DEPTH_24_INT',
                            'PIXEL_DEPTH_32_INT',
                            'PIXEL_DEPTH_32_FLOAT',
                            'PIXEL_DEPTH_OTHER'
                        ]
                    ],
                    'videoPixelAspectRatio' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Xmpidq' => [
                'properties' => ['scheme' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Reference' => [
                'properties' => [
                    'alternatePaths' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'documentID' => ['type' => 'string'],
                    'filePath' => ['type' => 'string'],
                    'fromPart' => ['type' => 'string'],
                    'instanceID' => ['type' => 'string'],
                    'lastModifyDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'manager' => ['type' => 'string'],
                    'managerVariant' => ['type' => 'string'],
                    'manageTo' => ['type' => 'string'],
                    'manageUI' => ['type' => 'string'],
                    'maskMarkers' => [
                        'type' => 'string',
                        'enum' => [
                            'All',
                            'None'
                        ]
                    ],
                    'originalDocumentID' => ['type' => 'string'],
                    'partMapping' => ['type' => 'string'],
                    'renditionClass' => ['type' => 'string'],
                    'renditionParams' => ['type' => 'string'],
                    'toPart' => ['type' => 'string'],
                    'versionID' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'XmpMM' => [
                'properties' => [
                    'derivedFrom' => ['$ref' => '#/definitions/Reference'],
                    'documentID' => ['type' => 'string'],
                    'history' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/Event']
                    ],
                    'ingredients' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/Reference']
                    ],
                    'instanceID' => ['type' => 'string'],
                    'managedFrom' => ['$ref' => '#/definitions/Reference'],
                    'manager' => ['type' => 'string'],
                    'manageTo' => ['type' => 'string'],
                    'manageUI' => ['type' => 'string'],
                    'managerVariant' => ['type' => 'string'],
                    'originalDocumentID' => ['type' => 'string'],
                    'renditionClass' => ['type' => 'string'],
                    'renditionParams' => ['type' => 'string'],
                    'versionID' => ['type' => 'string'],
                    'versions' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/VersionInfo']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'XmpNote' => [
                'properties' => ['hasExtendedXMP' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'XmpRights' => [
                'properties' => [
                    'certificate' => ['type' => 'string'],
                    'marked' => ['type' => 'boolean'],
                    'owner' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'usageTerms' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'webStatement' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Font' => [
                'properties' => [
                    'childFontFiles' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'composite' => ['type' => 'boolean'],
                    'fontFace' => ['type' => 'string'],
                    'fontFamily' => ['type' => 'string'],
                    'fontFileName' => ['type' => 'string'],
                    'fontName' => ['type' => 'string'],
                    'fontType' => [
                        'type' => 'string',
                        'enum' => [
                            'TrueType',
                            'Type1',
                            'OpenType',
                            'OpenTypeCFF'
                        ]
                    ],
                    'versionString' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'XmpTPg' => [
                'properties' => [
                    'colorants' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/XmpG']
                    ],
                    'fonts' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/Font']
                    ],
                    'maxPageSize' => ['$ref' => '#/definitions/Dimension'],
                    'nPages' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'plateNames' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'XmpMetadata' => [
                'properties' => [
                    'dc' => ['$ref' => '#/definitions/Dc'],
                    'crs' => ['$ref' => '#/definitions/Crs'],
                    'iptcCore' => ['$ref' => '#/definitions/IptcCore'],
                    'iptcExt' => ['$ref' => '#/definitions/IptcExt'],
                    'iptcIIM' => ['$ref' => '#/definitions/IptcIIM'],
                    'lr' => ['$ref' => '#/definitions/Lr'],
                    'pdf' => ['$ref' => '#/definitions/Pdf'],
                    'photoshop' => ['$ref' => '#/definitions/Photoshop'],
                    'plus' => ['$ref' => '#/definitions/Plus'],
                    'tiff' => ['$ref' => '#/definitions/Tiff'],
                    'xmp' => ['$ref' => '#/definitions/Xmp'],
                    'xmpBJ' => ['$ref' => '#/definitions/XmpBJ'],
                    'xmpDM' => ['$ref' => '#/definitions/XmpDM'],
                    'xmpG' => ['$ref' => '#/definitions/XmpG'],
                    'xmpGImg' => ['$ref' => '#/definitions/XmpGImg'],
                    'xmpidq' => ['$ref' => '#/definitions/Xmpidq'],
                    'xmpMM' => ['$ref' => '#/definitions/XmpMM'],
                    'xmpNote' => ['$ref' => '#/definitions/XmpNote'],
                    'xmpRights' => ['$ref' => '#/definitions/XmpRights'],
                    'xmpTPg' => ['$ref' => '#/definitions/XmpTPg']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'CFAPattern' => [
                'properties' => [
                    'columns' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'rows' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'values' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'integer',
                            'format' => 'int32'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DeviceSettings' => [
                'properties' => [
                    'columns' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'rows' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'settings' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Flash' => [
                'properties' => [
                    'fired' => ['type' => 'boolean'],
                    'return' => [
                        'type' => 'string',
                        'enum' => [
                            'NoStrobeReturnDetection',
                            'StrobeReturnLightNotDetected',
                            'StrobeReturnLightDetected'
                        ]
                    ],
                    'mode' => [
                        'type' => 'string',
                        'enum' => [
                            'Unknown',
                            'CompulsoryFlashFiring',
                            'CompulsoryFlashSuppression',
                            'AutoMode'
                        ]
                    ],
                    'function' => ['type' => 'boolean'],
                    'redEyeMode' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'GPSCoordinate' => [
                'properties' => [
                    'lon' => [
                        'type' => 'number',
                        'format' => 'double'
                    ],
                    'lat' => [
                        'type' => 'number',
                        'format' => 'double'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'OECF' => [
                'properties' => [
                    'columns' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'rows' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'values' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'names' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SFR' => [
                'properties' => [
                    'columns' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'rows' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'values' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'names' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Exif' => [
                'properties' => [
                    'apertureValue' => ['type' => 'string'],
                    'brightnessValue' => ['type' => 'string'],
                    'cfaPattern' => ['$ref' => '#/definitions/CFAPattern'],
                    'colorSpace' => [
                        'type' => 'string',
                        'enum' => [
                            'None',
                            'sRGB',
                            'AdobeRGB',
                            'Uncalibrated'
                        ]
                    ],
                    'componentsConfiguration' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'integer',
                            'format' => 'int32'
                        ]
                    ],
                    'compressedBitsPerPixel' => ['type' => 'string'],
                    'contrast' => [
                        'type' => 'string',
                        'enum' => [
                            'Normal',
                            'Soft',
                            'Hard',
                            'Unknown'
                        ]
                    ],
                    'customRendered' => [
                        'type' => 'string',
                        'enum' => [
                            'NormalProcess',
                            'CustomProcess'
                        ]
                    ],
                    'dateTimeOriginal' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'dateTimeDigitized' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'deviceSettingDescription' => ['$ref' => '#/definitions/DeviceSettings'],
                    'digitalZoomRatio' => ['type' => 'string'],
                    'exifVersion' => [
                        'type' => 'string',
                        'enum' => [
                            'V210',
                            'V220',
                            'V221',
                            'V222',
                            'V230'
                        ]
                    ],
                    'exposureBiasValue' => ['type' => 'string'],
                    'exposureIndex' => ['type' => 'string'],
                    'exposureMode' => [
                        'type' => 'string',
                        'enum' => [
                            'Auto',
                            'Manual',
                            'AutoBracket'
                        ]
                    ],
                    'exposureProgram' => [
                        'type' => 'string',
                        'enum' => [
                            'Undefined',
                            'Manual',
                            'NormalProgram',
                            'AperturePriority',
                            'ShutterPriority',
                            'CreativeProgram',
                            'ActionProgram',
                            'PortraitMode',
                            'LandscapeMode',
                            'Unknown'
                        ]
                    ],
                    'exposureTime' => ['type' => 'string'],
                    'fileSource' => [
                        'type' => 'string',
                        'enum' => [
                            'Other',
                            'TransparentScanner',
                            'ReflexScanner',
                            'DSC'
                        ]
                    ],
                    'flash' => ['$ref' => '#/definitions/Flash'],
                    'flashEnergy' => ['type' => 'string'],
                    'flashpixVersion' => [
                        'type' => 'string',
                        'enum' => [
                            'V100',
                            'V101',
                            'V110'
                        ]
                    ],
                    'fNumber' => ['type' => 'string'],
                    'focalLength' => ['type' => 'string'],
                    'focalLengthIn35mmFilm' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'focalPlaneResolutionUnit' => [
                        'type' => 'string',
                        'enum' => [
                            'None',
                            'Inch',
                            'Meter',
                            'Centimeter',
                            'Millimeter',
                            'Micrometer'
                        ]
                    ],
                    'focalPlaneXResolution' => ['type' => 'string'],
                    'focalPlaneYResolution' => ['type' => 'string'],
                    'gainControl' => [
                        'type' => 'string',
                        'enum' => [
                            'None',
                            'LowGainUp',
                            'HighGainUp',
                            'LowGainDown',
                            'HighGainDown'
                        ]
                    ],
                    'gpsAltitude' => ['type' => 'string'],
                    'gpsAltitudeRef' => [
                        'type' => 'string',
                        'enum' => [
                            'AboveSeaLevel',
                            'BelowSeaLevel'
                        ]
                    ],
                    'gpsAreaInformation' => ['type' => 'string'],
                    'gpsDestBearing' => ['type' => 'string'],
                    'gpsDestBearingRef' => [
                        'type' => 'string',
                        'enum' => [
                            'TrueDirection',
                            'MagneticDirection'
                        ]
                    ],
                    'gpsDestDistance' => ['type' => 'string'],
                    'gpsDestDistanceRef' => [
                        'type' => 'string',
                        'enum' => [
                            'Kilometers',
                            'Miles',
                            'Knots'
                        ]
                    ],
                    'gpsDestLatitude' => ['type' => 'string'],
                    'gpsDestLongitude' => ['type' => 'string'],
                    'gpsDifferential' => [
                        'type' => 'string',
                        'enum' => [
                            'WithoutCorrection',
                            'WithCorrection'
                        ]
                    ],
                    'gpsdop' => ['type' => 'string'],
                    'gpsImgDirection' => ['type' => 'string'],
                    'gpsImgDirectionRef' => [
                        'type' => 'string',
                        'enum' => [
                            'TrueDirection',
                            'MagneticDirection'
                        ]
                    ],
                    'gpsCoordinate' => ['$ref' => '#/definitions/GPSCoordinate'],
                    'gpsLatitude' => ['type' => 'string'],
                    'gpsLongitude' => ['type' => 'string'],
                    'gpsMapDatum' => ['type' => 'string'],
                    'gpsMeasureMode' => ['type' => 'string'],
                    'gpsProcessingMethod' => ['type' => 'string'],
                    'gpsSatellites' => ['type' => 'string'],
                    'gpsSpeed' => ['type' => 'string'],
                    'gpsSpeedRef' => [
                        'type' => 'string',
                        'enum' => [
                            'KilometersPerHour',
                            'MilesPerHour',
                            'Knots'
                        ]
                    ],
                    'gpsStatus' => [
                        'type' => 'string',
                        'enum' => [
                            'MeasurementInProgress',
                            'MeasurementIsInteroperability'
                        ]
                    ],
                    'gpsTimeStamp' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'gpsTrack' => ['type' => 'string'],
                    'gpsTrackRef' => ['type' => 'string'],
                    'gpsVersionID' => ['type' => 'string'],
                    'imageUniqueID' => ['type' => 'string'],
                    'isoSpeedRatings' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'integer',
                            'format' => 'int32'
                        ]
                    ],
                    'lightSource' => [
                        'type' => 'string',
                        'enum' => [
                            'Unidentified',
                            'Daylight',
                            'Fluorescent',
                            'Tungsten',
                            'Flash',
                            'FineWeather',
                            'CloudyWeather',
                            'Shade',
                            'DaylightFluorescent',
                            'DayWhiteFluorescent',
                            'CoolWhiteFluorescent',
                            'WhiteFluorescent',
                            'StandardIlluminantA',
                            'StandardIlluminantB',
                            'StandardIlluminantC',
                            'D55Illuminant',
                            'D65Illuminant',
                            'D75Illuminant',
                            'D50Illuminant',
                            'ISOStudioTungsten',
                            'Other'
                        ]
                    ],
                    'maxApertureValue' => ['type' => 'string'],
                    'meteringMode' => [
                        'type' => 'string',
                        'enum' => [
                            'Unidentified',
                            'Average',
                            'CenterWeightedAverage',
                            'Spot',
                            'MultiSpot',
                            'Pattern',
                            'Partial',
                            'Reserved',
                            'Other'
                        ]
                    ],
                    'oecf' => ['$ref' => '#/definitions/OECF'],
                    'pixelXDimension' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'pixelYDimension' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'relatedSoundFile' => ['type' => 'string'],
                    'saturation' => [
                        'type' => 'string',
                        'enum' => [
                            'Normal',
                            'Low',
                            'High',
                            'Unknown'
                        ]
                    ],
                    'sceneCaptureType' => [
                        'type' => 'string',
                        'enum' => [
                            'Standard',
                            'Landscape',
                            'Portrait',
                            'NightScene'
                        ]
                    ],
                    'sceneType' => [
                        'type' => 'string',
                        'enum' => ['DirectlyPhotographedImage']
                    ],
                    'sensingMethod' => [
                        'type' => 'string',
                        'enum' => [
                            'Undefined',
                            'MonochromeArea',
                            'OneChipColourAreaSensor',
                            'TwoChipColourAreaSensor',
                            'ThreeChipColourAreaSensor',
                            'ColourSequentialAreaSensor',
                            'MonochromeLinearArea',
                            'TrilinearSensor',
                            'ColourSequentialLinearSensor'
                        ]
                    ],
                    'sharpness' => [
                        'type' => 'string',
                        'enum' => [
                            'Normal',
                            'Soft',
                            'Hard',
                            'Unknown'
                        ]
                    ],
                    'shutterSpeedValue' => ['type' => 'string'],
                    'spatialFrequencyResponse' => ['$ref' => '#/definitions/SFR'],
                    'spectralSensitivity' => ['type' => 'string'],
                    'subjectArea' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'integer',
                            'format' => 'int32'
                        ]
                    ],
                    'subjectDistance' => ['type' => 'string'],
                    'subjectDistanceRange' => [
                        'type' => 'string',
                        'enum' => [
                            'Unknown',
                            'Macro',
                            'CloseView',
                            'DistantView'
                        ]
                    ],
                    'subjectLocation' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'integer',
                            'format' => 'int32'
                        ]
                    ],
                    'userComment' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'whiteBalance' => [
                        'type' => 'string',
                        'enum' => [
                            'Auto',
                            'Manual',
                            'Unknown'
                        ]
                    ],
                    'nativeDigest' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ExifAux' => [
                'properties' => [
                    'lens' => ['type' => 'string'],
                    'serialNumber' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ExifMetadata' => [
                'properties' => [
                    'exif' => ['$ref' => '#/definitions/Exif'],
                    'exifAux' => ['$ref' => '#/definitions/ExifAux']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FileMetadata' => [
                'properties' => [
                    'names' => ['type' => 'object'],
                    'descriptions' => ['type' => 'object'],
                    'fileExtension' => ['type' => 'string'],
                    'fileName' => ['type' => 'string'],
                    'filePath' => ['type' => 'string'],
                    'fileSizeInBytes' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'sha1Hash' => ['type' => 'string'],
                    'xmpMetadata' => ['$ref' => '#/definitions/XmpMetadata'],
                    'exifMetadata' => ['$ref' => '#/definitions/ExifMetadata'],
                    'language' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DriveMetadataAudit' => [
                'properties' => [
                    'owner' => ['type' => 'string'],
                    'modified' => ['type' => 'string'],
                    'opened' => ['type' => 'string'],
                    'created' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DriveMetadata' => [
                'properties' => [
                    'location' => ['type' => 'string'],
                    'fileType' => ['type' => 'string'],
                    'audit' => ['$ref' => '#/definitions/DriveMetadataAudit'],
                    'description' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'OutputItem' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'filePath' => ['type' => 'string'],
                    'outputSource' => [
                        'type' => 'string',
                        'enum' => [
                            'Rendered',
                            'Embedded'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['outputSource']
            ],
            'FileTransferDetail' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'rev' => ['type' => 'string'],
                    'name' => ['type' => 'string'],
                    'identifier' => ['type' => 'string'],
                    'audit' => ['$ref' => '#/definitions/UserAudit'],
                    'transferId' => ['type' => 'string'],
                    'state' => [
                        'type' => 'string',
                        'enum' => [
                            'Draft',
                            'UploadInProgress',
                            'UploadCompleted',
                            'DataExtractionInProgress',
                            'DataExtractionDone',
                            'ImportInProgress',
                            'ImportCompleted',
                            'UploadCancelled',
                            'ImportCancelled',
                            'UploadFailed',
                            'ImportFailed',
                            'DeleteInProgress',
                            'Deleted',
                            'CleanupInProgress',
                            'CleanupCompleted'
                        ]
                    ],
                    'entityType' => [
                        'type' => 'string',
                        'enum' => [
                            'Content',
                            'BasicShare',
                            'EmbedShare',
                            'Metadata',
                            'FileTransfer'
                        ]
                    ],
                    'fileMetadata' => ['$ref' => '#/definitions/FileMetadata'],
                    'driveMetadata' => ['$ref' => '#/definitions/DriveMetadata'],
                    'outputItems' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/OutputItem']
                    ],
                    'contentId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'state',
                    'entityType'
                ]
            ],
            'AudioStream' => [
                'properties' => [
                    'bitRate' => ['type' => 'string'],
                    'bitRateMode' => ['type' => 'string'],
                    'channels' => ['type' => 'string'],
                    'channelPositions' => ['type' => 'string'],
                    'codec' => ['type' => 'string'],
                    'durationInSeconds' => [
                        'type' => 'number',
                        'format' => 'double'
                    ],
                    'format' => ['type' => 'string'],
                    'language' => ['type' => 'string'],
                    'resolution' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'samplingRate' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'streamSize' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'AudioMetadata' => [
                'properties' => ['audioStreams' => [
                    'type' => 'array',
                    'items' => ['$ref' => '#/definitions/AudioStream']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'EpsMetadata' => [
                'properties' => [
                    'isRasterized' => ['type' => 'boolean'],
                    'widthInPoints' => [
                        'type' => 'number',
                        'format' => 'double'
                    ],
                    'heightInPoints' => [
                        'type' => 'number',
                        'format' => 'double'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'isRasterized',
                    'widthInPoints',
                    'heightInPoints'
                ]
            ],
            'DocumentMetadata' => [
                'properties' => [
                    'applicationName' => ['type' => 'string'],
                    'applicationVersion' => ['type' => 'string'],
                    'author' => ['type' => 'string'],
                    'creator' => ['type' => 'string'],
                    'publisher' => ['type' => 'string'],
                    'company' => ['type' => 'string'],
                    'documentTitle' => ['type' => 'string'],
                    'characterCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'characterCountWithSpaces' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'lineCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'pageCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'slideCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'paragraphCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'revisionNumber' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'titles' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'imageTitles' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'epsInfo' => ['$ref' => '#/definitions/EpsMetadata'],
                    'embeddedFiles' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/FileMetadata']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'characterCount',
                    'characterCountWithSpaces',
                    'lineCount',
                    'pageCount',
                    'slideCount',
                    'paragraphCount',
                    'revisionNumber'
                ]
            ],
            'ImageMetadata' => [
                'properties' => [
                    'width' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'height' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'widthInInch' => [
                        'type' => 'number',
                        'format' => 'double'
                    ],
                    'heightInInch' => [
                        'type' => 'number',
                        'format' => 'double'
                    ],
                    'widthInCm' => [
                        'type' => 'number',
                        'format' => 'double'
                    ],
                    'heightInCm' => [
                        'type' => 'number',
                        'format' => 'double'
                    ],
                    'colorSpace' => ['type' => 'string'],
                    'colorProfile' => ['type' => 'string'],
                    'bitsPerPixel' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'bitsPerChannel' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'channels' => ['type' => 'string'],
                    'pixelFormat' => ['type' => 'string'],
                    'hasAlpha' => ['type' => 'boolean'],
                    'isIndexed' => ['type' => 'boolean'],
                    'isExtended' => ['type' => 'boolean'],
                    'horizontalResolution' => [
                        'type' => 'number',
                        'format' => 'double'
                    ],
                    'verticalResolution' => [
                        'type' => 'number',
                        'format' => 'double'
                    ],
                    'totalFrames' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'totalUnspecifiedTiffExtraChannels' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'hasExifData' => ['type' => 'boolean'],
                    'hasIptcData' => ['type' => 'boolean'],
                    'hasAdobeResourceData' => ['type' => 'boolean'],
                    'hasXmpData' => ['type' => 'boolean'],
                    'uncompressedSizeInBytes' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'width',
                    'height',
                    'widthInInch',
                    'heightInInch',
                    'widthInCm',
                    'heightInCm',
                    'bitsPerPixel',
                    'bitsPerChannel',
                    'hasAlpha',
                    'isIndexed',
                    'isExtended',
                    'horizontalResolution',
                    'verticalResolution',
                    'totalFrames',
                    'totalUnspecifiedTiffExtraChannels',
                    'hasExifData',
                    'hasIptcData',
                    'hasAdobeResourceData',
                    'hasXmpData',
                    'uncompressedSizeInBytes'
                ]
            ],
            'VideoStream' => [
                'properties' => [
                    'bitRate' => ['type' => 'string'],
                    'codec' => ['type' => 'string'],
                    'displayAspectRatio' => ['type' => 'string'],
                    'durationInSeconds' => [
                        'type' => 'number',
                        'format' => 'double'
                    ],
                    'format' => ['type' => 'string'],
                    'frameCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'frameRate' => [
                        'type' => 'number',
                        'format' => 'double'
                    ],
                    'height' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'language' => ['type' => 'string'],
                    'pixelAspectRatio' => [
                        'type' => 'number',
                        'format' => 'double'
                    ],
                    'resolution' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'streamSize' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'width' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'rotation' => [
                        'type' => 'number',
                        'format' => 'double'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['durationInSeconds']
            ],
            'VideoMetadata' => [
                'properties' => [
                    'width' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'height' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'durationInSeconds' => [
                        'type' => 'number',
                        'format' => 'double'
                    ],
                    'format' => ['type' => 'string'],
                    'codec' => ['type' => 'string'],
                    'overallBitrate' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'videoStreams' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/VideoStream']
                    ],
                    'audioStreams' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/AudioStream']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'width',
                    'height',
                    'durationInSeconds'
                ]
            ],
            'FileTransfer2ContentCreateRequest' => [
                'properties' => [
                    'transferId' => ['type' => 'string'],
                    'layerSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'metadata' => ['type' => 'object'],
                    'contentPermissionSetIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FileTransferCreateItem' => [
                'properties' => [
                    'fileId' => ['type' => 'string'],
                    'layerSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'metadata' => ['type' => 'object'],
                    'contentPermissionSetIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FileTransferPartial2ContentCreateRequest' => [
                'properties' => [
                    'transferId' => ['type' => 'string'],
                    'items' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/FileTransferCreateItem']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'TransferSearchRequest' => [
                'properties' => [
                    'channel' => ['type' => 'string'],
                    'searchString' => ['type' => 'string'],
                    'searchBehaviours' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'DropInvalidCharactersOnFailure',
                                'WildcardOnSingleTerm'
                            ]
                        ]
                    ],
                    'sort' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/SortInfo']
                    ],
                    'start' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'limit' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'filter' => ['$ref' => '#/definitions/FilterBase']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'start',
                    'limit'
                ]
            ],
            'TransferSearchResult' => [
                'properties' => ['elapsedMilliseconds' => [
                    'type' => 'integer',
                    'format' => 'int64'
                ]],
                'additionalProperties' => FALSE,
                'required' => ['elapsedMilliseconds']
            ],
            'SearchBehaviourBaseResultOfTransfer' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'isSearchStringRewritten' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => ['isSearchStringRewritten']
            ],
            'BaseResultOfTransfer' => [
                'properties' => [
                    'totalResults' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'results' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/Transfer']
                    ],
                    'pageToken' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalResults']
            ],
            'FileTransferSearchRequest' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'searchBehaviours' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'DropInvalidCharactersOnFailure',
                                'WildcardOnSingleTerm'
                            ]
                        ]
                    ],
                    'sort' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/SortInfo']
                    ],
                    'start' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'limit' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'filter' => ['$ref' => '#/definitions/FilterBase']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'start',
                    'limit'
                ]
            ],
            'FileTransferSearchResult' => [
                'properties' => ['elapsedMilliseconds' => [
                    'type' => 'integer',
                    'format' => 'int64'
                ]],
                'additionalProperties' => FALSE,
                'required' => ['elapsedMilliseconds']
            ],
            'SearchBehaviourBaseResultOfFileTransfer' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'isSearchStringRewritten' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => ['isSearchStringRewritten']
            ],
            'FileTransfer' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'name' => ['type' => 'string'],
                    'identifier' => ['type' => 'string'],
                    'transferId' => ['type' => 'string'],
                    'state' => [
                        'type' => 'string',
                        'enum' => [
                            'Draft',
                            'UploadInProgress',
                            'UploadCompleted',
                            'DataExtractionInProgress',
                            'DataExtractionDone',
                            'ImportInProgress',
                            'ImportCompleted',
                            'UploadCancelled',
                            'ImportCancelled',
                            'UploadFailed',
                            'ImportFailed',
                            'DeleteInProgress',
                            'Deleted',
                            'CleanupInProgress',
                            'CleanupCompleted'
                        ]
                    ],
                    'entityType' => [
                        'type' => 'string',
                        'enum' => [
                            'Content',
                            'BasicShare',
                            'EmbedShare',
                            'Metadata',
                            'FileTransfer'
                        ]
                    ],
                    'contentId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'state',
                    'entityType'
                ]
            ],
            'BaseResultOfFileTransfer' => [
                'properties' => [
                    'totalResults' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'results' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/FileTransfer']
                    ],
                    'pageToken' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalResults']
            ],
            'UserSearchRequest' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'searchBehaviours' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'DropInvalidCharactersOnFailure',
                                'WildcardOnSingleTerm'
                            ]
                        ]
                    ],
                    'sort' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/SortInfo']
                    ],
                    'start' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'limit' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'lifeCycleFilter' => [
                        'type' => 'string',
                        'enum' => [
                            'ActiveOnly',
                            'All',
                            'InactiveOnly'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'start',
                    'limit',
                    'lifeCycleFilter'
                ]
            ],
            'UserSearchResult' => [
                'properties' => ['elapsedMilliseconds' => [
                    'type' => 'integer',
                    'format' => 'int64'
                ]],
                'additionalProperties' => FALSE,
                'required' => ['elapsedMilliseconds']
            ],
            'SearchBehaviourBaseResultOfUser' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'isSearchStringRewritten' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => ['isSearchStringRewritten']
            ],
            'User' => [
                'properties' => [
                    'userRoleIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'id' => ['type' => 'string'],
                    'firstName' => ['type' => 'string'],
                    'lastName' => ['type' => 'string'],
                    'emailAddress' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'BaseResultOfUser' => [
                'properties' => [
                    'totalResults' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'results' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/User']
                    ],
                    'pageToken' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalResults']
            ],
            'UserAddress' => [
                'properties' => [
                    'company' => ['type' => 'string'],
                    'address' => ['type' => 'string'],
                    'alternativeAddress' => ['type' => 'string'],
                    'department' => ['type' => 'string'],
                    'zip' => ['type' => 'string'],
                    'city' => ['type' => 'string'],
                    'phone' => ['type' => 'string'],
                    'countryCode' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'Drive' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'name' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'OwnerToken' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'userId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'UserDetail' => [
                'properties' => [
                    'userRoles' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/UserRole']
                    ],
                    'comment' => ['type' => 'string'],
                    'languageCode' => ['type' => 'string'],
                    'address' => ['$ref' => '#/definitions/UserAddress'],
                    'drives' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/Drive']
                    ],
                    'ownerTokens' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/OwnerToken']
                    ],
                    'authorizationState' => [
                        'type' => 'string',
                        'enum' => [
                            'Active',
                            'Review',
                            'Locked',
                            'Invited'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['authorizationState']
            ],
            'Channel' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'sortOrder' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'searchIndexId' => ['type' => 'string'],
                    'entityType' => [
                        'type' => 'string',
                        'enum' => [
                            'Content',
                            'BasicShare',
                            'EmbedShare',
                            'Metadata',
                            'FileTransfer'
                        ]
                    ],
                    'schemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'names' => ['type' => 'object'],
                    'sort' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/SortInfo']
                    ],
                    'aggregations' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/AggregatorBase']
                    ],
                    'extendedSimpleSearchFields' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'sortOrder',
                    'entityType'
                ]
            ],
            'ContentsByIdsRequest' => [
                'properties' => ['contentIds' => [
                    'type' => 'array',
                    'items' => ['type' => 'string']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'UserProfile' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'emailAddress' => ['type' => 'string'],
                    'firstName' => ['type' => 'string'],
                    'lastName' => ['type' => 'string'],
                    'languageCode' => ['type' => 'string'],
                    'address' => ['$ref' => '#/definitions/UserAddress'],
                    'authorizationState' => [
                        'type' => 'string',
                        'enum' => [
                            'Active',
                            'Review',
                            'Locked',
                            'Invited'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['authorizationState']
            ]
        ]
    ];
}
