import styled from "styled-components";
import bg_img from "./img/devprof.jpg";
// bg_img credit: https://www.pexels.com/photo/white-smartphone-beside-silver-laptop-computer-1036808/

import { 
  border_color, 
  color_black, 
  color_gray, 
  btn_background,
  btn_color_hover, 
  btn_background_hover, 
  border_color_hover, 
  stripe_height, 
  btn_color
} from '../../styles/colors.js'

// ------
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


export const Btn = styled.div`
  overflow: visible;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font: inherit;
  font-size: 18px;
  line-height: normal;
  cursor: pointer;
  -moz-user-select: text;
  padding: 16px 36px 22px;
  background: ${btn_background};
  color: ${btn_color};
  border: 2px solid ${border_color};
  border-radius: 6px;
  margin-bottom: 16px;
  transition: all 0.5s ease;

  &.stripe {
    overflow: hidden;
    position: relative;

    &:after {
      content: "";
      display: block;
      height: ${stripe_height};
      width: 100%;
      background-image: repeating-linear-gradient(
        45deg,
        ${border_color},
        ${border_color} 1px,
        transparent 2px,
        transparent 5px
      );
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-top: 1px solid ${border_color};
      position: absolute;
      left: 0;
      bottom: 0;
      background-size: ${stripe_height} ${stripe_height};
    }

    &:hover {
      background-color: ${btn_background_hover};
      color: ${btn_color_hover};
      border-color: #000;

      &:after {
        background-image: repeating-linear-gradient(
          45deg,
          ${btn_color_hover},
          ${btn_color_hover} 1px,
          transparent 2px,
          transparent 5px
        );
        border-top: 1px solid ${border_color_hover};
        animation: stripe-slide 12s infinite linear forwards;
      }
    }
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