import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import NoteContainer from './NoteContainer';
import Navigation from './Navigation';
import TokenHandler from './TokenHandler';
import history from '../history';

function MvsNotesApp(props) {
  return (
    <Router history={history}>
      <div id="app">
        <header>
          <img src="logo.svg" height="96" widht="96" alt="Mvs-Notes logo" />
          <h1>
          Mvs Notes
          </h1>
        </header>
        <nav>
          <Route path="/" component={Navigation} />
        </nav>
        <main id="main">
          <div>
            {props.message}
          </div>

          <Switch>
            <Route
              path="/login"
              component={() => {
                window.location = 'https://mvs-notes.auth.eu-central-1.amazoncognito.com/login?response_type=token&client_id=7qad5k2nahbgrb86911mkfd887&redirect_uri=http://localhost:3000/token';
                return <div>Redirecting...</div>;
              }}
            />
            <Route path="/token" component={TokenHandler} />
            <Route path="/logout" component={() => <div>Logged out.</div>} />
            <Route path="/" component={NoteContainer} />
          </Switch>

        </main>
        <footer />
      </div>
    </Router>
  );
}

export default MvsNotesApp;
