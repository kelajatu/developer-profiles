// import React, { Component } from "react";
// import Nav from "../Nav/Nav";
// import LandingPage from "./containers/landingPage";
// import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
// import UserCard from "../UserCard/UserCard";
// import UserInitProfile from "./containers/UserInitProfile";
// import Auth from './Auth1'
// import Callback from './Callback'
// import Sucess from './Sucess.js'
// import { Route } from 'react-router-dom'

// class App extends Component {
//   componentDidMount() {
//     // const { renewSession } = this.props.auth;
//     if (localStorage.getItem('isLoggedIn') === 'true') {
//       this.props.auth.renewSession();
//     }
//   }

//   login() {
//     this.props.auth.login();
//   }
  
//   logout() {
//     this.props.auth.logout();
//   }

//   clickHandler(e){
//     if(e.target.name === 'login'){
//         this.login();
//     } else {
//         this.logout();
//     }
//   }

//   render() {
//       const { isAuthenticated } = this.props.auth;
//       return (
//         <div>
          
        
//       <button name="login" onClick={(e) => {
//             this.clickHandler(e)
//         }}>LOGIN</button>
//         <button name="logout" onClick={(e) => {
//             this.clickHandler(e)
//         }}>LOGOUT</button>

//         <div>
//             {!isAuthenticated() && (
//                   <div>
//                     is NOT authenticated 
//                   <button
//                     onClick={this.login.bind(this)}
//                   >Log In
//                   </button>
//                   </div>
//                 )
//             }
//             {isAuthenticated() && (
//               <div>
//                 YES is authenticated
//                   <button
//                     onClick={this.logout.bind(this)}
//                   >Log Out
//                   </button>
//               </div>
//                 )
//             }

//       </div>
//       {/* <Route path='/callback' render={() => {
//         <Callback {this.props} />
//         }} /> */}
//       <Route path='/sucess' component={Sucess} />

//       </div>
//     )
//   }
// }

// export default App;