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

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication(props) {
    this.auth0.parseHash((err, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        let expiresAt = JSON.stringify(
          authResults.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem("access_token", authResults.accessToken);
        localStorage.setItem("id_token", authResults.idToken);
        localStorage.setItem("expires_at", expiresAt);
        const user = this.getProfile();
        const userInfo = {
          first_name: user.given_name || "",
          last_name: user.family_name || "",
          email: user.email
        }
        if(user.email === null){
          // send warning or something?
          console.log("YO! there isn't an email on this object however you choose to sign in. you need that.")
        } else {
          ///NEEDS TO BE LOCAL HOST ENV
            axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/new`, userInfo)
            .then(res => {
              props.history.push('/dashboard');
            })
            .catch(err => console.log(err));
        }
      } else if (err) {
        props.history.push("/");
      }
    });
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  // renew session for current logged in users
  // renewSession() {
  //   this.auth0.checkSession({}, (err, authResult) => {
  //      if (authResult && authResult.accessToken && authResult.idToken) {
  //        this.setSession(authResult);
  //      } else if (err) {
  //        this.logout();
  //        console.log(err);
  //        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
  //      }
  //   });
  // }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.auth0.logout({
      returnTo: process.env.REACT_APP_AUTH_REDIRECT,
      clientID: 'vmrL9giX33pl1mkLLBojm2uAUOj14Ju1'
    });
  }

  getProfile() {
    if (localStorage.getItem("id_token")) {
      return jwtDecode(localStorage.getItem("id_token"));
    } else {
      return { status: "No user" };
    }
  }
}
