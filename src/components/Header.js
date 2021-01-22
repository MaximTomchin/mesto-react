import React from 'react';
import Logo from '../images/logo.svg';

function Header() {
    return (
        <header className="header">
            <img src={Logo} className="header__logo" alt="Место-Россия" />
        </header>
    );
}

export default Header;