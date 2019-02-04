import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { centerFlex } from '../../../../global-styles/Mixins';


class UserDashboardIntro extends Component {
  state = {
    
  }

  render() {
    let profileStatus;
    const {
      profileProgress,

      stripeTokenSuccess,
      firstNameSuccess,
      desiredTitleSuccess,
      currentLocationNameSuccess,
      summarySuccess,
      topSkillsSuccess,

      profileImgSuccess,
      publicEmailSuccess,
      areaOfWorkSuccess,
      portfolioSuccess,

      additionalSkillsSuccess,
      familiarSkillsSuccess,
      userProjects,
      userExperience,
      userEducation,

      linkedinSuccess,
      githubSuccess
    } = this.props.userInfo;


    if (profileProgress >= 30 && profileProgress < 60) {
      profileStatus = 'Basic';
    } else if (profileProgress >= 60 && profileProgress < 90) {
      profileStatus = 'Intermediate';
    } else if (profileProgress >= 90 && profileProgress < 100) {
      profileStatus = 'Strong';
    } else if (profileProgress === 100) {
      profileStatus = 'Powerhouse';
    } else {
      profileStatus = 'Starting';
    }


    return (
      <IntroContainer>
        <header>
          <h1>Your Dashboard</h1>
        </header>

        <article className="container">
          <header>
            <h2>Profile Strength: <strong>{profileStatus}</strong></h2>
          </header>

          <section className="progress-container">
            <ProgressContainer>
              <div progress={`${profileProgress}%`} className="progress-bar" />
            </ProgressContainer>
          </section>

          <section className="basic-section">
            <h3>Basic</h3>
            <div>
              <span>
                {stripeTokenSuccess ?
                  <p>Package Selected!</p>
                  :
                  <Link to="/dashboard/billing">Select a Package</Link>
                }
              </span>
              <span>
                {firstNameSuccess ?
                  <p>First Name!</p>
                  :
                  <Link to="/dashboard/personal-info">First Name</Link>
                }
              </span>
              <span>
                {desiredTitleSuccess ?
                  <p>Desired Title!</p>
                  :
                  <Link to="/dashboard/personal-info">Desired Title</Link>
                }
              </span>
              <span>
                {currentLocationNameSuccess ?
                  <p>Location!</p>
                  :
                  <Link to="/dashboard/where-to-find-you">Location</Link>
                }
              </span>
              <span>
                {summarySuccess ?
                  <p>Summary!</p>
                  :
                  <Link to="/dashboard/about-you">Summary</Link>
                }
              </span>
              <span>
                {topSkillsSuccess ?
                  <p>Top Skills!</p>
                  :
                  <Link to="/dashboard/about-you">Top Skills</Link>
                }
              </span>
            </div>
          </section>
          <section className="intermediate-section">
            <h3>Intermediate</h3>
            <div>
              <span>
                {profileImgSuccess ?
                  <p>Profile Image!</p>
                  :
                  <Link to="/dashboard/personal-info">Profile Image</Link>
                }
              </span>
              <span>
                {publicEmailSuccess ?
                  <p>Public Email!</p>
                  :
                  <Link to="/dashboard/personal-info">Public Email</Link>
                }
              </span>
              <span>
                {areaOfWorkSuccess ?
                  <p>Area of Work!</p>
                  :
                  <Link to="/dashboard/personal-info">Area of Work</Link>
                }
              </span>
              <span>
                {portfolioSuccess ?
                  <p>Portfolio Website!</p>
                  :
                  <Link to="/dashboard/where-to-find-you">Portfolio Website</Link>
                }
              </span>
            </div>
          </section>
          <section className="strong-section">
            <h3>Strong</h3>
            <div>
              <span>
                {additionalSkillsSuccess ?
                  <p>Additional Skills!</p>
                  :
                  <Link to="/dashboard/about-you">Additional Skills</Link>
                }
              </span>
              <span>
                {familiarSkillsSuccess ?
                  <p>Familiar Skills!</p>
                  :
                  <Link to="/dashboard/about-you">Familiar Skills</Link>
                }
              </span>
              <span>
                {userProjects.length >= 1 ?
                  <p>At Least 1 Project!</p>
                  :
                  <Link to="/dashboard/projects">At Least 1 Project</Link>
                }
              </span>
              <span>
                {userExperience.length >= 1 ?
                  <p>At Least 1 Job Experience!</p>
                  :
                  <Link to="/dashboard/experience">At Least 1 Job Experience</Link>
                }
              </span>
              <span>
                {userEducation.length >= 1 ?
                  <p>At Least 1 Education!</p>
                  :
                  <Link to="/dashboard/education">At Least 1 Education</Link>
                }
              </span>
            </div>
          </section>
          <section className="powerhouse-section">
            <h3>Powerhouse</h3>
            <div>
              <span>
                {linkedinSuccess ?
                  <p>LinkedIn!</p>
                  :
                  <Link to="/dashboard/where-to-find-you">LinkedIn</Link>
                }
              </span>
              <span>
                {githubSuccess ?
                  <p>Github!</p>
                  :
                  <Link to="/dashboard/where-to-find-you">Github</Link>
                }
              </span>
              <span>
                {userProjects.length >= 3 ?
                  <p>At Least 3 Projects!</p>
                  :
                  <Link to="/dashboard/projects">At Least 3 Projects</Link>
                }
              </span>
              <span>
                {userExperience.length >= 2 ?
                  <p>At Least 2 Job Experiences!</p>
                  :
                  <Link to="/dashboard/experience">At Least 2 Job Experiences</Link>
                }
              </span>
            </div>
          </section>
        </article>
        <article className="container">
          <header>
            <h2>Your Projects</h2>
          </header>
          <section>
            {userProjects.length === 0 ?
              <p>No Projects!</p>
              :
              userProjects.map((project) => {
                return (
                  <div>
                    <p>{project.project_title}</p>
                    <p>{project.project_description}</p>
                  </div>
                )
              })
            }
          </section>
        </article>
        <article className="container">
          <header>
            <h2>Experience</h2>
          </header>
          <section>
            {userExperience.length === 0 ?
              <p>No Experience Listed!</p>
              :
              userExperience.map((experience) => {
                return (
                  <div>
                    <p>{experience.job_title}</p>
                    <p>{experience.job_description}</p>
                  </div>
                )
              })
            }
          </section>
        </article>
        <article className="container">
          <header>
            <h2>Education</h2>
          </header>
          <section>
            {userEducation.length === 0 ?
              <p>No Experience Listed!</p>
              :
              userEducation.map((education) => {
                return (
                  <div>
                    <p>{education.school}</p>
                    <p>{education.course}</p>
                  </div>
                )
              })
            }
          </section>
        </article>
      </IntroContainer>
    )
  }
}

