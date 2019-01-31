import React from 'react'
import styled, { keyframes } from 'styled-components';
import { centerFlex } from '../../global-styles/Mixins';

export default function Loader() {
  return (
    <LoaderContainer>
      <img src="https://res.cloudinary.com/dlo7dkdfy/image/upload/v1548963494/Developer-Profiles/logo-loader.png" alt="Loader"/>
    </LoaderContainer>
  )
}

const rotate = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
`;

const LoaderContainer = styled.div`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding-top: 300px;
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
  ${centerFlex()};
  color: black;
  animation: ${rotate} 2s linear infinite;
`;

