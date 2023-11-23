import React, { useState } from 'react';
import './Faq.css';

const Faq = () => {
  const faqData = [
    {
      question: 'Comment puis-je vendre mes livres sur votre plateforme?',
      answer: 'Pour vendre vos livres, vous pouvez créer un compte sur notre site et accéder à la section\
       \"Vendre". Suivez les étapes simples pour répertorier vos livres, en fournissant des\
        détails précis tels que l\'état du livre, le prix de vente et d\'autres informations pertinentes.\
         Les acheteurs intéressés pourront alors vous contacter directement.' },

    {
      question: 'Est-ce possible d\'échanger des livres avec d\'autres étudiants?',
      answer: 'Absolument! Notre plateforme favorise les échanges entre étudiants.\
       Vous pouvez rechercher des livres spécifiques que vous souhaitez obtenir\
        et proposer des échanges avec d\'autres membres. Assurez-vous de communiquer\
         clairement les conditions de l\échange avec votre partenaire.' },

    {
      question: 'Comment garantissez-vous la qualité des livres vendus sur votre plateforme?',
      answer: 'Nous encourageons nos utilisateurs à fournir des informations précises sur l\'état\
       de leurs livres lors de la création de leurs annonces. De plus, nous encourageons les membres\
        de la communauté à laisser des commentaires et des évaluations après chaque transaction.\
         Cela contribue à maintenir la qualité et la transparence au sein de notre plateforme.' },

    {
      question: 'Quels avantages y a-t-il à acheter des livres d\'occasion sur votre site?',
      answer: 'Acheter des livres d\'occasion sur notre plateforme présente de nombreux avantages.\
       Cela permet d\'économiser de l\'argent par rapport à l\'achat de livres neufs, tout en favorisant\
        la durabilité et le recyclage. De plus, vous contribuez à une communauté éducative plus\
         accessible et solidaire.' },

    {
      question: 'Comment puis-je participer à la promotion d\'une communauté éducative plus durable?',
      answer: 'En utilisant notre plateforme, vous êtes déjà un acteur clé de la promotion de la\
       durabilité éducative! En encourageant l\'achat d\'occasion, le partage et le recyclage des\
        livres, vous contribuez activement à la réduction de l\'empreinte écologique associée à\
         la production de nouveaux livres.' },
  ];


  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="faq-section">
      <div className="faq-text">
        <h2>FAQ</h2>
        <br></br>
      </div>
      <div className="faq-container">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => handleToggle(index)}>
              {item.question}
            </div>
            {expandedIndex === index && (
              <div className="faq-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
