import React from 'react';
import Spinner from 'react-spinkit';
import './loading.css';

export default function Loading(props)
{
    return (
        <div className="loading">
            <Spinner name='circle' className="loading-spinner" fadeIn='quarter'/>
        </div>
    );
}