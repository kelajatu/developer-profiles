import React, { Component } from 'react'
import styled from 'styled-components';
import { centerFlex } from '../../global-styles/Mixins';


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
  margin-bottom: 100px;
  padding-top: 130px;
  ${centerFlex()};
`;

export default UserDashboardIntro;
