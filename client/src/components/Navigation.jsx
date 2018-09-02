import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../actions/UserActions';

class Navigation extends React.Component {
  render() {
    if (this.props.location.pathname === '/') {
      return (
        <button
          type="button"
          onClick={() => {
            this.props.logoutUser();
          }}
        >
          Log out
        </button>
      );
    }

    if (this.props.location.pathname === '/logout') {
      return (
        <button
          type="button"
          onClick={() => {
            this.props.history.push('/login');
          }}
        >
          Log in
        </button>
      );
    }
    return null;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(Navigation);
