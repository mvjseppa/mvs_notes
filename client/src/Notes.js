import React from 'react';
import $ from 'jquery';

export default class NoteContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            notes: []
        };
    }

    componentDidMount() {
        this.getNotes();
    }

    getNotes() {
        if(this.state.notes===[]){
            this.setState({loading: true});
        }

        this.props.getToken()
        .then((token) => {
            $.ajax({
                method: 'GET',
                url: 'https://zvw0ce1n8f.execute-api.eu-central-1.amazonaws.com/dev/mvs-notes',
                headers: { Authorization: token},
            })
            .done((result) => {
                result.sort(function(a, b){return a.timestamp < b.timestamp});
                this.setState({notes: result});
            })
            .fail((error) => {
                console.log(JSON.stringify(error));
                this.props.requestLoginPage();
            })
            .always(() => {
                this.setState({loading: false});
            });
        })
        .catch((error) => {this.props.requestLoginPage()});
    }

    render() {

        if(this.state.loading){
            return <div id="user_data"><div className="large_spinner" /></div>
        }

        var noteElements = this.state.notes.map( (note, i) => {
            return (
                <Note
                    key={i}
                    getToken={this.props.getToken}
                    note_text={note.text}
                    note_id={note.id}
                    note_time={note.timestamp}
                    requestLoginPage={this.props.requestLoginPage}
                    updateRequest={this.getNotes.bind(this)} />
            );
        } );

        return (
            <div id="user_data">
            <NoteCreator
                getToken={this.props.getToken}
                requestLoginPage={this.props.requestLoginPage}
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
        this.state = {
            deleting: false
        };
    }

    handleClick() {
        this.deleteNote(this.props.note_id);
    }

    deleteNote(id) {
        this.setState({deleting: true});

        this.props.getToken()
        .then((token) => {
            $.ajax({
                method: 'DELETE',
                url: 'https://zvw0ce1n8f.execute-api.eu-central-1.amazonaws.com/dev/mvs-notes/'+id,
                headers: { Authorization: token},
            })
            .done((result) => {
                this.props.updateRequest();
            })
            .fail((error) => {
                console.log(JSON.stringify(error));
                this.props.requestLoginPage();
            })
            .always(() => {
                this.setState({deleting: false});
            });
        })
        .catch((error) => {
            this.props.requestLoginPage();
        });
    }

    render() {

        var deleteButton =
                <button className="note_delete" onClick={this.handleClick.bind(this)}>x</button>

        if(this.state.deleting){
            deleteButton = <div className="small_spinner" />
        }

        return(
            <div className="note">
                <div className="note_controls">{deleteButton}</div>
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
        this.state = {
            editing: false,
            newNote: ""
        };
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

         this.props.getToken()
         .then((token) => {
             $.ajax({
                 method: 'POST',
                 url: 'https://zvw0ce1n8f.execute-api.eu-central-1.amazonaws.com/dev/mvs-notes',
                 headers: { Authorization: token},
                 data: JSON.stringify(noteData),
             })
             .done((result) => {
                 this.setState({newNote: "", editing: false});
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

    handleCreateClick(){
        this.setState({editing: true});
    }

    render() {
        if(!this.state.editing){
            return <button className="new_note_button" onClick={this.handleCreateClick.bind(this)}>New note</button>
        }

        return(
            <div className="note">
            <form onSubmit={this.handleSubmit} className="stacked_form">
                <textarea id="new_note"
                    className="text"
                    rows ="8"
                    name="newNote"
                    onChange={this.handleChange}
                    value={this.state.newNote}></textarea>
                <input type="submit" value="Save note" />
            </form>
            </div>
        );
    }
}
