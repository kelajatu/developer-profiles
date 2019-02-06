import styled from "styled-components";
import bg_img from "./img/agreement.jpg";
export const LandingPageDiv = styled.div``;

export const Pagewrap = styled.div`
  background: url(${bg_img}) no-repeat center center fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  position: relative;
  text-align: center;
  margin: auto;
`;

export const Moreinfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  margin: auto;
  margin-top: 50px;

  @media all and (max-width: 839px) {
    padding: 0 50px;
    img {
      width: 50%;
    }
  }

  @media all and (max-width: 480px) {
    padding: 2em;

    margin-top: 50px;
    img {
      width: 300px;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 48px;
    line-height: 75px;
    font-weight: bolder;
  }
`;

export const RecruiterText = styled.div`
  color: var(--lp_btn_color);
  display: flex;
  align-items: center;
  margin-bottom: 100px;
  text-align: left;
  @media all and (max-width: 480px) {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50px;
    text-align: center;
  }
`;
export const DevText = styled.div`
  color: var(--lp_btn_color);
  display: flex;
  align-items: center;
  flex-flow: row-reverse;
  text-align: right;
  @media all and (max-width: 839px) {
  }

  @media all and (max-width: 480px) {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
  }
`;
