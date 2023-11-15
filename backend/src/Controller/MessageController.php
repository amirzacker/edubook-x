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

        $jsonMessage = $serializer->serialize($message, 'json', ["groups" => "getAllmessage"]);
        return new JsonResponse($jsonMessage, Response::HTTP_CREATED,[], true);
    }

  
}
