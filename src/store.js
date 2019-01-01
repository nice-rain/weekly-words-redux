import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {weeklyWordsReducer} from './reducers';
import {reducer as formReducer} from 'redux-form';

export default createStore(
    combineReducers({
        weeklyWordsReducer,
        form: formReducer
    }), 
    applyMiddleware(thunk)
);