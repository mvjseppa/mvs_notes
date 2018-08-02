import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import registerServiceWorker from './registerServiceWorker';
import MvsNotesApp from './MvsNotesApp.js';

const apiUrl =
    'https://zvw0ce1n8f.execute-api.eu-central-1.amazonaws.com/dev/mvs-notes/';

ReactDOM.render(<MvsNotesApp apiUrl={apiUrl}/>, document.getElementById('root'));
registerServiceWorker();
