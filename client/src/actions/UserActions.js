import history from '../history';

export const LOAD_SESSION = 'LOAD_SESSION';
export const TOKEN_ACQUIRED = 'TOKEN_ACQUIRED';
export const LOGOUT_USER = 'LOGOUT_USER';

export function tokenAcquired(token) {
  return (dispatch) => {
    localStorage.setItem('token', token);
    history.push('/');
    dispatch({ type: TOKEN_ACQUIRED, payload: token });
  };
}

export function loadSession() {
  console.log('loading session from storage...');
  const token = localStorage.getItem('token');
  if (token && token !== '') {
    return (dispatch) => {
      dispatch(tokenAcquired(token));
    };
  }

  console.log('No token in storage!!');
  history.push('/login');
  return { type: LOAD_SESSION };
}

export function logoutUser() {
  localStorage.clear();
  history.push('/logout');
  return { type: LOGOUT_USER };
}
