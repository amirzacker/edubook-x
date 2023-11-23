import React, { useState } from 'react';
import './Faq.css';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Faq = () => {
  return (
      <div className="faq-section">
        <h1>FAQ</h1>
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      className="accordion-summary"
    >
<Typography className="accordion-text" style={{ fontWeight: 'bold', fontSize: '16px' }}>
  Comment puis-je vendre mes livres sur votre plateforme?
</Typography>
    </AccordionSummary>
    <AccordionDetails className="accordion-details">
      <Typography className="accordion-text">
        Pour vendre vos livres, vous pouvez créer un compte sur notre site et accéder à la section "Vendre".
        Suivez les étapes simples pour répertorier vos livres, en fournissant des détails précis tels
        que l'état du livre, le prix de vente et d'autres informations pertinentes.
        Les acheteurs intéressés pourront alors vous contacter directement.
      </Typography>
    </AccordionDetails>
  </Accordion>

  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel2a-content"
      id="panel2a-header"
      className="accordion-summary"
    >
      <Typography className="accordion-text" style={{ fontWeight: 'bold', fontSize: '16px' }}>
        Est-ce possible d'échanger des livres avec d'autres étudiants?</Typography>
    </AccordionSummary>
    <AccordionDetails className="accordion-details">
      <Typography className="accordion-text">
        Absolument! Notre plateforme favorise les échanges entre étudiants.
        Vous pouvez rechercher des livres spécifiques que vous souhaitez
        obtenir et proposer des échanges avec d'autres membres. Assurez-vous
        de communiquer clairement les conditions de l'échange avec votre partenaire.
      </Typography>
    </AccordionDetails>
  </Accordion>

  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel3a-content"
      id="panel3a-header"
      className="accordion-summary"
    >
      <Typography className="accordion-text" style={{ fontWeight: 'bold', fontSize: '16px' }} >
        Comment garantissez-vous la qualité des livres vendus sur votre plateforme?</Typography>
    </AccordionSummary>
    <AccordionDetails className="accordion-details">
      <Typography className="accordion-text">
        Nous encourageons nos utilisateurs à fournir des informations précises sur l'état
        de leurs livres lors de la création de leurs annonces. De plus, nous encourageons
        les membres de la communauté à laisser des commentaires et des évaluations après
        chaque transaction. Cela contribue à maintenir la qualité et la transparence
        au sein de notre plateforme.
      </Typography>
    </AccordionDetails>
  </Accordion>

  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel4a-content"
      id="panel4a-header"
      className="accordion-summary"
    >
      <Typography className="accordion-text" style={{ fontWeight: 'bold', fontSize: '16px' }}>
        Quels avantages y a-t-il à acheter des livres d'occasion sur votre site?</Typography>
    </AccordionSummary>
    <AccordionDetails className="accordion-details">
      <Typography className="accordion-text">
        Acheter des livres d'occasion sur notre plateforme présente de nombreux avantages.
        Cela permet d'économiser de l'argent par rapport à l'achat de livres neufs,
        tout en favorisant la durabilité et le recyclage. De plus, vous contribuez
        à une communauté éducative plus accessible et solidaire.
      </Typography>
    </AccordionDetails>
  </Accordion>

  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel5a-content"
      id="panel5a-header"
      className="accordion-summary"
    >
      <Typography className="accordion-text" style={{ fontWeight: 'bold', fontSize: '16px' }}>
        Comment puis-je participer à la promotion d'une communauté éducative plus durable?</Typography>
    </AccordionSummary>
    <AccordionDetails className="accordion-details">
      <Typography className="accordion-text">
        En utilisant notre plateforme, vous êtes déjà un acteur clé de la promotion
        de la durabilité éducative! En encourageant l'achat d'occasion, le partage
        et le recyclage des livres, vous contribuez activement à la réduction de
        l'empreinte écologique associée à la production de nouveaux livres.
      </Typography>
    </AccordionDetails>
  </Accordion>
</div>

  );
};

export default Faq;
