import { Component } from 'react';
import './header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <p>hello from header</p>
        <ul></ul>
      </header>
    );
  }
}

export default Header;
