import styled from "styled-components";
import { centerFlex } from "../../global-styles/Mixins";

export const UserCardsDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-left: 40px; 
    padding-top: 130px;
    @media (max-width: 1440px) {
      ${centerFlex('column')}; 
    }
    @media (max-width: 839px) {
    margin: 0 auto;
    padding-top: 75px;
    width: 100%;
    @media (max-width: 480px) {
      padding-top: 50px;
    }
  }
`;

export const LoaderContainer = styled.div`
  width: calc(100% - 20%);
  margin-left: 20%;
  padding-top: 130px;
  ${centerFlex()};
  h1 {
    font-size: 5rem;
  }
  @media (max-width: 839px) {
    margin: auto;
    @media (max-width: 480px) {
    }
  }
`;
