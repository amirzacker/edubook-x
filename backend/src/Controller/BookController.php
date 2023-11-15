<?php

namespace App\Controller;

use App\Entity\Book;
use App\Repository\BookRepository;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api', name: 'api_')]
class BookController extends AbstractController
{
   
    /**
     * Renvoie tous les livres
     *
     * @param SerializerInterface $serializer
     * @param BookRepository $bookRepository
     * @return JsonResponse
     */
    #[Route('/books', name: 'book.getAll',methods: ["GET"])]
    public function getAll(BookRepository $bookRepository, SerializerInterface $serializer): JsonResponse
    {
      
        $books =  $bookRepository->findAll();
        $jsonBooks = $serializer->serialize($books, 'json', ["groups" => "getBook"]);
     
        return new JsonResponse(
            $jsonBooks,
            Response::HTTP_OK,
            [],
            true
        );
    }

    #[Route('/books/{idBook}', name: 'get_book', methods: ['GET'])]
    #[ParamConverter("book", options:["id" => "idBook"])]
    public function getBook(SerializerInterface $serializer, Book $book): JsonResponse
    {
     
        $jsonBook = $serializer->serialize($book, 'json', ["groups" => "getBook"]);
        return new JsonResponse($jsonBook, Response::HTTP_OK, [], true);
    }

    #[Route('/books', name: 'add_book', methods: ['POST'])]
    public function addBook(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer,CategoryRepository $categoryRepository): JsonResponse
    {
        $bookData = json_decode($request->getContent(), true);

        // Check if category ID is provided
        if (isset($bookData['categoryId'])) {
            $category = $categoryRepository->find($bookData['categoryId']);
            if (!$category) {
                return $this->json(['error' => 'Category not found'], Response::HTTP_BAD_REQUEST);
            }
        } 
    
        $book = $serializer->deserialize($request->getContent(), Book::class,'json');
        $book->setCategory($category);

        $entityManager->persist($book);
        $entityManager->flush();
     
        $jsonBook = $serializer->serialize($book, 'json', ["groups" => "getBook"]);
        return new JsonResponse($jsonBook, Response::HTTP_CREATED,[], true);
    }

    #[Route('/books/{idBook}', name: 'update_book', methods: ['PUT'])]
    #[ParamConverter("book", options:["id" => "idBook"])]
    public function updateBook(Request $request, BookRepository $bookRepository, SerializerInterface $serializer, Book $book, EntityManagerInterface $entityManager,): JsonResponse
    {
       
        $updatedBook = $serializer->deserialize($request->getContent(),Book::class,'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $book] );

        if (!$book) {
            return $this->json(['error' => 'Book not found'], Response::HTTP_NOT_FOUND);
        }
        
        
        $entityManager->persist($updatedBook);
        $entityManager->flush();

        $jsonBook = $serializer->serialize($book, 'json');
        return new JsonResponse($jsonBook, Response::HTTP_OK, [], true);
    }

    #[Route('/books/{id}', name: 'delete_book', methods: ['DELETE'])]
    public function deleteBook(ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $bookRepository = $entityManager->getRepository(Book::class);

        $book = $bookRepository->find($id);
        if (!$book) {
            return $this->json(['error' => 'Book not found'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($book);
        $entityManager->flush();

        return $this->json(['message' => 'Book deleted'], Response::HTTP_NO_CONTENT);
    }

    
}
