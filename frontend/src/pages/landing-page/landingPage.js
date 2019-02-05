import React, { Component } from "react";
import ContentBox from "../../components/content-box/ContentBox";
import {
  Pagewrap,
  Moreinfo,
  DevText,
  RecruiterText,
  LandingPageDiv,
  TextBlock
} from "./landingpage.styles";
import ProfileSvg from "./profile.svg";
import GraphSvg from "./activity.svg";

class LandingPage extends Component {
  render() {
    return (
      <LandingPageDiv>
        <Pagewrap>
          <ContentBox />
        </Pagewrap>
        <Moreinfo>
          <RecruiterText>
            <TextBlock>
              <h2 id="recruiters">Recruiters</h2>{" "}
              <p>
                Whether you're looking for junior or senior developers, let us
                do the work for you. Sort by location and willingness to relocate,
                view skills and check out candidates' featured projects, gitHub pages and portfolios!

              </p>
            </TextBlock>
            <img src={ProfileSvg} alt="profile graphic" />
          </RecruiterText>
          <DevText>

            <TextBlock>
              <h2 id="developers">Developers</h2>{" "}
              <p>
                Let us help you get you where you want to go by showing your
                profile to top companies across a wide variety of industries. Give us a try!
              </p>
            </TextBlock>
            <img src={GraphSvg} alt="git contribution graphic" />
          </DevText>
        </Moreinfo>
      </LandingPageDiv>
    );
  }
}

export default LandingPage;


