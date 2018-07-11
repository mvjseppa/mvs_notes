function createUser(email, pass, callback) {
    console.log("createUser " + email + " " + pass);

    var dataEmail = {
        Name : 'email',
        Value : email
    };

    var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
    console.log(attributeEmail.Value);
    var newUsername = "";

    userPool.signUp(email, pass, [attributeEmail], null, callback);
}
