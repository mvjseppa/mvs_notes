import React from 'react';
import {AppStates} from './MvsNotesApp';

export default class Navigation extends React.Component
{
    render(){
        var links = null;

        if(this.props.appState === AppStates.NOTES){
            links = <a href="" onClick={this.props.logOutUser}>Log out</a>;
        }

        return <nav>{links}</nav>;
    }
}
