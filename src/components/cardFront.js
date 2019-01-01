//Displays the review word and button to flip card
import React from 'react';
import './cardFront.css';
import {connect} from 'react-redux';
import {flipCard} from '../actions';


export function cardFront(props)
{
    //Callback for onClick event
    function flip()
    {
        console.log('flip card called');
        props.dispatch(flipCard(props.cardIndex));
    }

    //Word that we are displaying on this card - Need to refactor for readability ^^'
    const word = props.currentDeck.generatedDeck.cards[props.review.shuffledCardIndices[props.review.currentCard]].word;

    return(
        <section className ="card-front">
            <h2>{word}</h2>
            <button onClick={()=>flip()} className="cardfront-button-flip">Flip Over</button>
        </section>
    );
}


const mapStateToProps = state => ({
    review: state.weeklyWordsReducer.review,
    currentDeck: state.weeklyWordsReducer.decks[state.weeklyWordsReducer.review.deckIndex]
});

export default connect(mapStateToProps)(cardFront);