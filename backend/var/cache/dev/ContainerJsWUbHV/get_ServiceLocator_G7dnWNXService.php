<?php

namespace ContainerJsWUbHV;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_ServiceLocator_G7dnWNXService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.service_locator.G7dnWNX' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    public static function do($container, $lazyLoad = true)
    {
        return $container->privates['.service_locator.G7dnWNX'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService ??= $container->getService(...), [
            'book' => ['privates', '.errored..service_locator.G7dnWNX.App\\Entity\\Book', NULL, 'Cannot autowire service ".service_locator.G7dnWNX": it needs an instance of "App\\Entity\\Book" but this type has been excluded in "config/services.yaml".'],
            'bookRepository' => ['privates', 'App\\Repository\\BookRepository', 'getBookRepositoryService', true],
            'entityManager' => ['services', 'doctrine.orm.default_entity_manager', 'getDoctrine_Orm_DefaultEntityManagerService', false],
            'serializer' => ['privates', 'serializer', 'getSerializerService', false],
        ], [
            'book' => 'App\\Entity\\Book',
            'bookRepository' => 'App\\Repository\\BookRepository',
            'entityManager' => '?',
            'serializer' => '?',
        ]);
    }
}
