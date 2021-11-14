import style from "./App.module.css";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Main from "./routes/Main.js";
import About from "./routes/About.js";
import Chats from "./routes/Chats.js";
import AuthButton from "./components/AuthButton.js";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Auth0ProviderWithHistory from "./components/Auth0ProviderWithHistory";

import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#9D9D9D",
      },
      secondary: {
        main: "#CAB8FF",
      },
      error: {
        main: "#E5707E",
      },
      warning: {
        main: "#E6B566",
      },
      info: {
        main: "#B5DEFF",
      },
      success: {
        main: "#C1FFD7",
      },
    },
  });

  // const  [newData, setNewData] = useState([]);

  // const updateData = data => {
  //   const newDataObj = {
  //     isAuthenticated: data.isAuthenticated,
  //     name: data.user.name
  //   }
  //   setNewData([newDataObj])
  // }
  // console.log(user)

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Auth0ProviderWithHistory>
            <div className={style.TotalContainer}>
              <header className={style.TotalHeader}>
                <AuthButton />
                <nav className={style.NavigationMenu}>
                  <Link to="/">Главная</Link>
                  <Link to="/about">О компании</Link>
                  <Link to="/chats">Чаты</Link>
                  {/* {isAuthenticated && (<span>{user.name}</span>)} */}
                </nav>
              </header>
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
            </div>
          </Auth0ProviderWithHistory>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
