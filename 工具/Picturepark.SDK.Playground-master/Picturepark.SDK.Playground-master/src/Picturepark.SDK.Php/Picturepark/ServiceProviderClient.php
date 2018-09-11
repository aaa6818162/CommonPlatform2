<?php
namespace Picturepark;
final class ServiceProviderClient
{
    /**
     * @param \Microsoft\Rest\ClientInterface $_client
     */
    public function __construct(\Microsoft\Rest\ClientInterface $_client)
    {
        $this->_GetConfiguration_operation = $_client->createOperation('ServiceProviderClient_GetConfiguration');
        $this->_UpdateConfiguration_operation = $_client->createOperation('ServiceProviderClient_UpdateConfiguration');
    }
    /**
     * Gets the customer configuration of a specific service provider instance.
     * @param string $serviceProviderId
     * @return array
     */
    public function getConfiguration($serviceProviderId)
    {
        return $this->_GetConfiguration_operation->call(['serviceProviderId' => $serviceProviderId]);
    }
    /**
     * Updates the customer configuration of a specific service provider instance.
     * @param string $serviceProviderId
     * @param array $configuration
     * @return array
     */
    public function updateConfiguration(
        $serviceProviderId,
        array $configuration
    )
    {
        return $this->_UpdateConfiguration_operation->call([
            'serviceProviderId' => $serviceProviderId,
            'configuration' => $configuration
        ]);
    }
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_GetConfiguration_operation;
    /**
     * @var \Microsoft\Rest\OperationInterface
     */
    private $_UpdateConfiguration_operation;
}
