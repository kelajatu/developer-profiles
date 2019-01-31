import React, { Component } from "react";
import ContentBox from "../../components/content-box/ContentBox";
import {
  Pagewrap,
  Moreinfo,
  Learnmore,
  Aboutus,
  LandingPageDiv
} from "./landingpage.styles";

import { Btn, CallToAction, CTAContainer } from "../../components/content-box/ContentBox.styles";

class LandingPage extends Component {
  render() {
    return (
      <LandingPageDiv>
        <Pagewrap>
          <ContentBox />

        </Pagewrap>
        <Moreinfo>
          <Aboutus>
            <h2 id="recruiters">Recruiters</h2>{" "}
            <p>
          Whether you're looking for junior or senior developers, let us do the work for you!
            </p>
          </Aboutus>
          <Learnmore>
            <h2 id="developers">Developers</h2>
            We can help you get you where you want to be by showing your profile to top companies!
          </Learnmore>
        </Moreinfo>
      </LandingPageDiv>
    );
  }
}

export default LandingPage;
