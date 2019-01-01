//Displays the review word and button to flip card
import React from 'react';
import './login.css';
import {reduxForm, Field} from 'redux-form';
//import {doLogin} from '../actions';

export function Login(props)
{
    function onSubmit(values) {
        console.log(values);
    }

    return (
        <form onSubmit={props.handleSubmit(values => onSubmit(values))}>
            <label htmlFor="name">Username</label>
            <Field name="name" id="name" type="text" component="input" />
            <label htmlFor="email">Password</label>
            <Field name="email" id="email" type="email" component="input" />
            <button type="submit">Login</button>
        </form>
    );
}

export default reduxForm({
    form: 'login'
})(Login);