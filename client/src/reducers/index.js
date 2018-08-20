import { combineReducers } from 'redux';
import NotesReducer from './NotesReducer';
import UserReducer from './UserReducers';

const reducers = combineReducers({
  notes: NotesReducer,
  user: UserReducer,
});

export default reducers;
