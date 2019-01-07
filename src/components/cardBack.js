//Displays the review word and button to flip card
import React from 'react';
import './cardBack.css';
import {connect} from 'react-redux';
import {rightAnswer, wrongAnswer} from '../actions';


export function CardBack(props)
{
    //Store our current card
    const currentCard = props.currentDeck.generatedDeck.cards[props.review.shuffledCardIndices[props.review.currentCard]];

    //Callback to fire our dispatch when our answer is right
    function clickedRight()
    {
        //console.log(`showHideDeckInfo ${props.index}`);
        props.dispatch(rightAnswer());
    }

    function clickedWrong()
    {
        props.dispatch(wrongAnswer());
    }

    return(
        <section className="card-back">
            <h2>{currentCard.word}</h2>
            <div>
            <p>(<strong>{currentCard.partOfSpeech}</strong>) {currentCard.definition}</p>
                <p className ="cardback-usage">{currentCard.usage}</p>
            </div>
            <div className="cardback-button-container">
                <button className="cardback-button-right" onClick={()=>clickedRight()}>Check</button>
                <button className="cardback-button-wrong" onClick={()=>clickedWrong()}>X</button>
            </div>
        </section>
    );
}

CardBack.defaultProps = {
    word:'example',
    results: [
        {
            partOfSpeech: 'noun',
            definition: 'a thing characteristic of its kind or illustrating a general rule.',
            usage: `it's a good example of how European action can produce results`
        },
        {
            partOfSpeech: 'noun',
            definition: 'a representative form or pattern',
            usage: `I profited from his example`
        }
    ]
}

const mapStateToProps = state => ({
    review: state.weeklyWordsReducer.review,
    currentDeck: state.weeklyWordsReducer.decks[state.weeklyWordsReducer.review.deckIndex]
});

export default connect(mapStateToProps)(CardBack);