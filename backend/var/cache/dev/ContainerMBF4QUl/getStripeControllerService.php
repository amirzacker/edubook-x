<?php

namespace ContainerMBF4QUl;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class getStripeControllerService extends App_KernelDevDebugContainer
{
    /**
     * Gets the public 'App\Controller\StripeController' shared autowired service.
     *
     * @return \App\Controller\StripeController
     */
    public static function do($container, $lazyLoad = true)
    {
        include_once \dirname(__DIR__, 4).'/vendor/symfony/framework-bundle/Controller/AbstractController.php';
        include_once \dirname(__DIR__, 4).'/src/Controller/StripeController.php';

        $container->services['App\\Controller\\StripeController'] = $instance = new \App\Controller\StripeController();

        $instance->setContainer(($container->privates['.service_locator.O2p6Lk7'] ?? $container->load('get_ServiceLocator_O2p6Lk7Service'))->withContext('App\\Controller\\StripeController', $container));

        return $instance;
    }
}
