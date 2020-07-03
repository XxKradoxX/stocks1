import {  
    STOCKS_COMPANY_REQUESTED
} from '../actions/types';

const INITIAL_STATE = {
    status: null,
    currentStock: null,
    currentTransactions: [],
    err : null,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case STOCKS_COMPANY_REQUESTED {
            return { ...state, status: action.payload, err: null }
        }
        default:
            return state;
    }
}