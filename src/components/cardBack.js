//Displays the review word and button to flip card
import React from 'react';
import './cardBack.css';
import {connect} from 'react-redux';


export function cardBack(props)
{
    const definitions = props.results.map((result, index) =>{
        return (
            <div>
                <p>{index + 1}. (<strong>{result.partOfSpeech}</strong>) {result.definition}</p>
                <p className ="cardback-usage">{result.usage}</p>
            </div>
        );
    });

    return(
        <section className="card-back">
            <h2>{props.word}</h2>
            {definitions}
            <div className="cardback-button-container">
                <button className="cardback-button-right">Check</button>
                <button className="cardback-button-wrong">X</button>
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

export default connect()(cardBack);