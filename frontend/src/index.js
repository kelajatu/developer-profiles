import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./reset.css";
import App from "./App";
// import Auth from './components/Auth/Auth1'

// const auth = new Auth()

ReactDOM.render(
  <Router>
    <App
      // auth={auth}
     />
  </Router>,
  document.getElementById("root")
);