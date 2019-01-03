import React from 'react';
import {goLogin} from '../actions';
import {connect} from 'react-redux';

const centered = {
    textAlign:'center'
};

export function RegisterSuccess(props)
{
        
    function handleClick()
    {
        props.dispatch(goLogin());
    }


    return(
    <div style={centered}>
        <h2>Registration was successful.</h2>
        <p><button className="link-button" onClick={()=>handleClick()}>Back to Login</button></p>
    </div>)
}

export default connect()(RegisterSuccess);