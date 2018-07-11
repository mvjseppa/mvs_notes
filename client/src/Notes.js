import React from 'react';
import $ from 'jquery';

export default class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.authToken = props.authToken;
        this.state = { notes: [] };
    }

    componentDidMount() {
        this.getNotes();
    }

    getNotes() {
        $.ajax({
            method: 'GET',
            url: 'https://zvw0ce1n8f.execute-api.eu-central-1.amazonaws.com/dev/mvs-notes',
            headers: { Authorization: this.authToken},
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

        return <div>{ noteElements }</div>;
    }
}
