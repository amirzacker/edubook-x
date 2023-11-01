<?php

namespace App\Controller;

use App\Entity\Conversation;
use App\Repository\ConversationRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;

#[Route('/api/conversations', name: 'api_conversations_')]
class ConversationController extends AbstractController
{
    #[Route('/user/{userId}', name: 'index', methods: ['GET'])]
    public function index(ConversationRepository $conversationRepository, int $userId): JsonResponse
    {
        $conversations = $conversationRepository->findConversationsByUser($userId);

        $conversationsArray = [];

        foreach ($conversations as $conversation) {
            $membersArray = [];

            foreach ($conversation->getMembers() as $member) {
                $membersArray[] = [
                    'id' => $member->getId(),
                    'username' => $member->getUsername(),
                    'email' => $member->getEmail(),
                ];
            }
            $conversationsArray[] = [
                'id' => $conversation->getId(),
                'members' => $membersArray,
                'createdAt' => $conversation->getCreatedAt(),
                'updatedAt' => $conversation->getUpdatedAt(),
            ];
        }

        return $this->json($conversationsArray);
    }

    #[Route('/new', name: 'create', methods: ['POST'])]
    public function create(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $userRepository = $entityManager->getRepository(User::class);

        $data = json_decode($request->getContent(), true);

        $sender = $userRepository->find($data['senderId']);
        $receiver = $userRepository->find($data['receiverId']);

        
        $conversationRepository = $entityManager->getRepository(Conversation::class);
        $existingConversation = $conversationRepository->findConversationBetweenUsers($data['senderId'], $data['receiverId']);

        if ($existingConversation) {
            return $this->json(['message' => 'A conversation between these users already exists!'], JsonResponse::HTTP_CONFLICT);
        }

        if (!$sender || !$receiver) {
            return $this->json(['message' => 'User not found!'], JsonResponse::HTTP_NOT_FOUND);
        }

        $conversation = new Conversation();

        // Adding User entities instead of ids
        $conversation->addMember($sender);
        $conversation->addMember($receiver);
        $conversation->setCreatedAtValue();
        $conversation->setUpdatedAtValue();

        $entityManager->persist($conversation);
        $entityManager->flush();

        return $this->json(['status' => 'Conversation created!']);
    }


    #[Route('/find/{firstUserId}/{secondUserId}', name: 'find', methods: ['GET'])]
    public function findConversation(ConversationRepository $conversationRepository, int $firstUserId, int $secondUserId): JsonResponse
    {
        $conversation = $conversationRepository->findConversationBetweenUsers($firstUserId, $secondUserId);

        $conversationsArray = [];

        $membersArray = [];

        foreach ($conversation->getMembers() as $member) {
            $membersArray[] = [
                'id' => $member->getId(),
                'username' => $member->getUsername(),
                'email' => $member->getEmail(),
            ];
        }
        $conversationsArray[] = [
            'id' => $conversation->getId(),
            'members' => $membersArray,
            'createdAt' => $conversation->getCreatedAt(),
            'updatedAt' => $conversation->getUpdatedAt(),
        ];

        return $this->json($conversationsArray);
    }
}
