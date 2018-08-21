import React from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmation: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.confirmUser();
  }

  confirmUser() {
    const { email, userPool, requestPage } = this.props;
    const userData = { Username: email, Pool: userPool };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(this.state.confirmation, true,
      (err, result) => {
        if (err) {
          // requestPage(AppStates.LOGIN, err.message);
          return;
        }
        alert(`call result: ${result}`);
        // requestPage(AppStates.NOTES, '');
      });
  }

  render() {
    return (
      <div id="confirm_user">
        <p>
          User account needs to be confirmed.
          Please enter the code that was sent to your e-mail address.
        </p>
        <form onSubmit={this.handleSubmit} className="stacked_form">
          <input type="text" name="confirmation" onChange={this.handleChange} />
          <input type="submit" value="Ok" />
        </form>
      </div>
    );
  }
}
