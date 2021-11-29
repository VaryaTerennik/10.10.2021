import { useEffect, useRef } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ChatMessages from "./ChatMessages";
import { deleteChat } from "../redux/ChatList";
import { deleteMessage, messageChatSelector } from "../redux/MessagesSlice";
import { fetchMessages } from "../redux/MessagesSlice";
import { useAuth0 } from "@auth0/auth0-react";
import style from "../styles/MessagesList.module.css";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

function MessageList({ chatId, onSubmit, titleChat }) {
  const { isAuthenticated, user } = useAuth0();
  const messages = useSelector(messageChatSelector(chatId));
  const dispatch = useDispatch();
  const textMessageRef = useRef(messages);

  const matchUser = (message) => {
    if (user.name === message.name) {
      return true;
    }
  };

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
    const messageId = event.currentTarget.id;
    event.stopPropagation();
    console.log(messageId);
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
      <Card sx={{ mr: "5%" }}>
        <CardContent
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            padding: "20px",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ color: "#716F81" }}
          >
            Пожалуйста, авторизуйтесь
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ mr: "5%", minHeight: "679.5px" }}>
      <Box
        sx={{
          width: "70%",
          margin: "auto",
          display: "flex",
          flexDirection: "row",
          padding: "20px",
          justifyContent: "space-between",
        }}
      >
        {chatId && (
          <>
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              sx={{ color: "#716F81" }}
            >
              <small>Активный чат: </small>
              {titleChat}
            </Typography>
            <NavLink
              className={style.LinkDel}
              sx={{ textDecoration: "none" }}
              to="/chats"
            >
              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                sx={{ ml: "20px", textDecoration: "none" }}
                onClick={handledeleteChat}
              >
                Удалить
              </Button>
            </NavLink>
          </>
        )}
      </Box>

      <Box
        className={style.MessagesList}
        sx={{
          overflowY: "scroll",
          overflowX: "hidden",
          width: "70%",
          minHeight: "450px",
          maxHeight: "450px",
          m: "auto",
          backgroundColor: "#b5deff",
        }}
        ref={textMessageRef}
      >
        {!chatId && (
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ m: "100px auto", textAlign: "center", color: "#716F81" }}
          >
            Выберите чат
          </Typography>
        )}
        {chatId && messages == ![] && (
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ m: "100px auto", textAlign: "center", color: "#716F81" }}
          >
            В этом чате пока нет сообщений
          </Typography>
        )}
        {messages.map((message) => (
          <Box
            className={!matchUser(message) ? style.OneClass : style.TwoClass}
          >
            <Box
              sx={{
                minHeight: "45px",
                borderRadius: "5px",
                minWidth: "100px",
                maxWidth: "95%",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                bgcolor: "#F3F1F5",
              }}
              key={message._id}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  sx={{ width: "95%", ml: "10px" }}
                >
                  {message.name}
                </Typography>
                {matchUser(message) && (
                  <Button
                    sx={{
                      width: "5%",
                      padding: "0px",
                      m: "0px",
                      minWidth: "30px",
                    }}
                    variant="text"
                    color="primary"
                    size="small"
                    endIcon={<CloseIcon />}
                    id={message._id}
                    onClick={handleDeleteMessage}
                  ></Button>
                )}
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ ml: "10px", mb: "10px" }}>{message.text}</Box>
                <Box sx={{ ml: "10px", mb: "10px" }}>
                  {message.latitude && message.longitude && (
                    <iframe
                      title={message._id}
                      width="450"
                      height="250"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyByazDKamXua1tA3FMa7mEP3HZm1wp-Ly8&q=${messages.latitude},${message.longitude}`}
                      allowFullScreen
                    />
                  )}
                  <Box sx={{ ml: "10px", mb: "10px", width: "100%" }}>
                    {message.imageURL && (
                      <Box>
                        <img width="90%" src={message.imageURL} />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <ChatMessages onSubmit={handleAddMessage}></ChatMessages>
    </Card>
  );
}

export default MessageList;
