import React from 'react';
import PropTypes from 'prop-types';
import AppStates from './AppStates';

function Navigation({ appState, logOutUser }) {
  let links = null;

  if (appState === AppStates.NOTES) {
    links = (
      <button type="button" onClick={logOutUser}>
        Log out
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
  logOutUser: PropTypes.func.isRequired,
};

export default Navigation;
