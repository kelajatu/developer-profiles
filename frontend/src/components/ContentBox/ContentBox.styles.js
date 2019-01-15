import {btn_background_hover, btn_color, border_color} from '../../styles/colors.js'
import styled from 'styled-components'

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