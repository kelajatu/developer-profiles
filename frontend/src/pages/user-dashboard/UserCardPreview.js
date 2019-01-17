import React, { Component } from 'react';
import styled from 'styled-components';

class UserCardPreview extends Component {
  render() {
    return (
      <PreviewContainer>
        <section>
          <h1>CARD PREVIEW</h1>
        </section>
        <section>
          <h1>PROGRESS</h1>
        </section>
      </PreviewContainer>
    )
  }
}

const PreviewContainer = styled.header`
  width: calc(100% - 220px);
  margin-left: 220px;
  margin-bottom: 100px;
  padding-top: 50px;
  padding-left: 100px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  flex-wrap: wrap;
  section {
      width: 43%;
    }
`;

export default UserCardPreview;