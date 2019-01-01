/* Component viewed from the Decks page. 
 * Contains a list of every deck.
 * Uses fetch to retrieve list of decks.*/

import React, { Component } from 'react';
import Deck from './deck';

import {connect} from 'react-redux';
import {getDecks} from '../actions';

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
        const deckComponents = this.props.decks.slice(0).reverse().map((deck, index) =>
                
            <Deck {...deck} key={index} index={this.props.decks.length - 1 - index}/>
        );

        return(
            <section>
                {deckComponents}
            </section>
        );
    };
}

const mapStateToProps = state => ({
    decks: state.weeklyWordsReducer.decks
});

export default connect(mapStateToProps)(DeckList);