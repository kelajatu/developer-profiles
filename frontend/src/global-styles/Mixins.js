/* Simply import and use */

export function link(fontSize, color) {
  return `
    text-decoration: none;
    font-size: ${fontSize};
    color: ${color};
  `;
}

export function centerFlex(flexDirection = 'row') {
  return `
    display: flex;
    flex-direction: ${flexDirection};
    justify-content: center;
    align-items: center;
  `;
}
