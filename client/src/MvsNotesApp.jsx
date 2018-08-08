import React from 'react';
import PropTypes from 'prop-types';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import NoteContainer from './NoteContainer';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import AppStates from './AppStates';
import Navigation from './Navigation';

export default class MvsNotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppStates.LOADING,
      userPool: new CognitoUserPool(props.poolData),
    };

    this.getToken()
      .then(() => {
        this.requestNotesPage();
      })
      .catch(() => {
        this.requestLoginPage();
      });

    this.requestNotesPage = this.requestNotesPage.bind(this);
    this.requestLoadingPage = this.requestLoadingPage.bind(this);
    this.requestLoginPage = this.requestLoginPage.bind(this);
    this.requestSignUpPage = this.requestSignUpPage.bind(this);
    this.getToken = this.getToken.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
  }

  getToken() {
    const { userPool } = this.state;
    const cognitoUser = userPool.getCurrentUser();
    return new Promise((resolve, reject) => {
      if (cognitoUser != null) {
        cognitoUser.getSession((err, session) => {
          if (err || !session.isValid()) {
            reject(new Error('session not valid'));
          } else {
            resolve(session.getIdToken().getJwtToken());
          }
        });
      } else {
        reject(new Error('User not found.'));
      }
    });
  }

  requestLoginPage(errorMsg) {
    this.setState({
      appState: AppStates.LOGIN,
      errorMsg,
    });
  }

  requestNotesPage() {
    this.setState({
      appState: AppStates.NOTES,
      errorMsg: '',
    });
  }

  requestLoadingPage() {
    this.setState({
      appState: AppStates.LOADING,
      errorMsg: '',
    });
  }

  requestSignUpPage() {
    this.setState({
      appState: AppStates.SIGNUP,
      errorMsg: '',
    });
  }

  logOutUser() {
    const { userPool } = this.state;
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.signOut();
    }

    this.requestLoginPage();
  }

  renderAppMain(appState) {
    const { apiUrl } = this.props;
    const { userPool } = this.state;

    switch (appState) {
      default:
      case AppStates.LOGIN:
        return (
          <LoginForm
            userPool={userPool}
            requestNotesPage={this.requestNotesPage}
            requestLoadingPage={this.requestLoadingPage}
            requestLoginPage={this.requestLoginPage}
          />
        );

      case AppStates.NOTES:
        return (
          <NoteContainer
            apiUrl={apiUrl}
            getToken={this.getToken}
            requestLoginPage={this.requestLoginPage}
          />
        );

      case AppStates.SIGNUP:
        return (
          <SignUpForm
            userPool={userPool}
            requestLoadingPage={this.requestLoadingPage}
            requestLoginPage={this.requestLoginPage}
          />
        );

      case AppStates.LOADING:
        return <div className="large_spinner" />;
    }
  }

  render() {
    const { appState, errorMsg } = this.state;

    const appMain = this.renderAppMain(appState);

    return (
      <div id="app">
        <header>
          <img src="logo.svg" height="96" widht="96" alt="Mvs-Notes logo" />
          <h1>
            Mvs Notes
          </h1>
        </header>
        <Navigation
          appState={appState}
          requestLogOut={this.logOutUser}
          requestSignUp={this.requestSignUpPage}
        />
        <main id="main">
          {appMain}
          <p>
            {errorMsg}
          </p>
        </main>
        <footer />
      </div>
    );
  }
}


MvsNotesApp.propTypes = {
  poolData: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired,
};
