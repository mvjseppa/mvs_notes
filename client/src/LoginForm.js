import React from 'react';
import {AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js';

export default class LoginForm extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            passwd: ""
        }
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
        this.props.requestLoadingPage();

        var cognitoUser = new CognitoUser(
            {Username : this.state.email, Pool : this.props.userPool}
        );

        var authDetails = new AuthenticationDetails(
            {Username : this.state.email, Password : this.state.passwd}
        );

        var callbacks = {
            onSuccess: (result) => {
                this.props.requestNotesPage();
            },

            onFailure: (err) => {
                if(err.code === "UserNotFoundException" || err.code === "NotAuthorizedException"){
                    this.props.requestLoginPage("Invalid username or password.");
                }
                else{
                    this.props.requestLoginPage(err.message);
                }
            },

            mfaRequired: (codeDeliveryDetails) => {
                var verificationCode = prompt('Please input verification code' ,'');
                cognitoUser.sendMFACode(verificationCode, this);
                this.props.requestLoginPage();
            }
        }

        cognitoUser.authenticateUser(authDetails, callbacks);
    }

    render() {
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
}
