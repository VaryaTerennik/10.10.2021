import { useEffect } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addChat, deleteChat } from "../redux/ChatList";
import { fetchChats } from "../redux/ChatList";
import MessageList from "../components/MessagesList";
import style from "../styles/Chat.module.css";
import useSocket from "../hooks/useSocket";
import {
  Button,
  Card,
  CardContent,
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";

function Chats() {
  const { chatId } = useParams();
  const chatlist = useSelector((state) => state.chatlist.chats);
  const dispatch = useDispatch();
  const { postMessage } = useSocket();

  const history = useHistory();

  const handleaddChat = () => {
    const title = window.prompt("Введите название чата");
    if (title === "") {
      alert("Пожалуйста, введите название чата");
    } else {
      dispatch(addChat({ title }));
    }
  };

  useEffect(() => {
    dispatch(fetchChats());
  }, []);

  const handleMessageSubmit = (message) => {
    postMessage(message);
  };

  const titleChat = () => {
    if (chatId) {
      const selectChat = chatlist.find((chat) => chat._id === chatId);
      if (selectChat !== undefined) {
        const titleSelectChat = selectChat.title;
        return titleSelectChat;
      } else {
        const titleSelectChat = undefined;
        return titleSelectChat;
      }
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ width: "100%", m: "0px", paddingTop: "0px" }}
    >
      <Grid item xs={12} sx={{ verticalAlign: "middle", textAlign: "center" }}>
        <Typography
          variant="h3"
          gutterBottom
          component="h1"
          sx={{ mt: "0px", mb: "0px", color: "#716F81" }}
        >
          Чаты
        </Typography>
      </Grid>
      <Grid item xs={3} sx={{ paddingTop: "0px" }}>
        <Card sx={{ minHeight: "679.5px", ml: "30px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: "30px",
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              sx={{ width: "80%", m: "10px auto" }}
              onClick={handleaddChat}
            >
              Добавить чат
            </Button>
            {chatlist.map((chat) => (
              <NavLink
                className={style.LinkChat}
                activeClassName={style.LinkChatActive}
                to={`/chats/${chat._id}`}
              >
                <Button
                  sx={{ display: "block", m: "10px auto", width: "80%" }}
                  variant="contained"
                  color="primary"
                  key={chat._id}
                >
                  {chat.title}
                </Button>
              </NavLink>
            ))}
          </Box>
        </Card>
      </Grid>
      <Grid item xs={9} sx={{ pt: "0px", minHeight: "679.5px" }}>
        <MessageList
          chatId={chatId}
          titleChat={titleChat()}
          onSubmit={handleMessageSubmit}
        />
      </Grid>
    </Grid>
  );
}

export default Chats;
