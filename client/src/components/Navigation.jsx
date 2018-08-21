import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AppStates from './AppStates';

function Navigation({ appState, requestLogOut }) {
  let links = null;

  if (appState === AppStates.NOTES) {
    links = (
      withRouter(({ history }) => (
        <button
          type="button"
          onClick={() => {
            requestLogOut();
            history.push('/login');
          }}
        >
          Log out
        </button>
      ))
    );
  }
  /*
  else if (appState === AppStates.LOGIN) {
    links = (
      <button type="button" onClick={() => { requestPage(AppStates.SIGNUP, 'Enter valid email address and select a password to sign up.'); }}>
        Sign Up
      </button>
    );
  }
  */

  return (
    <nav>
      {links}
    </nav>
  );
}

Navigation.propTypes = {
  appState: PropTypes.string.isRequired,
  requestLogOut: PropTypes.func.isRequired,
  requestPage: PropTypes.func.isRequired,
};

export default Navigation;
