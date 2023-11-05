<?php

namespace ContainerMBF4QUl;

use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_ServiceLocator_2MdOtvoService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.service_locator.2MdOtvo' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    public static function do($container, $lazyLoad = true)
    {
        return $container->privates['.service_locator.2MdOtvo'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService ??= $container->getService(...), [
            'App\\Controller\\BookController::addBook' => ['privates', '.service_locator.hZCPxtQ', 'get_ServiceLocator_HZCPxtQService', true],
            'App\\Controller\\BookController::deleteBook' => ['privates', '.service_locator.o6sN0hZ', 'get_ServiceLocator_O6sN0hZService', true],
            'App\\Controller\\BookController::getAll' => ['privates', '.service_locator.msKV3CX', 'get_ServiceLocator_MsKV3CXService', true],
            'App\\Controller\\BookController::getBook' => ['privates', '.service_locator.2PcGlAo', 'get_ServiceLocator_2PcGlAoService', true],
            'App\\Controller\\BookController::updateBook' => ['privates', '.service_locator.G7dnWNX', 'get_ServiceLocator_G7dnWNXService', true],
            'App\\Controller\\ConversationController::create' => ['privates', '.service_locator.o6sN0hZ', 'get_ServiceLocator_O6sN0hZService', true],
            'App\\Controller\\ConversationController::findConversations' => ['privates', '.service_locator.wi2Ekjr', 'get_ServiceLocator_Wi2EkjrService', true],
            'App\\Controller\\ConversationController::index' => ['privates', '.service_locator.eaWM4aR', 'get_ServiceLocator_EaWM4aRService', true],
            'App\\Controller\\MessageController::create' => ['privates', '.service_locator.iYW9vWf', 'get_ServiceLocator_IYW9vWfService', true],
            'App\\Controller\\MessageController::get' => ['privates', '.service_locator.OCnFGBG', 'get_ServiceLocator_OCnFGBGService', true],
            'App\\Controller\\ProjectController::create' => ['privates', '.service_locator.o6sN0hZ', 'get_ServiceLocator_O6sN0hZService', true],
            'App\\Controller\\ProjectController::delete' => ['privates', '.service_locator.o6sN0hZ', 'get_ServiceLocator_O6sN0hZService', true],
            'App\\Controller\\ProjectController::index' => ['privates', '.service_locator.o6sN0hZ', 'get_ServiceLocator_O6sN0hZService', true],
            'App\\Controller\\ProjectController::show' => ['privates', '.service_locator.o6sN0hZ', 'get_ServiceLocator_O6sN0hZService', true],
            'App\\Controller\\PublicationController::addPublication' => ['privates', '.service_locator.ljsIQCe', 'get_ServiceLocator_LjsIQCeService', true],
            'App\\Controller\\PublicationController::deletePublication' => ['privates', '.service_locator.n.7.wCW', 'get_ServiceLocator_N_7_WCWService', true],
            'App\\Controller\\PublicationController::getAll' => ['privates', '.service_locator.VIKQ0FW', 'get_ServiceLocator_VIKQ0FWService', true],
            'App\\Controller\\PublicationController::getPublication' => ['privates', '.service_locator.YFlO83_', 'get_ServiceLocator_YFlO83Service', true],
            'App\\Controller\\PublicationController::getPublicationsByUser' => ['privates', '.service_locator.VIKQ0FW', 'get_ServiceLocator_VIKQ0FWService', true],
            'App\\Controller\\PublicationController::updatePublication' => ['privates', '.service_locator.LWeIwFr', 'get_ServiceLocator_LWeIwFrService', true],
            'App\\Controller\\RegistrationController::index' => ['privates', '.service_locator.dTaHD7m', 'get_ServiceLocator_DTaHD7mService', true],
            'App\\Kernel::loadRoutes' => ['privates', '.service_locator.y4_Zrx.', 'get_ServiceLocator_Y4Zrx_Service', true],
            'App\\Kernel::registerContainerConfiguration' => ['privates', '.service_locator.y4_Zrx.', 'get_ServiceLocator_Y4Zrx_Service', true],
            'kernel::loadRoutes' => ['privates', '.service_locator.y4_Zrx.', 'get_ServiceLocator_Y4Zrx_Service', true],
            'kernel::registerContainerConfiguration' => ['privates', '.service_locator.y4_Zrx.', 'get_ServiceLocator_Y4Zrx_Service', true],
            'App\\Controller\\BookController:addBook' => ['privates', '.service_locator.hZCPxtQ', 'get_ServiceLocator_HZCPxtQService', true],
            'App\\Controller\\BookController:deleteBook' => ['privates', '.service_locator.o6sN0hZ', 'get_ServiceLocator_O6sN0hZService', true],
            'App\\Controller\\BookController:getAll' => ['privates', '.service_locator.msKV3CX', 'get_ServiceLocator_MsKV3CXService', true],
            'App\\Controller\\BookController:getBook' => ['privates', '.service_locator.2PcGlAo', 'get_ServiceLocator_2PcGlAoService', true],
            'App\\Controller\\BookController:updateBook' => ['privates', '.service_locator.G7dnWNX', 'get_ServiceLocator_G7dnWNXService', true],
            'App\\Controller\\ConversationController:create' => ['privates', '.service_locator.o6sN0hZ', 'get_ServiceLocator_O6sN0hZService', true],
            'App\\Controller\\ConversationController:findConversations' => ['privates', '.service_locator.wi2Ekjr', 'get_ServiceLocator_Wi2EkjrService', true],
            'App\\Controller\\ConversationController:index' => ['privates', '.service_locator.eaWM4aR', 'get_ServiceLocator_EaWM4aRService', true],
            'App\\Controller\\MessageController:create' => ['privates', '.service_locator.iYW9vWf', 'get_ServiceLocator_IYW9vWfService', true],
            'App\\Controller\\MessageController:get' => ['privates', '.service_locator.OCnFGBG', 'get_ServiceLocator_OCnFGBGService', true],
            'App\\Controller\\ProjectController:create' => ['privates', '.service_locator.o6sN0hZ', 'get_ServiceLocator_O6sN0hZService', true],
            'App\\Controller\\ProjectController:delete' => ['privates', '.service_locator.o6sN0hZ', 'get_ServiceLocator_O6sN0hZService', true],
            'App\\Controller\\ProjectController:index' => ['privates', '.service_locator.o6sN0hZ', 'get_ServiceLocator_O6sN0hZService', true],
            'App\\Controller\\ProjectController:show' => ['privates', '.service_locator.o6sN0hZ', 'get_ServiceLocator_O6sN0hZService', true],
            'App\\Controller\\PublicationController:addPublication' => ['privates', '.service_locator.ljsIQCe', 'get_ServiceLocator_LjsIQCeService', true],
            'App\\Controller\\PublicationController:deletePublication' => ['privates', '.service_locator.n.7.wCW', 'get_ServiceLocator_N_7_WCWService', true],
            'App\\Controller\\PublicationController:getAll' => ['privates', '.service_locator.VIKQ0FW', 'get_ServiceLocator_VIKQ0FWService', true],
            'App\\Controller\\PublicationController:getPublication' => ['privates', '.service_locator.YFlO83_', 'get_ServiceLocator_YFlO83Service', true],
            'App\\Controller\\PublicationController:getPublicationsByUser' => ['privates', '.service_locator.VIKQ0FW', 'get_ServiceLocator_VIKQ0FWService', true],
            'App\\Controller\\PublicationController:updatePublication' => ['privates', '.service_locator.LWeIwFr', 'get_ServiceLocator_LWeIwFrService', true],
            'App\\Controller\\RegistrationController:index' => ['privates', '.service_locator.dTaHD7m', 'get_ServiceLocator_DTaHD7mService', true],
            'kernel:loadRoutes' => ['privates', '.service_locator.y4_Zrx.', 'get_ServiceLocator_Y4Zrx_Service', true],
            'kernel:registerContainerConfiguration' => ['privates', '.service_locator.y4_Zrx.', 'get_ServiceLocator_Y4Zrx_Service', true],
        ], [
            'App\\Controller\\BookController::addBook' => '?',
            'App\\Controller\\BookController::deleteBook' => '?',
            'App\\Controller\\BookController::getAll' => '?',
            'App\\Controller\\BookController::getBook' => '?',
            'App\\Controller\\BookController::updateBook' => '?',
            'App\\Controller\\ConversationController::create' => '?',
            'App\\Controller\\ConversationController::findConversations' => '?',
            'App\\Controller\\ConversationController::index' => '?',
            'App\\Controller\\MessageController::create' => '?',
            'App\\Controller\\MessageController::get' => '?',
            'App\\Controller\\ProjectController::create' => '?',
            'App\\Controller\\ProjectController::delete' => '?',
            'App\\Controller\\ProjectController::index' => '?',
            'App\\Controller\\ProjectController::show' => '?',
            'App\\Controller\\PublicationController::addPublication' => '?',
            'App\\Controller\\PublicationController::deletePublication' => '?',
            'App\\Controller\\PublicationController::getAll' => '?',
            'App\\Controller\\PublicationController::getPublication' => '?',
            'App\\Controller\\PublicationController::getPublicationsByUser' => '?',
            'App\\Controller\\PublicationController::updatePublication' => '?',
            'App\\Controller\\RegistrationController::index' => '?',
            'App\\Kernel::loadRoutes' => '?',
            'App\\Kernel::registerContainerConfiguration' => '?',
            'kernel::loadRoutes' => '?',
            'kernel::registerContainerConfiguration' => '?',
            'App\\Controller\\BookController:addBook' => '?',
            'App\\Controller\\BookController:deleteBook' => '?',
            'App\\Controller\\BookController:getAll' => '?',
            'App\\Controller\\BookController:getBook' => '?',
            'App\\Controller\\BookController:updateBook' => '?',
            'App\\Controller\\ConversationController:create' => '?',
            'App\\Controller\\ConversationController:findConversations' => '?',
            'App\\Controller\\ConversationController:index' => '?',
            'App\\Controller\\MessageController:create' => '?',
            'App\\Controller\\MessageController:get' => '?',
            'App\\Controller\\ProjectController:create' => '?',
            'App\\Controller\\ProjectController:delete' => '?',
            'App\\Controller\\ProjectController:index' => '?',
            'App\\Controller\\ProjectController:show' => '?',
            'App\\Controller\\PublicationController:addPublication' => '?',
            'App\\Controller\\PublicationController:deletePublication' => '?',
            'App\\Controller\\PublicationController:getAll' => '?',
            'App\\Controller\\PublicationController:getPublication' => '?',
            'App\\Controller\\PublicationController:getPublicationsByUser' => '?',
            'App\\Controller\\PublicationController:updatePublication' => '?',
            'App\\Controller\\RegistrationController:index' => '?',
            'kernel:loadRoutes' => '?',
            'kernel:registerContainerConfiguration' => '?',
        ]);
    }
}
