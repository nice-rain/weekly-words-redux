/* Link that contians the Deck name and information about the deck.
 * We will display a drop-down with information when it's clicked. */
import React from 'react';
import './deck.css';
import {connect} from 'react-redux';
import { showHideDeckInfo, startReview } from '../actions';

export function Deck(props)
{
    function showHideInfo()
    {
        //console.log(`showHideDeckInfo ${props.index}`);
        props.dispatch(showHideDeckInfo(props.index));
    }

    function beginReview()
    {
        //console.log('start review clicked');
        props.dispatch(startReview(props.index));
    }

    return(
        <div>
            <button className="deck-link" onClick={()=> showHideInfo()}>{props.deckName}</button>
            {/* Below is used to display when displayInfo is set to true */}
            {props.displayInfo && <div className="deck-stats">
                <ul>
                    <li><strong>Review Total:</strong> {props.deckReviewTotal}</li>
                    <li><strong>Latest Accuracy:</strong> {props.deckLatestAccuracy}</li>
                    <li><strong>Latest Review Time:</strong> {props.deckLatestTime}</li>
                    <br />
                    <li><strong>Highest Accuracy:</strong> {props.deckHighestAccuracy}</li>
                    <li><strong>Fastest Review Time:</strong> {props.deckFastestTime}</li>
                </ul>
                <button className="deck-button-start" onClick={()=>beginReview()}>Start Review</button> 
            </div>}
        </div>
    );
}

//Default deck information
Deck.defaultProps = {
    deckName: 'Default Deck Name',
    deckReviewTotal: 5,
    deckHighestAccuracy: 85,
    deckLatestAccuracy: 50,
    deckFastestTime: 600, //time in seconds
    deckLatestTime: 1000, //time in seconds
    displayInfo: false //If true, show our information
};

export default connect()(Deck)