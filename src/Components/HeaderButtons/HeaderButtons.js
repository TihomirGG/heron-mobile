import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../Firebase';
import ROUTES from '../../Constants/Routes';
import { keyGenerator } from '../../Utils';
import './HeaderButtons.scss';

function HeaderButtons(props) {
    const history = useHistory();
    const { auth, logOutUser } = useContext(FirebaseContext);
    const user = auth.currentUser;

    const onClickHandler = () => {
        logOutUser().then(_=> {
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
            linkData: { to: `${ROUTES.PROFILE}${user && user.uid}` },
        },
        {
            content: <i className="fas fa-shopping-cart"></i>,
            key: keyGenerator(),
            linkData: { to: ROUTES.SHOPPING_CART },
        },
        { content: 'About', key: keyGenerator(), linkData: { to: ROUTES.ABOUT } },
        { content: 'LogOut', key: keyGenerator(), linkData: { onClick: onClickHandler,to: ROUTES.SING_IN} },
    ];

    const loggedInButtons = () => {
        return logged.map(x => {
            return (
                <li key={x.key} className="buttons-wrapper__header-btn">
                    <Link className="buttons-wrapper__header-anchor" {...x.linkData}>
                        {x.content}
                    </Link>
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

    return <ul className="buttons-wrapper">{user ? loggedInButtons() : loggedOutButtons()}</ul>;
}

export default HeaderButtons;
