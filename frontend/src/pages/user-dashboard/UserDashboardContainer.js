import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';


import UserDashboardNav from './UserDashboardNav'
import UserDashboardIntro from './user/returning-user/UserDashboardIntro'
import UserDashboardNew from './user/new-user/UserDashboardNew'
import DashboardQuickstart from './user/new-user/DashboardQuickstart'

import PersonalInfo from './personal-info/PersonalInfo';
import WhereToFindYou from './where-to-find/WhereToFindYou';
import AboutYou from './about-you/AboutYou';
import Projects from './projects/Projects';
import Experience from './experience/Experience';
import Education from './education/Education';
import Billing from './billing/Billing';
import Loader from '../../components/loader/Loader';


class UserDashboardContainer extends Component {
  state = {
    isLoading: false
  }

  updateProgress = () => {
    const userInfo = this.props.auth.getProfile();
    const userEmail = userInfo.email;
    // User has name
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userEmail}`)
    .then(res => {
      const userInfo = res.data;
      // User does not have name?

      // getting edu, exp, proj
      const getUserProjects = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/projects`)
      const getUserExperience = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/experience`)
      const getUserEducation = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/education`)

      Promise.all([getUserProjects, getUserExperience, getUserEducation])
      .then(values => {
  
        // now you have userInfo + locations + all 3(edu,exp,proj)
        const userProjects = values[0].data;
        const userExperience = values[1].data;
        const userEducation = values[2].data;

        let placesInterestedArr = [];
        if (userInfo.interested_location_names !== "" && userInfo.interested_location_names !== null) {
          placesInterestedArr = userInfo.interested_location_names.split('|');
        }

        // Success ?
        let
          profileImgSuccess,
          publicEmailSuccess,
          firstNameSuccess,
          lastNameSuccess,
          areaOfWorkSuccess,
          desiredTitleSuccess,
          currentLocationNameSuccess,
          githubSuccess,
          linkedinSuccess,
          portfolioSuccess,
          acclaimSuccess,
          placesInterestedSuccess,
          summarySuccess,
          topSkillsSuccess,
          additionalSkillsSuccess,
          familiarSkillsSuccess,
          stripeTokenSuccess
        ;
        userInfo.image ? profileImgSuccess = true : profileImgSuccess = false;
        userInfo.public_email ? publicEmailSuccess = true : publicEmailSuccess = false;
        userInfo.first_name ? firstNameSuccess = true : firstNameSuccess = false;
        userInfo.last_name ? lastNameSuccess = true : lastNameSuccess = false;
        userInfo.area_of_work ? areaOfWorkSuccess = true : areaOfWorkSuccess = false;
        userInfo.desired_title ? desiredTitleSuccess = true : desiredTitleSuccess = false;
        userInfo.current_location_name ? currentLocationNameSuccess = true : currentLocationNameSuccess = false;
        userInfo.github ? githubSuccess = true : githubSuccess = false;
        userInfo.linkedin ? linkedinSuccess = true : linkedinSuccess = false;
        userInfo.portfolio ? portfolioSuccess = true : portfolioSuccess = false;
        userInfo.badge ? acclaimSuccess = true : acclaimSuccess = false;
        userInfo.summary ? summarySuccess = true : summarySuccess = false;
        userInfo.interested_location_names ? placesInterestedSuccess = true : placesInterestedSuccess = false;
        userInfo.stripe_token ? stripeTokenSuccess = true : stripeTokenSuccess = false;
        userInfo.top_skills ? topSkillsSuccess = true : topSkillsSuccess = false;
        userInfo.add_skills ? additionalSkillsSuccess = true : additionalSkillsSuccess = false;
        userInfo.familiar ? familiarSkillsSuccess = true : familiarSkillsSuccess = false;



        const allUserInfo = {
          ...userInfo,
          profileImgSuccess,
          publicEmailSuccess,
          firstNameSuccess,
          lastNameSuccess,
          areaOfWorkSuccess,
          desiredTitleSuccess,
          currentLocationNameSuccess,
          githubSuccess,
          linkedinSuccess,
          portfolioSuccess,
          acclaimSuccess,
          placesInterestedSuccess,
          summarySuccess,
          topSkillsSuccess,
          additionalSkillsSuccess,
          familiarSkillsSuccess,
          stripeTokenSuccess,
          userProjects,
          userExperience,
          userEducation,
          placesInterestedArr
        }

        if (!allUserInfo.top_skills) {
          allUserInfo.userTopSkills = [];
        } else {
          axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/skills/top_skills`)
          .then(res => {
            allUserInfo.userTopSkills = res.data;
            this.setState(allUserInfo)
          })
          .catch(err => {
            console.log(err)
          })
        }
        if (!allUserInfo.add_skills) {
          allUserInfo.userAddSkills = [];
        } else {
          axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/skills/add_skills`)
          .then(res => {
            allUserInfo.userAddSkills = res.data;
            this.setState(allUserInfo)
          })
          .catch(err => {
            console.log(err)
          })
        }
        if (!allUserInfo.familiar) {
          allUserInfo.userFamSkills = [];
        } else {
          axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/skills/familiar`)
          .then(res => {
            allUserInfo.userFamSkills = res.data;
            this.setState(allUserInfo)
          })
          .catch(err => {
            console.log(err)
          })
        }
        console.log('USER', allUserInfo)
        this.setState(allUserInfo)
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  }


  componentDidMount() {
    this.setState({isLoading: true})
    const userInfo = this.props.auth.getProfile();
    const userEmail = userInfo.email;
    console.log('B4',userInfo)
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userEmail}`)
    .then(res => {
      const userInfo = res.data;
      console.log('AF',userInfo)
      // getting edu, exp, proj
      const getUserProjects = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/projects`)
      const getUserExperience = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/experience`)
      const getUserEducation = axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/education`)

      Promise.all([getUserProjects, getUserExperience, getUserEducation])
      .then(values => {
  
        // now you have userInfo + locations + all 3(edu,exp,proj)
        const userProjects = values[0].data;
        const userExperience = values[1].data;
        const userEducation = values[2].data;

        let placesInterestedArr = [];
        if (userInfo.interested_location_names !== "" && userInfo.interested_location_names !== null) {
          placesInterestedArr = userInfo.interested_location_names.split('|');
        }

        // Success ?
        let
          profileImgSuccess,
          publicEmailSuccess,
          firstNameSuccess,
          lastNameSuccess,
          areaOfWorkSuccess,
          desiredTitleSuccess,
          currentLocationNameSuccess,
          githubSuccess,
          linkedinSuccess,
          portfolioSuccess,
          acclaimSuccess,
          placesInterestedSuccess,
          summarySuccess,
          topSkillsSuccess,
          additionalSkillsSuccess,
          familiarSkillsSuccess,
          stripeTokenSuccess
        ;
        userInfo.image ? profileImgSuccess = true : profileImgSuccess = false;
        userInfo.public_email ? publicEmailSuccess = true : publicEmailSuccess = false;
        userInfo.first_name ? firstNameSuccess = true : firstNameSuccess = false;
        userInfo.last_name ? lastNameSuccess = true : lastNameSuccess = false;
        userInfo.area_of_work ? areaOfWorkSuccess = true : areaOfWorkSuccess = false;
        userInfo.desired_title ? desiredTitleSuccess = true : desiredTitleSuccess = false;
        userInfo.current_location_name ? currentLocationNameSuccess = true : currentLocationNameSuccess = false;
        userInfo.github ? githubSuccess = true : githubSuccess = false;
        userInfo.linkedin ? linkedinSuccess = true : linkedinSuccess = false;
        userInfo.portfolio ? portfolioSuccess = true : portfolioSuccess = false;
        userInfo.badge ? acclaimSuccess = true : acclaimSuccess = false;
        userInfo.summary ? summarySuccess = true : summarySuccess = false;
        userInfo.interested_location_names ? placesInterestedSuccess = true : placesInterestedSuccess = false;
        userInfo.stripe_token ? stripeTokenSuccess = true : stripeTokenSuccess = false;
        userInfo.top_skills ? topSkillsSuccess = true : topSkillsSuccess = false;
        userInfo.add_skills ? additionalSkillsSuccess = true : additionalSkillsSuccess = false;
        userInfo.familiar ? familiarSkillsSuccess = true : familiarSkillsSuccess = false;



        const allUserInfo = {
          ...userInfo,
          profileImgSuccess,
          publicEmailSuccess,
          firstNameSuccess,
          lastNameSuccess,
          areaOfWorkSuccess,
          desiredTitleSuccess,
          currentLocationNameSuccess,
          githubSuccess,
          linkedinSuccess,
          portfolioSuccess,
          acclaimSuccess,
          placesInterestedSuccess,
          summarySuccess,
          topSkillsSuccess,
          additionalSkillsSuccess,
          familiarSkillsSuccess,
          stripeTokenSuccess,
          userProjects,
          userExperience,
          userEducation,
          placesInterestedArr
        }

        if (!allUserInfo.top_skills) {
          allUserInfo.userTopSkills = [];
        } else {
          axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/skills/top_skills`)
          .then(res => {
            allUserInfo.userTopSkills = res.data;
            this.setState(allUserInfo)
          })
          .catch(err => {
            console.log(err)
          })
        }
        if (!allUserInfo.add_skills) {
          allUserInfo.userAddSkills = [];
        } else {
          axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/skills/add_skills`)
          .then(res => {
            allUserInfo.userAddSkills = res.data;
            this.setState(allUserInfo)
          })
          .catch(err => {
            console.log(err)
          })
        }
        if (!allUserInfo.familiar) {
          allUserInfo.userFamSkills = [];
        } else {
          axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${userInfo.id}/skills/familiar`)
          .then(res => {
            allUserInfo.userFamSkills = res.data;
            this.setState(allUserInfo)
          })
          .catch(err => {
            console.log(err)
          })
        }
        console.log('USER', allUserInfo)
        this.setState({isLoading: false})
        this.setState(allUserInfo)
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
        {!this.state.isLoading && this.state.id ?
          <main>
            <Route exact path={`${this.props.match.path}/`} render={props => <UserDashboardIntro {...props} userInfo={this.state} />} />
            <Route exact path={`${this.props.match.path}/new`} render={props => <UserDashboardNew {...props} userInfo={this.state} />} />
            <Route exact path={`${this.props.match.path}/new/quickstart`} render={props => <DashboardQuickstart {...props} userInfo={this.state} />} />
            <Route path={`${this.props.match.path}/personal-info`} render={props => <PersonalInfo updateProgress={this.updateProgress} {...props} userInfo={this.state} />} />
            <Route path={`${this.props.match.path}/where-to-find-you`} render={props => <WhereToFindYou updateProgress={this.updateProgress} {...props} userInfo={this.state} />} />
            <Route path={`${this.props.match.path}/about-you`} render={props => <AboutYou updateProgress={this.updateProgress} {...props} userInfo={this.state} />} />
            <Route path={`${this.props.match.path}/projects`} render={props => <Projects updateProgress={this.updateProgress} {...props} userInfo={this.state} />} />
            <Route path={`${this.props.match.path}/experience`} render={props => <Experience updateProgress={this.updateProgress} {...props} userInfo={this.state} />} />
            <Route path={`${this.props.match.path}/education`} render={props => <Education updateProgress={this.updateProgress} {...props} userInfo={this.state} />} />
            <Route path={`${this.props.match.path}/billing`} render={props => <Billing updateProgress={this.updateProgress} {...props} userInfo={this.state} />} />
          </main>
          :
          <Loader />
        }
      </DashboardContainer>
    )
  }
}

const DashboardContainer = styled.main`
  /* background-color: #F4F7FC; */
  hr {
    border: solid .5px white;
  }
`;


export default UserDashboardContainer;
