import React from 'react';

import logo from '../../assets/logo.png';
import './style.css';

const Header = () => (
    <header className="header">
        <div className="mdl-grid">
            <div className="mdl-cell--12col">
            <a href="http://localhost:3000/"><img
                    alt="Logo"
                    src={logo}
                    className="header__logo"
                /></a>
            </div>
        </div>
    </header>

);

export default Header;