import {createStore} from 'redux';
import {weeklyWordsReducer} from './reducers';

export default createStore(weeklyWordsReducer);