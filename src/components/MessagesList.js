import { useEffect, useRef } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ChatMessages from "./ChatMessages";
import { deleteChat } from "../redux/ChatList";
import { deleteMessage, messageChatSelector } from "../redux/MessagesSlice";
import { fetchMessages } from "../redux/MessagesSlice";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./MessagesList.module.css";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

function MessageList({ chatId, onSubmit }) {
  const { isAuthenticated, user } = useAuth0();
  const messages = useSelector(messageChatSelector(chatId));
  const dispatch = useDispatch();
  const textMessageRef = useRef(messages);

  const handleAddMessage = (data) => {
    const newMessage = {
      chatId,
      text: data.text,
      name: user.name,
      imageURL: data.imageURL,
      latitude: data.latitude,
      longitude: data.longitude,
    };
    onSubmit(newMessage);
  };

  const handledeleteChat = () => {
    dispatch(deleteChat({ chatId }));
  };

  const handleDeleteMessage = (event) => {
    const messageId = event.target.id;
    event.preventDefault();
    dispatch(deleteMessage({ chatId, messageId }));
  };

  useEffect(() => {
    dispatch(fetchMessages(chatId));
  }, [chatId]);

  useEffect(() => {
    textMessageRef.current.scrollTop = textMessageRef.current.scrollHeight;
  }, [messages]);

  if (!isAuthenticated) {
    return (
      <div>
        <div>Пожалуйста, авторизуйтесь</div>
      </div>
    );
  }

  return (
    <div className={style.MessagesContent}>
      <div className={style.TitleChat}>
        <span>АКТИВНЫЙ ЧАТ:{chatId}</span>
        <Button variant="outlined" color="primary" onClick={handledeleteChat}>
          Удалить
        </Button>
      </div>
      <div className={style.MessagesList} ref={textMessageRef}>
        {messages.map((message) => (
          <div className={style.MessageContainer}>
            <div
              className={style.MessageText}
              key={message._id}
              id={message._id}
            >
              <small>{message.name}</small>
              <Button
                variant="contained"
                color="info"
                size="small"
                endIcon={<CloseIcon />}
                id={message._id}
                onClick={handleDeleteMessage}
              ></Button>
              <p>{message.text}</p>
              <div>
                {message.latitude && message.longitude && (
                  <iframe
                    title={message._id}
                    width="450"
                    height="250"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyByazDKamXua1tA3FMa7mEP3HZm1wp-Ly8&q=${message.latitude},${message.longitude}`}
                    allowFullScreen
                  />
                )}
              </div>
              <div>
                {message.imageURL && (
                  <div>
                    <img src={message.imageURL} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChatMessages onSubmit={handleAddMessage}></ChatMessages>
    </div>
  );
}

export default MessageList;
