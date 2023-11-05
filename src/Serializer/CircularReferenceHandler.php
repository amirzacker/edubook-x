<?php 

namespace App\Serializer;

class CircularReferenceHandler
{
    public function __invoke($object)
    {
        // Assurez-vous que la méthode getId existe sur vos entités
        return method_exists($object, 'getId') ? $object->getId() : null;
    }
}