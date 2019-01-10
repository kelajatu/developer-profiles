import React, { Component } from "react";
import Nav from "./components/Nav/Nav";
import LandingPage from "./containers/landingPage";
import BreadCrumbs from "./components/BreadCrumbs/BreadCrumbs";
// import UserInitProfile from "./containers/UserInitProfile";

class App extends Component {
  render() {
    return (
      <div>
        <BreadCrumbs />
        <Nav />
        <LandingPage />
        {/* // <UserInitProfile /> */}
      </div>
    );
  }
}

export default App;
