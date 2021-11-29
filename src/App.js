import { BrowserRouter } from "react-router-dom";
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
      <BrowserRouter>
        <Auth0ProviderWithHistory>
          <Layout />
        </Auth0ProviderWithHistory>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
