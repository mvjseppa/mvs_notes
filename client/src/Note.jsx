import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import NoteData from './NoteData';
import AppStates from './AppStates';

export default class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleting: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.deleteNote(this.props.noteData.id);
  }

  deleteNote(id) {
    this.setState({ deleting: true });

    const {
      getToken, requestDelete, requestPage, apiUrl,
    } = this.props;

    getToken()
      .then((token) => {
        $.ajax({
          method: 'DELETE',
          url: apiUrl + id,
          headers: { Authorization: token },
        })
          .done(() => {
            requestDelete(id);
          })
          .fail((error) => {
            requestPage(AppStates.LOGIN, error.message);
          })
          .always(() => {
            this.setState({ deleting: false });
          });
      })
      .catch((error) => {
        requestPage(AppStates.LOGIN, error.message);
      });
  }

  render() {
    const { noteData } = this.props;

    let deleteButton = (
      <button
        className="note_delete"
        onClick={this.handleClick}
        type="button"
      >
        &#10005;
      </button>
    );

    if (this.state.deleting) {
      deleteButton = <div className="small_spinner" />;
    }

    const textLines = noteData.text.split('\n').map(
      (line, i) => (
        <p key={i}>
          {line}
        </p>
      ),
    );

    return (
      <div className="note" style={{ backgroundColor: noteData.color }}>
        <div className="note_controls">
          {deleteButton}
        </div>
        <div className="note_contents">
          {textLines}
        </div>
        <div className="tooltip">
          <span className="tooltiptext">
            {noteData.id}
            <br />
            {noteData.timestamp}
          </span>
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  getToken: PropTypes.func.isRequired,
  requestDelete: PropTypes.func.isRequired,
  requestPage: PropTypes.func.isRequired,
  apiUrl: PropTypes.string.isRequired,
  noteData: PropTypes.instanceOf(NoteData).isRequired,
};
