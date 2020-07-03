// import {
//     STOCKS_COMPANY_REQUESTED,   
// } from './types'

import { API, graphqlOperation } from "@aws-amplify/api";
import { getCompanyQuery } from '../graphql/queries';
export const changeApiStatus = ( status, err=null, res=null) => {
    if (err) {
        return { type: status, payload: err};
    }
    
    if (res) {
        return { type: status, payload: res };
    }
    
    return { type: status };
}

export const getCompany = companyId => {
    return dispatch => {
        //dispatch(changeApiStatus(STOCKS_COMPANY_REQUESTED));
        API.graphql(graphqlOperation(getCompanyQuery, { id: companyId }))
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }
};