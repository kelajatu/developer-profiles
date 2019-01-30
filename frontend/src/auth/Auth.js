import auth0 from "auth0-js";
import jwtDecode from "jwt-decode";
import axios from "axios";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "dev-profiles.auth0.com",
    clientID: "vmrL9giX33pl1mkLLBojm2uAUOj14Ju1",
    //NEEDS TO BE LOCAL HOST ENV
    redirectUri: process.env.REACT_APP_AUTH_REDIRECT,
    audience: "https://dev-profiles.auth0.com/userinfo",
    responseType: "token id_token",
    scope: "openid profile email"
  });

  login = () => {
    this.auth0.authorize();
  }

  handleAuthentication = props => {
    this.auth0.parseHash((err, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        let expiresAt = JSON.stringify(
          authResults.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem("access_token", authResults.accessToken);
        localStorage.setItem("id_token", authResults.idToken);
        localStorage.setItem("expires_at", expiresAt);
        const user = this.getProfile();
        let userInfo;
        switch(user) {
          case user.given_name:
            userInfo = {
              first_name: user.given_name || "",
              last_name: user.family_name || "",
              email: user.email
            }
          break;
          case user.name:
            let userArrHolder = user.name.split(' ');
            userInfo = {
              first_name: userArrHolder[0] || "",
              last_name: userArrHolder[1] || "",
              email: user.email
            }
            break;
            default:
            userInfo = {
              email: user.email,
              first_name: "",
              last_name: "",
            }
        }
        if(!userInfo.email){
          props.history.push("/");
          console.log("error getting email");
        } else {
            axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/new`, userInfo)
            .then(res => {
              // check if user is new or returning
              // db returns .first() user when user is returning, which is an object
              // db returns users arr with [0] index being new user when user is new
              if (Array.isArray(res.data)) {
                props.history.push('/dashboard/new');
              } else if (res.data) {
                props.history.push('/dashboard');
              }
            })
            .catch(err => console.log(err));
        }
      } else if (err) {
        props.history.push("/");
      }
    });
  }

  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.auth0.logout({
      returnTo: process.env.REACT_APP_AUTH_REDIRECT,
      clientID: 'vmrL9giX33pl1mkLLBojm2uAUOj14Ju1'
    });
  }

  getProfile = () => {
    if (localStorage.getItem("id_token")) {
      return jwtDecode(localStorage.getItem("id_token"));
    } else {
      return { status: "No user" };
    }
  }
}
