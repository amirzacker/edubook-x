<?php

namespace App\Controller;

use App\Entity\Message;
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
            $messagesArray[] = [
                'id' => $message->getId(),
                'conversationId' => $message->getConversation(),
                'sender' => $message->getSender(),
                'text' => $message->getText(),
                'createdAt' => $message->getCreatedAt(),
                'updatedAt' => $message->getUpdatedAt(),
            ];
        }

        return $this->json($messagesArray);
    }

    #[Route('/', name: 'create', methods: ['POST'])]
    public function create(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $data = json_decode($request->getContent(), true);

        $message = new Message();
        $message->setText($data['text']);
        // $message->setConversation($conversation); // Assurez-vous d'avoir la conversation correcte

        $entityManager->persist($message);
        $entityManager->flush();

        return $this->json(['status' => 'Message created!'], JsonResponse::HTTP_CREATED);
    }
}
