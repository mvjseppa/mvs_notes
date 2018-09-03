import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../actions/UserActions';

class Navigation extends React.Component {
  render() {
    const { token } = this.props;
    if (token && token !== '') {
      return <Link to={'/logout'}>Logout</Link>;
    }

    return <Link to={'/login'}>Log in</Link>;
  }
}

function mapStateToProps({ user }) {
  return { token: user.token };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
