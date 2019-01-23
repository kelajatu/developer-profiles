import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { Grommet } from 'grommet';

const myTheme = {
  global: {
    colors: {
      brand: 'limegreen',
    },
  },
};

ReactDOM.render(
  <Router>
    <Grommet theme={myTheme}>
    <App />
    </Grommet>
  </Router>,
  document.getElementById("root")
);