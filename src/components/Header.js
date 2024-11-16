// src/components/Header.js
import React from 'react';


const Header = ({ toggleSidebar }) => {
    return (
        <header className="header">
            <button className="global-header__menu-button back-button" onClick={toggleSidebar}>
                ☰ Menu
            </button>
            <h1 className="header-title">K-Link</h1>
        </header>
    );
};

export default Header;
