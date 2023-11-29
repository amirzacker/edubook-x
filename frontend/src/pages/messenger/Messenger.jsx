import "./messenger.css";
import Conversation from "../../components/Conversation";
import Message from "../../components/Message";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SendIcon from "@material-ui/icons/Send";
import { userRequest } from "../../toolkit/requestMethods";
import { useNavigate } from "react-router-dom";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [publication, setPublication] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();
  const [activeConversation, setActiveConversation] = useState(null);
  const { user } = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await userRequest.get("conversations/user/" + user?.id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const getPublication = async () => {
      try {
        const res = await userRequest.get("publications/" + currentChat?.publicationId);
        setPublication(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPublication();
  }, [currentChat?.publicationId]);


  useEffect(() => {
    const getMessages = async () => {
      if (currentChat && currentChat.id) {
        try {
          const res = await userRequest.get("messages/" + currentChat.id);
          setMessages(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    if (currentChat) {
      const eventSource = new EventSource(
        `http://localhost:80/.well-known/mercure?topic=conversation/${currentChat.id}`
      );
      eventSource.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      };

      return () => {
        eventSource.close();
      };
    }
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?.id,
      text: newMessage,
      conversationId: currentChat.id,
    };

    try {
      const res = await userRequest.post("messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && newMessage.trim()) {
      e.preventDefault(); // Empêche le retour à la ligne dans le textarea
      handleSubmit(e);
    }
  };

  const handlePublicationClick = () => {
    if (currentChat && currentChat?.publicationId) {
      navigate(`/publications/${currentChat?.publicationId}`);
    }
  };

  return (
    <>
      <main>
        <div className="messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              {conversations.map((c, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setCurrentChat(c);
                    setActiveConversation(c.id);
                  }}
                >
                  <Conversation
                    key={i}
                    conversation={c}
                    currentUser={user}
                    isActive={c.id === activeConversation}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="chatBoxTop">
                    <div
                      className="publicationDetails"
                      onClick={handlePublicationClick}
                    >
                      {currentChat && currentChat?.publicationId && (
                        <>
                          <h4>{publication?.book?.title}</h4>
                          <p>Prix: {publication?.book?.price} €</p>
                        </>
                      )}
                    </div>
                    {messages.map((m, i) => (
                      <div key={i} ref={scrollRef}>
                        <Message
                          key={i}
                          message={m}
                          own={m.sender.id === user?.id}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                      onKeyDown={handleKeyDown}
                    ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      <SendIcon />
                    </button>
                  </div>
                </>
              ) : (
                <span className="noConversationText">
                  Ouvrir une conversation pour chatter
                </span>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Messenger;
