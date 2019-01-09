import React, { Component } from "react";
import Nav from "./components/Nav";
import LandingPage from "./containers/landingPage";


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
