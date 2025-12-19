import React from 'react';

const Header = () => {
    return (
        <header className="header">
            <div className="container header-content">
                <h1 className="logo">CricTracker</h1>
                <nav className="nav">
                    <a href="#" className="nav-link">Matches</a>
                    <a href="#news" className="nav-link">News</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
