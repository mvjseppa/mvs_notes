import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import history from '../history';

export const LOAD_SESSION = 'LOAD_SESSION';
export const TOKEN_ACQUIRED = 'TOKEN_ACQUIRED';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SIGNUP_USER = 'SIGNUP_USER';
export const CONFIRM_USER = 'CONFIRM_USER';

export function tokenAcquired(token) {
  return (dispatch) => {
    dispatch({ type: TOKEN_ACQUIRED, payload: token });
    history.push('/');
  };
}

export function logoutUser() {
  return { type: LOGOUT_USER };
}

export function loadSession() {
  return { type: LOAD_SESSION };
}
