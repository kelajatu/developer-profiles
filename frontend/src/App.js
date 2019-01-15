import React, { Component, Fragment } from "react";
import { Route, withRouter, Switch } from "react-router-dom";

import Auth from './auth/Auth';
import Nav from "./components/nav/Nav";
import LandingPage from "./pages/landing-page/landingPage";
import PageUnauthorized from './pages/404/PageUnauthorized';
import PageNotFound from './pages/404/PageNotFound';
import UserDashboardContainer from './pages/user-dashboard/UserDashboardContainer';
import PublicFacingPage from './pages/main-page/PublicFacingPage';
import Callback from "./auth/Callback";

import { GlobalStyle } from "./global-styles/GlobalStyles";


// need to find a way to rerender when user logs in
const auth = new Auth();

class App extends Component {
  state = {
    auth
  }

  render() {
    console.log('CHECKKCKCKCKKADhcjksidvchb',this.props)
    return (
      <Fragment>
        <GlobalStyle />
        <Nav {...this.props} {...this.state} />
        <Switch>
          <Route exact path="/" render={props => <LandingPage {...props} {...this.state} /> } />
          <Route path="/dashboard" render={props => (
            this.state.auth.isAuthenticated() ? (
              <UserDashboardContainer {...props} {...this.state} />
              ) : (
              <PageUnauthorized {...props} {...this.state} />
            )
          )}/>
          <Route path="/callback" render={props => <Callback {...props} {...this.state} />  } />
          <Route path="/public" render={props => <PublicFacingPage {...props} {...this.state} />  } />
          <Route component={PageNotFound} />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(App);





{/*
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
*/}


// const Home = () => (
//   <div>
//     <BreadCrumbs />
//     <Nav />
//     <LandingPage />
//   </div>
// );

// const Usercard = () => (
//   <div>
//     <UserCard />
//   </div>
// );

// const Userprofile = () => (
//   <div>
//     <UserInitProfile />
//   </div>
// );

// const Billing = () => (
//   <div>
//     <h1>Billing Page</h1>
//   </div>
// );

// const CustomLink = ({ children, to, exact }) => (
//   <Route
//     path={to}
//     exact={exact}
//     children={({ match }) => (
//       <div className={match ? "active" : ""}>
//         {match ? "> " : ""}
//         <Link to={to}>{children}</Link>
//       </div>
//     )}
//   />
// );