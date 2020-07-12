import {
    STOCKS_COMPANY_REQUESTED,   
    STOCKS_COMPANY_OK,
    STOCKS_COMPANY_FAILED,

    STOCKS_TRANSACTIONS_BY_COMPANY_REQUESTED,
    STOCKS_TRANSACTIONS_BY_COMPANY_OK,
    STOCKS_TRANSACTIONS_BY_COMPANY_FAILED,
    STOCKS_TRANSACTIONS_BY_USER_REQUESTED,
    STOCKS_TRANSACTIONS_BY_USER_OK,
    STOCKS_TRANSACTIONS_BY_USER_FAILED,

} from './types'

import moment from 'moment';
import 'moment-timezone';

import { API, graphqlOperation } from "@aws-amplify/api";
import { 
    getCompanyQuery,
    listTransactionsByCompanyQuery,
    listTransactionsByUserQuery
} from '../graphql/queries';

export const changeApiStatus = ( status, err=null, res=null) => {
    if (err) {
        return { type: status, payload: err};
    }
    
    if (res) {
        return { type: status, payload: res };
    }
    
    return { type: status };
}

export const getCompany = ( companyId ) => {
    return dispatch => {
        dispatch(changeApiStatus(STOCKS_COMPANY_REQUESTED));
        API.graphql(graphqlOperation(getCompanyQuery, { id: companyId }))
        .then(res => {
            console.log(res.data);
            dispatch(changeApiStatus(STOCKS_COMPANY_OK, res.data))
        })
        .catch(err => {
            console.log(err);
            dispatch(changeApiStatus(STOCKS_COMPANY_FAILED, err))
        });
    }
};

export const listTransactionsByCompany = ( id, gt ) => {
    return dispatch => {
        dispatch(changeApiStatus(STOCKS_TRANSACTIONS_BY_COMPANY_REQUESTED));
        API.graphql(graphqlOperation(listTransactionsByCompanyQuery, 
        { 
            id: id, 
            gt: gt ? moment().subtract(gt.quantity, gt.units).toISOString() : moment(0).toISOString()
        }))
        .then(res => {
            //console.log(res.data.getCompany.transactions.items);
            // console.log("moment test: ", moment("2020-07-03T11:17:51.30Z").toString());
            // for (let i = 0; i < res.data.getCompany.transactions.items.length; i++) {
            //     if (res.data.getCompany.transactions.items[i].createdAt.length == 24) {
            //         res.data.getCompany.transactions.items[i].createdAt = res.data.getCompany.transactions.items[i].createdAt.substring(0, 22) + res.data.getCompany.transactions.items[i].createdAt.substring(23);
            //     }
            // }
            dispatch(changeApiStatus(STOCKS_TRANSACTIONS_BY_COMPANY_OK, 
            null,
            { 
                transactions: res.data.getCompany.transactions.items, 
                gt: { quantity: gt.quantity, units: gt.units } 
            }));
        })
        .catch(err => {
            console.log(err);
            dispatch(changeApiStatus(STOCKS_TRANSACTIONS_BY_COMPANY_FAILED, err))
        });
    };
}

export const listTransactionsByUser = ( userId, companyId ) => {
    console.log(STOCKS_TRANSACTIONS_BY_USER_REQUESTED);
    return dispatch => {
        dispatch(changeApiStatus(STOCKS_TRANSACTIONS_BY_USER_REQUESTED));
        API.graphql(graphqlOperation(listTransactionsByUserQuery, 
        { 
            id: userId, 
        }))
        .then(res => {
            console.log(res);
            dispatch(changeApiStatus(STOCKS_TRANSACTIONS_BY_USER_OK, null,res.data.getUser.transactions.items));
        })
        .catch(err => {
            console.log("ERROR: ",err);
            dispatch(changeApiStatus(STOCKS_TRANSACTIONS_BY_USER_FAILED, err));
        });
    };
}

