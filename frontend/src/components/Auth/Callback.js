import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth from './Auth1';

class Callback extends Component {
    async componentDidMount() {
        await this.props.auth.handleAuthentication();
        this.props.history.replace('/');
    }

    render() {
        return (
          <p>Loading profile...</p>
        );
    }
}

export default withRouter(Callback);