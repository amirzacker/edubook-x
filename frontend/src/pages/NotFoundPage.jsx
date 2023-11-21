import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styles
const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const NotFoundTitle = styled.h1`
  font-size: 48px;
  color: #333;
`;

const NotFoundText = styled.p`
  font-size: 24px;
  color: #666;
`;

const GoHomeButton = styled.button`
  padding: 10px 20px;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #45a049;
  }
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <NotFoundContainer>
      <NotFoundTitle>404 Not Found</NotFoundTitle>
      <NotFoundText>Désolé, la page que vous cherchez n'existe pas.</NotFoundText>
      <GoHomeButton onClick={handleGoHome}>Retour à l'accueil</GoHomeButton>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
