import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NoteContainer from './NoteContainer';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ConfirmUserForm from './ConfirmUserForm';
import AppStates from './AppStates';
import Navigation from './Navigation';

class MvsNotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appState: AppStates.LOGIN,
      message: '',
      email: '',
      passwd: '',
    };

    this.requestPage = this.requestPage.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
    this.setAuthenticationDetails = this.setAuthenticationDetails.bind(this);
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
    const { apiUrl, token } = this.props;
    const { userPool, email } = this.state;

    if (token) {
      return (
        <NoteContainer
          apiUrl={apiUrl}
          getToken={this.getToken}
          requestPage={this.requestPage}
        />
      );
    }

    return (
      <LoginForm
        email={email}
        requestPage={this.requestPage}
        setAuthenticationDetails={this.setAuthenticationDetails}
      />
    );

    /*
    switch (appState) {
      default:
      case AppStates.LOGIN:
        return (
          <LoginForm
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
    */
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


function mapStateToProps({ user }) {
  console.log(user);
  return { token: user };
}

export default connect(mapStateToProps, null)(MvsNotesApp);
