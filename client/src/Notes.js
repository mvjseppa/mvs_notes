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
                url: this.props.apiUrl,
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
                    apiUrl={this.props.apiUrl}
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
                apiUrl={this.props.apiUrl}
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
                url: this.props.apiUrl+id,
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
                <button
                    className="note_delete"
                    onClick={this.handleClick.bind(this)}>&#10005;</button>

        if(this.state.deleting){
            deleteButton = <div className="small_spinner" />
        }

        var textLines = this.props.note_text.split("\n").map(
            (line, i) => {
                return ( <p key={i}>{line}</p> );
            }
        );

        return(
            <div className="note">
                <div className="note_controls">{deleteButton}</div>
                <div className="note_contents">{textLines}</div>
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

    handleSaveClick = event => {
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
                 url: this.props.apiUrl,
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

    handleCancelClick(){
        this.setState({editing: false});
    }

    handleCreateNewClick(){
        this.setState({editing: true});
    }

    render() {
        if(!this.state.editing){
            return(
                <div>
                <button className="new_note_button" onClick={this.handleCreateNewClick.bind(this)}>+</button>
                </div>
            );
        }

        return(
            <div className="note" id="note_edit">
                <textarea id="new_note"
                    rows ="8"
                    cols ="32"
                    name="newNote"
                    onChange={this.handleChange}
                    value={this.state.newNote}></textarea>
                <div>
                <button onClick={this.handleSaveClick.bind(this)}>&#10003;</button>
                <button onClick={this.handleCancelClick.bind(this)}>&#10005;</button>
                </div>
            </div>
        );
    }
}
