import React from 'react';
import AppStates from './AppStates';

const Navigation = function Navigation({ appState, logOutUser }) {
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
};

export default Navigation;
