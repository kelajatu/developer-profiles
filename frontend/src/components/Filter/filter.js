import React, { Component } from "react";
import styled from "styled-components";
import JobTitles from "./jobTitles";
import Located from "./located";
import Relocate from "./relocate";

export default class FilterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <FilterBoxDiv>
        <h1>
          Showing: <strong>{this.props.params.cardsDisplaying}</strong> profiles
        </h1>
        <JobTitles
          updatePublicPageState={this.props.updatePublicPageState}
          toggleCheckMarks={this.props.toggleCheckMarks}
          params={this.props.params}
        />
        <Located
          updatePublicPageState={this.props.updatePublicPageState}
          params={this.props.params}
        />
        <Relocate
          updatePublicPageState={this.props.updatePublicPageState}
          params={this.props.params}
        />
        <button onClick={this.props.testInfinite}>TEST ININIT SCROLL</button>
      </FilterBoxDiv>
    );
  }
}

const FilterBoxDiv = styled.aside`
  background-color: white;
  position: fixed;
  z-index: 1;
  width: 25%;
  height: 100%;
  padding-top: 130px;
  border-right: solid 0.5px #dbdee2;
  display: flex;
  flex-direction: column;
  aside a {
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 20px;
    color: #818181;
    display: block;
  }
`;
