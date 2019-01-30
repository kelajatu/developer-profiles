import {
  ContentBoxSection,
  Btn,
  CallToAction,
  CTAContainer,
  Circle
} from "./ContentBox.styles";

import React, { Component } from "react";

class ContentBox extends Component {
  render() {
    return (
      <ContentBoxSection>
        <Circle>
          <h1>Welcome to DevProfiles </h1>
          <h2>The premier place to meet all of your tech hiring needs</h2>{" "}
          <br />
        </Circle>

      </ContentBoxSection>
    );
  }
}

export default ContentBox;
