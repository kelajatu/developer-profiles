import {
  ContentBoxSection,
  Btn,
  CallToAction,
  CTAContainer,
  SplashBand,
  BtnRow
} from "./ContentBox.styles";

import React, { Component } from "react";

class ContentBox extends Component {
  render() {
    return (
      <ContentBoxSection>
        <SplashBand>
          <CTAContainer>
          <h1>Dev<span>Profiles</span></h1>
              <h2>
                The premier place to meet all of your tech hiring needs
              </h2>{" "}
              <br />
              <BtnRow>

            <CallToAction>

              <a href="#recruiters">
                <Btn>Recruiters</Btn>
              </a>{" "}
            </CallToAction>
            <CallToAction>
              <a href="#developers">
                <Btn>Developers</Btn>
              </a>
            </CallToAction>
              </BtnRow>
          </CTAContainer>
        </SplashBand>
      </ContentBoxSection>
    );
  }
}

export default ContentBox;
