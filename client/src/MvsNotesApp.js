import React from 'react';
import {CognitoUserPool, AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js';
import NoteContainer from './Notes';

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
        };

        if(this.getToken() !== "") {
            this.state.appState = AppStates.NOTES;
        }
    }

    getToken() {
        const cognitoUser = this.state.userPool.getCurrentUser();
        var token = "";

        if (cognitoUser != null) {
            cognitoUser.getSession((err, session) => {
                if (err || !session.isValid()) {
                    console.log("session not valid");
                }
                else {
                    token = session.getIdToken().getJwtToken()
                    console.log(token);
                }
            });
        }
        else {
            console.log("User not found.");
        }

        return token;
    }

    requestLoginPage(){
        this.setState({ appState: AppStates.LOGIN });
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
            onSuccess: (result) => {
                this.setState({ appState: AppStates.NOTES });
            },

            onFailure: (err) => {
                alert(JSON.stringify(err));
            },

            mfaRequired: (codeDeliveryDetails) => {
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
                    <form onSubmit={this.handleSubmit} className="stacked_form">
                        <input type="text" name="email" onChange={this.handleChange}/>
                        <input type="password" name="passwd" onChange={this.handleChange}/>
                        <input type="submit" value="Login"/>
                    </form>
                </div>
            );
        }
        else if(this.state.appState === AppStates.NOTES)
        {
            return  <NoteContainer
                        getToken={this.getToken.bind(this)}
                        requestLoginPage={this.requestLoginPage.bind(this)}
                    />
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
