
import './App.css';
import Main from './routes/Main.js'
import About from './routes/About.js'
import Chats from './routes/Chats.js'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { store } from './redux/store'
import { Provider } from 'react-redux'


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <div className="App">
        <nav className="NavigationMenu">
          <Link to="/">Главная</Link>
          <Link to="/about">о компании</Link>
          <Link to="/chats">Чаты</Link>
        </nav>
        <Switch>
            <Route path ="/about">
                  <Main/>
            </Route> 
            <Route path ="/chats/:chatId?">
                  <Chats/>
            </Route> 
            <Route path ="/">
                  <About/>
            </Route>
        </Switch>    
      </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
