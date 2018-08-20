import { LOGIN_USER } from '../actions/UserActions';

export default function (state = '', action) {
  console.log('action received:', action.payload);

  switch (action.type) {
    case LOGIN_USER:
      return action.payload;

    default:
      return state;
  }
}
