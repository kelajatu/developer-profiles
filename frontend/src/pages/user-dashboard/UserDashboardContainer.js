import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import UserDashboardNav from './UserDashboardNav'
import UserCardPreview from './UserCardPreview'
import UserDashboardIntro from './UserDashboardIntro'

import PersonalInfo from './personal-info/PersonalInfo';
import WhereToFindYou from './where-to-find/WhereToFindYou';
import AboutYou from './about-you/AboutYou';
import Projects from './projects/Projects';
import Experience from './experience/Experience';
import Education from './education/Education';


class UserDashboardContainer extends Component {
  render() {
    console.log(this.props.match)
    return (
      <DashboardContainer>
        <UserDashboardNav {...this.props} />
        <UserCardPreview {...this.props} />
        <hr/>
        <Route exact path={`${this.props.match.path}/`} render={props => <UserDashboardIntro {...props} />} />
        <Route path={`${this.props.match.path}/personal-info`} render={props => <PersonalInfo {...props} />} />
        <Route path={`${this.props.match.path}/where-to-find-you`} render={props => <WhereToFindYou {...props} />} />
        <Route path={`${this.props.match.path}/about-you`} render={props => <AboutYou {...props} />} />
        <Route path={`${this.props.match.path}/projects`} render={props => <Projects {...props} />} />
        <Route path={`${this.props.match.path}/experience`} render={props => <Experience {...props} />} />
        <Route path={`${this.props.match.path}/education`} render={props => <Education {...props} />} />
      </DashboardContainer>
    )
  }
}

const DashboardContainer = styled.main`
  background-color: #F4F7FC;
  hr {
    border: solid .5px white;
    box-shadow: .1px .1px 8px .1px rgba(0,0,0,.1);
  }
`;


export default UserDashboardContainer;
