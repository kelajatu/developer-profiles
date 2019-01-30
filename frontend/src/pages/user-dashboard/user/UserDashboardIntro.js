import React, { Component } from 'react'
import styled from 'styled-components';
import { centerFlex } from '../../../global-styles/Mixins';


class UserDashboardIntro extends Component {
  state = {
    
  }
  render() {
    return (
      <MainFormContainer>
        <h1>INTRO</h1>
      </MainFormContainer>
    )
  }
}

const MainFormContainer = styled.main`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding-top: 130px;
  ${centerFlex()};
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
`;

export default UserDashboardIntro;
