import styled from "styled-components";
import bg_img from "./img/devprof.jpg";
// bg_img credit: https://www.pexels.com/photo/white-smartphone-beside-silver-laptop-computer-1036808/

export const LandingPageDiv = styled.div`
  background: orange;
  h1 {
    background: blue;
    font-size: 30px;
  }
  p {
    color: pink;
  }
`

export const Pagewrap = styled.div`
  background-size: cover;
  background-image: url(${bg_img});
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  position: relative;
  text-align: center;
  padding: 5em;
  h1 {
    font-size: 5rem;
    letter-spacing: 5px;
    margin-bottom: 0.4em;
  }
`;

export const Moreinfo = styled.div`
  display:flex;
  flex-direction: column;
  color: purple;
  border: 1px solid black;
`

export const Aboutus = styled.div`
  color: darkgray;
  border: 1px solid black;
`
export const Learnmore = styled.div`
  color: red;
  border: 1px solid black;
`