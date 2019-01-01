//Results page (shown once deck is reviewed)
import React from 'react';
import './results.css';
import {connect} from 'react-redux';
import {returnHome, startReview} from '../actions';


export function Results(props)
{
   
    //Callback to fire our dispatch when our answer is right
    function clickedHome()
    {
        //console.log(`showHideDeckInfo ${props.index}`);
        props.dispatch(returnHome());
    }

    function clickedAgain()
    {
        //Just restart the review again
        props.dispatch(startReview(props.deckIndex));
    }

    //Calculates our review time in human-readable format
    function calculateElapsedTime()
    {
        const milliseconds = props.review.endTime - props.review.startTime;
        const seconds = (milliseconds /1000).toFixed(0);

        let time = "";
        if(seconds >= 60)
        {
            //First determine number of minutes
            const totalMinutes = (seconds / 60).toFixed(0);
            //Determine any seconds left over
            const totalSeconds = (seconds % 60).toFixed(0);

            time = `${totalMinutes} minutes & ${totalSeconds} seconds`
        }
        else{
            time = `${seconds} seconds`
        }

        return time;
    }

    //Calculates our review accuracy
    function calculateAccuracy()
    {
        if(props.review.cardCounter === 0)
        {
            return `Accuracy Invalid`;
        }

        return `${(props.currentDeck.cards.length /props.review.cardCounter  * 100).toFixed(2)}%`;
    }

    return(
        <section className="results-container">
            <h2>Review Stats</h2>
            <p><strong>Total Reviews:</strong> {props.currentDeck.deckReviewTotal}</p>
            <p><strong>Review Accuracy:</strong> {calculateAccuracy()}</p>
            <p><strong>Review Time:</strong> {calculateElapsedTime()}</p>
            <div className="results-button-container">
                <button className="results-button-again"onClick={()=>clickedAgain()}>Again?</button>
                <button className="results-button-home" onClick={()=>clickedHome()}>Home</button>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
    deckIndex: state.weeklyWordsReducer.review.deckIndex,
    review: state.weeklyWordsReducer.review,
    currentDeck: state.weeklyWordsReducer.decks[state.weeklyWordsReducer.review.deckIndex]
});

export default connect(mapStateToProps)(Results);