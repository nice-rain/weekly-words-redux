import {createStore, combineReducers} from 'redux';
import {weeklyWordsReducer} from './reducers';
import {reducer as formReducer} from 'redux-form';

export default createStore(
    combineReducers({
        weeklyWordsReducer,
        form: formReducer
    })
);