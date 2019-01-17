/*
API / FORMATTING

--------
User should already be in DB from '/register' at this point
When user registers through Auth0/passport, they will return some user info
might need to make name/last/email optional, or only work with 3rd party
Auth that returns at minimum an email
-----

---
all API calls from here will use PUT:'/:id'
---

---
it will not be just one big form

image upload will have own submit to DB(onUpload or hidden save button with feedback)

all user info can go in one submit:
email,fname,lname,title,location,git,linked,portfolio,acclaim,places,summary,skills

projects will have own submit

education will have own submit

experience will have own submit
---

---
Possible Flow
user registers with 3rd party oAuth
oAuth returns token + limited user info
user is created with limited info '/register'
user is sent to profile(seeker) + userId from DB
user can fill out any info - all submits will be PUT

x amount of info must be filled out for user card to be added to the developers list
billing must be completed as well
make a progress bar to publish user profile, progress will include minimum user info + billing
add CTA for billing, maybe button next to save, or a billing tab/link

User is now free to visit any page
---

*/

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
  state = {
    userId: 1,
  }
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
