import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth from './Auth1';

class Success extends Component {
  render() {
    return (
      <p>SUCESS!</p>
    );
  }
}

export default withRouter(Success);