import React from "react";
import { FooterContainer } from "./Footer.styles";

const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer-right">
        <a href="#">
          <i className="fa fa-facebook" />
        </a>
        <a href="#">
          <i className="fa fa-twitter" />
        </a>
        <a href="#">
          <i className="fa fa-linkedin" />
        </a>
        <a href="#">
          <i className="fa fa-github" />
        </a>
      </div>
    </FooterContainer>
  );
};

export default Footer;
