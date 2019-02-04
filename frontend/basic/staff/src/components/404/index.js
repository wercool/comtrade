import React from 'react';
import { withRouter } from 'react-router-dom';

class URLNoMath extends React.Component {
  render() {
    return (
      <div>
          <h2>No View Found for [<i>{ this.props.location.pathname }</i>]</h2>
      </div>
    );
  }
}

export default withRouter(URLNoMath);