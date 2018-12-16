/* Component viewed from the Decks page. It contains a list of every deck
 * that is available for review.*/

 import React from 'react';
 import Deck from './deck';

 import {connect} from 'react-redux';

 export function DeckList(props)
 {
    // Map each deck to a deck component (Note: the spread operator
    // adds every object key as a prop to the Deck component)
    // The index prop can be used to uniquely identify this component,
    // as we are mapping it to the exact indices of the decks array
    const deckComponents = props.decks.map((deck, index) =>
        <Deck {...deck} key={index} index={index}/>
    );

    return(
        <section>
            {deckComponents}
        </section>
    );
 };

const mapStateToProps = state => ({
    decks: state.decks
});

 export default connect(mapStateToProps)(DeckList);