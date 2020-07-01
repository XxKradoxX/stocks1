import { 
    AUTH_SIGNUP_REQUESTED, 
    AUTH_SIGNUP_FAILED, 
    AUTH_SIGNUP_OK, 
    AUTH_LOGIN_REQUESTED, 
    AUTH_LOGIN_OK,
    AUTH_LOGIN_FAILED,
    AUTH_VERIFICATION_REQUESTED, 
    AUTH_VERIFICATION_OK, 
    AUTH_VERIFICATION_FAILED } from './types'
import { Auth } from 'aws-amplify';

export const changeApiStatus = ( status, err=null, res=null) => {
    if (err) {
        return { type: status, payload: err};
    }
    
    if (res) {
        return { type: status, payload: res };
    }
    
    return { type: status };
}

export const signupWithEmail = (email, password) => {
    email = email.toLowerCase();
    return dispatch => {
        dispatch(changeApiStatus(AUTH_SIGNUP_REQUESTED));
        Auth.signUp({
            username: email,
            password,
            attributes: {
                email,          
            }
        })
        .then(res => {
            dispatch(changeApiStatus(AUTH_SIGNUP_OK, null, email));
        })
        .catch(err => {
            console.log(err);
            if (err.code == "InvalidParameterException") {
                dispatch(changeApiStatus(AUTH_SIGNUP_FAILED, "Invalid email")); 
            }
            if (err.code == "UsernameExistsException") {
                dispatch(changeApiStatus(AUTH_SIGNUP_FAILED, "Email is already taken")); 
            }
        })
    }
}

export const loginWithEmail = (email, password) => {
    email = email.toLowerCase();
    return dispatch => {
        dispatch(changeApiStatus(AUTH_LOGIN_REQUESTED));
        Auth.signIn(email, password)
        .then(res => {
            dispatch(changeApiStatus(AUTH_LOGIN_OK, null, res.attributes.email));
        })
        .catch(err => {
            if (err.code == "UserNotFoundException") {
                dispatch(changeApiStatus(AUTH_LOGIN_FAILED, err.message));
            } 
            console.log("loginWithEmail Error");
            console.log(err)
        })
    }
}

export const verifyAccount = (email, code) => {
    email = email.toLowerCase();
    return dispatch => {
        dispatch(() => changeApiStatus(AUTH_VERIFICATION_REQUESTED));
        Auth.confirmSignUp(email, code)
        .then(res => {
            console.log(res);
            dispatch(() => changeApiStatus(AUTH_VERIFICATION_OK, null, email));
        })
        .catch(err => {
            console.log(err);
            dispatch(changeApiStatus(AUTH_VERIFICATION_FAILED, "Invalid Code")); 
        })
    }
}

