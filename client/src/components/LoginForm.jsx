import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../actions/UserActions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: props.email,
      passwd: '',
      pending: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    console.log('loginform update:', this.props.token);
    if (this.props.token !== '') {
      this.setState({ pending: false });
      this.props.history.push('/');
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // this.props.setAuthenticationDetails(this.state.email, this.state.passwd);
    this.props.loginUser(this.state.email, this.state.passwd);
    this.setState({ pending: true });
  }

  /*
  loginUser() {

    const { requestPage } = this.props;
    requestPage(AppStates.LOADING, '');


    const cognitoUser = new CognitoUser(
      { Username: this.state.email, Pool: this.props.userPool },
    );

    const authDetails = new AuthenticationDetails(
      { Username: this.state.email, Password: this.state.passwd },
    );

    const callbacks = {
      onSuccess: (result) => {
        requestPage(AppStates.NOTES, '');
      },

      onFailure: (err) => {
        if (err.code === 'UserNotFoundException' || err.code === 'NotAuthorizedException') {
          requestPage(AppStates.LOGIN, 'Invalid username or password.');
        } else if (err.code === 'UserNotConfirmedException') {
          requestPage(AppStates.CONFIRM_USER, err.message);
        } else {
          requestPage(AppStates.LOGIN, err.message);
        }
      },

      mfaRequired: (codeDeliveryDetails) => {
        const verificationCode = prompt('Please input verification code', '');
        cognitoUser.sendMFACode(verificationCode, this);
        requestPage(AppStates.LOGIN, '');
      },
    };

    cognitoUser.authenticateUser(authDetails, callbacks);
  }
  */

  render() {
    if (this.state.pending) {
      return <div className="large_spinner" />;
    }

    return (
      <div id="login">
        <form onSubmit={this.handleSubmit} className="stacked_form">
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          <input type="password" name="passwd" onChange={this.handleChange} />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { token: user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ loginUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
