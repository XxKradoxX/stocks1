import {  
    STOCKS_COMPANY_REQUESTED,
    STOCKS_COMPANY_OK,
    STOCKS_COMPANY_FAILED,

    STOCKS_TRANSACTIONS_BY_COMPANY_REQUESTED,
    STOCKS_TRANSACTIONS_BY_COMPANY_OK,
    STOCKS_TRANSACTIONS_BY_COMPANY_FAILED,
    STOCKS_TRANSACTIONS_BY_COMPANY_UPDATED_OK,
    STOCKS_TRANSACTIONS_BY_USER_REQUESTED,
    STOCKS_TRANSACTIONS_BY_USER_OK,
    STOCKS_TRANSACTIONS_BY_USER_FAILED
    
} from '../actions/types';

const INITIAL_STATE = {
    status: null,
    currentStock: null,
    currentTransactions: [],
    err : null,
    from: null,
    gt: null,
    myTransactions: {},
}

const isOlder = ( a, b ) => {
    if (a.createdAt < b.createdAt) {
        console.log(true);
        return true;
    }
    return false;
}

const renewMyTransactions = ( state, newTransactions ) => {
    newTransactions.forEach(newTransaction => {
        
        if (state.myTransactions[newTransaction.companyId] == null) {
            console.log(newTransaction.createdAt);
            state.myTransactions[newTransaction.companyId] = [newTransaction];
        } else {
            for (let i = state.myTransactions[newTransaction.companyId].length - 1; i >= 0; i--) {
                if (isOlder(newTransaction, state.myTransactions[newTransaction.companyId][i])) {
                    state.myTransactions[newTransaction.companyId].splice(i+1, 0, newTransaction);
                    break;
                }
            }
        }
    });
    console.log("state.myTransactions: ", state.myTransactions);
    return state.myTransactions;
}

export default (state = INITIAL_STATE, action) => {
    console.log("action.type: ", action);
    switch(action.type) {
        case STOCKS_COMPANY_REQUESTED:
            return { ...state, status: action.payload, err: null }
        case STOCKS_COMPANY_OK:
            return { ...state, status: null, currentStock: action.payload  }
        case STOCKS_COMPANY_FAILED:
            return { ...state, status: null, err: action.payload }
        case STOCKS_TRANSACTIONS_BY_COMPANY_REQUESTED:
            return { ...state, status: action.payload, err: null }
        case STOCKS_TRANSACTIONS_BY_COMPANY_OK:
        {
            return { 
                ...state, 
                status: null, 
                currentTransactions: action.payload.transactions, 
                gt: action.payload.gt 
            };
        }
        case STOCKS_TRANSACTIONS_BY_COMPANY_FAILED:
            return { ...state, status: null, err: action.payload }
        case STOCKS_TRANSACTIONS_BY_USER_REQUESTED: 
            return { ...state, status: action.payload, err: null }
        case STOCKS_TRANSACTIONS_BY_USER_OK: 
            return { ...state, status: null, myTransactions: renewMyTransactions(state, action.payload) }
        case STOCKS_TRANSACTIONS_BY_USER_FAILED:
            return { ...state, status: action.payload, err: null }
        case STOCKS_TRANSACTIONS_BY_COMPANY_UPDATED_OK: {
            console.log(STOCKS_TRANSACTIONS_BY_COMPANY_UPDATED_OK);
            return { 
                ...state, 
                status: null, 
                currentTransactions: [ ...state.currentTransactions, ...action.payload.transactions], 
            }
            break;
        }

        default:
            return state;
    }
}