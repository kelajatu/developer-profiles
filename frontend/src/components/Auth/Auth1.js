import auth0 from 'auth0-js';
import history from '../../history/history';

const LOGIN_SUCESS_PAGE = '/secret';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'developer-profiles.auth0.com',
    clientID: 'LBZyt7JbkTarCv7Oh1pEktxWshcrglKN',
    redirectUri: 'http://localhost:3000/callback',
    audience: "developer-profiles.auth0.com/userinfo",    
    responseType: 'token id_token',
    scope: 'openid'
  });
  
  accessToken;
  idToken;
  expiresAt;
  
  constructor() {
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.handleAuthentication = this.handleAuthentication.bind(this);
      this.isAuthenticated = this.isAuthenticated.bind(this);
      this.getAccessToken = this.getAccessToken.bind(this);
      this.getIdToken = this.getIdToken.bind(this);
      this.renewSession = this.renewSession.bind(this);
    }
    
    login() {
        console.log('login')
        this.auth0.authorize();
    }

    handleAuthentication() {
        console.log('handleAuth')
        this.auth0.parseHash((err, authResult) => {
            console.log("authResult", authResult)
            if (authResult && authResult.accessToken && authResult.idToken) {
                 console.log(authResult,authResult.accessToken, authResult.idToken )                                                
                let expiresAt = JSON.stringify((authResult.expiresIn) * 1000 + new Date().getTime())
                localStorage.setItem("access_token", authResult.accessToken)
                localStorage.setItem('id_token', authResult.idToken)
                localStorage.setItem('expires_at', expiresAt)
                history.replace('/sucess');
                this.setSession(authResult);
            } else if (err) {

                history.replace('/home');
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }
    
    getAccessToken() {
        console.log('getAccessToken')
        return this.accessToken;
    }
    
    getIdToken() {
        console.log('getIfToken')
        return this.idToken;
    }
    
    setSession(authResult) {
        console.log('setSession')
        // Set isLoggedIn flag in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        
        // Set the time that the access token will expire at
        let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        this.expiresAt = expiresAt;
        
        // navigate to the home route
        history.replace('/home');
    }
    
    renewSession() {
        console.log('renewSession')
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                this.logout();
                console.log(err);
                alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
            }
        });
    }
    
    logout() {
        console.log('logout')
        // Remove tokens and expiry time
        this.accessToken = null;
        this.idToken = null;
        this.expiresAt = 0;
        
        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');
        
        // navigate to the home route
        history.replace('/home');
    }
    
    isAuthenticated() {
        console.log('isAuthenticated?')
        // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }

}