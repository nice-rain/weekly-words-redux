//Displays the review word and button to flip card
import React from 'react';
import './login.css';
import {reduxForm, Field} from 'redux-form';
import {doLogin} from '../actions';

export function Login(props)
{
    function onSubmit(values) {
        //set login button inactive
        props.dispatch(doLogin(values));
    }

    function handleClick()
    {
        console.log('clicked register');
    }

    return (
        <div className="login-form">
            <form onSubmit={props.handleSubmit(values => onSubmit(values))}>
                <label htmlFor="username">Username</label>
                <Field name="username" id="username" type="text" component="input" required />
                <label htmlFor="password">Password</label>
                <Field name="password" id="password" type="password" component="input" required/>
                <button type="submit" className="login-button">Login</button>
            </form>
            <p>Don't have an account? <button className="link-button" onClick={()=>handleClick()}>Register</button></p>
        </div>
    );
}

export default reduxForm({
    form: 'login'
})(Login);