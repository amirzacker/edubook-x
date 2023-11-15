import styled from "styled-components";
import { useEffect, useState } from "react";

const ConversationContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 20px;
  border-radius: ${(props) => (props.$isActive ? "15px 50px 50px 15px" : "15px")};
  background-color: ${(props) => (props.$isActive ? "#0056b3" : "#0d6efd")};
  position: relative;

  &:hover {
    background-color: #0056b3;
  }

  &::after {
    content: '';
    position: absolute;
    ${(props) => props.$isActive && `
      right: -10px;
      top: 50%;
      border-width: 10px;
      border-style: solid;
      border-color: transparent green transparent transparent;
      transform: translateY(-50%);
    `}
  }
`;

const ConversationImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const ConversationName = styled.span`
  font-weight: 500;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Conversation = ({ conversation, currentUser, isActive }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(conversation.members.find((m) => m !== currentUser.id));
  }, [currentUser, conversation]);

  return (
    <ConversationContainer $isActive={isActive}>
      <ConversationImg
        src={"/img/avatar1.png" ?? "/img/avatar2.jpg"}
        alt="avatar-user"
      />
      <ConversationName>{user?.email}</ConversationName>
    </ConversationContainer>
  );
};

export default Conversation;
