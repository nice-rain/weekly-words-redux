import React from 'react';

import './footer.css';

export default function Footer(props)
{
    return(
        <footer>
            {props.text}
        </footer>
    );
};

Footer.defaultProps =
{
    text: "Need Help?"
};