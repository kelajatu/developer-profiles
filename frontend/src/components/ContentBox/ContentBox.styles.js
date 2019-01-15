import {btn_background_hover, btn_color, border_color} from '../../styles/colors.js'
import styled from 'styled-components'
import * as colors from '../../styles/colors.js'

export const ContentBoxSection = styled.section`
  position: relative;
  text-align: center;
  padding: 5em;
  box-shadow: 0 10px 36px rgba(0, 0, 0, 0.18);
  a {
    color: none;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      background-color: ${btn_background_hover};
      color: ${btn_color};
    }
    border-color: ${border_color};
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
  background: ${colors.btn_background};
  color: ${colors.btn_color};
  border: 2px solid ${colors.border_color};
  border-radius: 6px;
  margin-bottom: 16px;
  transition: all 0.5s ease;
  &.stripe {
    overflow: hidden;
    position: relative;
    &:after {
      content: "";
      display: block;
      height: ${colors.stripe_height};
      width: 100%;
      background-image: repeating-linear-gradient(
        45deg,
        ${colors.border_color},
        ${colors.border_color} 1px,
        transparent 2px,
        transparent 5px
      );
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-top: 1px solid ${colors.border_color};
      position: absolute;
      left: 0;
      bottom: 0;
      background-size: ${colors.stripe_height} ${colors.stripe_height};
    }

    &:hover {
      background-color: ${colors.btn_background_hover};
      color: ${colors.btn_color_hover};
      border-color: #000;

      &:after {
        background-image: repeating-linear-gradient(
          45deg,
          ${colors.btn_color_hover},
          ${colors.btn_color_hover} 1px,
          transparent 2px,
          transparent 5px
        );
        border-top: 1px solid ${colors.border_color_hover};
        animation: stripe-slide 12s infinite linear forwards;
      }
    }
  }
`;