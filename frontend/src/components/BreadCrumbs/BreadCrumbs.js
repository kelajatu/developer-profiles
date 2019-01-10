import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import First from "./views/First";
import Second from "./views/Second";
import Third from "./views/Third";
import "./BreadCrumbs.scss";

class BreadCrumbs extends Component {
  state = {
    nav: [["/first", "HOME"]]
  };

  sayHello = () => {
    alert("hello");
  };

  addToNavBar = (path, displayName) => {
    this.setState({ nav: [...this.state.nav, [path, displayName]] }, () =>
      console.log(this.state.nav)
    );
  };

  rollBackNavBar = destination => {
    console.log("roll back to", destination);
    this.setState({ nav: this.state.nav.slice(0, destination + 1) });
  };

  render() {
    return (
      <Router>
        <div className="bread-nav">
          <NavBar nav={this.state.nav} rollBackNavBar={this.rollBackNavBar} />
          <br />
          <br />
          <Route
            className="item"
            path="/first"
            render={() => <First addToNavBar={this.addToNavBar} />}
          />
          <Route
            className="item"
            path="/second"
            render={() => <Second addToNavBar={this.addToNavBar} />}
          />
          <Route
            className="item"
            path="/third"
            render={() => <Third addToNavBar={this.addToNavBar} />}
          />
        </div>
      </Router>
    );
  }
}

export default BreadCrumbs;
