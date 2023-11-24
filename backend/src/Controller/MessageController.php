<?php

namespace App\Controller;

use App\Entity\Message;
use App\Entity\User;
use App\Entity\Conversation;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\HttpClient\HttpClient;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\ResponseInterface;

#[Route('/api', name: 'api_')]
class MessageController extends AbstractController
{
    
    #[Route('/messages/{conversationId}', name: 'get.messages', methods: ['GET'])]
    #[ParamConverter("conversation", options:["id" => "conversationId"])]
    public function get(SerializerInterface $serializer, Conversation $conversation): JsonResponse
    {
       
        $jsonConversation = $serializer->serialize($conversation->getMessages(), 'json', ["groups" => "getAllmessage"]);
        return new JsonResponse($jsonConversation, Response::HTTP_OK,[], true);
    }

    #[Route('/messages', name: 'create.messages', methods: ['POST'])]
    public function create(ManagerRegistry $doctrine, Request $request, SerializerInterface $serializer): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $data = json_decode($request->getContent(), true);

        $conversationRepository = $entityManager->getRepository(Conversation::class);
        $conversation = $conversationRepository->find($data['conversationId']);

        if (!$conversation) {
            return $this->json(['message' => 'Convesation not found!'], JsonResponse::HTTP_NOT_FOUND);
        }

        $userRepository = $entityManager->getRepository(User::class);
        $sender = $userRepository->find($data['sender']);
  
        if (!$sender) {
            return $this->json(['message' => 'User not found!'], JsonResponse::HTTP_NOT_FOUND);
        }

        $message = new Message();
        $message->setText($data['text']);
        $message->setConversation($conversation);
        $message->setSender($sender);
        $message->setCreatedAtValue();
        $entityManager->persist($message);
        $entityManager->flush();

        

       
        // Configuration pour l'appel HTTP
        $jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.yNZvrVvATGXFh6HNp-PD8FYEKkJMtJchsvFYcJEY6go'; 
        $client = HttpClient::create();
        try {
            $response = $client->request('POST', 'http://localhost:80/.well-known/mercure', [
                'headers' => [
                    'Content-Type' => 'application/x-www-form-urlencoded',
                    'Authorization' => 'Bearer ' . $jwtToken
                ],
                'body' => [
                    'topic' => 'conversation/' . $conversation->getId(),
                    'data' => $serializer->serialize($message, 'json', ["groups" => "getAllmessage"])
                ]
            ]);

            if ($response->getStatusCode() !== 200) {
                throw new \Exception('Erreur lors de l\'envoi de la mise à jour Mercure.');
            }
        } catch (TransportExceptionInterface $e) {
            // Gérez l'erreur de transport ici
            return $this->json(['message' => 'Erreur lors de la communication avec le serveur Mercure'], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            // Gérez les autres erreurs ici
            return $this->json(['message' => $e->getMessage()], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }

        $jsonMessage = $serializer->serialize($message, 'json', ["groups" => "getAllmessage"]);
        return new JsonResponse($jsonMessage, Response::HTTP_CREATED,[], true);
    }

  
}
