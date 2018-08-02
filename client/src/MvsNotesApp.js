import React from 'react';
import {CognitoUserPool, AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js';
import NoteContainer from './Notes';

const AppStates = {
    LOGIN: "login",
    SIGNUP: "signup",
    NOTES: "notes",
    LOADING: "loading"
}

export default class MvsNotesApp extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            appState: AppStates.LOADING,
            userPool: new CognitoUserPool(props.poolData),
        };

        this.getToken()
        .then((token) => {
            this.requestNotesPage();
        })
        .catch((error) => {
            this.requestLoginPage();
        });
    }

    getToken(){

        const cognitoUser = this.state.userPool.getCurrentUser();

        return new Promise((resolve, reject) => {

            if (cognitoUser != null) {
                cognitoUser.getSession((err, session) => {
                    if (err || !session.isValid()) {
                        reject("session not valid");
                    }
                    else {
                        resolve(session.getIdToken().getJwtToken());
                    }
                });
            }
            else {
                reject("User not found.");
            }
        });
    }

    requestLoginPage(error_msg){
        this.setState({
            appState: AppStates.LOGIN,
            error_msg: error_msg
        });
    }

    requestNotesPage(){
        this.setState({
            appState: AppStates.NOTES,
            error_msg: ""
        });
    }

    requestLoadingPage(){
        this.setState({
            appState: AppStates.LOADING,
            error_msg: ""
        });
    }

    logOutUser(){
        console.log("logout");

        const cognitoUser = this.state.userPool.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.signOut();
        }

        this.requestLoginPage();
    }

    render() {

        var appMain = null;

        if(this.state.appState === AppStates.LOGIN) {
            appMain = (
                <LoginForm
                    userPool={this.state.userPool}
                    requestNotesPage={this.requestNotesPage.bind(this)}
                    requestLoadingPage={this.requestLoadingPage.bind(this)}
                    requestLoginPage={this.requestLoginPage.bind(this)} />
            );
        }
        else if(this.state.appState === AppStates.NOTES) {
            appMain = (
                <NoteContainer
                        apiUrl={this.props.apiUrl}
                        getToken={this.getToken.bind(this)}
                        requestLoginPage={this.requestLoginPage.bind(this)}/>
            );
        }
        else if(this.state.appState === AppStates.LOADING) {
            appMain = <div className="large_spinner" />
        }

        return(
            <div id="app">
                <header><h1>Mvs Notes</h1></header>
                <Navigation
                    appState={this.state.appState}
                    logOutUser={this.logOutUser.bind(this)} />
                <main id="main">
                    {appMain}
                    <p>{this.state.error_msg}</p>
                </main>
                <footer></footer>
            </div>
        );
    }
}

class Navigation extends React.Component
{
    render(){
        var links = null;

        if(this.props.appState === AppStates.NOTES){
            links = <a href="" onClick={this.props.logOutUser}>Log out</a>;
        }

        return <nav>{links}</nav>;
    }
}

class LoginForm extends React.Component
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
