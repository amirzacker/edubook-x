<?php

namespace App\DataFixtures;

use App\Entity\Project;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        for ($i=0; $i < 20 ; $i++) { 
            $project = new Project();
            $project->setName("Projet". $i);
            $project->setDescription("Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam molestias ad, minima quidem iure quisquam voluptatum, dicta nihil, cum tempore tempora. Architecto repellendus ab aut possimus enim rerum laboriosam explicabo odio? Maxime.");
            $manager->persist($project);
        }

        $manager->flush();
    }
}
