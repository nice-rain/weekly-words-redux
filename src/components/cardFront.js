//Displays the review word and button to flip card
import React from 'react';
import './cardFront.css';
import {connect} from 'react-redux';
import {flipCard} from '../actions';


export function cardFront(props)
{
    function flip()
    {
        console.log('flip card called');
        props.dispatch(flipCard(props.cardIndex));
    }

    return(
        <section className ="card-front">
            <h2>{props.word}</h2>
            <button onClick={()=>flip()} className="cardfront-button-flip">Flip Over</button>
        </section>
    );
}

cardFront.defaultProps = {
    word:'example'
}

export default connect()(cardFront);