import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import LandingPage from "./containers/landingPage";
import BreadCrumbs from "./components/BreadCrumbs/BreadCrumbs";
import UserCard from "./components/UserCard/UserCard";
import UserInitProfile from "./containers/UserInitProfile";

const Home = () => (
  <div>
    <BreadCrumbs />
    <Nav />
    <LandingPage />
  </div>
);

const Usercard = () => (
  <div>
    <UserCard />
  </div>
);

const Userprofile = () => (
  <div>
    <UserInitProfile />
  </div>
);

const Billing = () => (
  <div>
    <h1>Billing Page</h1>
  </div>
);

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link exact to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/usercard">User card</Link>
          </li>
          <li>
            <Link to="/userprofile">User profile</Link>
          </li>
          <li>
            <Link to="/billing">Billing</Link>
          </li>
        </ul>

        <Route path="/" exact component={Home} />
        <Route path="/usercard" component={Usercard} />
        <Route path="/userprofile" component={Userprofile} />
        <Route path="/billing" component={Billing} />

        {/* <BreadCrumbs />
        <Nav />
        <LandingPage />
        <UserCard />
        <UserInitProfile /> */}
      </div>
    );
  }
}

export default App;
