import React, { Component } from "react";
import styled from "styled-components";
import JobTitles from "./jobTitles";
import Located from "./located";
import Relocate from "./relocate";
import { Grommet } from 'grommet';

export default class FilterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  render() {
    return (
      <Grommet theme={myTheme}>
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
        />
        <Relocate
          updatePublicPageState={this.props.updatePublicPageState}
          publicPageState={this.props.publicPageState}
        />
        {/* <button onClick={this.props.testInfinite}>TEST ININIT SCROLL</button> */}
      </FilterBoxDiv>
      <MenuButton onClick={()=> this.setState({menuOpen: !this.state.menuOpen})}>Filter Profiles</MenuButton>
      </Grommet>
    );
  }
}

const myTheme = {
  global: {
    colors: {
      brand: '#86a8e7',
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
  left: calc(50% - 60px);
  text-align: center;
  border: grey solid 1px;
  border-top: none;
  border-radius: 0 0 5px 5px;
  top: 42px;
  margin: auto;
  position: fixed;
  z-index: 3;
  cursor: pointer;
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
    flex-wrap: wrap;
    font-size: 12px;
    padding-top: 70px;
    border-bottom: solid grey 1px;
    h1 {
      font-size: 15px;
      margin-bottom: 0;
  }
    h2 {
      font-size: 15px;
      margin-bottom: 0;
  }
    @media (max-width: 480px) {
    }
  }
 
`;
