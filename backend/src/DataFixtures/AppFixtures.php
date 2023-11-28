<?php

namespace App\DataFixtures;

use App\Entity\Book;
use App\Entity\Category;
use App\Entity\Conversation;
use App\Entity\Message;
use App\Entity\Order;
use App\Entity\Publication;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $userPasswordHasher;

    public function __construct(UserPasswordHasherInterface $userPasswordHasher)
    {
        $this->userPasswordHasher = $userPasswordHasher;
    }
    public function load(ObjectManager $manager): void
    {
        
        $faker = Factory::create('fr_FR');

        // Création des catégories
        $categories = [];
        for ($i = 0; $i < 10; $i++) {
            $category = new Category();
            $category->setCreatedAtValue();
            $category->setName($faker->word);
            $manager->persist($category);
            $categories[] = $category;
        }

        // Création des livres
        $books = [];
        foreach ($categories as $category) {
            for ($i = 0; $i < 5; $i++) {
                $book = new Book();
                $book->setTitle($faker->sentence)
                    ->setDescription($faker->paragraph)
                    ->setAuthor($faker->name)
                    ->setImage($faker->imageUrl())
                    ->setCategory($category);
                $book->setCreatedAtValue();
                $manager->persist($book);
                $books[] = $book;
            }
        }

        // Création des utilisateurs
        $users = [];
        for ($i = 0; $i < 20; $i++) {
            $user = new User();
            $user->setEmail($faker->email)
                ->setUsername($faker->userName)
                ->setPassword($this->userPasswordHasher->hashPassword($user, 'amircentre')) // Hash le mot de passe
                ->setFirstname($faker->firstName)
                ->setLastname($faker->lastName);
            $manager->persist($user);
            $users[] = $user;
        }


        // Création des publications
        foreach ($books as $book) {
            for ($i = 0; $i < 3; $i++) {
                $publication = new Publication();
                $publication->setUser($users[array_rand($users)])
                    ->setBook($book)
                    ->setBookState($faker->randomElement(['Neuf', 'Usé', 'Très usé']))
                    ->setPrice($faker->numberBetween(10, 100))
                    ->setComment($faker->paragraph)
                    ->setStatus($faker->randomElement(['pending', 'published']));
                $publication->setCreatedAtValue();
                $manager->persist($publication);
            }
        }

        // Création des commandes
        foreach ($users as $user) {
            $order = new Order();
            $order->setUser($user)
                ->setAmount($faker->numberBetween(50, 200))
                ->setAddress($faker->address)
                ->setPublications([$faker->randomElement($books)])
                ->setStatus($faker->randomElement(['pending', 'completed']));
            $order->setCreatedAtValue();
            $manager->persist($order);
        }

                // Création des publications
        foreach ($books as $book) {
            for ($i = 0; $i < 3; $i++) {
                $publication = new Publication();
                $publication->setUser($users[array_rand($users)])
                    ->setBook($book)
                    ->setBookState($faker->randomElement(['Neuf', 'Usé', 'Très usé']))
                    ->setPrice($faker->numberBetween(10, 100))
                    ->setComment($faker->paragraph)
                    ->setStatus($faker->randomElement(['pending', 'published']));
                $manager->persist($publication);
            }
        }

        // Création des commandes
        foreach ($users as $user) {
            $order = new Order();
            $order->setUser($user)
                ->setAmount($faker->numberBetween(50, 200))
                ->setAddress($faker->address)
                ->setPublications([$faker->randomElement($books)])
                ->setStatus($faker->randomElement(['pending', 'completed']));
            $manager->persist($order);
        }

        // Création des conversations et messages
        foreach ($users as $user) {
            $conversation = new Conversation();
            $conversation->addMember($user);
            for ($i = 0; $i < 5; $i++) {
                $message = new Message();
                $message->setText($faker->sentence)
                    ->setConversation($conversation)
                    ->setSender($users[array_rand($users)]);
                $manager->persist($message);
            }
            $manager->persist($conversation);
        }


        $manager->flush();
    }
}

