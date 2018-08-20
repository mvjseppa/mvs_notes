import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { deleteNote } from '../actions/index';

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleting: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { deleteNote, noteData } = this.props;
    deleteNote(noteData.id);
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
  requestPage: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteNote }, dispatch);
}

export default connect(null, mapDispatchToProps)(Note);
