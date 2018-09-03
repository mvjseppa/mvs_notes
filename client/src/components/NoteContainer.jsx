import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNotes } from '../actions/NotesActions';
import { loadSession } from '../actions/UserActions';
import Note from './Note';
import NoteCreator from './NoteCreator';

class NoteContainer extends React.Component {
  componentDidMount() {
    const { token, history } = this.props;
    if (!token || token === '') {
      this.props.loadSession(history);
    } else {
      this.props.getNotes(token);
    }
  }

  componentDidUpdate(prevProps) {
    const { token } = this.props;
    if (token && token !== prevProps.token) {
      this.props.getNotes(token);
    }
  }

  render() {
    const { notes, token } = this.props;

    if (!notes || !token || token === '') {
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
  return { notes, token: user.token };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getNotes, loadSession }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);
