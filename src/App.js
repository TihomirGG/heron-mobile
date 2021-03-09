import logo from './logo.svg';
import './App.scss';
import Header from './Components/Header/header';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
