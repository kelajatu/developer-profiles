import React, { Component } from "react";
import Nav from "./components/Nav";
import LandingPage from "./containers/landingPage";
import UserInitProfile from "./containers/UserInitProfile";


class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <LandingPage />
        <UserInitProfile />
      </div>
    );
  }
}

export default App;
