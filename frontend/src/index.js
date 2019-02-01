import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
// import { Grommet } from 'grommet';

ReactDOM.render(
  <Router>
    {/* <Grommet> */}
    <App />
    {/* </Grommet> */}
  </Router>,
  document.getElementById("root")
);