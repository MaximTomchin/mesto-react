import React from 'react';
import Logo from '../images/logo.svg';

const Header = React.memo((props) => {
    return (
        <header className="header">
            <img src={Logo} className="header__logo" alt="Место-Россия" />
        </header>
    );
})

export default Header;