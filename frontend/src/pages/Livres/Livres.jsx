// Home.jsx

import React from 'react';
import { CardBook } from '../../components/atoms';

const Livres = ({ books }) => {
  return (
    <div>
      <h1>Bienvenue sur la page d'accueil</h1>
      <div className="card-container">
        {books.map((book, index) => (
          <CardBook key={index} title={book.title} price={book.price} image={book.image} />
        ))}
      </div>
    </div>
  );
}

export default Livres;
