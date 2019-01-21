import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { link, centerFlex } from '../../global-styles/Mixins';

function UserDashboardNav(props) {
  return (
    <NavContainer>
      <NavLink exact to={`/dashboard`} activeClassName="selected">
        <span className="nav-large"><i className="fa fa-home"></i> Home</span>
        <span className="nav-small"><i className="fa fa-home"></i></span>
      </NavLink>
      
      <NavLink to={`${props.match.url}/personal-info`} activeClassName="selected">
        <span className="nav-large"><i className="fa fa-address-card"></i> Personal Info</span>
        <span className="nav-small"><i className="fa fa-address-card"></i></span>
      </NavLink>

      <NavLink to={`${props.match.url}/where-to-find-you`} activeClassName="selected">
        <span className="nav-large"><i className="fa fa-map-signs"></i> Where to Find You</span>
        <span className="nav-small"><i className="fa fa-map-signs"></i></span>
      </NavLink>

      <NavLink to={`${props.match.url}/about-you`} activeClassName="selected">
        <span className="nav-large"><i className="fa fa-user"></i> About You</span>
        <span className="nav-small"><i className="fa fa-user"></i></span>
      </NavLink>

      <NavLink to={`${props.match.url}/projects`} activeClassName="selected">
        <span className="nav-large"><i className="fa fa-cogs"></i> Projects</span>
        <span className="nav-small"><i className="fa fa-cogs"></i></span>
      </NavLink>

      <NavLink to={`${props.match.url}/experience`} activeClassName="selected">
        <span className="nav-large"><i className="fa fa-briefcase"></i> Experience</span>
        <span className="nav-small"><i className="fa fa-briefcase"></i></span>
      </NavLink>

      <NavLink to={`${props.match.url}/education`} activeClassName="selected">
        <span className="nav-large"><i className="fa fa-graduation-cap"></i> Education</span>
        <span className="nav-small"><i className="fa fa-graduation-cap"></i></span>
      </NavLink>
      
      <NavLink to={`${props.match.url}/billing`} activeClassName="selected">
        <span className="nav-large"><i className="fa fa-credit-card"></i> Billing</span>
        <span className="nav-small"><i className="fa fa-credit-card"></i></span>
      </NavLink>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  width: 300px;
  height: 100vh;
  background: white;
  padding: 130px 0 0;
  border-right: solid .5px #dbdee2;
  position: fixed;
  z-index: 5;
  display: flex;
  flex-direction: column;
  @media (max-width: 1400px) {
    width: 80px;
  }
  a {
    ${link("1.8rem", "rgb(42,42,42)")};
    padding: 20px;
    @media (max-width: 1400px) {
      ${centerFlex()};
      padding: 25px 20px;
    }
    &:hover {
      color: gray;
    }
  }
  i {
    width: 30px;
  }
  .selected {
    background-color: rgba(173,216,230, .5);
    border-right: solid 2px rgb(173,188,230);
  }
  .nav-large {
    @media (max-width: 1400px) {
      display: none;
    }
  }
  .nav-small {
    display: none;
    @media (max-width: 1400px) {
      display: inline;
    }
  }
`;


export default UserDashboardNav;
