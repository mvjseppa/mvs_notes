export const LOAD_SESSION = 'LOAD_SESSION';
export const TOKEN_ACQUIRED = 'TOKEN_ACQUIRED';
export const LOGOUT_USER = 'LOGOUT_USER';

export function tokenAcquired(token, history) {
  return (dispatch) => {
    localStorage.setItem('token', token);
    history.push('/');
    dispatch({ type: TOKEN_ACQUIRED, payload: token });
  };
}

export function loadSession(history) {
  console.log('loading session from storage...');
  const token = localStorage.getItem('token');
  if (token && token !== '') {
    return (dispatch) => {
      dispatch(tokenAcquired(token, history));
    };
  }

  console.log('No token in storage!!');
  history.push('/login');
  return { type: LOAD_SESSION };
}

export function logoutUser(history) {
  localStorage.clear();
  return { type: LOGOUT_USER };
}
