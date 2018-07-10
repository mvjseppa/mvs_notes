import React from 'react';
import {CognitoUserPool} from 'amazon-cognito-identity-js';
import {AuthenticationDetails} from 'amazon-cognito-identity-js';
import {CognitoUser} from 'amazon-cognito-identity-js';
import Notes from './Notes';

const AppStates = {
    LOGIN: "login",
    SIGNUP: "signup",
    NOTES: "notes",
}

export default class MvsNotesApp extends React.Component
{
    constructor(props) {
        super(props);

        var poolData = {
            UserPoolId : 'eu-central-1_op50LtdMn',
            ClientId : '2hvp9c2sls7f0fq10p8u3t5bt2'
        };

        this.state = {
            appState: AppStates.LOGIN,
            email: "",
            passwd: "",
            userPool: new CognitoUserPool(poolData),
            authToken: "",
        };
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.loginUser();
    }

    loginUser()
    {
        var cognitoUser = new CognitoUser(
            {Username : this.state.email, Pool : this.state.userPool}
        );

        var authDetails = new AuthenticationDetails(
            {Username : this.state.email, Password : this.state.passwd}
        );

        var callbacks = {
            onSuccess: function(result){
                var token = result.getIdToken().getJwtToken();
                this.setState({
                    authToken: token,
                    appState: AppStates.NOTES
                });
            }.bind(this),

            onFailure: function(err) { alert(JSON.stringify(err)); },

            mfaRequired: function(codeDeliveryDetails) {
                var verificationCode = prompt('Please input verification code' ,'');
                cognitoUser.sendMFACode(verificationCode, this);
            }
        }

        cognitoUser.authenticateUser(authDetails, callbacks);
    }

    render() {
        if(this.state.appState === AppStates.LOGIN){
            return(
                <div id="login">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="email" onChange={this.handleChange}/>
                        <input type="password" name="passwd" onChange={this.handleChange}/>
                        <input type="submit" value="Login"/>
                    </form>
                </div>
            );
        }
        else if(this.state.appState === AppStates.NOTES)
        {
            return <Notes authToken={this.state.authToken}/>
        }
    }
}

/*
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
*/
