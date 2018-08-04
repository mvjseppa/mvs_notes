import React from 'react';
import PropTypes from 'prop-types';
import NoteData from './NoteData';
import $ from 'jquery';

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
      getToken, updateRequest, requestLoginPage, apiUrl,
    } = this.props;

    getToken()
      .then((token) => {
        $.ajax({
          method: 'DELETE',
          url: apiUrl + id,
          headers: { Authorization: token },
        })
          .done(() => {
            updateRequest();
          })
          .fail((error) => {
            console.log(JSON.stringify(error));
            requestLoginPage();
          })
          .always(() => {
            this.setState({ deleting: false });
          });
      })
      .catch(() => {
        requestLoginPage();
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
  updateRequest: PropTypes.func.isRequired,
  requestLoginPage: PropTypes.func.isRequired,
  apiUrl: PropTypes.string.isRequired,
  noteData: PropTypes.instanceOf(NoteData).isRequired,
};
