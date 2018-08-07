import React from 'react';
import PropTypes from 'prop-types';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import NoteContainer from './NoteContainer';
import LoginForm from './LoginForm';
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

  logOutUser() {
    const { userPool } = this.state;
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.signOut();
    }

    this.requestLoginPage();
  }

  render() {
    let appMain = null;

    const { appState, userPool, errorMsg } = this.state;
    const { apiUrl } = this.props;

    if (appState === AppStates.LOGIN) {
      appMain = (
        <LoginForm
          userPool={userPool}
          requestNotesPage={this.requestNotesPage}
          requestLoadingPage={this.requestLoadingPage}
          requestLoginPage={this.requestLoginPage}
        />
      );
    } else if (appState === AppStates.NOTES) {
      appMain = (
        <NoteContainer
          apiUrl={apiUrl}
          getToken={this.getToken}
          requestLoginPage={this.requestLoginPage}
        />
      );
    } else if (appState === AppStates.LOADING) {
      appMain = <div className="large_spinner" />;
    }

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
          logOutUser={this.logOutUser}
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
