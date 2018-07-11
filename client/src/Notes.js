import React from 'react';
import $ from 'jquery';

export default class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = { notes: [] };
    }

    componentDidMount() {
        this.getNotes();
    }

    getNotes() {
        $.ajax({
            method: 'GET',
            url: 'https://zvw0ce1n8f.execute-api.eu-central-1.amazonaws.com/dev/mvs-notes',
            headers: { Authorization: this.props.authToken},
            success: function (result) {
                this.setState({notes: result});
            }.bind(this),
            error: function (error) {
                alert(error);
            }
        });
    }

    render() {
        var noteElements = this.state.notes.map(function(note, i){
            return (
                <div className="note" key={i}>
                    <div className="note_controls"></div>
                    <div className="note_contents">{note.text}</div>
                    <div className="note_id">{note.id}</div>
                </div>
            );
        })

        return (
            <div id="user_data">
            <NoteCreator authToken={this.props.authToken} createCallback={this.getNotes.bind(this)} />
            { noteElements }
            </div>
        );
    }
}

class NoteCreator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {newNote: ""};
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        var noteData={
            text: this.state.newNote,
            color: "0xABCDEF"
        };

        $.ajax({
            method: 'POST',
            url: 'https://zvw0ce1n8f.execute-api.eu-central-1.amazonaws.com/dev/mvs-notes',
            headers: { Authorization: this.props.authToken},
            data: JSON.stringify(noteData),
            success: function (result) {
                this.setState({newNote: ""});
                this.props.createCallback();
            }.bind(this),
            error: function (error) {
                console.log("post error" + this.props.authToken);
                alert(error);
            }.bind(this),
        });
    }

    render() {
        return(
            <div className="note">
            <form onSubmit={this.handleSubmit}>
                <ul className="no_bullet">
                    <li>
                        <textarea id="new_note"
                            className="text"
                            cols="40" rows ="8"
                            name="newNote"
                            onChange={this.handleChange}
                            value={this.state.newNote}></textarea></li>
                    <li><input type="submit" value="Save note" /></li>
                </ul>
            </form>
            </div>
        );
    }
}
