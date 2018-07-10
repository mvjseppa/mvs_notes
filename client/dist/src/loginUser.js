import {AuthenticationDetails} from 'amazon-cognito-identity-js';
import {CognitoUser} from 'amazon-cognito-identity-js';

export default function loginUser(email, password, userPool, successCallback)
{

    console.log("logging in with:" + email + " " + password);

    var authenticationData = {Username : email, Password : password};
    var userData = {Username : email, Pool : userPool};

    var authenticationDetails = new AuthenticationDetails(authenticationData);
    var cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {successCallback(result)},
        onFailure: function(err) {console.log("error!!"); alert(JSON.stringify(err));},
        mfaRequired: function(codeDeliveryDetails) {
            var verificationCode = prompt('Please input verification code' ,'');
            cognitoUser.sendMFACode(verificationCode, this);
        }
    });
}
