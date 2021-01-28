import React from 'react';

const Footer = React.memo ((props) => {
    return (
        <footer className="footer">
            <p className="footer__copyright">&copy; 2020-{new Date().getFullYear()} Mesto Russia</p>
        </footer>
    );
})

export default Footer;