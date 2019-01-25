import styled from "styled-components";

export const LandingPageDiv = styled.div`
  background-image: var(--fade-gradient), var(--my-gradient);
  h1 {
    /* background: blue; */
    font-size: 30px;
  }
  p {
    /* color: pink; */
    font-size: 24px;
  }
`;

export const Pagewrap = styled.div`
  background-size: cover;
  display: flex;
  max-width: 1000px;
  height: 100vh;
  position: relative;
  text-align: center;
  display: flex;
  margin: auto;

    /* justify-content: space-around;
    align-content: space-around; */
    /* align-items: flex-start; */




  border: 1px solid red;
  padding-top: 5em;
  padding-bottom: 5em;
  h1 {
    font-size: 5rem;
    letter-spacing: 5px;
    margin-bottom: 0.4em;
  }
`;

export const Moreinfo = styled.div`
  display: flex;
  flex-direction: column;
  color: purple;
  border: 1px solid black;
`;

export const Aboutus = styled.div`
  color: darkgray;
  border: 1px solid black;
`;
export const Learnmore = styled.div`
  color: darkgray;
  border: 1px solid black;
`;
