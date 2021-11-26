import style from "./styles/App.module.css";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Main from "./routes/Main.js";
import About from "./routes/About.js";
import Chats from "./routes/Chats.js";
import AuthButton from "./components/AuthButton.js";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "./components/Layout.js";

import Auth0ProviderWithHistory from "./components/Auth0ProviderWithHistory";

import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#9D9D9D",
  //     },
  //     secondary: {
  //       main: "#CAB8FF",
  //     },
  //     error: {
  //       main: "#E5707E",
  //     },
  //     warning: {
  //       main: "#E6B566",
  //     },
  //     info: {
  //       main: "#B5DEFF",
  //     },
  //     success: {
  //       main: "#C1FFD7",
  //     },
  //   },
  // });

  return (
    <Provider store={store}>
      {/* <ThemeProvider theme={theme}> */}
      <BrowserRouter>
        <Auth0ProviderWithHistory>
          <Layout />
        </Auth0ProviderWithHistory>
      </BrowserRouter>
      {/* </ThemeProvider> */}
    </Provider>
  );
}

export default App;
