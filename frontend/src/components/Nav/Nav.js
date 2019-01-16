import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./Nav.scss";

export default class Nav extends Component {
  render() {
    console.log('NAV',this.props)
    return (
      <div className="nav">
        <div onClick={this.props.auth.login} className="nav-link">
          <a href="#">Sign Up</a>
        </div>
        <div onClick={this.props.auth.login} className="nav-link">
          <a href="#">Sign In</a>
        </div>
        <div onClick={this.props.auth.logout} className="nav-link">
          <a href="#">Logout</a>
        </div>
        <div className="nav-link">
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
    );
  }
}
