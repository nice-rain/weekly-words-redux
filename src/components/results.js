//Results page (shown once deck is reviewed)
import React, { Component } from 'react';
import './results.css';
import {connect} from 'react-redux';
import {returnHome, startReview, putDeckStats} from '../actions';


export class Results extends Component
{
   
    //Callback to fire our dispatch when our answer is right
    clickedHome()
    {
        //console.log(`showHideDeckInfo ${props.index}`);
        this.props.dispatch(returnHome());
    }

    clickedAgain()
    {
        //Just restart the review again
        this.props.dispatch(startReview(this.props.deckIndex));
    }

    //Calculates our review time in human-readable format
    calculateElapsedTime()
    {
        const milliseconds = this.props.review.endTime - this.props.review.startTime;
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
    calculateAccuracy()
    {
        if(this.props.review.cardCounter === 0)
        {
            return `Accuracy Invalid`;
        }

        return (this.props.currentDeck.generatedDeck.cards.length /this.props.review.cardCounter  * 100).toFixed(2);
    }

    deckStats = {};

    componentDidMount()
    {
        const oldAccuracy = this.props.currentDeck.deckHighestAccuracy;
        const newAccuracy = this.calculateAccuracy();
        const bestAccuracy = newAccuracy > oldAccuracy ? newAccuracy : oldAccuracy

        const oldTime = this.props.currentDeck.deckFastestTime;

        const milliseconds = this.props.review.endTime - this.props.review.startTime;
        const seconds = (milliseconds /1000).toFixed(0);
        const fastestTime = seconds < oldTime || oldTime === 0 ? seconds : oldTime;

        this.deckStats = {
            id: this.props.currentDeck.id,
            deckReviewTotal: this.props.currentDeck.deckReviewTotal + 1,
            deckHighestAccuracy: bestAccuracy,
            deckFastestTime: fastestTime, 
            deckLatestTime: seconds,
            deckLatestAccuracy: newAccuracy
        };

        console.log('stats to submit');
        console.log(this.deckStats);

        //We need to do a put request here to save our stats
        this.props.dispatch(putDeckStats(this.deckStats));
    }

render(){

//reverse the map so that we can sort by the latest deck being first
let error = (<div className="results-error">
                <p>There was an error sending your stats to the server.</p>
                <button className="results-error-button" onClick={()=>this.props.dispatch(putDeckStats(this.deckStats))}><i className="fas fa-redo-alt"></i></button>
            </div>);


    return(
        <section className="results-container">
            <h2>Review Stats</h2>
            <p><strong>Total Reviews:</strong> {this.props.currentDeck.deckReviewTotal + 1}</p>
            <p><strong>Review Accuracy:</strong> {this.calculateAccuracy()+'%'}</p>
            <p><strong>Review Time:</strong> {this.calculateElapsedTime()}</p>
            {this.props.reviewError && error}
            <div className="results-button-container">
                <button className="results-button-again"onClick={()=>this.clickedAgain()}>Again?</button>
                <button className="results-button-home" onClick={()=>this.clickedHome()}>Home</button>
            </div>
        </section>
    );
}
}

const mapStateToProps = state => ({
    deckIndex: state.weeklyWordsReducer.review.deckIndex,
    review: state.weeklyWordsReducer.review,
    currentDeck: state.weeklyWordsReducer.decks[state.weeklyWordsReducer.review.deckIndex],
    reviewError: state.weeklyWordsReducer.reviewError
});

export default connect(mapStateToProps)(Results);