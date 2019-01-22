import React, { Component } from 'react'
import Auth from '../auth/Auth';

class Callback extends Component {
  componentDidMount() {
    const auth = new Auth();
    auth.handleAuthentication({...this.props});
  }

  render() {
    console.log('LOADINGGG')
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
}

export default Callback;