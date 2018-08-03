import React from 'react';
import AppStates from './AppStates';

const Navigation = function Navigation({ appState, logOutUser }) {
  let links = null;

  if (appState === AppStates.NOTES) {
    links = (
      <a href="" onClick={ logOutUser }>
        Log out
      </a>
    );
  }

  return (
    <nav>
      {links}
    </nav>
  );
};

export default Navigation;
