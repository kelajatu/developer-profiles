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

      <div className="footer-left">
        <p className="footer-links">
          <a href="#">Home</a>
          <a href="#">Blog</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
          <a href="#">Faq</a>
          <a href="#">Contact</a>
        </p>

        <p>Developer Profiles &copy; 2019</p>
      </div>
    </FooterContainer>
  );
};

export default Footer;
