import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, Switch } from 'react-router-dom';
import NoteContainer from './NoteContainer';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ConfirmUserForm from './ConfirmUserForm';
import Navigation from './Navigation';
import { loadSession } from '../actions/UserActions';
import history from '../history';

class MvsNotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      passwd: '',
    };

    this.setAuthenticationDetails = this.setAuthenticationDetails.bind(this);
  }

  componentDidMount() {
    this.props.loadSession();
  }

  setAuthenticationDetails(email, passwd) {
    this.setState({
      email,
      passwd,
    });
  }

  render() {
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
              {this.props.message}
            </div>

            <Switch>
              <Route path="/login" component={LoginForm} />
              <Route path="/signup" component={SignUpForm} />
              <Route path="/" component={NoteContainer} />
            </Switch>

          </main>
          <footer />
        </div>
      </Router>
    );
  }
}


function mapStateToProps({ user }) {
  console.log(user);
  const message = user.error ? user.error.message : '';
  return {
    message,
    token: user.token,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loadSession }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MvsNotesApp);
