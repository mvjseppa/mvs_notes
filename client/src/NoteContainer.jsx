import React from 'react';
import $ from 'jquery';
import Note from './Note';
import NoteCreator from './NoteCreator';
import AppStates from './AppStates';

export default class NoteContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      notes: [],
    };

    this.getNotes = this.getNotes.bind(this);
    this.requestDelete = this.requestDelete.bind(this);
  }

  componentDidMount() {
    this.getNotes();
  }

  getNotes() {
    if (this.state.notes === []) {
      this.setState({ loading: true });
    }

    const { apiUrl, getToken, requestPage } = this.props;

    getToken()
      .then((token) => {
        $.ajax({
          method: 'GET',
          url: apiUrl,
          headers: { Authorization: token },
        })
          .done((result) => {
            result.sort((a, b) => a.timestamp < b.timestamp);
            this.setState({ notes: result });
          })
          .fail((error) => {
            requestPage(AppStates.LOGIN, error.message);
          })
          .always(() => {
            this.setState({ loading: false });
          });
      })
      .catch((error) => { requestPage(AppStates.LOGIN, error.message); });
  }

  requestDelete(noteId) {
    const newNotes = this.state.notes.filter(note => note.id !== noteId);
    this.setState({ notes: newNotes });
  }

  render() {
    const { apiUrl, getToken, requestPage } = this.props;

    if (this.state.loading) {
      return (
        <div id="user_data">
          <div className="large_spinner" />
        </div>
      );
    }

    const noteElements = this.state.notes.map(note => (
      <Note
        key={note.id}
        apiUrl={apiUrl}
        getToken={getToken}
        noteData={note}
        requestPage={requestPage}
        requestDelete={this.requestDelete}
        updateRequest={this.getNotes}
      />
    ));

    return (
      <div id="user_data">
        <NoteCreator
          apiUrl={apiUrl}
          getToken={getToken}
          requestPage={requestPage}
          updateRequest={this.getNotes}
        />
        { noteElements }
      </div>
    );
  }
}
