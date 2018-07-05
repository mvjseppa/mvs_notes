var poolData = {
    UserPoolId : 'eu-central-1_op50LtdMn',
    ClientId : '2hvp9c2sls7f0fq10p8u3t5bt2'
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

function createUserCallback(err, result)
{
    if (err) {
        alert(err);
        return;
    }
    var uname = result.user.getUsername();
    console.log('user name is ' + uname);

    if(uname.length > 0){
        $('#confirm_user_link').trigger('click');
        $('#email').val(uname);
    }
    else{
        $('#email').val("");
    }
    $('#passwd').val("");
}

$('#create_user_link').click(function(){

    $('#login_title').text("Create user");
    $('#login_prompt').text("Enter your e-mail address and password to create new account.");

    $('#email').show();
    $('#passwd').show();
    $('#verification').hide();

    $('#loginBtn').unbind('click');
    $('#loginBtn').click(function(){
        createUser($('#email').val(), $('#passwd').val(), createUserCallback);
    });
});

$('#confirm_user_link').click(function(){

    $('#login_title').text("Verify user");
    $('#login_prompt').text("Enter your e-mail address and the verification code sent to your e-mail to verify your account.");

    $('#email').show();
    $('#passwd').hide();
    $('#verification').show();

    $('#loginBtn').unbind('click');
    $('#loginBtn').click(function(){
        confirmUser($('#email').val(), $('#verification').val());
    });
});

$('#login_user_link').click( function(){

    $('#login_title').text("Login user");
    $('#login_prompt').text("Enter e-mail address and password to login");

    $('#email').show();
    $('#passwd').show();
    $('#verification').hide();

    $('#loginBtn').unbind('click');
    $('#loginBtn').click(function(){
        loginUser($('#email').val(), $('#passwd').val());
    });
});

$('#login_user_link').click();
