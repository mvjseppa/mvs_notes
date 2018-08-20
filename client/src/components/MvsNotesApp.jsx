import React from 'react';
import PropTypes from 'prop-types';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import NoteContainer from './NoteContainer';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ConfirmUserForm from './ConfirmUserForm';
import AppStates from './AppStates';
import Navigation from './Navigation';

export default class MvsNotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppStates.LOADING,
      userPool: new CognitoUserPool(props.poolData),
      message: '',
      email: '',
      passwd: '',
    };

    this.requestPage = this.requestPage.bind(this);
    this.getToken = this.getToken.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
    this.setAuthenticationDetails = this.setAuthenticationDetails.bind(this);

    this.getToken()
      .then(() => {
        this.requestPage(AppStates.NOTES, '');
      })
      .catch((error) => {
        this.requestPage(AppStates.LOGIN, '');
      });
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

  setAuthenticationDetails(email, passwd) {
    this.setState({
      email,
      passwd,
    });
  }

  requestPage(appState, message) {
    this.setState({
      appState,
      message,
    });
  }

  logOutUser() {
    const { userPool } = this.state;
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.signOut();
    }

    this.requestPage(AppStates.LOGIN, 'Logged out.');
  }

  renderAppMain(appState) {
    const { apiUrl } = this.props;
    const { userPool, email } = this.state;

    switch (appState) {
      default:
      case AppStates.LOGIN:
        return (
          <LoginForm
            userPool={userPool}
            email={email}
            requestPage={this.requestPage}
            setAuthenticationDetails={this.setAuthenticationDetails}
          />
        );

      case AppStates.NOTES:
        return (
          <NoteContainer
            apiUrl={apiUrl}
            getToken={this.getToken}
            requestPage={this.requestPage}
          />
        );

      case AppStates.SIGNUP:
        return (
          <SignUpForm
            userPool={userPool}
            requestPage={this.requestPage}
            setAuthenticationDetails={this.setAuthenticationDetails}
          />
        );

      case AppStates.CONFIRM_USER:
        return (
          <ConfirmUserForm
            email={email}
            userPool={userPool}
            requestPage={this.requestPage}
          />
        );

      case AppStates.LOADING:
        return <div className="large_spinner" />;
    }
  }

  render() {
    const { appState, message } = this.state;
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
          requestPage={this.requestPage}
        />
        <main id="main">
          {appMain}
          <p>
            {message}
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
