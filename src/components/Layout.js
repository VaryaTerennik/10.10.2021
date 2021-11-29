import style from "../styles/App.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import Main from "../routes/Main.js";
import About from "../routes/About.js";
import Chats from "../routes/Chats.js";
import AuthButton from "./AuthButton.js";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Toolbar, Button, AppBar } from "@mui/material";
import { Switch, Route, Link } from "react-router-dom";

function Layout() {
  const { isAuthenticated, user } = useAuth0();

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "#F3F1F5" }}>
      <AppBar position="static">
        <Toolbar>
          <AuthButton sx={{ ml: "100px" }} />
          <Box
            sx={{
              display: "flex",
              ml: "200px",
              width: "80%",
              justifyContent: "space-between",
            }}
            className={style.NavigationMenu}
          >
            <Button>
              <Link to="/">Главная</Link>
            </Button>
            <Button>
              <Link to="/about">О компании</Link>
            </Button>
            <Button>
              <Link to="/chats">Чаты</Link>
            </Button>
            {isAuthenticated && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mr: "10px",
                }}
              >
                <AccountCircleIcon sx={{ m: "auto 20px" }} />
                <Box sx={{ width: "150px", m: "auto" }}>{user.name}</Box>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/about">
          <Main />
        </Route>
        <Route path="/chats/:chatId?">
          <Chats />
        </Route>
        <Route path="/">
          <About />
        </Route>
      </Switch>
    </Box>
  );
}

export default Layout;
