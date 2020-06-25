import { AUTH_SIGNUP_WITH_EMAIL } from "./types"


export const signupWithEmail = (email, password) => {
    return {
        type: AUTH_SIGNUP_WITH_EMAIL,
    }
}