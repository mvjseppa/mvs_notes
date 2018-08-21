import React from 'react';

function Navigation({ history, location }) {
  if (location.pathname === '/') {
    return (
      <button
        type="button"
        onClick={() => {
          // requestLogOut();
          history.push('/login');
        }}
      >
        Log out
      </button>
    );
  }

  if (location.pathname === '/login') {
    return (
      <button
        type="button"
        onClick={() => {
          history.push('/signup');
        }}
      >
        Sign up
      </button>
    );
  }
  return null;
}

export default Navigation;
