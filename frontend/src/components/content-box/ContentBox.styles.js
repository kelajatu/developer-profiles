import styled from "styled-components";

export const ContentBoxSection = styled.div`
  max-width: 1000px;
  /* border: 1px solid red; */
  width: 100%;
  text-align: left;
  margin-top: 175px;
  padding: 2em;

  a {
    color: none;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const CTAContainer = styled.div`
display: flex;
flex: row;
`

export const CallToAction = styled.div`
 display: flex;
 flex-direction: column;
 border: 1px solid blue;
`

export const Btn = styled.div`
  @keyframes stripe-slide {
    0% {
      background-position: 0% 0;
    }
    100% {
      background-position: 100% 0;
    }
  }
  overflow: visible;
  width: 150px;
  /* text-align:center; */
  margin: 5px;
  border: 0;
  width: 100px;
  background: transparent;
  font: inherit;
  font-size: 18px;
  line-height: normal;
  -moz-user-select: text;
  padding: 16px 0px 22px;
  background: var(--btn_background);
  color: var(--btn_color);
  border: 2px solid var(--border_color);
  border-radius: 10px;
  margin-bottom: 16px;
  transition: all 0.5s ease;

  &.stripe {
    overflow: hidden;
    position: relative;

    &:after {
      content: "";
      display: block;
      height: var(--stripe_height);
      width: 100%;
      background-image: repeating-linear-gradient(
        45deg,
        var(--border_color),
        var(--border_color) 1px,
        transparent 2px,
        transparent 5px
      );
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-top: 1px solid var(--border_color);
      position: absolute;
      left: 0;
      bottom: 0;
      background-size: var(--stripe_height) var(--stripe_height);
    }

    &:hover {
      background-color: var(--btn_background_hover);
      /* overflow: hidden; */
      color: var(--btn_color_hover);
      border-color: #000;
      border-radius: 15px;

      &:after {
        background-image: repeating-linear-gradient(
          45deg,
          var(--btn_color_hover),
          var(--btn_color_hover) 1px,
          transparent 2px,
          transparent 5px
        );
        border-top: 1px solid var(--border_color_hover);
        animation: stripe-slide 12s infinite linear forwards;
      }
    }
  }
`;


