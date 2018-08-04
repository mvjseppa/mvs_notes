import React from 'react';
import $ from 'jquery';

export default class Note extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            deleting: false
        };
    }

    handleClick() {
        this.deleteNote(this.props.note_data.id);
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

        var textLines = this.props.note_data.text.split("\n").map(
            (line, i) => {
                return ( <p key={i}>{line}</p> );
            }
        );

        return(
            <div className="note" style={{backgroundColor: this.props.note_data.color}}>
                <div className="note_controls">{deleteButton}</div>
                <div className="note_contents">{textLines}</div>
                <div className="tooltip">
                    <span className="tooltiptext">{this.props.note_data.id}, {this.props.note_data.timestamp}</span>
                </div>
            </div>
        );
    }
}
