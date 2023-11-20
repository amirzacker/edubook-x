// Contact.jsx

import React from 'react';
import './Contact.css'; // Ajoutez un fichier de style dédié

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contactez-nous</h1>
      <p>
        Vous avez des questions, des commentaires ou des suggestions? N'hésitez pas à nous contacter en utilisant le formulaire ci-dessous.
      </p>

      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Nom :</label>
          <input type="text" id="name" name="name" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input type="email" id="email" name="email" />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message :</label>
          <textarea id="message" name="message" rows="4"></textarea>
        </div>

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default Contact;
