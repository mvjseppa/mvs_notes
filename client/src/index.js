import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import './style.css';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers/index';
import MvsNotesApp from './components/MvsNotesApp';


ReactDOM.render(
  <Provider store={applyMiddleware(thunk, ReduxPromise)(createStore)(reducers)}>
    <MvsNotesApp />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
