import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';


export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "dev-profiles.auth0.com",
    clientID: "vmrL9giX33pl1mkLLBojm2uAUOj14Ju1",
    redirectUri: "http://localhost:3000/callback",
    audience: "https://dev-profiles.auth0.com/userinfo",
    responseType: "token id_token",
    scope: "openid profile"
  });

  constructor() {
    this.login = this.login.bind(this);
  }

  login() {
    console.log('login ?')
    this.auth0.authorize();
  }

  handleAuthentication(props) {
    console.log(props)
    console.log(props.history)
    this.auth0.parseHash((err, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        console.log('handleAuthentication ?')
        let expiresAt = JSON.stringify((authResults.expiresIn) * 1000 + new Date().getTime());
        localStorage.setItem('access_token', authResults.accessToken);
        localStorage.setItem('id_token', authResults.idToken);
        localStorage.setItem('expires_at', expiresAt);
        props.history.push('/dashboard');
      } else if (err) {
        props.history.push('/');
      }
    })
  }

  isAuthenticated() {
    console.log('isAuthenticated ?')
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  logout(props) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    props.history.push('/');
  }

  getProfile() {
    if (localStorage.getItem("id_token")) {
      return jwtDecode(localStorage.getItem("id_token"))
    } else {
      return {status: 'No user'}
    }
  }
}
