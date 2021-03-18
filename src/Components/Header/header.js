import { Component } from 'react';
import HeaderButtons from '../HeaderButtons/HeaderButtons';
import Logo from '../Logo/Logo';
import './header.scss';
class Header extends Component {
    

    render() {
        return (
            <nav className="header-navigation">
                <Logo />
                <HeaderButtons />
            </nav>
        );
    }
}

export default Header;
