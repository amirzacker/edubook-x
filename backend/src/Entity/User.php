<?php
 
namespace App\Entity;
 
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
 
#[ORM\Entity(repositoryClass: UserRepository::class)]

class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["getAllmessage", "getPublication", "getConversation", "getUser", "getOrder"])]
    private ?int $id = null;
 
    #[ORM\Column(length: 180, unique: true)]
    #[Groups(["getAllmessage", "getPublication", "getConversation", "getUser", "getOrder"])]
    private ?string $email = null;
 
    #[ORM\Column(length: 180, unique: true)]
    #[Groups(["getAllmessage", "getPublication", "getConversation", "getUser"])]
    private ?string $username = null;
 
    #[ORM\Column]
    private array $roles = [];
 
    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\ManyToMany(targetEntity: Conversation::class, mappedBy: 'members')]
    private Collection $conversations;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["getAllmessage", "getPublication", "getConversation", "getUser", "getOrder"])]
    private ?string $firstname = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["getAllmessage", "getPublication", "getConversation", "getUser", "getOrder"])]
    private ?string $lastname = null;

    public function __construct()
    {
        $this->conversations = new ArrayCollection();
    }
 
    public function getId(): ?int
    {
        return $this->id;
    }
 
    public function getEmail(): ?string
    {
        return $this->email;
    }
 
    public function setEmail(string $email): static
    {
        $this->email = $email;
 
        return $this;
    }
 
    public function getUsername(): string
    {
        return $this->username;
    }
  
    public function setUsername(string $username): self
    {
        $this->username = $username;
  
        return $this;
    }
 
    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }
 
    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';
 
        return array_unique($roles);
    }
 
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;
 
        return $this;
    }
 
    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }
 
    public function setPassword(string $password): static
    {
        $this->password = $password;
 
        return $this;
    }
 
    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection<int, Conversation>
     */
    public function getConversations(): Collection
    {
        return $this->conversations;
    }

    public function addConversation(Conversation $conversation): static
    {
        if (!$this->conversations->contains($conversation)) {
            $this->conversations->add($conversation);
            $conversation->addMember($this);
        }

        return $this;
    }

    public function removeConversation(Conversation $conversation): static
    {
        if ($this->conversations->removeElement($conversation)) {
            $conversation->removeMember($this);
        }

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(?string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(?string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }
}