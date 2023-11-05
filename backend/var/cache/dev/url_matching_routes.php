<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/api/books' => [
            [['_route' => 'api_book.getAll', '_controller' => 'App\\Controller\\BookController::getAll'], null, ['GET' => 0], null, false, false, null],
            [['_route' => 'api_add_book', '_controller' => 'App\\Controller\\BookController::addBook'], null, ['POST' => 0], null, false, false, null],
        ],
        '/api/conversations/new' => [[['_route' => 'api_conversations_create', '_controller' => 'App\\Controller\\ConversationController::create'], null, ['POST' => 0], null, false, false, null]],
        '/api/dashboard' => [[['_route' => 'api_app_dashboard', '_controller' => 'App\\Controller\\DashboardController::index'], null, null, null, false, false, null]],
        '/api/messages' => [[['_route' => 'api_create.messages', '_controller' => 'App\\Controller\\MessageController::create'], null, ['POST' => 0], null, false, false, null]],
        '/api/project' => [
            [['_route' => 'api_index', '_controller' => 'App\\Controller\\ProjectController::index'], null, ['GET' => 0], null, false, false, null],
            [['_route' => 'api_create', '_controller' => 'App\\Controller\\ProjectController::create'], null, ['POST' => 0], null, false, false, null],
        ],
        '/api/publications' => [
            [['_route' => 'api_publication.getAll', '_controller' => 'App\\Controller\\PublicationController::getAll'], null, ['GET' => 0], null, false, false, null],
            [['_route' => 'api_publication.add', '_controller' => 'App\\Controller\\PublicationController::addPublication'], null, ['POST' => 0], null, false, false, null],
        ],
        '/api/register' => [[['_route' => 'api_register', '_controller' => 'App\\Controller\\RegistrationController::index'], null, ['POST' => 0], null, false, false, null]],
        '/api/payment' => [[['_route' => 'api_payment', '_controller' => 'App\\Controller\\StripeController::makePayment'], null, ['POST' => 0], null, false, false, null]],
        '/api/login_check' => [[['_route' => 'api_login_check'], null, null, null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/_error/(\\d+)(?:\\.([^/]++))?(*:35)'
                .'|/api/(?'
                    .'|books/([^/]++)(?'
                        .'|(*:67)'
                        .'|(*:74)'
                    .')'
                    .'|conversations/(?'
                        .'|user/([^/]++)(*:112)'
                        .'|find/([^/]++)/([^/]++)(*:142)'
                    .')'
                    .'|messages/([^/]++)(*:168)'
                    .'|p(?'
                        .'|roject/([^/]++)(?'
                            .'|(*:198)'
                        .')'
                        .'|ublications/(?'
                            .'|([^/]++)(?'
                                .'|(*:233)'
                            .')'
                            .'|user/([^/]++)(*:255)'
                        .')'
                    .')'
                .')'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        35 => [[['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null]],
        67 => [
            [['_route' => 'api_get_book', '_controller' => 'App\\Controller\\BookController::getBook'], ['idBook'], ['GET' => 0], null, false, true, null],
            [['_route' => 'api_update_book', '_controller' => 'App\\Controller\\BookController::updateBook'], ['idBook'], ['PUT' => 0], null, false, true, null],
        ],
        74 => [[['_route' => 'api_delete_book', '_controller' => 'App\\Controller\\BookController::deleteBook'], ['id'], ['DELETE' => 0], null, false, true, null]],
        112 => [[['_route' => 'api_conversations_index', '_controller' => 'App\\Controller\\ConversationController::index'], ['userId'], ['GET' => 0], null, false, true, null]],
        142 => [[['_route' => 'api_conversations_find.conversation', '_controller' => 'App\\Controller\\ConversationController::findConversations'], ['firstUserId', 'secondUserId'], ['GET' => 0], null, false, true, null]],
        168 => [[['_route' => 'api_get.messages', '_controller' => 'App\\Controller\\MessageController::get'], ['conversationId'], ['GET' => 0], null, false, true, null]],
        198 => [
            [['_route' => 'api_show', '_controller' => 'App\\Controller\\ProjectController::show'], ['id'], ['GET' => 0], null, false, true, null],
            [['_route' => 'api_delete', '_controller' => 'App\\Controller\\ProjectController::delete'], ['id'], ['DELETE' => 0], null, false, true, null],
        ],
        233 => [
            [['_route' => 'api_publication.get', '_controller' => 'App\\Controller\\PublicationController::getPublication'], ['id'], ['GET' => 0], null, false, true, null],
            [['_route' => 'api_publication.update', '_controller' => 'App\\Controller\\PublicationController::updatePublication'], ['id'], ['PUT' => 0], null, false, true, null],
            [['_route' => 'api_publication.delete', '_controller' => 'App\\Controller\\PublicationController::deletePublication'], ['id'], ['DELETE' => 0], null, false, true, null],
        ],
        255 => [
            [['_route' => 'api_publication.getByUser', '_controller' => 'App\\Controller\\PublicationController::getPublicationsByUser'], ['userId'], ['GET' => 0], null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
