import React, { Component } from "react";
import UserInitProfile from './containers/UserInitProfile';

// flow
// user registers -> Save to DB
// user fills out info(profile seeker) -> Save to DB
// user fills out billing -> save to DB -> List of users updated
// send to profile(profile seeker?) - user can edit
// user shows up on main pages, can view their own expanded profile


class App extends Component {
  render() {
    return (
      <div>
        <UserInitProfile />
      </div>
    );
  }
}

export default App;
