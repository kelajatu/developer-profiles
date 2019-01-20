import React, { Component } from 'react';
import styled from 'styled-components';
import {centerFlex} from '../../global-styles/Mixins';

class UserCardProgress extends Component {
  render() {
    return (
      <PreviewContainer>
        <h1>PROGRESS</h1>
      </PreviewContainer>
    )
  }
}

const PreviewContainer = styled.header`
  width: calc(100% - 300px);
  margin-left: 300px;
  margin-bottom: 50px;
  padding-top: 130px;
  padding-left: 100px;
  ${centerFlex()};
`;

export default UserCardProgress;