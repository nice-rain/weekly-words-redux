//Displays the review word and button to flip card
import React from 'react';
import './cardBack.css';
import {connect} from 'react-redux';
import {rightAnswer, wrongAnswer} from '../actions';


export function cardBack(props)
{
    //Store our current card
    const currentCard = props.currentDeck.cards[props.review.shuffledCardIndices[props.review.currentCard]];

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


    const definitions = currentCard.results.map((result, index) =>{
        return (
            <div key={index}>
                <p>{index + 1}. (<strong>{result.partOfSpeech}</strong>) {result.definition}</p>
                <p className ="cardback-usage">{result.usage}</p>
            </div>
        );
    });

    return(
        <section className="card-back">
            <h2>{currentCard.word}</h2>
            {definitions}
            <div className="cardback-button-container">
                <button className="cardback-button-right" onClick={()=>clickedRight()}>Check</button>
                <button className="cardback-button-wrong" onClick={()=>clickedWrong()}>X</button>
            </div>
        </section>
    );
}

cardBack.defaultProps = {
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

export default connect(mapStateToProps)(cardBack);