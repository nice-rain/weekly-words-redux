/*Component that contains the title and navigation link*/

import React from 'react';
import {connect} from 'react-redux';
import './header.css';

export function Header(props)
{
    return (
        <header className="App-header" role="banner">
          <h1>{props.title}</h1>
          <button className="nav-button">{props.navText}</button>
        </header>
    );
};

//fallback if our state fails
Header.defaultProps = {
    title: 'Decks',
    navText: 'logout'
};

const mapStateToProps = state => ({
    title: state.weeklyWordsReducer.title,
    navText: state.weeklyWordsReducer.navText

});

export default connect(mapStateToProps)(Header);