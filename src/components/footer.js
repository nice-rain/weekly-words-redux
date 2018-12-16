/* This component is the footer for the application (it should stay at the bottom of the
 * application. We will update the text in it with different things depending on what the
 * user is currently doing (such as progress on the review).*/
import React from 'react';
import './footer.css';

export default function Footer(props)
{
    return(
        <footer role="contentinfo">
            {props.text}
        </footer>
    );
};

Footer.defaultProps =
{
    text: "Need Help?"
};