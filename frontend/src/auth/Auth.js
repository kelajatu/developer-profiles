import auth0 from "auth0-js";
import jwtDecode from "jwt-decode";
import axios from "axios";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "dev-profiles.auth0.com",
    clientID: "vmrL9giX33pl1mkLLBojm2uAUOj14Ju1",
    redirectUri: "http://localhost:3000/callback",
    audience: "https://dev-profiles.auth0.com/userinfo",
    responseType: "token id_token",
    scope: "openid profile email"
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    console.log("login ?");
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
            axios.post('http://localhost:7000/users/new', userInfo)
            .then(res => {
              console.log('RETURN DATA', res.data)
            })
            .catch(err => console.log(err));
            props.history.push('/dashboard');
        }
      } else if (err) {
        props.history.push("/");
      }
    });
  }

  isAuthenticated() {
    // console.log("isAuthenticated ?");
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.auth0.logout({
      returnTo: 'https://ecstatic-dev-profiles.netlify.com',
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
