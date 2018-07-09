function confirmUser(email, code){

    var userData = {Username : email, Pool : userPool};
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true,
        function(err, result) {
            if (err) {
                alert(err);
                return;
            }
            console.log('call result: ' + result);
        });
}
