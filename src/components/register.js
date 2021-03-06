import React from 'react';
import './register.css';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {doRegister, goLogin} from '../actions';
import {passwordsMustMatch} from '../formValidation';

export function Register(props)
{
    function onSubmit(values) {
        //console.log('registered');
        props.dispatch(doRegister(values));
    }

    function handleClick()
    {
        props.dispatch(goLogin());
    }

    const renderField = ({
        input,
        label,
        type,
        meta: { touched, error, warning }
      }) => (
        <div>
          <label>{label}</label>
          <div>
            <input {...input} placeholder={label} type={type} />
            {touched &&
              ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
          </div>
        </div>
      )

    const error = (<span>Registration Error: {props.registerError}</span>);

    return(
        
        <div className="register-form">
            {props.registerError && error}
            <form onSubmit={props.handleSubmit(values => onSubmit(values))}>
                <label htmlFor="username">Username</label>
                <Field name="username" id="username" type="text" component="input" required />
                <label htmlFor="name">Name</label>
                <Field name="name" id="name" type="text" component="input" required />
                <label htmlFor="password">Password</label>
                <Field name="password" id="password" type="password" component="input" required/>
                <label htmlFor="con-password">Confirm Password</label>
                <Field name="con-password" id="con-password" type="password" component={renderField} validate={[passwordsMustMatch]} required/>
                <button type="submit" className="login-button">Register</button>
            </form>
            <p>Already have an account? <button className="link-button" onClick={()=>handleClick()}>Login</button></p>
        </div>
    );
}

const mapStateToProps = state => ({
    registerError: state.weeklyWordsReducer.registerError,
});

const connection = connect(mapStateToProps)(Register);

export default reduxForm({
    form: 'register'
})(connection);