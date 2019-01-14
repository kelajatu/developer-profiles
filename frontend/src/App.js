import React, { Component } from "react";
import Nav from "./components/Nav/Nav";
import LandingPage from "./containers/landingPage";
import BreadCrumbs from "./components/BreadCrumbs/BreadCrumbs";
import UserCard from "./components/UserCard/UserCard";
import UserInitProfile from "./containers/UserInitProfile";
import Auth from './components/Auth/Auth1'

const auth = new Auth()

class App extends Component {
  componentDidMount() {
    // const { renewSession } = this.props.auth;
    if (localStorage.getItem('isLoggedIn') === 'true') {
      auth.renewSession();
    }
    // this.state.auth = new Auth()
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    auth.login();
  }

  logout() {
    auth.logout();
  }

  clickHandler(e){
    const auth = new Auth()
    auth.login();
  }

  render() {
      // const { isAuthenticated } = this.props.auth;
      return (
      <div>
        <button onClick={() => {
          this.clickHandler()
        }}>LOGIN</button>
        {/* <div>

            <button
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </button>
            {
              !auth.isAuthenticated() && (
                  <button

                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </button>
                )
            }
            {
              auth.isAuthenticated() && (
                  <button

                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </button>
                )
            }

      </div> */}
        {/* <BreadCrumbs />
        <Nav />
        <LandingPage />
        <UserCard />
        <UserInitProfile /> */}
      </div>
    )
  }
}

export default App;
