import styled from "styled-components";

export const LandingPageDiv = styled.div`
  background-image: var(--fade-gradient), var(--my-gradient);
  h1 {

    font-family: 'Roboto', sans-serif;
    line-height: 50px;
    font-size: 5rem;
    font-weight: 900;
    margin-bottom: 0.4em;
  }
  p {
    /* color: pink; */
    font-family: 'Roboto', sans-serif;
  }
`;

export const Pagewrap = styled.div`
  background-size: cover;
  display: flex;
  max-width: 1000px;
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
  color: darkgray;
`;
