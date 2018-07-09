import {AuthenticationDetails} from 'amazon-cognito-identity-js';
import {CognitoUser} from 'amazon-cognito-identity-js';

function loginUser(email, password, userPool, successCallback)
{
    var authenticationData = {Username : email, Password : password};
    var userData = {Username : email, Pool : userPool};

    var authenticationDetails = new AuthenticationDetails(authenticationData);
    var cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: successCallback,
        onFailure: function(err) {alert(err);},
        mfaRequired: function(codeDeliveryDetails) {
            var verificationCode = prompt('Please input verification code' ,'');
            cognitoUser.sendMFACode(verificationCode, this);
        }
    });
}

export default loginUser;
export{loginUser};
