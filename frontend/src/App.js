import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import LandingPage from "./pages/LandingPage/landingPage";
import BreadCrumbs from "./components/BreadCrumbs/BreadCrumbs";
import UserCard from "./components/UserCard/UserCard";
import PublicFacingPage from "./pages/PublicFacingPage/PublicFacingPage";
import UserInitProfile from "./pages/EditProfileView/UserInitProfile";
import Auth from './components/Auth/Auth1'
import Callback from './components/Auth/Callback'
import Sucess from './components/Auth/Sucess.js'
import { AppDiv } from './App_styles'

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
      <AppDiv>
        <ul>
          <li>
            <CustomLink exact={true} to="/">Landing Page</CustomLink>
          </li>
          <li>
            <CustomLink to="/public">Public</CustomLink>
          </li>
          <li>
            <CustomLink to="/editprofile">Edit profile</CustomLink>
          </li>
          <li>
            <CustomLink to="/billing">Billing</CustomLink>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact component={Home} />
          {/* <Route path="/usercard" component={Usercard} /> */}
          <Route path='/public' component={PublicFacingPage} />
          <Route path='/editprofile' component={Userprofile} />
          {/* <Route path="/userprofile" component={Userprofile} /> */}
          <Route path="/billing" component={Billing} />
          <Route render={() => <div> Page does not exist. </div>} />
        </Switch>
      </AppDiv>
    );
  }
}

export default App;