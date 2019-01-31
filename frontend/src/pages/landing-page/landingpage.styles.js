import styled from "styled-components";
import bg_img from "./img/agreement.jpg";
export const LandingPageDiv = styled.div`


`;

export const Pagewrap = styled.div`

background: url(${bg_img})no-repeat center center fixed;
background-size: cover;

  /* border: 15px solid pink; */
  /* display: flex; */
  flex-direction: column;
  justify-content:center;
  height: 90vh;
  position: relative;
  text-align: center;
  margin: auto;
  padding-top: 5em;
  padding-bottom: 5em;
`;

// background gradient: var(--overlay-color),


export const Moreinfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
  margin: auto;
  margin-top: 200px;
  @media all and (max-width: 480px) {
  padding:2em;
  margin-top: 50px;
  }

`;

export const Aboutus = styled.div`
  color: darkgray;
  margin-bottom: 100px;
`;
export const Learnmore = styled.div`
  color: darkblue;
`;
