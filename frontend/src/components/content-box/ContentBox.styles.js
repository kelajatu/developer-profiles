import styled from "styled-components";

export const Circle = styled.div`
  background: #003fa0;
  position: relative;
  left: -32px;
  bottom: 50px;
  height: 640px;
  width: 640px;

  border-radius: 50%;
  display: flex;
  z-index: 0;
  align-items: center;
  justify-content: center;

  @media all and (max-width: 839px) {
    left:0;


  }
  @media all and (max-width: 480px) {
    border-radius:0;
    height:350px;
    width:500px;
    padding: 1em;
    bottom: -32px;

   }
`;
export const ContentBoxSection = styled.div`
  z-index: 1;
  max-width: 1400px;

  width: 100%;

  margin: auto;

  padding: 2em;

  a {
    text-decoration: none;
  }
  @media all and (max-width: 839px) {
   display:flex;
   justify-content: center;

  }
  @media all and (max-width: 480px) {
    padding:0;
    }
`;

export const CTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-around;
  color:white;
  h1 {
    font-size: 80px;
    line-height: 100px;
    font-weight: bold;
    color: var(--accent-color);
  }


  span {
    color: white;
  }

  @media all and (max-width: 480px) {
   h1 {
     font-size: 64px;
   }

   }

`;

export const CallToAction = styled.div`
  display: flex;
  flex-direction: row;


`;

export const BtnRow = styled.div`
  display: flex;
  justify-content: space-around;
  @media all and (max-width: 480px) {
    display:flex;
    height: 150px;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;


   }

`;

export const Btn = styled.div`
  color: white;
  border-radius: 100px;
  width: 200px;
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  text-decoration: none;
  padding: 15px 20px;
  background-color: var(--lp_btn_color);
  transition: transform 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55),
    box-shadow 500ms linear;
  background-size: contain;
  background-position: -200px center;
  background-repeat: no-repeat;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  &:hover {
    /* color:#98B9F2; */
    color:var(--accent-color);
    transform: scale(1.1);
    background-position: -60px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  &:active {
    transform: scale(1);
    background-position: 500px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  }
  @media all and (max-width: 480px) {
   width: 350px;

   }
`;


