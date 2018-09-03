import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../actions/UserActions';

class TokenHandler extends React.Component {
  componentDidMount() {
    this.props.logoutUser(this.props.history);
  }

  render() {
    return (
      <div>
        Logged out.
      </div>);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logoutUser }, dispatch);
}

export default connect(null, mapDispatchToProps)(TokenHandler);
