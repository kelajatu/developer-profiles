import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components'

export default class Nav extends Component {
  render() {
    return (
      <MainNav>
        <div className="nav-link">
          <Link to="/public">View Profiles</Link>
        </div>
        {this.props.auth.isAuthenticated() ?
            <Fragment>
                <div className="nav-link">
                  <Link to="/dashboard">Dashboard</Link>
                </div>
                <div className="nav-link">
                  <a href="/" onClick={() => this.props.auth.logout({...this.props})}>Logout</a>
                </div>
            </Fragment>
        : <div onClick={this.props.auth.login} className="nav-link">Sign Up/Sign In</div>}
      </MainNav>
    );
  }
};

const MainNav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-size: 2.5rem;
  background-color: white;
  position: fixed;
  z-index: 20;
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.1);
  border-bottom: solid .5px rgba(219, 222, 226, .5);
  .nav-link {
    padding: 2rem 3rem;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    background: none;
    font-weight: 800;
    @media (max-width: 700px) {
      font-size: 2rem;
      padding: 1rem 2rem;
      justify-content: center;
    }
    &:after {
      height: 2px;
      background: blue;
      content: "";
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
    }
    a {
      color: black;
      text-decoration: none;
    }
  }
  @media (max-width: 1300px) {
    width: 100%;
    justify-content: flex-end;
    font-size: 1.6rem;
  }
`;