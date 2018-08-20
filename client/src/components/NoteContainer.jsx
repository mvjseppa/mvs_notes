import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNotes } from '../actions/index';

import Note from './Note';
import NoteCreator from './NoteCreator';
import AppStates from './AppStates';

class NoteContainer extends React.Component {
  componentDidMount() {
    const { getToken, requestPage } = this.props;

    getToken()
      .then((token) => {
        this.props.getNotes(token);
      })
      .catch((error) => { requestPage(AppStates.LOGIN, error.message); });
  }

  render() {
    const {
      getToken, requestPage, notes,
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
        getToken={getToken}
        noteData={note}
        requestPage={requestPage}
      />
    ));

    return (
      <div id="user_data">
        <NoteCreator
          getToken={getToken}
          requestPage={requestPage}
        />
        { noteElements }
      </div>
    );
  }
}

function mapStateToProps({ notes }) {
  console.log(notes);
  return { notes };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getNotes }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer);
