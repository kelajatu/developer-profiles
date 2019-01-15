import React, { Component } from "react";
import Nav from "./components/Nav/Nav";
import LandingPage from "./containers/landingPage";
import BreadCrumbs from "./components/BreadCrumbs/BreadCrumbs";
import UserCard from "./components/UserCard/UserCard";
import UserInitProfile from "./containers/UserInitProfile";
import Auth from './components/Auth/Auth1'
import Callback from './components/Auth/Callback'
import Sucess from './components/Auth/Sucess.js'
import { Route } from 'react-router-dom'

class App extends Component {
  
  render() {
      return (
        <div>
          <BreadCrumbs />
          <Nav />
          <LandingPage />
          <UserCard />
          <UserInitProfile /> 
        </div>
    )
  }
}

export default App;