const IntroContainer = styled.div`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding-top: 130px;
  padding-right: 50px;
  padding-left: 50px;
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
  @media (max-width: 650px) {
    width: 100%;
    margin-left: 0px;
  }
  h1 {
    text-align: left;
    font-size: 4rem;
  }


  .container {
    width: 65%;
    margin-top: 75px;
    border: solid;
    padding: 20px;
    .progress-container {
      width: 100%;
      padding: 20px;
    }
    .basic-section,
    .intermediate-section,
    .strong-section,
    .powerhouse-section {
      margin-bottom: 30px;
      border-bottom: solid .5px red;
      padding: 10px;
    }
    
    h2 {
      font-size: 3rem;
      margin-bottom: 20px;
    }
    h3 {
      font-size: 2.5rem;
      margin-bottom: 20px;
    }
    span {
      font-size: 1.5rem;
      display: inline-block;
      width: 30%;
      border: dotted .5px green;
      margin: 10px;
    }
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  background-color: blue;
  height: 10px;
  border-radius: 50px;
  margin-bottom: 10px;
  .progress-bar {
    background-color: #EE6C4D;
    height: 10px;
    border-radius: 50px;
    width: 60%;
    ${centerFlex()};
    p {
      color: rgb(42,42,42);
      font-size: 1.7rem;
      font-weight: bold;
    }
  }
`;

export default UserDashboardIntro;
