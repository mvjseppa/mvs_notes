import {
  REQUEST_LOGIN,
  LOGIN_FAILED,
  TOKEN_ACQUIRED,
  LOGOUT_USER,
} from '../actions/UserActions';

const initState = {
  token: '',
  pending: false,
  error: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        token: '',
        pending: true,
        error: null,
      };

    case TOKEN_ACQUIRED:
      return {
        token: action.payload,
        pending: false,
        error: null,
      };

    case LOGIN_FAILED:
      return {
        token: '',
        pending: false,
        error: action.payload,
      };

    case LOGOUT_USER:
      return {
        token: '',
        pending: false,
        error: null,
      };

    default:
      return state;
  }
}
