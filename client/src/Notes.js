import React from 'react';
import $ from 'jquery';

export default class NoteContainer extends React.Component {
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
                result.sort(function(a, b){return a.timestamp < b.timestamp});
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
                <Note
                    key={i}
                    authToken={this.props.authToken}
                    note_text={note.text}
                    note_id={note.id}
                    note_time={note.timestamp}
                    updateRequest={this.getNotes.bind(this)} />
            );
        }.bind(this))

        return (
            <div id="user_data">
            <NoteCreator
                authToken={this.props.authToken}
                updateRequest={this.getNotes.bind(this)}
            />
            { noteElements }
            </div>
        );
    }
}

class Note extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClick() {
        this.deleteNote(this.props.note_id);
    }

    deleteNote(id) {
        console.log("deleting: " + id);

        $.ajax({
            method: 'DELETE',
            url: 'https://zvw0ce1n8f.execute-api.eu-central-1.amazonaws.com/dev/mvs-notes/'+id,
            headers: { Authorization: this.props.authToken},
            data: '{blah: "blah"}',
            success: function (result) {
                console.log("here!");
                this.props.updateRequest();
            }.bind(this),
            error: function (error) {
                alert(JSON.stringify(error));
            }
        });
    }

    render() {
        return(
            <div className="note">
                <div className="note_controls">
                    <button className="note_delete" onClick={this.handleClick.bind(this)}>x</button>
                </div>
                <div className="note_contents">{this.props.note_text}</div>

                <div className="tooltip">
                    <span className="tooltiptext">{this.props.note_id}, {this.props.note_time}</span>
                </div>
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

        if(this.state.newNote.length === 0){
            return;
        }

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
                this.props.updateRequest();
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
            <form onSubmit={this.handleSubmit} className="stacked_form">
                <textarea id="new_note"
                    className="text"
                    cols="40" rows ="8"
                    name="newNote"
                    onChange={this.handleChange}
                    value={this.state.newNote}></textarea>
                <input type="submit" value="Save note" />
            </form>
            </div>
        );
    }
}
