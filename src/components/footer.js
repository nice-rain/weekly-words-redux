/* This component is the footer for the application (it should stay at the bottom of the
 * application. We will update the text in it with different things depending on what the
 * user is currently doing (such as progress on the review).*/
import React from 'react';
import './footer.css';

import {connect} from 'react-redux';

import {displayHelp} from '../actions';

export  function Footer(props)
{
    function handleClick()
    {
        props.dispatch(displayHelp());
    }

    return(
        <footer role="contentinfo">
            {/* {props.text} */}
            <button className="link-button" onClick={()=>handleClick()}>Need Help?</button>
        </footer>
    );
};

Footer.defaultProps =
{
    text: "Need Help?"
};

export default connect()(Footer);