import React from 'react';
import './info.css';

import {connect} from 'react-redux';
import {hideHelp} from '../actions';

export function Info(props)
{
    function handleClick()
    {
        props.dispatch(hideHelp());
    }

    return (
        <section className="info">
            <div className="info-container">
                <p><strong>Purpose: </strong>Weekly Words is an app designed to help you learn 20 new words or phrases a week. 
                The server will fetch and generate a deck of 20 cards a week to review. </p>
                <p>Your review stats for each deck are stored to help you monitor your progress.</p>
                <p>Once you have logged in, you may select a deck from the list. The decks are ordered by the most recent 
                    being at the top of the deck list. It will randomly shuffle the deck and present you with the first
                    flash card. Answer honestly when you flip the card over. Once you have gotten all 20 cards correct,
                    your results will be displayed at the end.
                </p>
                <p>Sample Username: <strong>Thinkful</strong></p>
                <p>Sample Password: <strong>p123456789</strong></p>
                <button onClick={()=>handleClick()}>Hide Help</button>
            </div>
        </section>
    );
}

export default connect()(Info);