import styled from "styled-components";

export const FooterContainer = styled.div`
  background-color: #292c2f;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  width: 100%;
  text-align: left;
  font: normal 16px sans-serif;
  padding: 20px;
  position: relative;
  margin-top: auto;
  bottom: 0;

  .footer-left p {
    color: #8f9296;
    font-size: 16px;
    margin: 0;
  }

  p.footer-links {
    font-size: px;
    font-weight: bold;
    color: #ffffff;
    margin: 0 0 10px;
    padding: 0;

    a {
      display: inline-block;
      line-height: 1.8;
      text-decoration: none;
      color: inherit;
      padding: 0 1% 0 0;
    }
  }

  .footer-right {
    float: right;
    margin-top: 6px;
    max-width: 180px;

    a {
      display: inline-block;
      width: 35px;
      height: 35px;
      background-color: #33383b;
      border-radius: 2px;
      font-size: 20px;
      color: #ffffff;
      text-align: center;
      line-height: 35px;
      margin-left: 3px;
    }
  }

  @media (max-width: 600px) {
    .footer-left,
    .footer-right {
      text-align: center;
    }

    .footer-right {
      float: none;
      margin: 0 auto 20px;
    }

    .footer-left p.footer-links {
      line-height: 1.8;
    }
  }
`;
