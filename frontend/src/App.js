import React, { Component } from "react";
import Nav from "./components/Nav/Nav";
import LandingPage from "./containers/landingPage";
// import UserCard from "./components/UserCard/UserCard";
import UserInitProfile from "./containers/UserInitProfile";
import NewUserInitBilling from "./containers/NewUserInitBilling";
import Auth from './containers/Auth';

class App extends Component {

  checkIt = () => {
    const auth = new Auth();
    auth.login();
  }

  render() {
    return (
      <div>
        <Nav />
        <LandingPage />
        {/* <UserCard /> */}
        <UserInitProfile />
        <NewUserInitBilling />
        <button onClick={this.checkIt}>CLICKKKKK</button>
      </div>
    );
  }
}

export default App;
