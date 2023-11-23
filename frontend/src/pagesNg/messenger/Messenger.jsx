import "./messenger.css";
import Conversation from "../../componentsNg/Conversation";
import Message from "../../componentsNg/Message";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SendIcon from "@material-ui/icons/Send";
import { userRequest } from "../../toolkit/requestMethods";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const scrollRef = useRef();
  const [activeConversation, setActiveConversation] = useState(null);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await userRequest.get(
          "conversations/user/" + user?.user?.id
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);

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
      const eventSource = new EventSource(`http://localhost:80/.well-known/mercure?topic=conversation/${currentChat.id}`);
      eventSource.onmessage = event => {
        const newMessage = JSON.parse(event.data);
        console.log(newMessage);
        setMessages(prevMessages => [...prevMessages, newMessage]);
      };
  
      return () => {
        eventSource.close();
      };
    }
  }, [currentChat]);

  useEffect(() => {
      const eventSource = new EventSource(`http://localhost:80/.well-known/mercure?topic=conversation`);
      eventSource.onmessage = event => {
        console.log(event.data);
      };
  
      return () => {
        eventSource.close();
      };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user?.user?.id,
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
                    currentUser={user?.user}
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
                    {messages.map((m, i) => (
                      <div key={i} ref={scrollRef}>
                        <Message
                          key={i}
                          message={m}
                          own={m.sender.id === user?.user?.id}
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
