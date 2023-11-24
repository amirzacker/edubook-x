<?php

namespace App\Controller;

use App\Entity\Order;
use App\Repository\OrderRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api', name: 'api_')]
class OrderController extends AbstractController
{
    #[Route('/orders', name: 'order.getAll', methods: ['GET'])]
    public function getAll(OrderRepository $orderRepository, SerializerInterface $serializer): JsonResponse
    {
        $orders = $orderRepository->findAll();
        $jsonOrders = $serializer->serialize($orders, 'json');
        return new JsonResponse($jsonOrders, Response::HTTP_OK, [], true);
    }

    #[Route('/orders/{id}', name: 'order.get', methods: ['GET'])]
    public function getOrder(Order $order, SerializerInterface $serializer): JsonResponse
    {
        if (!$order) {
            return $this->json(['error' => 'Order not found'], Response::HTTP_NOT_FOUND);
        }
        $jsonOrder = $serializer->serialize($order, 'json',["groups" => "getOrder"]);
        return new JsonResponse($jsonOrder, Response::HTTP_OK, [], true);
    }

    #[Route('/orders', name: 'order.add', methods: ['POST'])]
    public function addOrder(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer, UserRepository $userRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        $user = $userRepository->find($data['userId']);
        if (!$user) {
            return $this->json(['message' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        $order = new Order();
        $order->setUser($user);
        $order->setAmount($data['amount']);
        $order->setAddress($data['address']);
        $order->setPublications($data['publications']);
        $order->setStatus('pending');

        $entityManager->persist($order);
        $entityManager->flush();

        $jsonOrder = $serializer->serialize($order, 'json', ["groups" => "getOrder"]);
        return new JsonResponse($jsonOrder, Response::HTTP_CREATED, [], true);
    }

    #[Route('/orders/{id}', name: 'order.update', methods: ['PUT'])]
    public function updateOrder(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer, Order $order): JsonResponse
    {
        if (!$order) {
            return $this->json(['message' => 'Order not found'], Response::HTTP_NOT_FOUND);
        }

        $updatedOrder = $serializer->deserialize($request->getContent(), Order::class, 'json', ['object_to_populate' => $order]);
        $entityManager->flush();

        $jsonOrder = $serializer->serialize($updatedOrder, 'json', ["groups" => "getOrder"]);
        return new JsonResponse($jsonOrder, Response::HTTP_OK, [], true);
    }

    #[Route('/orders/{id}', name: 'order.delete', methods: ['DELETE'])]
    public function deleteOrder(EntityManagerInterface $entityManager, Order $order): JsonResponse
    {
        if (!$order) {
            return $this->json(['message' => 'Order not found'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($order);
        $entityManager->flush();

        return $this->json(['message' => 'Order deleted'], Response::HTTP_NO_CONTENT);
    }

    #[Route('/orders/user/{userId}', name: 'order.getByUser', methods: ['GET'])]
    public function getOrdersByUser(int $userId, OrderRepository $orderRepository, SerializerInterface $serializer): JsonResponse
    {
        $orders = $orderRepository->findBy(['user' => $userId]);
        
        if (empty($orders)) {
            return $this->json(['message' => 'No orders found for this user'], Response::HTTP_NOT_FOUND);
        }

        $jsonOrders = $serializer->serialize($orders, 'json', ["groups" => "getOrder"]);
        return new JsonResponse($jsonOrders, Response::HTTP_OK, [], true);
    }
}

