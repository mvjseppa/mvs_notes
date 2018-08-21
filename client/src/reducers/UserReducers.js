import { LOGIN_USER, LOGOUT_USER, LOAD_SESSION } from '../actions/UserActions';

export default function (state = '', action) {
  switch (action.type) {
    case LOGIN_USER:
      return action.payload;

    case LOGOUT_USER:
      return '';

    case LOAD_SESSION:
      console.log('LOAD_SESSION action received:', action.payload);
      return action.payload;

    default:
      return state;
  }
}
