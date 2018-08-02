import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import registerServiceWorker from './registerServiceWorker';
import MvsNotesApp from './MvsNotesApp.js';

const apiUrl =
    'https://zvw0ce1n8f.execute-api.eu-central-1.amazonaws.com/dev/mvs-notes/',

    poolData = {
        'ClientId': '2hvp9c2sls7f0fq10p8u3t5bt2',
        'UserPoolId': 'eu-central-1_op50LtdMn'
    };

ReactDOM.render(
    <MvsNotesApp apiUrl={apiUrl} poolData={poolData}/>,
    document.getElementById('root')
);
registerServiceWorker();
