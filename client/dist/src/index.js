import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {CognitoUserPool} from 'amazon-cognito-identity-js';
import loginUser from './loginUser';
import loginSuccessCallback from './main.js';


var poolData = {
    UserPoolId : 'eu-central-1_op50LtdMn',
    ClientId : '2hvp9c2sls7f0fq10p8u3t5bt2'
};

var userPool = new CognitoUserPool(poolData);

loginUser("mikko.v.seppala@gmail.com", "0.juuret", userPool, loginSuccessCallback);

//ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
