import { SIGNUP_REQUESTED, SIGNUP_OK, SIGNUP_FAILED } from "../actions/types";

const INITIAL_STATE = {
    status: null,
    user: null,
    err: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGNUP_REQUESTED: 
            return { ...state, status: action.type }
        case SIGNUP_FAILED:
            return { ...state, status: null, err: action.payload }
        case SIGNUP_OK:
            return { ...state, status: null, err: null, user: action.payload }
        default:
            return state;
    }
}