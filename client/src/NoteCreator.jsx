import React from 'react';
import $ from 'jquery';

export default class NoteCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      color: '#A0C000',
      newNote: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleColorClick = this.handleColorClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleCreateNewClick = this.handleCreateNewClick.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    console.log(event.target.id);
    console.log(color);
    this.setState({ color });
  }

  handleSaveClick(event) {
    event.preventDefault();

    if (this.state.newNote.length === 0) {
      return;
    }

    const noteData = {
      text: this.state.newNote,
      color: this.state.color,
    };

    this.props.getToken()
      .then((token) => {
        $.ajax({
          method: 'POST',
          url: this.props.apiUrl,
          headers: { Authorization: token },
          data: JSON.stringify(noteData),
        })
          .done((result) => {
            this.setState({ newNote: '', editing: false });
            this.props.updateRequest();
          })
          .fail((error) => {
            console.log(JSON.stringify(error));
            this.props.requestLoginPage();
          });
      })
      .catch((error) => {
        this.props.requestLoginPage();
      });
  }

  handleCancelClick() {
    this.setState({ editing: false });
  }

  handleCreateNewClick() {
    this.setState({ editing: true });
  }

  render() {
    if (!this.state.editing) {
      return (
        <div>
          <button className="new_note_button" type="button" onClick={this.handleCreateNewClick}>
            +
          </button>
        </div>
      );
    }

    return (
      <div className="note" id="note_edit" style={{ backgroundColor: this.state.color }}>
        <textarea
          id="new_note"
          rows="8"
          cols="32"
          name="newNote"
          onChange={this.handleChange}
          value={this.state.newNote}
        />
        <div>
          <button id="green_button" type="button" style={{ backgroundColor: '#00C0A0' }} className="color_button" onClick={this.handleColorClick} />
          <button id="yellow_button" type="button" style={{ backgroundColor: '#A0C000' }} className="color_button" onClick={this.handleColorClick} />
          <button id="red_button" type="button" style={{ backgroundColor: '#C01080' }} className="color_button" onClick={this.handleColorClick} />

          <button type="button" onClick={this.handleSaveClick}>
            &#10003;
          </button>
          <button type="button" onClick={this.handleCancelClick}>
            &#10005;
          </button>
        </div>
      </div>
    );
  }
}
