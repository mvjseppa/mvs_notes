import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import registerServiceWorker from './registerServiceWorker';
import MvsNotesApp from './MvsNotesApp.js';

//loginUser("mikko.v.seppala@gmail.com", "0.juuret", userPool, loginSuccessCallback);

ReactDOM.render(<MvsNotesApp />, document.getElementById('main'));
registerServiceWorker();
