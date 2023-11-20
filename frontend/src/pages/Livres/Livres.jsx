// Livres.jsx

import React from 'react';
import { CardBook } from '../../components/atoms';
import './Livres.css'; 

const Livres = ({ books }) => {
  return (
    <div>
      <div className="card-container">
        {books.map((book, index) => (
          <CardBook key={index} title={book.title} price={book.price} image={book.image} />
        ))}
      </div>
    </div>
  );
}

export default Livres;
