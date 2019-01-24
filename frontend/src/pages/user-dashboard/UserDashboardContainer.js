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
    console.log('CHECKK',userInfo)
    const userEmail = userInfo.email;
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userEmail}`)
    .then(res => {
      const userInfo = res.data;
      var userLocationObj;
      var userPlacesArr;

      // breaking up locations
      if (userInfo.location !== null) {
        let userLocationSplit = userInfo.location.split('/');
        userLocationObj = {
          locationId: userLocationSplit[0],
          locationName: userLocationSplit[1],
          locationLat: userLocationSplit[2],
          locationLong: userLocationSplit[3]
        }
      }
      console.log('CUURLOCATION', userLocationObj)
      
      if (userInfo.places !== null) {
        let userPlacesSplit = userInfo.places.split('|');
        userPlacesArr = [];
        userPlacesSplit.forEach(place => {
          let placesHolder = place.split('/')
          let placeObjHolder = {
            locationId: placesHolder[0],
            locationName: placesHolder[1],
            locationLat: placesHolder[2],
            locationLong: placesHolder[3]
          }
          userPlacesArr.push(placeObjHolder)
        })
      }
      console.log('PLACESS', userPlacesArr)
      
      // getting edu, exp, proj
      const getUserProjects = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/projects`)
      const getUserExperience = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/experience`)
      const getUserEducation = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/education`)
      Promise.all([getUserProjects, getUserExperience, getUserEducation])
      .then(values => {

        // now you have userInfo + locations + all 3(edu,exp,proj)
        console.log('PROMISEEEE',values)
        const userProjects = values[0].data;
        const userExperience = values[1].data;
        const userEducation = values[2].data;

        const allUserInfo = {
          ...userInfo,
          userProjects,
          userExperience,
          userEducation,
          userLocationObj,
          userPlacesArr
        }
        console.log('ALL', allUserInfo)
        let updatedUserProgress = parseInt(this.state.userProgress);

        for (let key in allUserInfo) {
          if (
            !(allUserInfo[key] === null ||
            allUserInfo[key] === undefined ||
            allUserInfo[key] === '' ||
            (Array.isArray(allUserInfo[key]) && allUserInfo[key].length === 0))
          ) {
            console.log(key)
            // need switch to add points based on what is filled in
            // need to add billing auth key to user table
            // remove either title or filter
            if (key === 'image') {
              updatedUserProgress += 5
            }
          }
        }
        updatedUserProgress = '' + updatedUserProgress + '%'
        this.setState({userProgress: updatedUserProgress, ...allUserInfo})
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
