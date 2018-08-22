import {
  LOGIN_FAILED,
  TOKEN_ACQUIRED,
  LOGOUT_USER,
} from '../actions/UserActions';

export default function (state = '', action) {
  switch (action.type) {
    case TOKEN_ACQUIRED:
      return action.payload;

    case LOGIN_FAILED:
    case LOGOUT_USER:
      return '';

    default:
      return state;
  }
}
