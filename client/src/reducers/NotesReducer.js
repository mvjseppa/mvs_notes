import { GET_NOTES, DELETE_NOTE, CREATE_NOTE } from '../actions/NotesActions';

export default function (state = [], action) {
  console.log('action received:', action.type);

  switch (action.type) {
    case GET_NOTES:
      console.log(action.payload);
      if (!action.payload.data) {
        return [];
      }
      return action.payload.data.sort((a, b) => a.timestamp < b.timestamp);

    case DELETE_NOTE: {
      console.log(action.payload);
      const deletedId = action.payload.data.Attributes.id;
      return state.filter(note => note.id !== deletedId);
    }

    case CREATE_NOTE:
      return [action.payload.data, ...state];

    default:
      return state;
  }
}
