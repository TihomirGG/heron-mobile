import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../Firebase';
import ROUTES from '../../Constants/Routes';
import { keyGenerator } from '../../Utils';
import './HeaderButtons.scss';

function HeaderButtons(props) {
    const history = useHistory();
    const { auth, logOutUser, getCurrentUserInfo } = useContext(FirebaseContext);
    const [userType, setUserType] = useState(null);
    const [user, setUser] = useState('');
    let userSub = null;

    useEffect(() => {
        userSub = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user.uid);
            }
        });
        if (auth.currentUser) {
            getCurrentUserInfo().then(x => {
                const { type } = x;
                setUserType(type);
            });
        }

        return () => {
            userSub();
        };
    }, []);

    const onClickHandler = () => {
        logOutUser().then(_ => {
            history.push('/login');
        });
    };
    const notLogged = [
        { content: 'Login', key: keyGenerator(), linkData: { to: ROUTES.SING_IN } },
        { content: 'Register', key: keyGenerator(), linkData: { to: ROUTES.SIGN_UP } },
        { content: 'About', key: keyGenerator(), linkData: { to: ROUTES.ABOUT } },
    ];
    const logged = [
        {
            content: 'Profile',
            key: keyGenerator(),
            linkData: { to: `${ROUTES.PROFILE}${auth.currentUser && auth.currentUser.uid}` },
        },
        {
            content: <i className="fas fa-shopping-cart"></i>,
            key: keyGenerator(),
            linkData: { to: ROUTES.SHOPPING_CART },
        },
        { content: 'About', key: keyGenerator(), linkData: { to: ROUTES.ABOUT } },
        { content: 'LogOut', key: keyGenerator(), linkData: { onClick: onClickHandler } },
    ];

    const loggedInButtons = () => {
        return logged.map(x => {
            return (
                <li key={x.key} className="buttons-wrapper__header-btn">
                    {x.linkData.to ? (
                        <Link className="buttons-wrapper__header-anchor" {...x.linkData}>
                            {x.content}
                        </Link>
                    ) : (
                        <a href="" {...x.linkData}>
                            {x.content}
                        </a>
                    )}
                </li>
            );
        });
    };

    const loggedOutButtons = () => {
        return notLogged.map(x => {
            return (
                <li key={x.key} className="buttons-wrapper__header-btn">
                    <Link className="buttons-wrapper__header-anchor" {...x.linkData}>
                        {x.content}
                    </Link>
                </li>
            );
        });
    };

    return (
        <ul className="buttons-wrapper">
            {user ? loggedInButtons() : loggedOutButtons()}
            {userType === 'admin' ? (
                <li className="buttons-wrapper__header-btn">
                    <Link className="buttons-wrapper__header-anchor" to="/admin">
                        ADMIN
                    </Link>
                </li>
            ) : (
                ''
            )}
        </ul>
    );
}

export default HeaderButtons;
