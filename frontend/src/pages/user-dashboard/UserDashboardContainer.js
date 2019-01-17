import React, { Component } from 'react'
import NewNewUserInitBilling from './billing/NewNewUserInitBilling';
import UserInitProfile from './UserInitProfile';

class UserDashboardContainer extends Component {
  render() {
    return (
      <div>
        <h1>Main dahsboard</h1>
        <NewNewUserInitBilling />
        <UserInitProfile />
      </div>
    )
  }
}

export default UserDashboardContainer;