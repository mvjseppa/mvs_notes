import { GET_NOTES, DELETE_NOTE, CREATE_NOTE } from '../actions/NotesActions';

export default function (state = [], action) {
  console.log('action received:', action.payload);

  switch (action.type) {
    case GET_NOTES:
      return action.payload.data.sort((a, b) => a.timestamp < b.timestamp);

    case DELETE_NOTE:
      return state;

    case CREATE_NOTE:
      return [action.payload.data, ...state];

    default:
      return state;
  }
}
