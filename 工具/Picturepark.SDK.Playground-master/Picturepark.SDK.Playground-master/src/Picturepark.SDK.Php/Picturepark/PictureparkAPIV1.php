<?php
namespace Picturepark;
final class PictureparkAPIV1
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
            '/v1/contents/{contentId}' => ['get' => [
                'operationId' => 'ContentClient_Get',
                'parameters' => [
                    [
                        'name' => 'contentId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'resolve',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'patterns',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ContentDetail']]]
            ]],
            '/v1/contents/many' => [
                'get' => [
                    'operationId' => 'ContentClient_GetMany',
                    'parameters' => [
                        [
                            'name' => 'ids',
                            'in' => 'query',
                            'required' => TRUE,
                            'type' => 'string'
                        ],
                        [
                            'name' => 'resolve',
                            'in' => 'query',
                            'required' => TRUE,
                            'type' => 'string'
                        ],
                        [
                            'name' => 'patterns',
                            'in' => 'query',
                            'required' => FALSE,
                            'type' => 'string'
                        ]
                    ],
                    'responses' => ['200' => ['schema' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/ContentDetail']
                    ]]]
                ],
                'post' => [
                    'operationId' => 'ContentClient_CreateMany',
                    'parameters' => [[
                        'name' => 'contentCreateManyRequest',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/ContentCreateManyRequest']
                    ]],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
                ]
            ],
            '/v1/contents/search' => ['post' => [
                'operationId' => 'ContentClient_Search',
                'parameters' => [[
                    'name' => 'contentSearchRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ContentSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ContentSearchResult']]]
            ]],
            '/v1/contents/{channelId}/search' => ['post' => [
                'operationId' => 'ContentClient_SearchByChannel',
                'parameters' => [
                    [
                        'name' => 'channelId',
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
            '/v1/contents/aggregate' => ['post' => [
                'operationId' => 'ContentClient_Aggregate',
                'parameters' => [[
                    'name' => 'contentAggregationRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ContentAggregationRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ObjectAggregationResult']]]
            ]],
            '/v1/contents/{channelId}/aggregate' => ['post' => [
                'operationId' => 'ContentClient_AggregateByChannel',
                'parameters' => [
                    [
                        'name' => 'channelId',
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
            '/v1/contents/downloadLinks' => ['post' => [
                'operationId' => 'ContentClient_CreateDownloadLink',
                'parameters' => [[
                    'name' => 'request',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ContentDownloadLinkCreateRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/DownloadLink']]]
            ]],
            '/v1/contents/downloads/{contentId}/{outputFormatId}' => ['get' => [
                'operationId' => 'ContentClient_Download',
                'parameters' => [
                    [
                        'name' => 'contentId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'outputFormatId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'width',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'height',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'range',
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
            '/v1/contents/thumbnails/{contentId}/{size}' => ['get' => [
                'operationId' => 'ContentClient_DownloadThumbnail',
                'parameters' => [
                    [
                        'name' => 'contentId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'size',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string',
                        'enum' => [
                            'Small',
                            'Medium',
                            'Large'
                        ]
                    ],
                    [
                        'name' => 'width',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'height',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['type' => 'file']]]
            ]],
            '/v1/contents' => ['post' => [
                'operationId' => 'ContentClient_Create',
                'parameters' => [
                    [
                        'name' => 'contentCreateRequest',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/ContentCreateRequest']
                    ],
                    [
                        'name' => 'resolve',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'allowMissingDependencies',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'timeout',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'patterns',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ContentDetail']]]
            ]],
            '/v1/contents/{contentId}/deactivate' => ['put' => [
                'operationId' => 'ContentClient_Deactivate',
                'parameters' => [
                    [
                        'name' => 'contentId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'timeout',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ContentDetail']]]
            ]],
            '/v1/contents/many/deactivate' => ['put' => [
                'operationId' => 'ContentClient_DeactivateMany',
                'parameters' => [[
                    'name' => 'deactivateRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ContentDeactivateRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/v1/contents/{contentId}/reactivate' => ['put' => [
                'operationId' => 'ContentClient_Reactivate',
                'parameters' => [
                    [
                        'name' => 'contentId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'resolve',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'timeout',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'patterns',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'allowMissingDependencies',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ContentDetail']]]
            ]],
            '/v1/contents/many/reactivate' => ['put' => [
                'operationId' => 'ContentClient_ReactivateMany',
                'parameters' => [[
                    'name' => 'reactivateRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ContentReactivateRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/v1/contents/{contentId}/file' => ['put' => [
                'operationId' => 'ContentClient_UpdateFile',
                'parameters' => [
                    [
                        'name' => 'contentId',
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
            '/v1/contents/{contentId}/metadata' => ['put' => [
                'operationId' => 'ContentClient_UpdateMetadata',
                'parameters' => [
                    [
                        'name' => 'contentId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'updateRequest',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/ContentMetadataUpdateRequest']
                    ],
                    [
                        'name' => 'resolve',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'allowMissingDependencies',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'timeout',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'patterns',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ContentDetail']]]
            ]],
            '/v1/contents/{contentId}/permissions' => ['put' => [
                'operationId' => 'ContentClient_UpdatePermissions',
                'parameters' => [
                    [
                        'name' => 'contentId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'updateRequest',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/ContentPermissionsUpdateRequest']
                    ],
                    [
                        'name' => 'resolve',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'timeout',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'patterns',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ContentDetail']]]
            ]],
            '/v1/contents/many/metadata' => ['put' => [
                'operationId' => 'ContentClient_UpdateMetadataMany',
                'parameters' => [[
                    'name' => 'updateRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ContentMetadataUpdateManyRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/v1/contents/many/permissions' => ['put' => [
                'operationId' => 'ContentClient_UpdatePermissionsMany',
                'parameters' => [[
                    'name' => 'updateRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/ContentPermissionsUpdateRequest']
                    ]
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/v1/contents/{contentId}/ownership/transfer' => ['put' => [
                'operationId' => 'ContentClient_TransferOwnership',
                'parameters' => [
                    [
                        'name' => 'contentId',
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
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ContentDetail']]]
            ]],
            '/v1/contents/many/ownership/transfer' => ['put' => [
                'operationId' => 'ContentClient_TransferOwnershipMany',
                'parameters' => [[
                    'name' => 'contentsOwnershipTransferRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ContentsOwnershipTransferRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/v1/contents/batches/fields/ids' => ['put' => [
                'operationId' => 'ContentClient_BatchUpdateFieldsByIds',
                'parameters' => [[
                    'name' => 'updateRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ContentFieldsUpdateRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/v1/contents/batches/fields/filter' => ['put' => [
                'operationId' => 'ContentClient_BatchUpdateFieldsByFilter',
                'parameters' => [[
                    'name' => 'updateRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ContentFieldsFilterUpdateRequest']
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
            '/v1/businessProcesses/{processId}/wait' => ['get' => [
                'operationId' => 'BusinessProcessClient_Wait',
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
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'lifeCycleIds',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'timeout',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcessWaitResult']]]
            ]],
            '/v1/businessProcesses/{processId}/waitCompletion' => ['get' => [
                'operationId' => 'BusinessProcessClient_WaitForCompletion',
                'parameters' => [
                    [
                        'name' => 'processId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'timeout',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcessWaitResult']]]
            ]],
            '/v1/businessProcesses/{processId}/details' => ['get' => [
                'operationId' => 'BusinessProcessClient_GetDetails',
                'parameters' => [[
                    'name' => 'processId',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcessDetails']]]
            ]],
            '/v1/history/search' => ['post' => [
                'operationId' => 'DocumentHistoryClient_Search',
                'parameters' => [[
                    'name' => 'documentHistorySearchRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/DocumentHistorySearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/DocumentHistorySearchResult']]]
            ]],
            '/v1/history/{id}' => ['get' => [
                'operationId' => 'DocumentHistoryClient_Get',
                'parameters' => [[
                    'name' => 'id',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/DocumentHistory']]]
            ]],
            '/v1/history/{id}/{version}' => ['get' => [
                'operationId' => 'DocumentHistoryClient_GetVersion',
                'parameters' => [
                    [
                        'name' => 'id',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'version',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/DocumentHistory']]]
            ]],
            '/v1/history/{id}/difference/{oldVersion}' => ['get' => [
                'operationId' => 'DocumentHistoryClient_GetDifferenceLatest',
                'parameters' => [
                    [
                        'name' => 'id',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'oldVersion',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'integer',
                        'format' => 'int64'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/DocumentHistoryDifference']]]
            ]],
            '/v1/history/{id}/difference/{oldVersion}/{newVersion}' => ['get' => [
                'operationId' => 'DocumentHistoryClient_GetDifference',
                'parameters' => [
                    [
                        'name' => 'id',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'oldVersion',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    [
                        'name' => 'newVersion',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'integer',
                        'format' => 'int64'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/DocumentHistoryDifference']]]
            ]],
            '/v1/jsonSchemas/{schemaId}' => ['get' => [
                'operationId' => 'JsonSchemaClient_Get',
                'parameters' => [[
                    'name' => 'schemaId',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['type' => 'object']]]
            ]],
            '/v1/listItems/{listItemId}' => [
                'get' => [
                    'operationId' => 'ListItemClient_Get',
                    'parameters' => [
                        [
                            'name' => 'listItemId',
                            'in' => 'path',
                            'required' => TRUE,
                            'type' => 'string'
                        ],
                        [
                            'name' => 'resolve',
                            'in' => 'query',
                            'required' => TRUE,
                            'type' => 'string'
                        ],
                        [
                            'name' => 'patterns',
                            'in' => 'query',
                            'required' => FALSE,
                            'type' => 'string'
                        ]
                    ],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ListItemDetail']]]
                ],
                'put' => [
                    'operationId' => 'ListItemClient_Update',
                    'parameters' => [
                        [
                            'name' => 'listItemId',
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
                            'type' => 'string'
                        ],
                        [
                            'name' => 'allowMissingDependencies',
                            'in' => 'query',
                            'required' => FALSE,
                            'type' => 'string'
                        ],
                        [
                            'name' => 'timeout',
                            'in' => 'query',
                            'required' => FALSE,
                            'type' => 'string'
                        ],
                        [
                            'name' => 'patterns',
                            'in' => 'query',
                            'required' => FALSE,
                            'type' => 'string'
                        ]
                    ],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ListItemDetail']]]
                ]
            ],
            '/v1/listItems/search' => ['post' => [
                'operationId' => 'ListItemClient_Search',
                'parameters' => [[
                    'name' => 'listItemSearchRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ListItemSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ListItemSearchResult']]]
            ]],
            '/v1/listItems/aggregate' => ['post' => [
                'operationId' => 'ListItemClient_Aggregate',
                'parameters' => [[
                    'name' => 'listItemAggregationRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ListItemAggregationRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ObjectAggregationResult']]]
            ]],
            '/v1/listItems' => ['post' => [
                'operationId' => 'ListItemClient_Create',
                'parameters' => [
                    [
                        'name' => 'listItemCreateRequest',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/ListItemCreateRequest']
                    ],
                    [
                        'name' => 'resolve',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'allowMissingDependencies',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'timeout',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'patterns',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ListItemDetail']]]
            ]],
            '/v1/listItems/many' => [
                'post' => [
                    'operationId' => 'ListItemClient_CreateMany',
                    'parameters' => [[
                        'name' => 'listItemCreateManyRequest',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/ListItemCreateManyRequest']
                    ]],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
                ],
                'put' => [
                    'operationId' => 'ListItemClient_UpdateMany',
                    'parameters' => [[
                        'name' => 'listItemUpdateManyRequest',
                        'in' => 'body',
                        'required' => TRUE,
                        'schema' => ['$ref' => '#/definitions/ListItemUpdateManyRequest']
                    ]],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
                ]
            ],
            '/v1/listItems/{listItemId}/deactivate' => ['put' => [
                'operationId' => 'ListItemClient_Deactivate',
                'parameters' => [
                    [
                        'name' => 'listItemId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'timeout',
                        'in' => 'query',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'forceReferenceRemoval',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ListItemDetail']]]
            ]],
            '/v1/listItems/many/deactivate' => ['put' => [
                'operationId' => 'ListItemClient_DeactivateMany',
                'parameters' => [[
                    'name' => 'deactivateRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ListItemDeactivateRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/v1/listItems/{listItemId}/reactivate' => ['put' => [
                'operationId' => 'ListItemClient_Reactivate',
                'parameters' => [
                    [
                        'name' => 'listItemId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'timeout',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'patterns',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'allowMissingDependencies',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ListItemDetail']]]
            ]],
            '/v1/listItems/many/reactivate' => ['put' => [
                'operationId' => 'ListItemClient_ReactivateMany',
                'parameters' => [[
                    'name' => 'reactivateRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ListItemReactivateRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/v1/listItems/batches/fields/ids' => ['put' => [
                'operationId' => 'ListItemClient_BatchUpdateFieldsByIds',
                'parameters' => [[
                    'name' => 'updateRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ListItemFieldsUpdateRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/v1/listItems/batches/fields/filter' => ['put' => [
                'operationId' => 'ListItemClient_BatchUpdateFieldsByFilter',
                'parameters' => [[
                    'name' => 'updateRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ListItemFieldsFilterUpdateRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
            ]],
            '/v1/listItems/{listItemId}/references' => ['get' => [
                'operationId' => 'ListItemClient_GetReferencesToListItem',
                'parameters' => [[
                    'name' => 'listItemId',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ListItemReferences']]]
            ]],
            '/v1/listItems/many/references' => ['get' => [
                'operationId' => 'ListItemClient_GetReferencesToListItems',
                'parameters' => [[
                    'name' => 'ids',
                    'in' => 'query',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => [
                    'type' => 'array',
                    'items' => ['$ref' => '#/definitions/ListItemReferences']
                ]]]
            ]],
            '/v1/liveStream/search' => ['post' => [
                'operationId' => 'LiveStreamClient_Search',
                'parameters' => [[
                    'name' => 'liveStreamSearchRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/LiveStreamSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ObjectSearchResult']]]
            ]],
            '/v1/schemas/{schemaId}' => [
                'get' => [
                    'operationId' => 'SchemaClient_Get',
                    'parameters' => [[
                        'name' => 'schemaId',
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
                            'name' => 'schemaId',
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
                        'name' => 'schemaId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ]],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BusinessProcess']]]
                ]
            ],
            '/v1/schemas' => [
                'get' => [
                    'operationId' => 'SchemaClient_GetMany',
                    'parameters' => [[
                        'name' => 'ids',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
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
            '/v1/schemas/search' => ['post' => [
                'operationId' => 'SchemaClient_Search',
                'parameters' => [[
                    'name' => 'schemaSearchRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/SchemaSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/SchemaSearchResult']]]
            ]],
            '/v1/schemas/{schemaId}/exists' => ['get' => [
                'operationId' => 'SchemaClient_Exists',
                'parameters' => [
                    [
                        'name' => 'schemaId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'fieldId',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ExistsResponse']]]
            ]],
            '/v1/permission/contentPermissionSets/search' => ['post' => [
                'operationId' => 'PermissionClient_SearchContentPermissionSets',
                'parameters' => [[
                    'name' => 'request',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/PermissionSetSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/PermissionSetSearchResult']]]
            ]],
            '/v1/permission/contentPermissionSets/{permissionSetId}' => ['get' => [
                'operationId' => 'PermissionClient_GetContentPermissionSet',
                'parameters' => [[
                    'name' => 'permissionSetId',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ContentPermissionSetDetail']]]
            ]],
            '/v1/permission/schemaPermissionSets/search' => ['post' => [
                'operationId' => 'PermissionClient_SearchSchemaPermissionSets',
                'parameters' => [[
                    'name' => 'request',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/PermissionSetSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/PermissionSetSearchResult']]]
            ]],
            '/v1/permission/schemaPermissionSets/{permissionSetId}' => ['get' => [
                'operationId' => 'PermissionClient_GetSchemaPermissionSet',
                'parameters' => [[
                    'name' => 'permissionSetId',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/SchemaPermissionSetDetail']]]
            ]],
            '/v1/permission/userPermissions' => ['get' => [
                'operationId' => 'PermissionClient_GetUserRights',
                'parameters' => [],
                'responses' => ['200' => ['schema' => [
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
                ]]]
            ]],
            '/v1/permission/userPermissions/{userRight}' => ['get' => [
                'operationId' => 'PermissionClient_HasUserRight',
                'parameters' => [[
                    'name' => 'userRight',
                    'in' => 'path',
                    'required' => TRUE,
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
                ]],
                'responses' => ['200' => ['schema' => ['type' => 'boolean']]]
            ]],
            '/v1/publicAccess/version' => ['get' => [
                'operationId' => 'PublicAccessClient_GetVersion',
                'parameters' => [],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/VersionInfo']]]
            ]],
            '/v1/publicAccess/shares/{token}' => ['get' => [
                'operationId' => 'PublicAccessClient_GetShare',
                'parameters' => [[
                    'name' => 'token',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ShareDetail']]]
            ]],
            '/v1/shares/{id}' => [
                'get' => [
                    'operationId' => 'ShareClient_Get',
                    'parameters' => [[
                        'name' => 'id',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ]],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ShareDetail']]]
                ],
                'put' => [
                    'operationId' => 'ShareClient_Update',
                    'parameters' => [
                        [
                            'name' => 'id',
                            'in' => 'path',
                            'required' => TRUE,
                            'type' => 'string'
                        ],
                        [
                            'name' => 'updateRequest',
                            'in' => 'body',
                            'required' => TRUE,
                            'schema' => ['$ref' => '#/definitions/ShareBaseUpdateRequest']
                        ]
                    ],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ShareDetail']]]
                ]
            ],
            '/v1/shares/search' => ['post' => [
                'operationId' => 'ShareClient_Search',
                'parameters' => [[
                    'name' => 'request',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ShareSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ShareSearchResult']]]
            ]],
            '/v1/shares/aggregate' => ['post' => [
                'operationId' => 'ShareClient_Aggregate',
                'parameters' => [[
                    'name' => 'request',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ShareAggregationRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/ObjectAggregationResult']]]
            ]],
            '/v1/shares' => ['post' => [
                'operationId' => 'ShareClient_Create',
                'parameters' => [[
                    'name' => 'request',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/ShareBaseCreateRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/CreateShareResult']]]
            ]],
            '/v1/shares/many' => ['delete' => [
                'operationId' => 'ShareClient_DeleteMany',
                'parameters' => [[
                    'name' => 'ids',
                    'in' => 'query',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/BulkResponse']]]
            ]],
            '/v1/serviceProviders/{serviceProviderId}/configuration' => [
                'get' => [
                    'operationId' => 'ServiceProviderClient_GetConfiguration',
                    'parameters' => [[
                        'name' => 'serviceProviderId',
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
                            'name' => 'serviceProviderId',
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
            '/v1/transfers/{transferId}' => [
                'get' => [
                    'operationId' => 'TransferClient_Get',
                    'parameters' => [[
                        'name' => 'transferId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ]],
                    'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/TransferDetail']]]
                ],
                'delete' => [
                    'operationId' => 'TransferClient_Delete',
                    'parameters' => [[
                        'name' => 'transferId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ]],
                    'responses' => ['204' => []]
                ]
            ],
            '/v1/transfers/search' => ['post' => [
                'operationId' => 'TransferClient_Search',
                'parameters' => [[
                    'name' => 'request',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/TransferSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/TransferSearchResult']]]
            ]],
            '/v1/transfers/{transferId}/cancel' => ['get' => [
                'operationId' => 'TransferClient_CancelTransfer',
                'parameters' => [[
                    'name' => 'transferId',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['204' => []]
            ]],
            '/v1/transfers' => ['post' => [
                'operationId' => 'TransferClient_Create',
                'parameters' => [[
                    'name' => 'request',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/CreateTransferRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/Transfer']]]
            ]],
            '/v1/transfers/files/{fileTransferId}' => ['get' => [
                'operationId' => 'TransferClient_GetFile',
                'parameters' => [[
                    'name' => 'fileTransferId',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/FileTransferDetail']]]
            ]],
            '/v1/transfers/files/search' => ['post' => [
                'operationId' => 'TransferClient_SearchFiles',
                'parameters' => [[
                    'name' => 'request',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/FileTransferSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/FileTransferSearchResult']]]
            ]],
            '/v1/transfers/files/blacklist' => ['get' => [
                'operationId' => 'TransferClient_GetBlacklist',
                'parameters' => [],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/Blacklist']]]
            ]],
            '/v1/transfers/files/delete' => ['post' => [
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
            '/v1/transfers/{transferId}/import' => ['post' => [
                'operationId' => 'TransferClient_ImportTransfer',
                'parameters' => [
                    [
                        'name' => 'transferId',
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
            '/v1/transfers/{transferId}/partialImport' => ['post' => [
                'operationId' => 'TransferClient_PartialImport',
                'parameters' => [
                    [
                        'name' => 'transferId',
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
            '/v1/transfers/{transferId}/files/{identifier}/upload' => ['post' => [
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
                        'type' => 'string'
                    ],
                    [
                        'name' => 'currentChunkSize',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'totalSize',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'totalChunks',
                        'in' => 'query',
                        'required' => FALSE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'transferId',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ],
                    [
                        'name' => 'identifier',
                        'in' => 'path',
                        'required' => TRUE,
                        'type' => 'string'
                    ]
                ],
                'responses' => ['200' => []]
            ]],
            '/v1/users/{userId}' => ['get' => [
                'operationId' => 'UserClient_Get',
                'parameters' => [[
                    'name' => 'userId',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/UserDetail']]]
            ]],
            '/v1/users/search' => ['post' => [
                'operationId' => 'UserClient_Search',
                'parameters' => [[
                    'name' => 'searchRequest',
                    'in' => 'body',
                    'required' => TRUE,
                    'schema' => ['$ref' => '#/definitions/UserSearchRequest']
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/UserSearchResult']]]
            ]],
            '/v1/users/owner/{tokenId}' => ['get' => [
                'operationId' => 'UserClient_GetByOwnerToken',
                'parameters' => [[
                    'name' => 'tokenId',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/UserDetail']]]
            ]],
            '/v1/users/channels' => ['get' => [
                'operationId' => 'UserClient_GetChannels',
                'parameters' => [],
                'responses' => ['200' => ['schema' => [
                    'type' => 'array',
                    'items' => ['$ref' => '#/definitions/Channel']
                ]]]
            ]],
            '/v1/outputs' => ['post' => [
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
            '/v1/outputs/{outputId}' => ['get' => [
                'operationId' => 'OutputClient_Get',
                'parameters' => [[
                    'name' => 'outputId',
                    'in' => 'path',
                    'required' => TRUE,
                    'type' => 'string'
                ]],
                'responses' => ['200' => ['schema' => ['$ref' => '#/definitions/OutputDetail']]]
            ]],
            '/v1/profile' => [
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
            'ContentNotFoundException' => [
                'properties' => ['contentId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PictureparkNotFoundException' => [
                'properties' => ['reference' => ['type' => 'string']],
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
            'PictureparkValidationException' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PictureparkConflictException' => [
                'properties' => ['reference' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'UserEmailAlreadyExistsException' => [
                'properties' => ['email' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'UserRoleAssignedException' => [
                'properties' => ['userRoleId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'UserNotFoundException' => [
                'properties' => ['missingUserId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'RenderingException' => [
                'properties' => [],
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
            'ServiceProviderNotFoundException' => [
                'properties' => ['missingServiceProviderId' => ['type' => 'string']],
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
            'DefaultChannelDeleteException' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ElasticVersionUpdateException' => [
                'properties' => [
                    'expectedVersion' => ['type' => 'string'],
                    'actualVersion' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'InvalidVersionException' => [
                'properties' => [
                    'component' => ['type' => 'string'],
                    'version' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'EnvironmentNotDeactivatedException' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'EnvironmentNotFoundException' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'EnvironmentDeactivationException' => [
                'properties' => ['deactivationMessage' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ShareNotFoundException' => [
                'properties' => ['shareId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ShareByTokenNotFoundException' => [
                'properties' => ['token' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'TokenGenerationException' => [
                'properties' => ['retries' => [
                    'type' => 'integer',
                    'format' => 'int64'
                ]],
                'additionalProperties' => FALSE,
                'required' => ['retries']
            ],
            'OutputIdNotFoundException' => [
                'properties' => ['outputId' => ['type' => 'string']],
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
            'DriveCacheExpiredException' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DriveFileNotFoundException' => [
                'properties' => ['fileId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DriveRequestException' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'TokenValidationException' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'LeaseNotAcquiredException' => [
                'properties' => ['resourceId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'OperationInProgressException' => [
                'properties' => ['leaseResourceType' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => ['leaseResourceType']
            ],
            'RetryException' => [
                'properties' => [
                    'retries' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'innerExceptionDetail' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => ['retries']
            ],
            'OwnerTokenNotFoundException' => [
                'properties' => ['ownerTokenUserId' => ['type' => 'string']],
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
            'PictureparkArgumentNullException' => [
                'properties' => ['argumentName' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ObjectTypeMismatchException' => [
                'properties' => ['type' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'InvalidStateTransitionException' => [
                'properties' => ['transition' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FailedToLockException' => [
                'properties' => ['resourceId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PictureparkOperationCanceledException' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PictureparkApplicationException' => [
                'properties' => [],
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
            'UnknownException' => [
                'properties' => ['exceptionDetail' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'OwnerTokenInUseException' => [
                'properties' => ['ownerTokenUserId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'CustomerViolationException' => [
                'properties' => [
                    'expectedCustomerId' => ['type' => 'string'],
                    'currentCustomerId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'CustomerAliasNotFoundException' => [
                'properties' => ['customerAlias' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'CustomerAliasInUseException' => [
                'properties' => [
                    'existingCustomerId' => ['type' => 'string'],
                    'alias' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'CustomerNotDeactivatedException' => [
                'properties' => ['customerId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'CustomerDeactivationException' => [
                'properties' => [
                    'customerId' => ['type' => 'string'],
                    'deactivationMessage' => ['type' => 'string']
                ],
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
            'ConfigurationIndexNotFoundException' => [
                'properties' => ['configurationIndex' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DuplicateSearchIndexDocException' => [
                'properties' => ['searchIndexDocId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SearchIndexDocNotFoundException' => [
                'properties' => ['searchIndexDocId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'IndexDocumentNotFoundException' => [
                'properties' => ['indexId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DuplicateAliasException' => [
                'properties' => ['indexAlias' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SearchIndexNotFoundException' => [
                'properties' => ['searchIndexId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DefaultSearchIndexDeleteException' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SearchIndexInUseException' => [
                'properties' => ['searchIndex' => ['type' => 'string']],
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
            'IndexMappingException' => [
                'properties' => [
                    'indexName' => ['type' => 'string'],
                    'debugInformation' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DuplicatedSearchBehaviourException' => [
                'properties' => ['duplicatedSearchBehaviours' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SearchStringLeadingWildcardException' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DuplicateAggregatorException' => [
                'properties' => ['aggregatorName' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'InvalidDateTimeFormatException' => [
                'properties' => [
                    'value' => ['type' => 'string'],
                    'expectedFormat' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DocumentVersionConflictException' => [
                'properties' => [
                    'documentId' => ['type' => 'string'],
                    'documentType' => ['type' => 'string'],
                    'documentVersion' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['documentVersion']
            ],
            'RedisDatabaseExceededException' => [
                'properties' => [
                    'customerId' => ['type' => 'string'],
                    'customerCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'maxCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'startIndex' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'redisDatabaseCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'customerCount',
                    'maxCount',
                    'startIndex',
                    'redisDatabaseCount'
                ]
            ],
            'DuplicateDocumentException' => [
                'properties' => [
                    'documentId' => ['type' => 'string'],
                    'documentType' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ObjectStoreResponseException' => [
                'properties' => ['rowErrorMessages' => ['type' => 'string']],
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
            'PermissionOwnershipTransferException' => [
                'properties' => [
                    'transferUserId' => ['type' => 'string'],
                    'missingUserRight' => [
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
                ],
                'additionalProperties' => FALSE,
                'required' => ['missingUserRight']
            ],
            'PermissionSetNotFoundException' => [
                'properties' => ['permissionSetId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DuplicateRightException' => [
                'properties' => ['permissionSetId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'PermissionValidationException' => [
                'properties' => [
                    'permission' => ['type' => 'string'],
                    'operation' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'UnsupportedListItemChangeCommandException' => [
                'properties' => ['commandType' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ListItemLayerException' => [
                'properties' => ['listItemId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ListItemNotFoundException' => [
                'properties' => ['listItemId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ListItemCyclicDependencyException' => [
                'properties' => ['listItemIds' => [
                    'type' => 'array',
                    'items' => ['type' => 'string']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DeleteListItemsWithReferencesException' => [
                'properties' => [
                    'referencesList' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'references' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'TransferInfoNotFoundException' => [
                'properties' => ['transferInfoId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FileTransferNotFoundException' => [
                'properties' => ['fileTransferId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'InvalidTransferTypeException' => [
                'properties' => ['transferType' => [
                    'type' => 'string',
                    'enum' => [
                        'FileUpload',
                        'FileUploadAutoImport',
                        'DriveImport',
                        'DriveExport',
                        'WebDownload',
                        'SchemaImport'
                    ]
                ]],
                'additionalProperties' => FALSE,
                'required' => ['transferType']
            ],
            'TransferNotFoundException' => [
                'properties' => ['transferId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'WrongChunkSizeException' => [
                'properties' => [
                    'actual' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'expected' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'actual',
                    'expected'
                ]
            ],
            'MissingDependenciesException' => [
                'properties' => ['itemIds' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'RelationSelfReferencingException' => [
                'properties' => [
                    'itemId' => ['type' => 'string'],
                    'itemType' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'InvalidChangeCommandFieldTypeInvalidException' => [
                'properties' => [
                    'commandType' => ['type' => 'string'],
                    'fieldId' => ['type' => 'string'],
                    'schemaId' => ['type' => 'string'],
                    'fieldActualType' => ['type' => 'string'],
                    'fieldExpectedType' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'InvalidChangeCommandFieldNotFoundException' => [
                'properties' => [
                    'commandTypeName' => ['type' => 'string'],
                    'fieldId' => ['type' => 'string'],
                    'schemaId' => ['type' => 'string']
                ],
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
            'InvalidMetadataException' => [
                'properties' => ['metadataErrors' => [
                    'type' => 'array',
                    'items' => ['$ref' => '#/definitions/MetadataError']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'RelationNotFoundException' => [
                'properties' => ['relationId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'RelationTypeNotFoundException' => [
                'properties' => ['relationType' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'RelationTypeTargetDocTypeMismatchException' => [
                'properties' => [
                    'relationType' => ['type' => 'string'],
                    'targetDocType' => ['type' => 'string'],
                    'expectedTargetDocType' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaFieldOverwriteTypeMismatchException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'fieldId' => ['type' => 'string'],
                    'fieldOverwriteType' => ['type' => 'string'],
                    'fieldType' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaFieldOverwriteIdException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'fieldId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaFieldIdDuplicatedException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'fieldId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaFieldSchemaIndexInfoSimpleSearchNestingException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'fieldId' => ['type' => 'string'],
                    'relatedFieldId' => ['type' => 'string'],
                    'relatedOuterFieldId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaFieldSchemaIndexInfoNestingException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'fieldId' => ['type' => 'string'],
                    'relatedFieldId' => ['type' => 'string'],
                    'relatedOuterFieldId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaFieldSchemaIndexInfoException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'fieldId' => ['type' => 'string'],
                    'relatedFieldId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaFieldIdUppercaseException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'fieldId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaIdLowercaseException' => [
                'properties' => ['schemaId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaInfoNotFoundException' => [
                'properties' => ['schemaId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'IndexedFieldThresholdExceededException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'indexedFieldCount' => [
                        'type' => 'number',
                        'format' => 'double'
                    ],
                    'indexedFieldThreshold' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'indexedFieldCount',
                    'indexedFieldThreshold'
                ]
            ],
            'DuplicateSchemaInfoException' => [
                'properties' => ['schemaId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaFieldNumberRangeException' => [
                'properties' => [
                    'fieldId' => ['type' => 'string'],
                    'propertyName' => ['type' => 'string'],
                    'minValue' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ],
                    'maxValue' => [
                        'type' => 'number',
                        'format' => 'decimal'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'minValue',
                    'maxValue'
                ]
            ],
            'SchemaInUseContentSchemaException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'contentSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaInUseListItemException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'listItemCount' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['listItemCount']
            ],
            'SchemaInUseContentException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'contentCount' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['contentCount']
            ],
            'SchemaInUseFieldException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'fieldNamespaces' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaNotFoundInSearchIndexException' => [
                'properties' => [
                    'searchIndexId' => ['type' => 'string'],
                    'schemaId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DuplicateMetadataDisplayPatternException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'displayPatternId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DuplicateSchemaException' => [
                'properties' => ['schemaId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaImportEmptyException' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaImportVersionMismatchException' => [
                'properties' => [
                    'providedVersion' => ['type' => 'string'],
                    'expectedVersion' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaCyclicDependencyException' => [
                'properties' => ['schemaIds' => [
                    'type' => 'array',
                    'items' => ['type' => 'string']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaInheritanceFieldIndexDeviationException' => [
                'properties' => ['schemaId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaInheritanceTypeDeviationException' => [
                'properties' => ['schemaId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaValidationException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'exceptions' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/PictureparkBusinessException']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaSortFieldException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'fieldId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaFieldIdException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'fieldId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaFieldTypeChangeException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'fieldId' => ['type' => 'string'],
                    'oldType' => ['type' => 'string'],
                    'newType' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaFixedFieldChangeException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'fieldId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaFixedFieldDeleteException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'fieldId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaFieldIndexException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'fieldId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaNoContentException' => [
                'properties' => ['schemaId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaParentChangeException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'oldSchemaParentId' => ['type' => 'string'],
                    'newSchemaParentId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaMissingTypeException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'expectedSchemaTypes' => [
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
                'required' => []
            ],
            'SchemaPermissionException' => [
                'properties' => ['schemaId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaNoLayerException' => [
                'properties' => ['schemaId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaIdException' => [
                'properties' => ['schemaId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaInUseException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'exceptions' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/PictureparkBusinessException']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaNotFoundException' => [
                'properties' => ['schemaId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ContentsNotFoundException' => [
                'properties' => ['contentIds' => [
                    'type' => 'array',
                    'items' => ['type' => 'string']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DeleteContentsWithRelationsException' => [
                'properties' => [
                    'relationList' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'relations' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ContentMetadataUpdateManyException' => [
                'properties' => [
                    'failedItemsCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'totalItemsCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'failedItemsCount',
                    'totalItemsCount'
                ]
            ],
            'BusinessProcessWaitTimeoutException' => [
                'properties' => ['businessProcessId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'BusinessProcessEngineRequestException' => [
                'properties' => [
                    'businessProcessId' => ['type' => 'string'],
                    'engineError' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'BusinessProcessNotFoundException' => [
                'properties' => ['businessProcessId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'BusinessProcessDefinitionNotFoundException' => [
                'properties' => ['processDefinitionId' => ['type' => 'string']],
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
            'SchemaFieldImportMismatchException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'importingFieldIds' => ['type' => 'string'],
                    'existingFieldIds' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaFieldImportRelatedSchemaMismatchException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'fieldId' => ['type' => 'string'],
                    'importingRelatedSchemaId' => ['type' => 'string'],
                    'existingRelatedSchemaId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaFieldImportTypeMismatchException' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'fieldId' => ['type' => 'string'],
                    'importingFieldType' => ['type' => 'string'],
                    'existingFieldType' => ['type' => 'string']
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
                            'Model3d',
                            'ContentItem'
                        ]
                    ],
                    'displayValues' => ['type' => 'object'],
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
            'FilterBase' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
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
                            'InactiveOnly',
                            'ActiveInactiveOnly'
                        ]
                    ],
                    'brokenDependenciesFilter' => [
                        'type' => 'string',
                        'enum' => [
                            'All',
                            'NotBrokenOnly',
                            'BrokenOnly'
                        ]
                    ],
                    'rightsFilter' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'View',
                                'AccessOriginal',
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
                    ],
                    'debugMode' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'start',
                    'limit',
                    'lifeCycleFilter',
                    'brokenDependenciesFilter',
                    'searchType',
                    'debugMode'
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
            'NestedFilter' => [
                'properties' => [
                    'path' => ['type' => 'string'],
                    'filter' => ['$ref' => '#/definitions/FilterBase']
                ],
                'additionalProperties' => FALSE,
                'required' => []
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
            'AggregationFilter' => [
                'properties' => [
                    'aggregationName' => ['type' => 'string'],
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'temporaryAggregatorRequestId' => ['type' => 'string']
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
            'ContentSearchResult' => [
                'properties' => ['elapsedMilliseconds' => [
                    'type' => 'integer',
                    'format' => 'int64'
                ]],
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
                    'contentSchemaId' => ['type' => 'string'],
                    'layerSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'displayValues' => [
                        'type' => 'object',
                        'additionalProperties' => ['type' => 'string']
                    ],
                    'id' => ['type' => 'string'],
                    'brokenReferenceIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'brokenIndirectReferenceIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'brokenRelationIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'QueryDebugInformation' => [
                'properties' => [
                    'general' => ['type' => 'string'],
                    'auditTrail' => ['type' => 'string'],
                    'request' => ['type' => 'object'],
                    'response' => ['type' => 'object']
                ],
                'additionalProperties' => FALSE,
                'required' => []
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
                    'pageToken' => ['type' => 'string'],
                    'queryDebugInformation' => ['$ref' => '#/definitions/QueryDebugInformation']
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalResults']
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
                            'InactiveOnly',
                            'ActiveInactiveOnly'
                        ]
                    ],
                    'brokenDependenciesFilter' => [
                        'type' => 'string',
                        'enum' => [
                            'All',
                            'NotBrokenOnly',
                            'BrokenOnly'
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
                    'brokenDependenciesFilter',
                    'searchType'
                ]
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
            'GeoDistance' => [
                'properties' => [
                    'names' => ['type' => 'object'],
                    'distance' => [
                        'type' => 'number',
                        'format' => 'double'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['distance']
            ],
            'GeoDistanceAggregator' => [
                'properties' => [
                    'field' => ['type' => 'string'],
                    'location' => ['$ref' => '#/definitions/GeoLocation'],
                    'ranges' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/GeoDistance']
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
            'ContentDownloadRequestItem' => [
                'properties' => [
                    'contentId' => ['type' => 'string'],
                    'outputFormatId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ContentDownloadLinkCreateRequest' => [
                'properties' => ['contents' => [
                    'type' => 'array',
                    'items' => ['$ref' => '#/definitions/ContentDownloadRequestItem']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'DownloadLink' => [
                'properties' => [
                    'downloadToken' => ['type' => 'string'],
                    'downloadUrl' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ContentCreateRequest' => [
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
            'ContentCreateManyRequest' => [
                'properties' => [
                    'allowMissingDependencies' => ['type' => 'boolean'],
                    'requests' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/ContentCreateRequest']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['allowMissingDependencies']
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
                    'supportsCancellation' => ['type' => 'boolean'],
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
                            'InProgress',
                            'Succeeded',
                            'Cancelled',
                            'CancellationInProgress',
                            'Failed'
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
                    'finished' => ['type' => 'boolean'],
                    'stateHistory' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/BusinessProcessStateItem']
                    ],
                    'currentState' => ['type' => 'string'],
                    'processDefinitionName' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'supportsCancellation',
                    'businessProcessScope',
                    'lifeCycle',
                    'startDate',
                    'endDate',
                    'finished'
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
                    'succeeded' => ['type' => 'boolean'],
                    'status' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'version',
                    'succeeded',
                    'status'
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
            'ContentDeactivateRequest' => [
                'properties' => [
                    'contentIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'resolve' => ['type' => 'boolean'],
                    'displayPatternIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'forceReferenceRemoval' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'resolve',
                    'forceReferenceRemoval'
                ]
            ],
            'ContentReactivateRequest' => [
                'properties' => [
                    'contentIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'resolve' => ['type' => 'boolean'],
                    'displayPatternIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'allowMissingDependencies' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'resolve',
                    'allowMissingDependencies'
                ]
            ],
            'ContentFileUpdateRequest' => [
                'properties' => [
                    'contentId' => ['type' => 'string'],
                    'fileTransferId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ContentMetadataUpdateRequest' => [
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
            'ContentPermissionsUpdateRequest' => [
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
            'ContentMetadataUpdateManyRequest' => [
                'properties' => [
                    'allowMissingDependencies' => ['type' => 'boolean'],
                    'requests' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/ContentMetadataUpdateRequest']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['allowMissingDependencies']
            ],
            'ContentOwnershipTransferRequest' => [
                'properties' => [
                    'contentId' => ['type' => 'string'],
                    'transferUserId' => ['type' => 'string']
                ],
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
            'ContentFieldsUpdateRequest' => [
                'properties' => ['contentIds' => [
                    'type' => 'array',
                    'items' => ['type' => 'string']
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'MetadataValuesChangeCommandBase' => [
                'properties' => ['schemaId' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'MetadataValuesChangeRequestBase' => [
                'properties' => [
                    'changeCommands' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/MetadataValuesChangeCommandBase']
                    ],
                    'allowMissingDependencies' => ['type' => 'boolean'],
                    'notifyProgress' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'allowMissingDependencies',
                    'notifyProgress'
                ]
            ],
            'MetadataValuesSchemaUpdateCommand' => [
                'properties' => ['value' => ['type' => 'object']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'MetadataValuesSchemaUpsertCommand' => [
                'properties' => ['value' => ['type' => 'object']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'MetadataValuesSchemaRemoveCommand' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'MetadataValuesFieldRemoveCommand' => [
                'properties' => ['fieldPath' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'MetadataValuesSchemaItemAddCommand' => [
                'properties' => [
                    'fieldPath' => ['type' => 'string'],
                    'fieldNamespace' => ['type' => 'string'],
                    'referenceId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'MetadataValuesSchemaItemRemoveCommand' => [
                'properties' => [
                    'fieldPath' => ['type' => 'string'],
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
                            'InactiveOnly',
                            'ActiveInactiveOnly'
                        ]
                    ],
                    'rightsFilter' => [
                        'type' => 'array',
                        'items' => [
                            'type' => 'string',
                            'enum' => [
                                'View',
                                'AccessOriginal',
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
            'ContentFieldsFilterUpdateRequest' => [
                'properties' => ['contentFilterRequest' => ['$ref' => '#/definitions/ContentFilterRequest']],
                'additionalProperties' => FALSE,
                'required' => []
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
                    'pageToken' => ['type' => 'string'],
                    'queryDebugInformation' => ['$ref' => '#/definitions/QueryDebugInformation']
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalResults']
            ],
            'BusinessProcessWaitResult' => [
                'properties' => [
                    'hasStateHit' => ['type' => 'boolean'],
                    'stateHit' => ['type' => 'string'],
                    'hasLifeCycleHit' => ['type' => 'boolean'],
                    'lifeCycleHit' => [
                        'type' => 'string',
                        'enum' => [
                            'Draft',
                            'InProgress',
                            'Succeeded',
                            'Cancelled',
                            'CancellationInProgress',
                            'Failed'
                        ]
                    ],
                    'finished' => ['type' => 'boolean'],
                    'businessProcess' => ['$ref' => '#/definitions/BusinessProcess']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'hasStateHit',
                    'hasLifeCycleHit',
                    'lifeCycleHit',
                    'finished'
                ]
            ],
            'BusinessProcessDetailsDataBase' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'BusinessProcessDetails' => [
                'properties' => ['details' => ['$ref' => '#/definitions/BusinessProcessDetailsDataBase']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'BusinessProcessDetailsDataBulkResponse' => [
                'properties' => ['response' => ['$ref' => '#/definitions/BulkResponse']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'SchemaImportResult' => [
                'properties' => [
                    'importedSchemaCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'skippedSchemaCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'totalSchemaCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'skippedSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'importedSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'importedSchemaCount',
                    'skippedSchemaCount',
                    'totalSchemaCount'
                ]
            ],
            'ListItemImportResult' => [
                'properties' => [
                    'importedListItemCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'skippedListItemCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'totalListItemCount' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'skippedListItemIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'importedListItemIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'importedListItemCount',
                    'skippedListItemCount',
                    'totalListItemCount'
                ]
            ],
            'BusinessProcessDetailsDataSchemaImport' => [
                'properties' => [
                    'schemaImportResult' => ['$ref' => '#/definitions/SchemaImportResult'],
                    'listItemImportResult' => ['$ref' => '#/definitions/ListItemImportResult']
                ],
                'additionalProperties' => FALSE,
                'required' => []
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
            'ListItemDetail' => [
                'properties' => [
                    'content' => ['type' => 'object'],
                    'contentSchemaId' => ['type' => 'string'],
                    'displayValues' => ['type' => 'object'],
                    'id' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
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
                    'brokenDependenciesFilter' => [
                        'type' => 'string',
                        'enum' => [
                            'All',
                            'NotBrokenOnly',
                            'BrokenOnly'
                        ]
                    ],
                    'referencedFieldsDisplayPatternIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'searchLanguages' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'includeMetadata' => ['type' => 'boolean'],
                    'debugMode' => ['type' => 'boolean'],
                    'lifeCycleFilter' => [
                        'type' => 'string',
                        'enum' => [
                            'ActiveOnly',
                            'All',
                            'InactiveOnly',
                            'ActiveInactiveOnly'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'start',
                    'limit',
                    'includeAllSchemaChildren',
                    'brokenDependenciesFilter',
                    'includeMetadata',
                    'debugMode',
                    'lifeCycleFilter'
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
                    'id' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
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
                    'pageToken' => ['type' => 'string'],
                    'queryDebugInformation' => ['$ref' => '#/definitions/QueryDebugInformation']
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalResults']
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
                    'brokenDependenciesFilter' => [
                        'type' => 'string',
                        'enum' => [
                            'All',
                            'NotBrokenOnly',
                            'BrokenOnly'
                        ]
                    ],
                    'schemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'displayLanguage' => ['type' => 'string'],
                    'searchLanguages' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'lifeCycleFilter' => [
                        'type' => 'string',
                        'enum' => [
                            'ActiveOnly',
                            'All',
                            'InactiveOnly',
                            'ActiveInactiveOnly'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'includeAllSchemaChildren',
                    'brokenDependenciesFilter',
                    'lifeCycleFilter'
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
            'ListItemCreateManyRequest' => [
                'properties' => [
                    'allowMissingDependencies' => ['type' => 'boolean'],
                    'requests' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/ListItemCreateRequest']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['allowMissingDependencies']
            ],
            'ListItemUpdateRequest' => [
                'properties' => [
                    'content' => ['type' => 'object'],
                    'id' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ListItemUpdateManyRequest' => [
                'properties' => [
                    'allowMissingDependencies' => ['type' => 'boolean'],
                    'requests' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/ListItemUpdateRequest']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['allowMissingDependencies']
            ],
            'ListItemDeactivateRequest' => [
                'properties' => [
                    'listItemIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'forceReferenceRemoval' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => ['forceReferenceRemoval']
            ],
            'ListItemReactivateRequest' => [
                'properties' => [
                    'listItemIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'allowMissingDependencies' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => ['allowMissingDependencies']
            ],
            'ListItemFieldsUpdateRequest' => [
                'properties' => [
                    'listItemIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'changeCommands' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/MetadataValuesChangeCommandBase']
                    ],
                    'allowMissingDependencies' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => ['allowMissingDependencies']
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
                        'items' => ['$ref' => '#/definitions/MetadataValuesChangeCommandBase']
                    ],
                    'allowMissingDependencies' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => ['allowMissingDependencies']
            ],
            'ListItemReferences' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'MetadataReference' => [
                'properties' => [
                    'targetDocType' => ['type' => 'string'],
                    'sourceId' => ['type' => 'string'],
                    'sourceDocType' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ReferencesBase' => [
                'properties' => [
                    'targetMetadataItemId' => ['type' => 'string'],
                    'references' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/MetadataReference']
                    ],
                    'isReferencedByRestrictedItem' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => ['isReferencedByRestrictedItem']
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
                    'pageToken' => ['type' => 'string'],
                    'queryDebugInformation' => ['$ref' => '#/definitions/QueryDebugInformation']
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalResults']
            ],
            'DisplayPattern' => [
                'properties' => [
                    'templateEngine' => ['type' => 'string'],
                    'displayPatternType' => [
                        'type' => 'string',
                        'enum' => [
                            'Thumbnail',
                            'List',
                            'Detail',
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
                    'simpleSearch' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'required',
                    'fixed',
                    'index',
                    'simpleSearch'
                ]
            ],
            'FieldOverwriteBase' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'required' => ['type' => 'boolean'],
                    'overwriteRequired' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'required',
                    'overwriteRequired'
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
                    'fieldsOverwrite' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/FieldOverwriteBase']
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
                'properties' => ['boost' => [
                    'type' => 'number',
                    'format' => 'double'
                ]],
                'additionalProperties' => FALSE,
                'required' => ['boost']
            ],
            'FieldDate' => [
                'properties' => [
                    'format' => ['type' => 'string'],
                    'boost' => [
                        'type' => 'number',
                        'format' => 'double'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['boost']
            ],
            'FieldDateTime' => [
                'properties' => [
                    'format' => ['type' => 'string'],
                    'boost' => [
                        'type' => 'number',
                        'format' => 'double'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['boost']
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
                    ],
                    'boost' => [
                        'type' => 'number',
                        'format' => 'double'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['boost']
            ],
            'FieldDictionary' => [
                'properties' => ['boost' => [
                    'type' => 'number',
                    'format' => 'double'
                ]],
                'additionalProperties' => FALSE,
                'required' => ['boost']
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
                'properties' => ['boost' => [
                    'type' => 'number',
                    'format' => 'double'
                ]],
                'additionalProperties' => FALSE,
                'required' => ['boost']
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
                    ],
                    'boost' => [
                        'type' => 'number',
                        'format' => 'double'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['boost']
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
                    'schemaIndexingInfo' => ['$ref' => '#/definitions/SchemaIndexingInfo']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FieldMultiFieldset' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'schemaIndexingInfo' => ['$ref' => '#/definitions/SchemaIndexingInfo'],
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
            'FieldSingleTagbox' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'schemaIndexingInfo' => ['$ref' => '#/definitions/SchemaIndexingInfo'],
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'listItemCreateTemplate' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FieldMultiTagbox' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'schemaIndexingInfo' => ['$ref' => '#/definitions/SchemaIndexingInfo'],
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
                'required' => ['uniqueItems']
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
                    ],
                    'boost' => [
                        'type' => 'number',
                        'format' => 'double'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'keepFieldValue',
                    'multiLine',
                    'boost'
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
                    'keepFieldValue' => ['type' => 'boolean'],
                    'boost' => [
                        'type' => 'number',
                        'format' => 'double'
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'multiLine',
                    'keepFieldValue',
                    'boost'
                ]
            ],
            'RelationType' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'names' => ['type' => 'object'],
                    'targetDocType' => ['type' => 'string'],
                    'filter' => ['$ref' => '#/definitions/FilterBase']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FieldSingleRelation' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'schemaIndexingInfo' => ['$ref' => '#/definitions/SchemaIndexingInfo'],
                    'relationTypes' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/RelationType']
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'FieldMultiRelation' => [
                'properties' => [
                    'schemaId' => ['type' => 'string'],
                    'schemaIndexingInfo' => ['$ref' => '#/definitions/SchemaIndexingInfo'],
                    'relationTypes' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/RelationType']
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
                'required' => ['uniqueItems']
            ],
            'FieldOverwriteSingleTagbox' => [
                'properties' => [
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'overwriteFilter' => ['type' => 'boolean'],
                    'listItemCreateTemplate' => ['type' => 'string'],
                    'overwriteListItemCreateTemplate' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'overwriteFilter',
                    'overwriteListItemCreateTemplate'
                ]
            ],
            'FieldOverwriteMultiTagbox' => [
                'properties' => [
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'overwriteFilter' => ['type' => 'boolean'],
                    'listItemCreateTemplate' => ['type' => 'string'],
                    'overwriteListItemCreateTemplate' => ['type' => 'boolean'],
                    'maximumItems' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'overwriteMaximumItems' => ['type' => 'boolean'],
                    'minimumItems' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'overwriteMinimumItems' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'overwriteFilter',
                    'overwriteListItemCreateTemplate',
                    'overwriteMaximumItems',
                    'overwriteMinimumItems'
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
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'debugMode' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'start',
                    'limit',
                    'debugMode'
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
                    'pageToken' => ['type' => 'string'],
                    'queryDebugInformation' => ['$ref' => '#/definitions/QueryDebugInformation']
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalResults']
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
                    'fieldsOverwrite' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/FieldOverwriteBase']
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
                    'fieldsOverwrite' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/FieldOverwriteBase']
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
                    ],
                    'debugMode' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'start',
                    'limit',
                    'debugMode'
                ]
            ],
            'PermissionSetSearchResult' => [
                'properties' => ['elapsedMilliseconds' => [
                    'type' => 'integer',
                    'format' => 'int64'
                ]],
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
                    'pageToken' => ['type' => 'string'],
                    'queryDebugInformation' => ['$ref' => '#/definitions/QueryDebugInformation']
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
                                'AccessOriginal',
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
            'VersionInfo' => [
                'properties' => [
                    'fileVersion' => ['type' => 'string'],
                    'fileProductVersion' => ['type' => 'string'],
                    'contractVersion' => ['type' => 'string'],
                    'release' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ShareUser' => [
                'properties' => [
                    'displayName' => ['type' => 'string'],
                    'emailHash' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'OutputDataBase' => [
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
            'ShareOutputBase' => [
                'properties' => [
                    'contentId' => ['type' => 'string'],
                    'outputFormatId' => ['type' => 'string'],
                    'url' => ['type' => 'string'],
                    'detail' => ['$ref' => '#/definitions/OutputDataBase']
                ],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ShareContentDetail' => [
                'properties' => [
                    'contentSchemaId' => ['type' => 'string'],
                    'layerSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'content' => ['type' => 'object'],
                    'metadata' => ['type' => 'object'],
                    'id' => ['type' => 'string'],
                    'outputs' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/ShareOutputBase']
                    ],
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
                            'Model3d',
                            'ContentItem'
                        ]
                    ],
                    'displayValues' => ['type' => 'object']
                ],
                'additionalProperties' => FALSE,
                'required' => ['contentType']
            ],
            'ShareDataBase' => [
                'properties' => ['url' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
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
            'ShareDetail' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'name' => ['type' => 'string'],
                    'description' => ['type' => 'string'],
                    'creator' => ['$ref' => '#/definitions/ShareUser'],
                    'audit' => ['$ref' => '#/definitions/UserAudit'],
                    'contentSelections' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/ShareContentDetail']
                    ],
                    'layerSchemaIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'data' => ['$ref' => '#/definitions/ShareDataBase'],
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
                    ],
                    'shareType' => [
                        'type' => 'string',
                        'enum' => [
                            'Basic',
                            'Embed'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'outputAccess',
                    'shareType'
                ]
            ],
            'OutputDataImage' => [
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
            'OutputDataAudio' => [
                'properties' => ['durationInSeconds' => [
                    'type' => 'number',
                    'format' => 'double'
                ]],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'OutputDataVideo' => [
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
            'OutputDataDocument' => [
                'properties' => ['pageCount' => [
                    'type' => 'integer',
                    'format' => 'int32'
                ]],
                'additionalProperties' => FALSE,
                'required' => ['pageCount']
            ],
            'OutputDataDefault' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ShareOutputBasic' => [
                'properties' => [],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ShareOutputEmbed' => [
                'properties' => ['token' => ['type' => 'string']],
                'additionalProperties' => FALSE,
                'required' => []
            ],
            'ShareDataEmbed' => [
                'properties' => ['token' => ['type' => 'string']],
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
            'ShareDataBasic' => [
                'properties' => [
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
                    'filter' => ['$ref' => '#/definitions/FilterBase'],
                    'debugMode' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'start',
                    'limit',
                    'debugMode'
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
            'SearchBehaviourBaseResultOfShare' => [
                'properties' => [
                    'searchString' => ['type' => 'string'],
                    'isSearchStringRewritten' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => ['isSearchStringRewritten']
            ],
            'Share' => [
                'properties' => [
                    'name' => ['type' => 'string'],
                    'contentIds' => [
                        'type' => 'array',
                        'items' => ['type' => 'string']
                    ],
                    'id' => ['type' => 'string'],
                    'audit' => ['$ref' => '#/definitions/UserAudit'],
                    'expirationDate' => [
                        'type' => 'string',
                        'format' => 'date-time'
                    ],
                    'shareType' => [
                        'type' => 'string',
                        'enum' => [
                            'Basic',
                            'Embed'
                        ]
                    ]
                ],
                'additionalProperties' => FALSE,
                'required' => ['shareType']
            ],
            'BaseResultOfShare' => [
                'properties' => [
                    'totalResults' => [
                        'type' => 'integer',
                        'format' => 'int64'
                    ],
                    'results' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/Share']
                    ],
                    'pageToken' => ['type' => 'string'],
                    'queryDebugInformation' => ['$ref' => '#/definitions/QueryDebugInformation']
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalResults']
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
                            'FileUploadAutoImport',
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
                    ],
                    'collectionId' => ['type' => 'string']
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
            'TransferSearchRequest' => [
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
                            'FileUploadAutoImport',
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
                    ],
                    'collectionId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'state',
                    'transferType',
                    'fileTransferCount'
                ]
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
                    'pageToken' => ['type' => 'string'],
                    'queryDebugInformation' => ['$ref' => '#/definitions/QueryDebugInformation']
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalResults']
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
                            'FileUploadAutoImport',
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
            'VersionInfo2' => [
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
                        'items' => ['$ref' => '#/definitions/VersionInfo2']
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
                    'fileMetadata' => ['$ref' => '#/definitions/FileMetadata'],
                    'driveMetadata' => ['$ref' => '#/definitions/DriveMetadata'],
                    'outputItems' => [
                        'type' => 'array',
                        'items' => ['$ref' => '#/definitions/OutputItem']
                    ],
                    'contentId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => ['state']
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
                    'contentId' => ['type' => 'string']
                ],
                'additionalProperties' => FALSE,
                'required' => ['state']
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
                    'pageToken' => ['type' => 'string'],
                    'queryDebugInformation' => ['$ref' => '#/definitions/QueryDebugInformation']
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalResults']
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
                            'InactiveOnly',
                            'ActiveInactiveOnly'
                        ]
                    ],
                    'userRightsFilter' => [
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
                    ],
                    'debugMode' => ['type' => 'boolean']
                ],
                'additionalProperties' => FALSE,
                'required' => [
                    'start',
                    'limit',
                    'lifeCycleFilter',
                    'debugMode'
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
                    'pageToken' => ['type' => 'string'],
                    'queryDebugInformation' => ['$ref' => '#/definitions/QueryDebugInformation']
                ],
                'additionalProperties' => FALSE,
                'required' => ['totalResults']
            ],
            'Channel' => [
                'properties' => [
                    'id' => ['type' => 'string'],
                    'sortOrder' => [
                        'type' => 'integer',
                        'format' => 'int32'
                    ],
                    'searchIndexId' => ['type' => 'string'],
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
                    ],
                    'missingResultsDisplayPatterns' => ['type' => 'object']
                ],
                'additionalProperties' => FALSE,
                'required' => ['sortOrder']
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
