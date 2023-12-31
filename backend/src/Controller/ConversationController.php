<?php

namespace App\Controller;

use App\Entity\Conversation;
use App\Repository\ConversationRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/conversations', name: 'api_conversations')]
class ConversationController extends AbstractController
{
    #[Route('/user/{userId}', name: 'index', methods: ['GET'])]
    public function index(ConversationRepository $conversationRepository, int $userId, SerializerInterface $serializer): JsonResponse
    {
        $conversations = $conversationRepository->findConversationsByUser($userId);
        if (!$conversations) {
            return $this->json(['message' => 'This user have no conversations'], JsonResponse::HTTP_CONFLICT);
        }

        $jsonConversation = $serializer->serialize($conversations, 'json', ["groups" => "getConversation"]);
        return new JsonResponse($jsonConversation, Response::HTTP_OK,[], true);
    }

    #[Route('/new', name: 'create', methods: ['POST'])]
    public function create(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $userRepository = $entityManager->getRepository(User::class);

        $data = json_decode($request->getContent(), true);

        $sender = $userRepository->find($data['senderId']);
        $receiver = $userRepository->find($data['receiverId']);
        $publicationId = $data['publicationId'];

        
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
        $conversation->setPublicationId($publicationId);
        $conversation->setCreatedAtValue();
        $conversation->setUpdatedAtValue();

        $entityManager->persist($conversation);
        $entityManager->flush();

        return $this->json(['status' => 'Conversation created!']);
    }

    
    #[Route('/find/{firstUserId}/{secondUserId}', name: 'find.conversation', methods: ['GET'])]
    public function findConversations(ConversationRepository $conversationRepository, SerializerInterface $serializer, int $firstUserId, int $secondUserId): JsonResponse
    {
        $conversation = $conversationRepository->findConversationBetweenUsers($firstUserId, $secondUserId);


        $jsonConversation = $serializer->serialize($conversation, 'json', ["groups" => "getConversation"]);
        return new JsonResponse($jsonConversation, Response::HTTP_OK,[], true);
    }
}
