import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNotes } from '../actions/NotesActions';
import Note from './Note';
import NoteCreator from './NoteCreator';

class NoteContainer extends React.Component {
  componentDidMount() {
    const { token, history, getNotes } = this.props;
    if (token === '') {
      history.push('/login');
    } else {
      getNotes(token);
      console.log('get notes triggered');
    }
  }

  render() {
    const { notes } = this.props;

    if (!notes || notes.length === 0) {
      console.log('loading notes...');
      return (
        <div id="user_data">
          <div className="large_spinner" />
        </div>
      );
    }

    console.log('rendering notes...', notes);

    const noteElements = notes.map(note => (
      <Note key={note.id} noteData={note} />
    ));

    return (
      <div id="user_data">
        <NoteCreator />
        { noteElements }
      </div>
    );
  }
}

function mapStateToProps({ notes, user }) {
  return { notes, token: user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getNotes }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);
