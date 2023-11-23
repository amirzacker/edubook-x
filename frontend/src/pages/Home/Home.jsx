

import React, { useState } from 'react';
import { CardBook } from '../../components/atoms';
import Faq  from '../../components/molecules/Faq/Faq';

import './Home.css'; 

const Home = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>

<div className="about-container">
      <h1>EduBookX</h1>
      <p>
        Bienvenue sur notre plateforme dédiée à la communauté étudiante! Notre objectif principal est de vous offrir une expérience enrichissante dans le monde des livres d'occasion. Nous avons développé ce site avec l'intention de fournir une plateforme conviviale où les étudiants universitaires et scolaires peuvent acheter, vendre, échanger et même donner des livres d'occasion.
      </p>
      <p>
        Chez nous, l'accès aux ressources éducatives est facilité, car nous croyons fermement en la démocratisation de l'éducation. Notre plateforme offre une solution économique pour acquérir des livres tout en encourageant le recyclage, contribuant ainsi à une communauté éducative plus durable.
      </p>
      <p>
        Explorez notre site et découvrez comment vous pouvez participer à cette initiative qui vise à rendre les livres plus accessibles et à favoriser une culture du partage au sein de la communauté étudiante. Nous sommes ravis de vous avoir parmi nous et espérons que cette plateforme répondra à vos besoins éducatifs tout en encourageant une approche responsable envers les ressources pédagogiques.
      </p>
    </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher un livre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="card-container">
        {filteredBooks.map((book, index) => (
          <CardBook key={index} title={book.title} price={book.price} image={book.image} />
        ))}
      </div>
      <Faq />
    </div>
  );
}

export default Home;
