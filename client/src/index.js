import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import registerServiceWorker from './registerServiceWorker';
import MvsNotesApp from './MvsNotesApp.js';

ReactDOM.render(<MvsNotesApp />, document.getElementById('root'));
registerServiceWorker();
