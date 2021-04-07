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
import { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from './Firebase';
import Details from './Pages/Details';
import Listing from './Pages/Listing';

function App(props) {
    const fireBase = useContext(FirebaseContext);
    const [userType, setUserType] = useState(null);
    const [user, setUser] = useState(null);
    let userSub = '';

    useEffect(() => {
        userSub = fireBase.auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user.uid);
            } else {
                setUser(null);
            }
        });

        return () => {
            userSub();
        };
    }, []);

    useEffect(() => {
        if (user) {
            fireBase.getCurrentUserInfo().then(x => {
                const { type } = x;
                setUserType(type);
            });
        } else {
            setUserType(null);
        }
    }, [user]);

    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route exact path={ROUTES.CASES}>
                        {user ? <Listing /> : <Redirect to="/login" />}
                    </Route>
                    <Route exact path={`${ROUTES.DETAILS}:id`}>
                        <Details /> {/*  : <Redirect to="/login" />} */}
                    </Route>
                    <Route exact path={ROUTES.ADMIN}>
                        {userType === 'admin' ? <Admin /> : <Redirect to="/login" />}
                    </Route>
                    <Route exact path={ROUTES.SIGN_UP}>
                        {user ? <Redirect to="/shop" /> : <Register />}
                    </Route>
                    <Route exact path={ROUTES.SING_IN}>
                        {user ? <Redirect to="/shop" /> : <Login />}
                    </Route>
                    <Route exact path={ROUTES.HOME}>
                        {user ? <Redirect to="/shop" /> : <Home />}
                    </Route>
                    <Route exact path={`${ROUTES.PROFILE}:id`}>
                        {user ? <Profile /> : <Redirect to="/login" />}
                    </Route>
                    <Route exact path={ROUTES.ABOUT}>
                        <About />
                    </Route>
                    <Route exact path={ROUTES.SHOP}>
                        {user ? <Shop /> : <Redirect to="/login" />}
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
