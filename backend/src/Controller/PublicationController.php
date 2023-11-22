<?php

namespace App\Controller;

use App\Entity\Publication;
use App\Repository\BookRepository;
use App\Repository\PublicationRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;



#[Route('/api', name: 'api_')]
class PublicationController extends AbstractController
{
    #[Route('/publications', name: 'publication.getAll', methods: ['GET'])]
    public function getAll(PublicationRepository $publicationRepository, SerializerInterface $serializer): JsonResponse
    {
        $publications = $publicationRepository->findAllOrderedByCreatedAt();
        $jsonPublications = $serializer->serialize($publications, 'json', ["groups" => "getPublication"]);
        return new JsonResponse($jsonPublications, Response::HTTP_OK, [], true);
    }
    #[Route('/publications/{id}', name: 'publication.get', methods: ['GET'])]
    public function getPublication(SerializerInterface $serializer, Publication $publication, PublicationRepository $publicationRepository): JsonResponse
    {
        if (!$publication) {
            return $this->json(['error' => 'Publication not found'], Response::HTTP_NOT_FOUND);
        }
        $jsonPublication = $serializer->serialize($publication, 'json', ["groups" => "getPublication"]);
        return new JsonResponse($jsonPublication, Response::HTTP_OK, [], true);
    }

    #[Route('/publications', name: 'publication.add', methods: ['POST'])]
    public function addPublication(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer, UserRepository $userRepository, BookRepository $bookRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        

        $user = $userRepository->find($data['userId']);
        $book = $bookRepository->find($data['bookId']);

        if (!$user || !$book) {
            return $this->json(['message' => 'User or Book not found'], Response::HTTP_NOT_FOUND);
        }

        $publication = new Publication();
        $publication->setUser($user);
        $publication->setBook($book);
        $publication->setBookState($data['bookState']);
        $publication->setPrice($data['price']);
        $publication->setComment($data['comment']);
        $publication->setCreatedAtValue();

        $entityManager->persist($publication);
        $entityManager->flush();

        $jsonPublication = $serializer->serialize($publication, 'json', ["groups" => "getPublication"]);
        return new JsonResponse($jsonPublication, Response::HTTP_CREATED, [], true);
    }

    #[Route('/publications/{id}', name: 'publication.update', methods: ['PUT'])]
    public function updatePublication(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer, Publication $publication, PublicationRepository $publicationRepository): JsonResponse
    {

        if (!$publication) {
            return $this->json(['message' => 'Publication not found'], Response::HTTP_NOT_FOUND);
        }
        $publication->setUpdatedAtValue();
        $updatedPublication = $serializer->deserialize($request->getContent(), Publication::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $publication]);
        $entityManager->flush();

        $jsonPublication = $serializer->serialize($updatedPublication, 'json',);
        return new JsonResponse($jsonPublication, Response::HTTP_OK, [], true);
    }

    #[Route('/publications/{id}', name: 'publication.delete', methods: ['DELETE'])]
    public function deletePublication(EntityManagerInterface $entityManager, Publication $publication): JsonResponse
    {

        if (!$publication) {
            return $this->json(['message' => 'Publication not found'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($publication);
        $entityManager->flush();

        return $this->json(['message' => 'Publication deleted'], Response::HTTP_NO_CONTENT);
    }

    #[Route('/publications/user/{userId}', name: 'publication.getByUser', methods: ['GET'])]
    public function getPublicationsByUser(int $userId, PublicationRepository $publicationRepository, SerializerInterface $serializer): JsonResponse
    {
        $publications = $publicationRepository->findByUserId($userId);
        
        if (empty($publications)) {
            return $this->json(['message' => 'No publications found for this user'], Response::HTTP_NOT_FOUND);
        }

        $jsonPublications = $serializer->serialize($publications, 'json', ["groups" => "getPublication"]);
        return new JsonResponse($jsonPublications, Response::HTTP_OK, [], true);
    }

}
