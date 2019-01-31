import styled from "styled-components";
import { centerFlex } from "../../global-styles/Mixins";

export const UserCardsDiv = styled.div`
  width: calc(100% - 20%);
  margin-left: 20%;
  padding-top: 130px;
  ${centerFlex("column")};
`;

export const LoaderContainer = styled.div`
  width: calc(100% - 20%);
  margin-left: 20%;
  padding-top: 130px;
  ${centerFlex()};
  h1 {
    font-size: 5rem;
  }
`;
