import React, { Component } from "react";
import ContentBox from "../../components/content-box/ContentBox";
import {
  Pagewrap,
  Moreinfo,
  Learnmore,
  Aboutus,
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
          <Aboutus>
            <TextBlock>
              <h2 id="recruiters">Recruiters</h2>{" "}
              <p>
                Whether you're looking for junior or senior developers, let us
                do the work for you! Sort by location, skills and view top
                projects!
              </p>
            </TextBlock>
            <img src={ProfileSvg} alt="profile graphic" />
          </Aboutus>
          <Learnmore>

            <TextBlock>
              <h2 id="developers">Developers</h2>{" "}
              <p>
                We can help you get you where you want to be by showing your
                profile to top companies!
              </p>
            </TextBlock>
            <img src={GraphSvg} alt="git contribution graphic" />
          </Learnmore>
        </Moreinfo>
      </LandingPageDiv>
    );
  }
}

export default LandingPage;


