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

    return (
        <div className="login-form">
            <form onSubmit={props.handleSubmit(values => onSubmit(values))}>
                <label htmlFor="username">Username</label>
                <Field name="username" id="username" type="text" component="input" required />
                <label htmlFor="password">Password</label>
                <Field name="password" id="password" type="password" component="input" required/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default reduxForm({
    form: 'login'
})(Login);