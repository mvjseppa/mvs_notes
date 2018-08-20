import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import './style.css';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers/index';
import MvsNotesApp from './components/MvsNotesApp';

const apiUrl = 'https://zvw0ce1n8f.execute-api.eu-central-1.amazonaws.com/dev/mvs-notes/';

const poolData = {
  ClientId: '2hvp9c2sls7f0fq10p8u3t5bt2',
  UserPoolId: 'eu-central-1_op50LtdMn',
};

ReactDOM.render(
  <Provider store={applyMiddleware(ReduxPromise)(createStore)(reducers)}>
    <MvsNotesApp apiUrl={apiUrl} poolData={poolData} />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
