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
    profileStatus: 'Not Live',
    userProgress: '20%',
    user: {}
  }

  updateProgress = () => {
    console.log('UUPPDATTEEEEEEEE')
    const userInfo = this.props.auth.getProfile();
    console.log('USER INFO',userInfo)
    const userEmail = userInfo.email;
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userEmail}`)
    .then(res => {
      const userInfo = res.data;
      // getting edu, exp, proj
      const getUserProjects = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/projects`)
      const getUserExperience = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/experience`)
      const getUserEducation = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/education`)
      Promise.all([getUserProjects, getUserExperience, getUserEducation])
      .then(values => {
  
        // now you have userInfo + locations + all 3(edu,exp,proj)
        console.log('PROMISE',values)
        const userProjects = values[0].data;
        const userExperience = values[1].data;
        const userEducation = values[2].data;
        
        let placesInterestedArr = [];
        if (userInfo.interested_location_names !== "" && userInfo.interested_location_names !== null) {
          placesInterestedArr = userInfo.interested_location_names.split('|');
        }
        console.log('CCC', placesInterestedArr)

        const allUserInfo = {
          ...userInfo,
          userProjects,
          userExperience,
          userEducation,
          placesInterestedArr
        }
        console.log('ALLUSERINFO', allUserInfo)


        let updatedUserProgress = 20;
        for (let key in allUserInfo) {
          if (
            !(allUserInfo[key] === null ||
            allUserInfo[key] === undefined ||
            allUserInfo[key] === '' ||
            (Array.isArray(allUserInfo[key]) && allUserInfo[key].length === 0))
          ) {
            console.log(key)
            // need *switch* to add points based on what is filled in
            // need to add billing auth key to user table
            // remove either title or filter
            if (key === 'image') {
              updatedUserProgress += 5
            } else if (key === 'public_email') {
              updatedUserProgress += 5
            } else if (key === 'portfolio') {
              updatedUserProgress += 2
            } else if (key === 'github') {
              updatedUserProgress += 5
            } else if (key === 'stripe_token') {
              updatedUserProgress += 30
            }
            else if (key === 'current_location_name') {
              updatedUserProgress += 10
            } else if (key === 'area_of_work') {
              updatedUserProgress += 5
            } else if (key === 'desired_title') {
              updatedUserProgress += 5
            } else if (key === 'summary') {
              updatedUserProgress += 10
            }
          }
        }
        if (updatedUserProgress < 80) {
          var newProfileStatus = 'Not Live';
        } else {
          var newProfileStatus = 'Live';
        }
        updatedUserProgress = '' + updatedUserProgress + '%'
        this.setState({profileStatus: newProfileStatus, userProgress: updatedUserProgress, ...allUserInfo})
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  }
  
  
  componentDidMount() {
    const userInfo = this.props.auth.getProfile();
    console.log('USER INFO',userInfo)
    const userEmail = userInfo.email;
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userEmail}`)
    .then(res => {
      const userInfo = res.data;
      // getting edu, exp, proj
      const getUserProjects = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/projects`)
      const getUserExperience = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/experience`)
      const getUserEducation = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/education`)
      Promise.all([getUserProjects, getUserExperience, getUserEducation])
      .then(values => {
        
        // now you have userInfo + locations + all 3(edu,exp,proj)
        console.log('PROMISE',values)
        const userProjects = values[0].data;
        const userExperience = values[1].data;
        const userEducation = values[2].data;

        let placesInterestedArr = [];
        if (userInfo.interested_location_names !== "" && userInfo.interested_location_names !== null) {
          placesInterestedArr = userInfo.interested_location_names.split('|');
        }

        console.log('CCC', placesInterestedArr)
        
        const allUserInfo = {
          ...userInfo,
          userProjects,
          userExperience,
          userEducation,
          placesInterestedArr
        }
        console.log('ALLUSERINFO', allUserInfo)
        
        let updatedUserProgress = 20;
        for (let key in allUserInfo) {
          if (
            !(allUserInfo[key] === null ||
            allUserInfo[key] === undefined ||
            allUserInfo[key] === '' ||
            (Array.isArray(allUserInfo[key]) && allUserInfo[key].length === 0))
          ) {
            console.log(key)
            // need *switch* to add points based on what is filled in
            // need to add billing auth key to user table
            // remove either title or filter
            if (key === 'image') {
              updatedUserProgress += 5
            } else if (key === 'public_email') {
              updatedUserProgress += 5
            } else if (key === 'portfolio') {
              updatedUserProgress += 2
            } else if (key === 'github') {
              updatedUserProgress += 5
            } else if (key === 'stripe_token') {
              updatedUserProgress += 30
            }
            else if (key === 'current_location_name') {
              updatedUserProgress += 10
            } else if (key === 'area_of_work') {
              updatedUserProgress += 5
            } else if (key === 'desired_title') {
              updatedUserProgress += 5
            } else if (key === 'summary') {
              updatedUserProgress += 10
            }
          }
        }
        if (updatedUserProgress < 80) {
          var newProfileStatus = 'Not Live';
        } else {
          var newProfileStatus = 'Live';
        }
        updatedUserProgress = '' + updatedUserProgress + '%'
        this.setState({profileStatus: newProfileStatus, userProgress: updatedUserProgress, ...allUserInfo})
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
        <Route path={`${this.props.match.path}/personal-info`} render={props => <PersonalInfo updateProgress={this.updateProgress} {...props} userInfo={this.state} />} />
        <Route path={`${this.props.match.path}/where-to-find-you`} render={props => <WhereToFindYou updateProgress={this.updateProgress} {...props} userInfo={this.state} />} />
        <Route path={`${this.props.match.path}/about-you`} render={props => <AboutYou updateProgress={this.updateProgress} {...props} userInfo={this.state} />} />
        <Route path={`${this.props.match.path}/projects`} render={props => <Projects updateProgress={this.updateProgress} {...props} userInfo={this.state} />} />
        <Route path={`${this.props.match.path}/experience`} render={props => <Experience updateProgress={this.updateProgress} {...props} userInfo={this.state} />} />
        <Route path={`${this.props.match.path}/education`} render={props => <Education updateProgress={this.updateProgress} {...props} userInfo={this.state} />} />
        <Route path={`${this.props.match.path}/billing`} render={props => <Billing updateProgress={this.updateProgress} {...props} userInfo={this.state} />} />
        <hr/>
        <UserCardPreview {...this.props} userInfo={this.state} />
      </DashboardContainer>
    )
  }
}

const DashboardContainer = styled.main`
  /* background-color: #F4F7FC; */
  hr {
    border: solid .5px white;
    box-shadow: .1px .1px 8px .1px rgba(0,0,0,.1);
  }
`;


export default UserDashboardContainer;
