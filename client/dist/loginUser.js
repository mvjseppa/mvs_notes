function loginUser(email, password, successCallback)
{
    var authenticationData = {Username : email, Password : password};
    var userData = {Username : email, Pool : userPool};

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: successCallback,
        onFailure: function(err) {alert(err);},
        mfaRequired: function(codeDeliveryDetails) {
            var verificationCode = prompt('Please input verification code' ,'');
            cognitoUser.sendMFACode(verificationCode, this);
        }
    });
}
