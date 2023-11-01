<?php

namespace App\Controller;

use App\Entity\Project;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class ProjectController extends AbstractController
{
    #[Route('/project', name: 'index', methods: ['GET'])]
    public function index(ManagerRegistry $doctrine): JsonResponse
    {
        $projectRepository = $doctrine->getRepository(Project::class);
        $projects = $projectRepository->findAll();
        $projectsArray = [];

        foreach ($projects as $project) {
            $projectsArray[] = [
                'id' => $project->getId(),
                'name' => $project->getName(),
                'description' => $project->getDescription(),
            ];
        }

        return $this->json($projectsArray);
    }

    #[Route('/project', name: 'create', methods: ['POST'])]
    public function create(ManagerRegistry $doctrine, Request $request): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $data = json_decode($request->getContent(), true);

        $project = new Project();
        $project->setName($data['name']);
        $project->setDescription($data['description']);

        $entityManager->persist($project);
        $entityManager->flush();

        return $this->json(['status' => 'Project created!']);
    }

    #[Route('/project/{id}', name: 'show', methods: ['GET'])]
    public function show(ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $projectRepository = $doctrine->getRepository(Project::class);
        $project = $projectRepository->find($id);

        if (!$project) {
            return $this->json(['message' => 'Project not found!'], JsonResponse::HTTP_NOT_FOUND);
        }

        $projectArray = [
            'id' => $project->getId(),
            'name' => $project->getName(),
            'description' => $project->getDescription(),
        ];

        return $this->json($projectArray);
    }

    #[Route('/project/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(ManagerRegistry $doctrine, int $id): JsonResponse
    {
        $entityManager = $doctrine->getManager();
        $projectRepository = $entityManager->getRepository(Project::class);
        $project = $projectRepository->find($id);

        if (!$project) {
            return $this->json(['message' => 'Project not found!'], JsonResponse::HTTP_NOT_FOUND);
        }

        $entityManager->remove($project);
        $entityManager->flush();

        return $this->json(['status' => 'Project deleted!']);
    }
}
