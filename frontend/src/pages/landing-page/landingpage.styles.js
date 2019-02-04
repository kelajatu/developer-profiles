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
  margin-top: 50px;

  @media all and (max-width: 480px) {
  padding:2em;
  margin-top: 50px;}


`;

export const TextBlock = styled.div `
display:flex;
flex-direction: column;
h2 {
  font-size: 48px;
  line-height: 75px;
  font-weight: bolder;

}


`

export const Aboutus = styled.div`
  color: darkgray;
  display: flex;
  align-items: center;
  margin-bottom: 100px;
  text-align:left;



`;
export const Learnmore = styled.div`
  color: darkblue;
  display: flex;
  align-items: center;
  flex-flow: row-reverse;
  text-align: right;

`;
