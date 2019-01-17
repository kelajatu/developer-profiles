import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import "./Nav.scss";

export default class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <div onClick={this.props.auth.login} className="nav-link">
          <a href="/public">View Profiles</a>
        </div>
        {this.props.auth.isAuthenticated() ? 
            <Fragment>
                <div className="nav-link">
                  <Link to="/dashboard">Dashboard</Link>
                </div>
                <div onClick={() => this.props.auth.logout({...this.props})} className="nav-link">
                  <a href="/">Logout</a>
                </div>
            </Fragment>
        : <div onClick={this.props.auth.login} className="nav-link">Sign Up/Sign In</div>}
      </div>
    );
  }
};