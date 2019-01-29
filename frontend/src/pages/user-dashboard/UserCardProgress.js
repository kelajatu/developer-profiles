import React, { Component } from 'react';
import styled from 'styled-components';
import { centerFlex, labelArea } from '../../global-styles/Mixins';

class UserCardProgress extends Component {
  render() {
    return (
      <MainContainer>
        <SubContainer>
          <ViewContainer />
          <h1>Profile Status: {this.props.profileStatus}</h1>
          <ProgressContainer id="progressRequirements">
            <div progress={this.props.userProgress} className="progress">
              <p>{this.props.userProgress}</p>
            </div>
          </ProgressContainer>
          <label htmlFor="progressRequirements">
            {this.props.profileStatus === 'Live' ?
              'Your Profile is live!'
              :
              'Reach 80% to go live!'
            }
          </label>
          
        </SubContainer>
      </MainContainer>
    )
  }
}

const MainContainer = styled.div`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding-top: 50px;
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
`;

const SubContainer = styled.div`
  width: 80%;
  margin: auto;
  padding: 10px;
  ${centerFlex('column')};
  h1 {
    font-size: 2.5rem;
    color: rgb(42,42,42);
    margin-bottom: 10px;
  }
  label {
    ${labelArea()};
    font-size: 1.5rem;
    margin: 0;
  }
`;

const ViewContainer = styled.div`
  background-color: #86a8e7;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  width: 100%;
  border-radius: 50px;
`;

const ProgressContainer = styled.div`
  width: 100%;
  background-color: white;
  height: 30px;
  border-radius: 50px;
  margin-bottom: 10px;
  .progress {
    background-color: #144b00;
    border: solid .5px #52c234;
    height: 30px;
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