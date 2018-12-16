/* Component that contains and switches between content (similar to a page) 
 * between the header and footer. It will draw/contain most of the app's 
 * core functionality. */
import React from 'react';
import './mainContent.css';
import {connect} from 'react-redux';

//Imports regarding main content
import DeckList from './deckList';

//We use the page prop in order to change the content.
//This will not work with the back button, but we are
//designing this application as if it were a native-mobile one
export function MainContent(props)
{
    return(
        <main role="main">
            {props.page === 'deck' && <DeckList />}
            <DeckList/>
        </main>
    );
};

const mapStateToProps = state => ({
    page: state.page
});

export default connect(mapStateToProps)(MainContent);