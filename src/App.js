import './App.scss';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './Pages/Register';
import ROUTES from './Constants/Routes';
import Profile from './Pages/Profile';
import About from './Pages/About';
import Admin from './Pages/Admin';

function App(props) {
    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route exact path={ROUTES.SIGN_UP}>
                        <Register />
                    </Route>
                    <Route exact path={ROUTES.SING_IN}>
                        <Login />
                    </Route>
                    <Route exact path={ROUTES.HOME}>
                        <Home />
                    </Route>
                    <Route exact path={`${ROUTES.PROFILE}:id`}>
                        <Profile />
                    </Route>
                    <Route exact path={ROUTES.ABOUT}>
                        <About />
                    </Route>
                    <Route exact path={ROUTES.ADMIN}>
                        <Admin />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
