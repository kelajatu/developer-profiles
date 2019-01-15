import React, { Component } from 'react'
import Auth from '../auth/Auth';

class Callback extends Component {

  state = {
    redirect: false
  }

  componentDidMount() {
    const auth = new Auth();
    auth.handleAuthentication({...this.props});
    this.setState({ redirect: true })
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
}

export default Callback;