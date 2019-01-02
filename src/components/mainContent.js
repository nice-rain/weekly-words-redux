/* Component that contains and switches between content (similar to a page) 
 * between the header and footer. It will draw/contain most of the app's 
 * core functionality. */
import React from 'react';
import './mainContent.css';
import {connect} from 'react-redux';

//Imports regarding main content
import DeckList from './deckList';
import CardFront from './cardFront';
import CardBack from './cardBack';
import Results from './results';
import Login from './login';
import Loading from './loading';

//We use the page prop in order to change the content.
//This will not work with the back button, but we are
//designing this application as if it were a native-mobile one
export function MainContent(props)
{
    return(
        <main role="main">
            {props.loading && <Loading/>}
            {props.page === 'decks' && <DeckList />}
            {props.page === 'cardFront' && <CardFront />}
            {props.page === 'cardBack' && <CardBack />}
            {props.page === 'results' && <Results />}
            {props.page === 'login' && <Login/>}
        </main>
    );
};

const mapStateToProps = state => ({
    page: state.weeklyWordsReducer.page,
    loading: state.weeklyWordsReducer.loading
});

export default connect(mapStateToProps)(MainContent);