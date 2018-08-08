import React from 'react';
import PropTypes from 'prop-types';
import AppStates from './AppStates';

function Navigation({ appState, requestLogOut, requestPage }) {
  let links = null;

  if (appState === AppStates.NOTES) {
    links = (
      <button type="button" onClick={requestLogOut}>
        Log out
      </button>
    );
  } else if (appState === AppStates.LOGIN) {
    links = (
      <button type="button" onClick={() => { requestPage(AppStates.SIGNUP, 'Enter valid email address and select a password to sign up.'); }}>
        Sign Up
      </button>
    );
  }

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
