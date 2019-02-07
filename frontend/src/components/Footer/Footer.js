import React from "react";
import { FooterContainer } from "./Footer.styles";

const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer-right">

        <a href="#">
          <i className="fab fa-facebook" />
        </a>
        <a href="#">
          <i className="fab fa-twitter" />
        </a>
        <a href="#">
          <i className="fab fa-linkedin" />
        </a>
        <a href="#">
          <i className="fab fa-github" />
        </a>
      </div>

      <div className="footer-left">
        <p className="footer-links">
          <a href="#">Home</a>
        </p>

        <p>Developer Profiles &copy; 2019</p>
      </div>
    </FooterContainer>
  );
};

export default Footer;


