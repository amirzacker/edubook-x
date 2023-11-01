<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Stripe;

#[Route('/api', name: 'api_')]
class StripeController extends AbstractController
{
    #[Route('/payment', name: 'payment', methods: 'post')]
    public function makePayment(Request $request): JsonResponse
    {
        $content = json_decode($request->getContent(), true);
        $token = $content['stripeToken'];
        $amount = $content['amount'];

        Stripe\Stripe::setApiKey($_SERVER["STRIPE_SECRET"]);

        try {
            Stripe\Charge::create([
                "amount" => $amount * 100, // Les montants sont en centimes
                "currency" => "eur", // Utiliser 'eur' pour les euros
                "source" => $token,
                "description" => "Payment Test",
            ]);

            return $this->json(['message' => 'Payment Successful!']);
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage()], 400);
        }
    }
}
