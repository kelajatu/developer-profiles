import styled from "styled-components";

export const Circle = styled.div`
  background: #003FA0;
  position: relative;
  left: -32px;
  bottom: -px;
  height: 640px;
  width: 640px;

  padding-top: 9em;
  padding-left: 5em;
  border-radius: 50%;

  z-index: 0;

  h1 {
    font-size: 80px;
    line-height: 100px;
    font-weight: bold;
    color: white;
  }
`;
export const ContentBoxSection = styled.div`

  z-index:1;
  max-width:1400px;
  /* border: 1px solid red; */
  width: 100%;
  text-align: left;
  margin: auto;

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
`;

export const CallToAction = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid blue;
`;

export const Btn = styled.div`
color: white;
  font-weight: bold;
  font-size: 2rem;
  text-decoration: none;
  text-transform: uppercase;
  padding: 40px 90px;
  background-color: var(--lp_btn_color);
  transition: transform 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55), background-position 800ms cubic-bezier(0.68, -0.55, 0.265, 1.55), box-shadow 500ms linear;
  background-image: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="1296px" height="768px" viewBox="0 0 1296 768" enable-background="new 0 0 1296 768" xml:space="preserve"><g><polygon fill="#8694D1" points="766.6,1.2 -0.2,768 200.7,768 967.5,1.2 	"/></g><g><polygon fill="#8694D1" points="1094.8,1.2 328,768 528.9,768 1295.7,1.2 	"/></g></svg>');
  background-size: contain;
  background-position: -200px center;
  background-repeat: no-repeat;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

&:hover {
  transform: scale(1.1);
  background-position: -60px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
&:active {
  transform: scale(1);
  background-position: 500px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);}
`;
