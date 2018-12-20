//Results page (shown once deck is reviewed)
import React from 'react';
import './results.css';
import {connect} from 'react-redux';
// import {rightAnswer, wrongAnswer} from '../actions';


export function Results(props)
{
   
    //Callback to fire our dispatch when our answer is right
    // function clickedRight()
    // {
    //     //console.log(`showHideDeckInfo ${props.index}`);
    //     props.dispatch(rightAnswer());
    // }

    // function clickedWrong()
    // {
    //     props.dispatch(wrongAnswer());
    // }

    return(
        <section className="results-container">
            <h2>Review Stats</h2>
            <p><strong>Total Review Time:</strong> 120s</p>
            <p><strong>Review Accuracy:</strong> 18%</p>
            <div className="results-button-container">
                <button className="results-button-again">Again?</button>
                <button className="results-button-home">Home</button>
            </div>
        </section>
    );
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Results);