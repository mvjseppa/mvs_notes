import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import { tokenAcquired } from '../actions/UserActions';

class TokenHandler extends React.Component {
  constructor(props) {
    super(props);

    const tokens = queryString.parse(this.props.location.hash);
    console.log(tokens);
    this.props.tokenAcquired(tokens.id_token);
  }

  render() {
    return (
      <div>
        Redirecting...
      </div>);
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ tokenAcquired }, dispatch);
}

export default connect(null, mapDispatchToProps)(TokenHandler);
