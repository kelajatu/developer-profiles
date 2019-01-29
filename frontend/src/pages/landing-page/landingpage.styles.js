import styled from "styled-components";
import bg_img from "./img/agreement.jpg";

export const LandingPageDiv = styled.div`
  h1 {
    line-height: 50px;
    font-size: 5rem;
    font-weight: 900;
    margin-bottom: 0.4em;
  }

`;

export const Pagewrap = styled.div`
  background:var(--overlay-color), url(${bg_img})no-repeat center center fixed;
  /* border: 1px solid pink; */
  display: flex;
  justify-content:center;
  height: 100vh;
  position: relative;
  text-align: center;
  margin: auto;
  padding-top: 5em;
  padding-bottom: 5em;
`;

export const Moreinfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  margin: auto;
  /*  */
`;

export const Aboutus = styled.div`
  color: darkgray;
`;
export const Learnmore = styled.div`
  color: darkblue;
`;
