import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNotes } from '../actions/NotesActions';
import Note from './Note';
import NoteCreator from './NoteCreator';

class NoteContainer extends React.Component {
  componentDidMount() {
    if (this.props.token === '') {
      this.props.history.push('/login');
    } else {
      this.props.getNotes(this.props.token);
    }
  }

  render() {
    const {
      requestPage, notes,
    } = this.props;

    console.log(notes);

    if (!notes) {
      return (
        <div id="user_data">
          <div className="large_spinner" />
        </div>
      );
    }

    const noteElements = notes.map(note => (
      <Note
        key={note.id}
        noteData={note}
        requestPage={requestPage}
      />
    ));

    return (
      <div id="user_data">
        <NoteCreator
          requestPage={requestPage}
        />
        { noteElements }
      </div>
    );
  }
}

function mapStateToProps({ notes, user }) {
  console.log(notes);
  return { notes, token: user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getNotes }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);
