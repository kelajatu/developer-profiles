import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import UserDashboardNav from './UserDashboardNav'
import UserCardPreview from './UserCardPreview'
import UserCardProgress from './UserCardProgress'
import UserDashboardIntro from './UserDashboardIntro'

import PersonalInfo from './personal-info/PersonalInfo';
import WhereToFindYou from './where-to-find/WhereToFindYou';
import AboutYou from './about-you/AboutYou';
import Projects from './projects/Projects';
import Experience from './experience/Experience';
import Education from './education/Education';
import Billing from './billing/Billing';


class UserDashboardContainer extends Component {
  state = {
    userProgress: '20%'
  }

  componentDidMount() {
    const userInfo = this.props.auth.getProfile();
    const userEmail = userInfo.email;
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userEmail}`)
    .then(res => {
      const userInfo = res.data;
      console.log('CHECKK',userInfo)

      // breaking up locations
      const userLocationSplit = userInfo.location.split('_');
      const userLocationObj = {
        locationId: userLocationSplit[0],
        locationName: userLocationSplit[1]
      }
      const userPlacesSplit = userInfo.places.split('|');
      let userPlacesArr = [];
      userPlacesSplit.forEach(place => {
        let placesHolder = place.split('_')
        let placeObjHolder = {
          locationId: placesHolder[0],
          locationName: placesHolder[1]
        }
        userPlacesArr.push(placeObjHolder)
      })
      console.log(userPlacesArr)

      // getting edu, exp, proj
      const userProjects = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/projects`)
      const userExperience = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/experience`)
      const userEducation = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/education`)
      Promise.all([userProjects, userExperience, userEducation])
      .then(values => {

        // now you have userInfo + all 3(edu,exp,proj)
        console.log('PROMISEEEE',values)
        this.setState({userProgress: 'updatedUserProgress', ...userInfo, userLocationObj, userPlacesArr})
      })
      .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log('DASH STATE', this.state)
    return (
      <DashboardContainer>
        <UserDashboardNav {...this.props} />
        <UserCardProgress {...this.props} {...this.state} />
        <hr/>
        <Route exact path={`${this.props.match.path}/`} render={props => <UserDashboardIntro {...props} />} />
        <Route path={`${this.props.match.path}/personal-info`} render={props => <PersonalInfo {...props} userInfo={this.state} />} />
        <Route path={`${this.props.match.path}/where-to-find-you`} render={props => <WhereToFindYou {...props} userInfo={this.state} />} />
        <Route path={`${this.props.match.path}/about-you`} render={props => <AboutYou {...props} userInfo={this.state} />} />
        <Route path={`${this.props.match.path}/projects`} render={props => <Projects {...props} userInfo={this.state} />} />
        <Route path={`${this.props.match.path}/experience`} render={props => <Experience {...props} userInfo={this.state} />} />
        <Route path={`${this.props.match.path}/education`} render={props => <Education {...props} userInfo={this.state} />} />
        <Route path={`${this.props.match.path}/billing`} render={props => <Billing {...props} />} userInfo={this.state} />
        <hr/>
        <UserCardPreview {...this.props} />
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
