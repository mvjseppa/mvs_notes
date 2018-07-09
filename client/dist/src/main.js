import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

var notes = [];

class Notes extends React.Component {
    render() {

        var noteList = notes.map(function(note, i){
            return (
                <div className="note" key={i}>
                    <div className="note_controls"></div>
                    <div className="note_contents">{note.text}</div>
                    <div className="note_id">{note.id}</div>
                </div>
            );
        })

        return <div>{ noteList }</div>;
    }
}

function getNotes(authToken) {
    $.ajax({
        method: 'GET',
        url: 'https://zvw0ce1n8f.execute-api.eu-central-1.amazonaws.com/dev/mvs-notes',
        headers: { Authorization: authToken},
        success: function (result) {
            //alert(JSON.stringify(result));
            notes = result;

            ReactDOM.render(
                <Notes />,
                document.getElementById('main')
            );

        },
        error: function (error) {
            alert(error);
        }
    });
}

function loginSuccessCallback(result) {
    var authToken = result.getIdToken().getJwtToken();
    console.log(authToken);
    notes = getNotes(authToken);
}

function createUserCallback(err, result)
{
    if (err) {
        alert(err);
        return;
    }
    var uname = result.user.getUsername();
    console.log('user name is ' + uname);

    if(uname.length > 0){
        $('#confirm_user_link').trigger('click');
        $('#email').val(uname);
    }
    else{
        $('#email').val("");
    }
    $('#passwd').val("");
}

export default loginSuccessCallback;
