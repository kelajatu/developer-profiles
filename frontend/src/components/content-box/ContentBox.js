import { ContentBoxSection, Btn, CallToAction, CTAContainer } from "./ContentBox.styles";

import React, { Component } from "react";

class ContentBox extends Component {
  render() {
    return (
      <ContentBoxSection>
        <h1>Welcome to DevProfiles </h1>
        <h2>The premier place to meet all of your tech hiring needs</h2> <br />
        <CTAContainer>
          <CallToAction>
            <p>HEllo hello!</p>
            <a href="#recruiters">
              <Btn className="stripe">Recruiters</Btn>
            </a>{" "}
          </CallToAction>
          <CallToAction>
            HEllo Hello
            <a href="#developers">
              <Btn className="stripe">Developers</Btn>
            </a>
          </CallToAction>
        </CTAContainer>
      </ContentBoxSection>
    );
  }
}

export default ContentBox;
