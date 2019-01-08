/*Component that contains the title and navigation link*/

import React from 'react';
import {connect} from 'react-redux';
import {handleNav} from '../actions';
import './header.css';

export function Header(props)
{
    function handleClick()
    {
        props.dispatch(handleNav(props.navText));   
    }

    return (
        <header className="App-header" role="banner">
          <h1>{props.title}</h1>
          {props.showNav && props.navText && <button className="nav-button" onClick={()=>handleClick()}>{props.navText}</button>}
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
    navText: state.weeklyWordsReducer.navText,
    showNav: state.weeklyWordsReducer.showNav

});

export default connect(mapStateToProps)(Header);