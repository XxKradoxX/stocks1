import { combineReducers } from 'redux';
import auth from './auth';
import stocks from './stocks';

export default combineReducers({
    auth: auth,
    stocks: stocks
});