import React, { Component } from "react";
import {
  Route,
  Link,
  Redirect,
  Switch,
  BrowserRouter as Router
} from "react-router-dom";
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

const CustomLink = ({ children, to, exact }) => (
  <Route
    path={to}
    exact={exact}
    children={({ match }) => (
      <div className={match ? "active" : ""}>
        {match ? "> " : ""}
        <Link to={to}>{children}</Link>
      </div>
    )}
  />
);

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <CustomLink exact={true} to="/">
              Home
            </CustomLink>
          </li>
          <li>
            <CustomLink to="/usercard">User card</CustomLink>
          </li>
          <li>
            <CustomLink to="/userprofile">User profile</CustomLink>
          </li>
          <li>
            <CustomLink to="/billing">Billing</CustomLink>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/usercard" component={Usercard} />
          <Route path="/userprofile" component={Userprofile} />
          <Route path="/billing" component={Billing} />
          <Route render={() => <div> Page does not exist. </div>} />
        </Switch>
      </div>
    );
  }
}

export default App;
