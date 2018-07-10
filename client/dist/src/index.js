import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//import loginSuccessCallback from './main.js';
import MvsNotesApp from './main.js';

//loginUser("mikko.v.seppala@gmail.com", "0.juuret", userPool, loginSuccessCallback);

ReactDOM.render(<MvsNotesApp />, document.getElementById('main'));
registerServiceWorker();
