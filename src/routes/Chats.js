import { useEffect } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addChat, deleteChat } from "../redux/ChatList";
import { fetchChats } from "../redux/ChatList";
import MessageList from "../components/MessagesList";
import style from "./Chat.module.css";
import useSocket from "../hooks/useSocket";
import Button from "@mui/material/Button";

function Chats() {
  const { chatId } = useParams();
  const chatlist = useSelector((state) => state.chatlist.chats);
  const dispatch = useDispatch();
  const { postMessage } = useSocket();

  const history = useHistory();

  const handleaddChat = () => {
    const title = window.prompt("Введите название чата");
    dispatch(addChat({ title }));
  };

  useEffect(() => {
    dispatch(fetchChats());
  }, []);

  const handleMessageSubmit = (message) => {
    postMessage(message);
  };

  // if(chatId) {
  //     const titleChat = chatlist.find(chat => chat._id === chatId)
  //     console.log(titleChat)
  //     const titleSelectChat = titleChat._id
  //     console.log(titleSelectChat)
  // } else {
  //     const titleChat = undefined;
  //     const titleSelectChat = undefined;
  // }

  return (
    <div className={style.Chats}>
      <h1>Чаты</h1>
      <div className={style.TotalChats}>
        <Button
          className={style.BtnAddChat}
          variant="outlined"
          color="primary"
          onClick={handleaddChat}
        >
          Добавить чат
        </Button>
        <div className={style.ItemChat}>
          {chatlist.map((chat) => (
            <Button variant="contained" color="primary" key={chat._id}>
              <NavLink
                className={style.LinkChat}
                activeClassName={style.LinkChatActive}
                to={`/chats/${chat._id}`}
              >
                {chat.title}
              </NavLink>
            </Button>
          ))}
        </div>
      </div>
      <div className={style.MessagesListContainer}>
        <MessageList
          chatId={chatId}
          // titleChat={titleChat}
          onSubmit={handleMessageSubmit}
        ></MessageList>
      </div>
    </div>
  );
}

export default Chats;
