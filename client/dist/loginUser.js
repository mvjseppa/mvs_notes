function loginUser(email, password)
{
    var authenticationData = {Username : email, Password : password};
    var userData = {Username : email, Pool : userPool};

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var authToken = result.getIdToken().getJwtToken();
            console.log(authToken);
            getNotes(authToken);
        },

        onFailure: function(err) {
            alert(err);
        },
        mfaRequired: function(codeDeliveryDetails) {
            var verificationCode = prompt('Please input verification code' ,'');
            cognitoUser.sendMFACode(verificationCode, this);
        }
    });
}
