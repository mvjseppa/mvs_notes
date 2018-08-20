import { combineReducers } from 'redux';
import NotesReducer from './NotesReducer';

const reducers = combineReducers({ notes: NotesReducer });

export default reducers;
