import React from 'react';
import Note from './Note';
import NoteCreator from './NoteCreator';
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
                    note_data={note}
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
