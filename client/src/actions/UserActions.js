import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

export const LOAD_SESSION = 'LOAD_SESSION';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SIGNUP_USER = 'SIGNUP_USER';
export const CONFIRM_USER = 'CONFIRM_USER';

const userPool = new CognitoUserPool({
  ClientId: '2hvp9c2sls7f0fq10p8u3t5bt2',
  UserPoolId: 'eu-central-1_op50LtdMn',
});


export function loginUser(Username, Password) {
  const cognitoUser = new CognitoUser({ Username, Pool: userPool });
  const authDetails = new AuthenticationDetails({ Username, Password });

  const request = new Promise((resolve, reject) => {
    const callbacks = {
      onSuccess: (result) => { resolve(result.getIdToken().getJwtToken()); },
      onFailure: (err) => { reject(err); },
      mfaRequired: (codeDeliveryDetails) => { reject(codeDeliveryDetails); },
    };

    cognitoUser.authenticateUser(authDetails, callbacks);
  });

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function logoutUser() {
  const cognitoUser = userPool.getCurrentUser();

  if (cognitoUser != null) {
    cognitoUser.signOut();
  }

  return { type: LOGOUT_USER };
}

export function loadSession() {
  const cognitoUser = userPool.getCurrentUser();
  const request = new Promise((resolve, reject) => {
    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err || !session.isValid()) {
          reject(new Error('session not valid'));
        } else {
          resolve(session.getIdToken().getJwtToken());
        }
      });
    } else {
      reject(new Error('User not found.'));
    }
  });

  return { type: LOAD_SESSION, payload: request };
}
