import styled from "styled-components";
import { format } from "timeago.js";
import { useState, useEffect } from "react";
import axios from "axios";

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: ${(props) => (props.own ? "flex-end" : "flex-start")};
  margin-right: ${(props) => (props.own ? "50px" : "0")};
`;

const MessageTop = styled.div`
  display: flex;
  word-wrap: break-word;
`;

const MessageImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

const MessageText = styled.p`
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.own ? "#0056b3" : "#262D2A")};
  color: white;
  max-width: 300px;
`;
const MessageBottom = styled.div`
  font-size: 12px;
  margin-top: 10px;
`;

const Message = ({ message, own, currentUser }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(message?.sender);
  }, [message]);

  return (
    <MessageContainer own={own}>
      <MessageTop>
        <MessageImg
          src={
            own ? "/img/avatar1.png" : "/img/avatar2.jpg" }
          alt="avatar sender"
        />
        <MessageText own={own}>{message.text}</MessageText>
      </MessageTop>
      <MessageBottom>{format(message.createdAt)}</MessageBottom>
    </MessageContainer>
  );
};

export default Message;
