import { 
  ContentBoxSection, 
  ButtonContainer, 
  Btn, 
  // SampleCard
} from "./ContentBox.styles";

import React, { Component } from "react";

class ContentBox extends Component {
  render() {
    return (
      <ContentBoxSection>
        <h1>Welcome to DevProfiles </h1>
        <h2>The premier place to meet all of your tech hiring needs</h2> <br/>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.Quibusdam
          veniam, veritatis est blanditiis autem perferendis,asperiores.
        </p>
        <ButtonContainer>
          <a href="#aboutus">
            <Btn className="stripe">Recruiters</Btn>
          </a>
          <a href="#learnmore">
            <Btn className="stripe">Developers</Btn>
          </a>
        </ButtonContainer>
      </ContentBoxSection>

    );
  }
}

export default ContentBox;
