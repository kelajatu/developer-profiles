import styled from 'styled-components'

export const ContentBoxSection = styled.section`
  position: relative;
  text-align: center;
  padding: 5em;
  box-shadow: 0 10px 36px rgba(0, 0, 0, 0.18);
  a {
    color: none;
    text-decoration: none;
    &:hover {
      background-color: var(--btn_background_hover);
      color: var(--btn_color);
    }
    border-color: var(--border_color);
  }
`;

export const Btn = styled.div`
  overflow: visible;
  margin: 0;
  padding: 0;
  border: 0;
  width: 100px;
  background: transparent;
  font: inherit;
  font-size: 18px;
  line-height: normal;
  -moz-user-select: text;
  padding: 16px 20px 22px;
  background: var(--btn_background);
  color: var(--btn_color);
  border: 2px solid var(--border_color);
  border-radius: 6px;
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
      color: var(--btn_color_hover);
      border-color: #000;

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