import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { centerFlex } from '../../../../global-styles/Mixins';
import programmer, { ReactComponent as ReactProgrammer } from '../../programmer.svg';

class UserDashboardNew extends Component {

  render() {
    console.log(this.props.userInfo)
    const { first_name } = this.props.userInfo;

    return (
      <IntroContainer>
        <header>
          {first_name === "" ?
            <h1>Welcome!</h1>
            :
            <h1>Welcome, {first_name}!</h1>
          }
        </header>
        <div className="container">
          <ReactProgrammer className="programmer-svg" alt="logo" />
        </div>
        <ButtonContainer>
          <div>
            <Link to="/dashboard/new/quickstart">Quickstart</Link>
          </div>
          <div>
            <Link to="/dashboard">Dashboard Home</Link>
          </div>
        </ButtonContainer>
      </IntroContainer>
    )
  }
}

const IntroContainer = styled.div`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding-top: 130px;
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
  @media (max-width: 650px) {
    width: 100%;
    margin-left: 0px;
  }
  h1 {
    font-size: 5rem;
    color: rgb(42,42,42);
    margin-bottom: 50px;
    text-align: center;
    @media (max-width: 1100px) {
      text-align: left;
      padding-left: 50px;
      font-size: 4rem;
    }
  }
  .container {
    margin-top: 50px;
    padding-left: 50px;
    padding-right: 50px;
    ${centerFlex()}
    @media (max-width: 1100px) {
      justify-content: flex-start;
    }
    .programmer-svg {
      width: 60%;
      height: auto;
      @media (max-width: 1600px) {
        width: 65%;
      }
      @media (max-width: 1450px) {
        width: 70%;
      }
      @media (max-width: 1300px) {
        width: 75%;
      }
      @media (max-width: 1150px) {
        width: 80%;
      }
      @media (max-width: 1000px) {
        width: 85%;
      }
      @media (max-width: 850px) {
        width: 90%;
      }
      @media (max-width: 700px) {
        width: 95%;
      }
      @media (max-width: 550px) {
        width: 100%;
      }
    }
  }
`;


export const ButtonContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 50px;

  div {
    width: 45%;
    text-align: center;
  }

  a {
    width: 70%;
    display: block;
    margin: auto;
    text-decoration: none;
    color: black;
    padding: 20px;
    font-size: 1.7rem;
    letter-spacing: 1.5px;
    background: white;
    border: solid 1px black;
    border-radius: 20px;
    &:hover {
      cursor: pointer;
      background: black;
      color: white;
    }
  }
`;


export default UserDashboardNew;
