import { GET_NOTES, DELETE_NOTE, CREATE_NOTE } from '../actions/NotesActions';

export default function (state = [], action) {
  console.log('action received:', action.type);

  switch (action.type) {
    case GET_NOTES:
      return action.payload.data.sort((a, b) => a.timestamp < b.timestamp);

    case DELETE_NOTE:
      return state.filter(note => note.id !== action.payload.id);

    case CREATE_NOTE:
      return [action.payload.data, ...state];

    default:
      return state;
  }
}
