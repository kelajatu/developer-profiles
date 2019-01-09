import React, { Component } from "react";
import "./Nav.scss";

export default class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <div className="nav-link">
          <a href="#">Sign Up</a>
        </div>
        <div className="nav-link">
          <a href="#">Sign In</a>
        </div>
      </div>
    );
  }
}
