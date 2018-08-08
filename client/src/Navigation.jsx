import React from 'react';
import PropTypes from 'prop-types';
import AppStates from './AppStates';

function Navigation({ appState, requestLogOut, requestSignUp }) {
  let links = null;

  if (appState === AppStates.NOTES) {
    links = (
      <button type="button" onClick={requestLogOut}>
        Log out
      </button>
    );
  } else if (appState === AppStates.LOGIN) {
    links = (
      <button type="button" onClick={requestSignUp}>
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
  requestSignUp: PropTypes.func.isRequired,
};

export default Navigation;
