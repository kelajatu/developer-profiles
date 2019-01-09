import React, { Component } from "react";
import Nav from "./components/Nav/Nav";
import LandingPage from "./containers/landingPage";
import BreadCrumbs from "./components/BreadCrumbs/BreadCrumbs";

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <LandingPage />
      </div>
    );
  }
}

export default App;
