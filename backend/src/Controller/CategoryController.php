<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api', name: 'api_')]
class CategoryController extends AbstractController
{
    #[Route('/categories', name: 'category.getAll', methods: ['GET'])]
    public function getAll(CategoryRepository $categoryRepository, SerializerInterface $serializer): JsonResponse
    {
        $categories = $categoryRepository->findAll();
        $jsonCategories = $serializer->serialize($categories, 'json', ["groups" => "getCategory"]);
        return new JsonResponse($jsonCategories, Response::HTTP_OK, [], true);
    }

    #[Route('/categories/{id}', name: 'category.get', methods: ['GET'])]
    public function getCategory(Category $category, SerializerInterface $serializer): JsonResponse
    {
        $jsonCategory = $serializer->serialize($category, 'json', ["groups" => "getCategory"]);
        return new JsonResponse($jsonCategory, Response::HTTP_OK, [], true);
    }

    #[Route('/categories', name: 'category.add', methods: ['POST'])]
    public function addCategory(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $category = $serializer->deserialize($request->getContent(), Category::class, 'json');
        $entityManager->persist($category);
        $entityManager->flush();
        $jsonCategory = $serializer->serialize($category, 'json', ["groups" => "getCategory"]);
        return new JsonResponse($jsonCategory, Response::HTTP_CREATED, [], true);
    }

    #[Route('/categories/{id}', name: 'category.update', methods: ['PUT'])]
    public function updateCategory(Request $request, Category $category, EntityManagerInterface $entityManager, SerializerInterface $serializer): JsonResponse
    {
        $serializer->deserialize($request->getContent(), Category::class, 'json', ['object_to_populate' => $category]);
        $entityManager->flush();
        $jsonCategory = $serializer->serialize($category, 'json');
        return new JsonResponse($jsonCategory, Response::HTTP_OK, [], true);
    }

    #[Route('/categories/{id}', name: 'category.delete', methods: ['DELETE'])]
    public function deleteCategory(Category $category, EntityManagerInterface $entityManager): JsonResponse
    {
        $entityManager->remove($category);
        $entityManager->flush();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/categories/search/{name}', name: 'category.searchByName', methods: ['GET'])]
    public function searchCategoryByName(string $name, CategoryRepository $categoryRepository, SerializerInterface $serializer): JsonResponse
    {
        $category = $categoryRepository->findOneByName($name);
        if (!$category) {
            return $this->json(['error' => 'Category not found'], Response::HTTP_NOT_FOUND);
        }
        $jsonCategory = $serializer->serialize($category, 'json', ["groups" => "getCategory"]);
        return new JsonResponse($jsonCategory, Response::HTTP_OK, [], true);
    }
}
