import { 
    AUTH_SIGNUP_REQUESTED, 
    AUTH_SIGNUP_OK, 
    AUTH_SIGNUP_FAILED, 
    AUTH_LOGIN_REQUESTED,
    AUTH_LOGIN_OK,
    AUTH_LOGIN_FAILED,
    AUTH_VERIFICATION_REQUESTED,
    AUTH_VERIFICATION_OK,
    AUTH_VERIFICATION_FAILED,
    } from "../actions/types";

const INITIAL_STATE = {
    status: null,
    id: null,
    email: null,
    err: null,
    isVerified: null,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        // SIGNUP
        case AUTH_SIGNUP_REQUESTED: 
            return { ...state, status: action.type }
        case AUTH_SIGNUP_OK: 
            return { ...state, status: null, err: null, email: action.payload, isVerified: false }
        case AUTH_SIGNUP_FAILED:
            return { ...state, status: null, err: action.payload }
        // LOGIN
        case AUTH_LOGIN_REQUESTED: 
            return { ...state, status: action.type }
        case AUTH_LOGIN_OK:
            return { 
                ...state, 
                status: null, 
                err: null, 
                email: action.payload.email, 
                id:action.payload.id , 
                isVerified: true
            }
        case AUTH_LOGIN_FAILED:
            return { ...state, status: null, err: action.payload }
        // VERIFICATION
        case AUTH_VERIFICATION_REQUESTED: 
            return { ...state, status: action.type }
        case AUTH_VERIFICATION_OK:
            return { ...state, status: null , err: null, isVerified: true }
        case AUTH_VERIFICATION_FAILED:
            return { ...state, status: null, err: action.payload }
        default:
            return state;
    }
}