/*Component that contains the title and navigation link*/

import React from 'react';
import './header.css';

export default function Header(props)
{
    return (
        <header className="App-header">
          <h1>{props.title}</h1>
          <button className="nav-button">Logout</button>
        </header>
    );
};

Header.defaultProps = {
    title: 'Decks',
    nav: 'logout'
};