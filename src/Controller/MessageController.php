<?php

namespace App\Controller;

use App\Entity\Message;
use App\Entity\User;
use App\Entity\Conversation;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/messages', name: 'api_messages_')]
class MessageController extends AbstractController
{
    #[Route('/{conversationId}', name: 'index', methods: ['GET'])]
    public function index(ManagerRegistry $doctrine, int $conversationId): JsonResponse
    {
        $messageRepository = $doctrine->getRepository(Message::class);
        $messages = $messageRepository->findBy(['conversation' => $conversationId]);
        $messagesArray = [];

        foreach ($messages as $message) {

            $senderArray = [];
            $sender = $message->getSender();

            $senderArray = [
                'id' => $sender->getId(),
                'username' => $sender->getUsername(),
                'email' => $sender->getEmail(),
            ];
        
            $messagesArray[] = [
                'id' => $message->getId(),
                'conversationId' => $message->getConversation()->getId(),
                'sender' => $senderArray,
                'text' => $message->getText(),
                'createdAt' => $message->getCreatedAt(),
                'updatedAt' => $message->getUpdatedAt(),
            ];
        }

        return $this->json($messagesArray);
    }

    #[Route('/new', name: 'create', methods: ['POST'])]
    public function create(ManagerRegistry $doctrine, Request $request): JsonResponse
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
        $message->setUpdatedAtValue();
        $message->setCreatedAtValue();
        $entityManager->persist($message);
        $entityManager->flush();

        return $this->json(['status' => 'Message created!'], JsonResponse::HTTP_CREATED);
    }
}
