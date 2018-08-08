import React from 'react';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import AppStates from './AppStates';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      passwd: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.signUpUser();
  }

  signUpUser() {
    const {
      requestPage, userPool, setMessage,
    } = this.props;
    const { email, passwd } = this.state;

    requestPage(AppStates.LOADING, '');

    console.log(`createUser ${email} ${passwd}`);

    const attributeEmail = new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    });

    userPool.signUp(email, passwd, [attributeEmail], null, (err, result) => {
      if (err) {
        setMessage(err.message);
        return;
      }

      // const uname = result.user.getUsername();
      requestPage(AppStates.LOGIN, 'Sign up ok. Please login.');
    });
  }

  render() {
    return (
      <div id="login">
        <h1>
          To sign up enter your email address and a password.
        </h1>
        <form onSubmit={this.handleSubmit} className="stacked_form">
          <input type="text" name="email" onChange={this.handleChange} />
          <input type="password" name="passwd" onChange={this.handleChange} />
          <input type="submit" value="Sign up" />
        </form>
      </div>
    );
  }
}
