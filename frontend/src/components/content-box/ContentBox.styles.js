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
      background-color: var(--btn_background_hover);
      color: var(--btn_color);
    }
    border-color: var(--border_color);
  }
`;