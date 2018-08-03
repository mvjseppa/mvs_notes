import React from 'react';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import NoteContainer from './NoteContainer';
import LoginForm from './LoginForm';
import Navigation from './Navigation';

export const AppStates = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  NOTES: 'notes',
  LOADING: 'loading',
};

export class MvsNotesApp extends React.Component {
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

    this.requestNotesPage = this.requestNotesPage.bind(this);
    this.requestLoadingPage = this.requestLoadingPage.bind(this);
    this.requestLoginPage = this.requestLoginPage.bind(this);
    this.getToken = this.getToken.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
  }

  getToken() {
    const cognitoUser = this.state.userPool.getCurrentUser();
    return new Promise((resolve, reject) => {
      if (cognitoUser != null) {
        cognitoUser.getSession((err, session) => {
          if (err || !session.isValid()) {
            reject('session not valid');
          } else {
            resolve(session.getIdToken().getJwtToken());
          }
        });
      } else {
        reject('User not found.');
      }
    });
  }

  requestLoginPage(errorMsg) {
    this.setState({
      appState: AppStates.LOGIN,
      error_msg: errorMsg,
    });
  }

  requestNotesPage() {
    this.setState({
      appState: AppStates.NOTES,
      error_msg: '',
    });
  }

  requestLoadingPage() {
    this.setState({
      appState: AppStates.LOADING,
      error_msg: '',
    });
  }

  logOutUser() {
    console.log('logout');

    const cognitoUser = this.state.userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.signOut();
    }

    this.requestLoginPage();
  }

  render() {
    let appMain = null;

    if (this.state.appState === AppStates.LOGIN) {
      appMain = (
        <LoginForm
          userPool={this.state.userPool}
          requestNotesPage={this.requestNotesPage}
          requestLoadingPage={this.requestLoadingPage}
          requestLoginPage={this.requestLoginPage}
        />
      );
    } else if (this.state.appState === AppStates.NOTES) {
      appMain = (
        <NoteContainer
          apiUrl={this.props.apiUrl}
          getToken={this.getToken}
          requestLoginPage={this.requestLoginPage}
        />
      );
    } else if (this.state.appState === AppStates.LOADING) {
      appMain = <div className="large_spinner" />;
    }

    return (
      <div id="app">
        <header>
          <h1>
            Mvs Notes
          </h1>
        </header>
        <Navigation
          appState={this.state.appState}
          logOutUser={this.logOutUser}
        />
        <main id="main">
          {appMain}
          <p>
            {this.state.error_msg}
          </p>
        </main>
        <footer />
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
