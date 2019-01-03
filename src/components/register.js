import React from 'react';
import './register.css';
import {reduxForm, Field} from 'redux-form';
import {doRegister, goLogin} from '../actions';

export function Register(props)
{
    function onSubmit(values) {
        console.log('registered');
        props.dispatch(doRegister(values));
    }

    function handleClick()
    {
        props.dispatch(goLogin());
    }

    return(
        <div className="register-form">
            <form onSubmit={props.handleSubmit(values => onSubmit(values))}>
                <label htmlFor="username">Username</label>
                <Field name="username" id="username" type="text" component="input" required />
                <label htmlFor="name">Name</label>
                <Field name="name" id="name" type="text" component="input" required />
                <label htmlFor="password">Password</label>
                <Field name="password" id="password" type="password" component="input" required/>
                <label htmlFor="con-password">Confirm Password</label>
                <Field name="con-password" id="con-password" type="password" component="input" required/>
                <button type="submit" className="login-button">Register</button>
            </form>
            <p>Already have an account? <button className="link-button" onClick={()=>handleClick()}>Login</button></p>
        </div>
    );
}

export default reduxForm({
    form: 'register'
})(Register);