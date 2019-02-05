import React, { Component } from "react";
import styled from "styled-components";
import JobTitles from "./jobTitles";
import Located from "./located";
import Relocate from "./relocate";
import { Grommet } from 'grommet';
import { ButtonContainer } from "../../pages/user-dashboard/styles/FormStyles";

export default class FilterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  render() {
    return (
      <Grommet theme={filterTheme}>
        <FilterBoxDiv menu={this.state.menuOpen}>
          <h2>
            Showing: <strong>{this.props.publicPageState.usersReturned}</strong> of {this.props.publicPageState.usersFound} possible profiles
          </h2>
          <JobTitles
            updatePublicPageState={this.props.updatePublicPageState}
            toggleCheckMarks={this.props.toggleCheckMarks}
            publicPageState={this.props.publicPageState}
          />
          <Located
            updatePublicPageState={this.props.updatePublicPageState}
            publicPageState={this.props.publicPageState}
            filter={this.props.filter}
          />
          <Relocate
            updatePublicPageState={this.props.updatePublicPageState}
            publicPageState={this.props.publicPageState}
            filter={this.props.filter}
          />
          <button onClick={() => this.props.filter(true)}>Search</button>
        </FilterBoxDiv>
        <MenuButton menuOpen={this.state.menuOpen}>
        <i onClick={()=> this.setState({ menuOpen: !this.state.menuOpen })} class="fa fa-bars"></i>
        </MenuButton>
      </Grommet>
    );
  }
}

const filterTheme = {
  global: {
    colors: {
      brand: 'coral',
    },
  },
  textInput: {
    extend: {
      width: '200px',
    }
  },
  rangeInput: {
    extend: {
      width: '250px',
    },
  }
};

const MenuButton = styled.div `
  height: 20px;
  width: 120px;
  left: calc(50% - 20px);
  top: ${props => props.menuOpen ? 280 : 50}px;
  margin: auto;
  position: fixed;
  z-index: 1;
  cursor: pointer;
  font-size: 20px;
  color: grey;
  @media (max-width: 839px) {
   
    }
`

const FilterBoxDiv = styled.aside`
  padding-left: 20px;
  background-color: white;
  z-index: 10;
  width: 272px;
  height: 100%;
  padding-top: 130px;
  border-right: solid 0.5px #dbdee2;
  display: flex;
  position: fixed;
  flex-direction: column;
  h1 {
    font-size: 20px;
    margin-bottom: 5px;
  }
  h2 {
    font-size: 18px;
    margin-bottom: 5px;
  }
  @media (max-width: 839px) {
    border: none;
    width: 100%;
    padding-right: 20px;
    height: ${props => props.menu ? 300 : 0 }px;
    z-index: ${props => props.menu ? 1 : -10 };
    font-size: 12px;
    padding-top: 70px;
    border-bottom: solid lightgrey 1px;
    h1 {
      font-size: 15px;
      margin-bottom: 0;
  }
    h2 {
      font-size: 15px;
      margin-bottom: 0;
  }
    @media (max-width: 480px) {
    height: ${props => props.menu ? 100 : 0 }vh;
    }
  }
  button {
    width: 70%;
    color: black;
    margin: 10px;
    padding: 5px;
    font-size: 20px;
    letter-spacing: 1.5px;
    background: white;
    border: solid 1px black;
    border-radius: 20px;
    /* display: flex;
    align-items: center;
    justify-content: center; */
    outline-style: none;
    &:hover {
      cursor: pointer;
      background: black;
      color: white;
    }
    @media (max-width: 839px) {
    width: 20%;
    height: 50px;
    }
  }

 
`;
