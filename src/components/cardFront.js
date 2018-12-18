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
    const word = props.currentDeck.cards[props.review.shuffledCardIndices[props.review.currentCard]].word;

    return(
        <section className ="card-front">
            <h2>{word}</h2>
            <button onClick={()=>flip()} className="cardfront-button-flip">Flip Over</button>
        </section>
    );
}

// cardFront.defaultProps = {
//     word:'Default Word'
// }

const mapStateToProps = state => ({
    review: state.review,
    currentDeck: state.decks[state.review.deckIndex]
});

export default connect(mapStateToProps)(cardFront);