/* Component viewed from the Decks page. 
 * Contains a list of every deck.
 * Uses fetch to retrieve list of decks.*/

import React, { Component } from 'react';
import Deck from './deck';

import {connect} from 'react-redux';
import {getDecks} from '../actions';

import './deckList.css';

 export class DeckList extends Component
 {
    componentDidMount()
    {
        this.props.dispatch(getDecks());
    }


    

    // Map each deck to a deck component (Note: the spread operator
    // adds every object key as a prop to the Deck component)
    // The index prop can be used to uniquely identify this component,
    // as we are mapping it to the exact indices of the decks array
    render(){
        //reverse the map so that we can sort by the latest deck being first
        let deckComponents;
        if(this.props.decks)
        {
            deckComponents = this.props.decks.slice(0).reverse().map((deck, index) =>
                
                <Deck {...deck} key={index} index={this.props.decks.length - 1 - index}/>
            );
        }

        const error = (
            <div className="deck-error">
                <p>There was an error retrieving decks from the server</p>
                <button className="deck-error-button" onClick={()=>this.props.dispatch(getDecks())}><i className="fas fa-redo-alt"></i></button>
            </div>);

        return(
            <section>
                {this.props.deckError ? error : deckComponents}
                {/* {deckComponents} */}
            </section>
        );
    };
}

const mapStateToProps = state => ({
    decks: state.weeklyWordsReducer.decks,
    deckError: state.weeklyWordsReducer.deckError
});

export default connect(mapStateToProps)(DeckList);