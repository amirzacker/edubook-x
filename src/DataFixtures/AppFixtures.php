<?php

namespace App\DataFixtures;

use App\Entity\Book;
use App\Entity\Category;
use App\Entity\Project;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        for ($i=0; $i < 20 ; $i++) { 
            $project = new Project();
            $book = new Book();
    
            $category = new Category();
            $category->setName("Categorie".$i);

            $book->setTitle("Livre". $i);
            $book->setDescription("Description". $i);
            $book->setAuthor("Auteur". $i);
            $book->setImage("Image". $i);
            
            $project->setName("Projet". $i);
            $project->setDescription("Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam molestias ad, minima quidem iure quisquam voluptatum, dicta nihil, cum tempore tempora. Architecto repellendus ab aut possimus enim rerum laboriosam explicabo odio? Maxime.");
            $manager->persist($project);
            $manager->persist($book);
            $manager->persist($category);
        }

        $manager->flush();
    }
}
