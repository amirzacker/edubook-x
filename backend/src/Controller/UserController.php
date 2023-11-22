<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api', name: 'api_')]
class UserController extends AbstractController
{
    // Récupérer les données de l'utilisateur
    #[Route('/user', name: 'get_user', methods: ['GET'])]
    public function getUserConnect(SerializerInterface $serializer): JsonResponse
    {
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $jsonUser = $serializer->serialize($user, 'json', ["groups" => "getUser"]);

        return new JsonResponse($jsonUser, Response::HTTP_OK,[], true);
    }

    // Mettre à jour la photo de profil de l'utilisateur
    #[Route('/user/photo', name: 'update_user_photo', methods: ['POST'])]
    public function updateUserPhoto(Request $request, ManagerRegistry $doctrine): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $file = $request->files->get('photo');

        if ($file) {
            // Ici, ajoutez votre logique pour le traitement et le stockage du fichier
            // Par exemple, déplacez le fichier dans un répertoire de stockage et mettez à jour l'URL de la photo dans l'entité utilisateur
        }

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json(['message' => 'Photo updated successfully']);
    }

    #[Route('/user', name: 'user.update', methods: ['PUT'])]
    public function updateUser(Request $request,UserRepository $userRepository , SerializerInterface $serializer, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['message' => 'Utilisateur non connecté.'], Response::HTTP_UNAUTHORIZED);
        }
        $content = $request->toArray();
        if (isset($content["password"])) {
           // $userRepository->upgradePassword($user, $content["password"]);
        }
        $serializer->deserialize($request->getContent(), User::class, 'json', ['object_to_populate' => $user]);
        $entityManager->flush();

        $jsonUser = $serializer->serialize($user, 'json', ["groups" => "getUser"]);
        return new JsonResponse($jsonUser, Response::HTTP_OK, [], true);
    }

    // Supprimer le compte de l'utilisateur
    #[Route('/user', name: 'delete_user', methods: ['DELETE'])]
    public function deleteUser(ManagerRegistry $doctrine): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $user = $this->getUser();

        if (!$user) {
            return $this->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($user);
        $entityManager->flush();

        return $this->json(['message' => 'User deleted successfully']);
    }
}
