import './App.scss';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Register from './Pages/Register';
import ROUTES from './Constants/Routes';
import Profile from './Pages/Profile';
import About from './Pages/About';
import Admin from './Pages/Admin';
import Shop from './Pages/Shop';
import { useContext } from 'react';
import { FirebaseContext } from './Firebase';
import Details from './Pages/Details';

function App(props) {
    const fireBase = useContext(FirebaseContext);
    const currentUser = fireBase.auth.currentUser;
    let type = '';

    if (currentUser) {
        fireBase
            .getCurrentUserInfo()
            .then(x => {
                type = x.type;
            })
            .catch(console.log);
    }

    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route exact path={ROUTES.SIGN_UP}>
                        {currentUser ? <Redirect to="/shop" /> : <Register />}
                    </Route>
                    <Route exact path={ROUTES.SING_IN}>
                        {currentUser ? <Redirect to="/shop" /> : <Login />}
                    </Route>
                    <Route exact path={ROUTES.HOME}>
                        {currentUser ? <Redirect to="/shop" /> : <Home />}
                    </Route>
                    <Route exact path={ROUTES.PROFILE}>
                        {currentUser ? <Profile /> : <Redirect to="/login" />}
                    </Route>
                    <Route exact path={ROUTES.ABOUT}>
                        <About />
                    </Route>
                    <Route exact path={ROUTES.ADMIN}>
                        {currentUser && type === 'admin' ? <Admin /> : <Redirect to="/login" />}
                    </Route>
                    <Route exact path={ROUTES.SHOP}>
                        {currentUser ? <Shop /> : <Redirect to="/login" />}
                    </Route>
                    <Route exact path={ROUTES.CASES}>
                        {currentUser ? <Shop /> : <Redirect to="/login" />}
                    </Route>
                    <Route exact path={ROUTES.DETAILS}>
                        {currentUser ? <Details /> : <Redirect to="/login" />}
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
