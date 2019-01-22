import React, { Component } from 'react';
import styled from 'styled-components';
import { centerFlex, labelArea } from '../../global-styles/Mixins';

class UserCardProgress extends Component {
  render() {
    return (
      <PreviewContainer>
        <h1>Profile Status: Not Live</h1>
        <ProgressContainer id="progressRequirements">
          <div progress={this.props.userProgress} className="progress">
            <p>{this.props.userProgress}</p>
          </div>
        </ProgressContainer>
        <label htmlFor="progressRequirements">Reach 80% to go live!</label>
      </PreviewContainer>
    )
  }
}

const PreviewContainer = styled.header`
  width: calc(100% - 300px);
  margin-left: 300px;
  margin-bottom: 50px;
  padding-top: 130px;
  ${centerFlex('column')};
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
  h1 {
    font-size: 3.5rem;
    color: rgb(42,42,42);
    margin-bottom: 20px;
  }
  label {
    ${labelArea()};
    font-size: 1.5rem;
  }
`;

const ProgressContainer = styled.div`
  width: 50%;
  background-color: rgb(173,216,230);
  height: 50px;
  border-radius: 50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 10px;
  .progress {
    background: linear-gradient(to right, #52c234, #144b00);
    border: solid .5px #52c234;
    height: 50px;
    border-radius: 50px;
    width: ${props => props.children.props.progress};
    ${centerFlex()};
    p {
      color: rgb(42,42,42);
      font-size: 1.7rem;
      font-weight: bold;
    }
  }
`;

export default UserCardProgress;