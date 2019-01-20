import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { link } from '../../global-styles/Mixins';

function UserDashboardNav(props) {
  return (
    <NavContainer>
      <NavLink exact to={`/dashboard`} activeClassName="selected">
        Home
      </NavLink>
      
      <NavLink to={`${props.match.url}/personal-info`} activeClassName="selected">
        Personal Info
      </NavLink>

      <NavLink to={`${props.match.url}/where-to-find-you`} activeClassName="selected">
        Where to Find You
      </NavLink>

      <NavLink to={`${props.match.url}/about-you`} activeClassName="selected">
        About You
      </NavLink>

      <NavLink to={`${props.match.url}/projects`} activeClassName="selected">
        Projects
      </NavLink>

      <NavLink to={`${props.match.url}/experience`} activeClassName="selected">
        Experience
      </NavLink>

      <NavLink to={`${props.match.url}/education`} activeClassName="selected">
        Education
      </NavLink>
      
      <NavLink to={`${props.match.url}/billing`} activeClassName="selected">
        Billing
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
  a {
    ${link("1.8rem", "rgb(42,42,42)")};
    padding: 20px;
  }
  .selected {
    background-color: rgba(173,216,230, .5);
    border-right: solid 2px rgb(173,188,230);
  }
`;


export default UserDashboardNav;
