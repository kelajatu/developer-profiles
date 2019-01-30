import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserCardPreview from '../user/UserCardPreview';

import { TextInput, TextArea } from 'grommet';
import {
  MainFormContainer,
  FormSection,
  LabelContainer,
  ButtonContainer
} from '../styles/FormStyles';


class Experience extends Component {
  state = {
    jobTitle: "",
    jobDatesFrom: "2000-05",
    jobDatesTo: "2010-08",
    jobDescription: "",
    experience: this.props.userInfo.userExperience || []
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // Checking package that will be sent for user info
  checkOnSubmit = (e) => {
    e.preventDefault()
    const { jobTitle, jobDates, jobDescription } = this.state;
    const lePackage = {
      user_id: this.props.userInfo.id,
      job_title: jobTitle,
      job_dates: jobDates,
      job_description: jobDescription,
    }
    console.log(lePackage)
    axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}/experience`, lePackage)
      .then(res => {
        console.log(res.data)
        this.props.updateProgress()
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log('EX', this.props.userInfo)
    return (
      <MainFormContainer>
        <header>
          <h1>Experience</h1>
        </header>

        <div className="container">
          <FormSection>
            <form>

              {/* jobtitle */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userJobTitle">
                    Job Title:
                  </label>
                </LabelContainer>
                <TextInput
                  id="userJobTitle"
                  name="jobTitle"
                  className="text-input"
                  placeholder="Software Engineer"
                  focusIndicator
                  value={this.state.jobTitle}
                  onChange={this.onInputChange}
                />
              </div>





              {/* jobdates */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userJobDatesFrom">
                    Job Dates From:
                  </label>
                </LabelContainer>
                <TextInput
                  type="month"
                  id="userJobDatesFrom"
                  name="jobDatesFrom"
                  className="text-input"
                  focusIndicator
                  value={this.state.jobDatesFrom}
                  onChange={this.onInputChange}
                />
              </div>


              {/* jobdates */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userJobDatesTo">
                    Job Dates To:
                  </label>
                </LabelContainer>
                <TextInput
                  type="month"
                  id="userJobDatesTo"
                  name="jobDatesTo"
                  className="text-input"
                  focusIndicator
                  value={this.state.jobDatesTo}
                  onChange={this.onInputChange}
                />
              </div>









              {/* jobdescription */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userJobDescription">
                  Job Description:
                  </label>
                </LabelContainer>
                <TextArea
                  id="userJobDescription"
                  name="jobDescription"
                  className="text-input"
                  placeholder="Some Job Description - This is 128 characters or so describing how
                  awesome I am and why you should like me. Similar
                  to what I put on my LinkedIn!"
                  maxLength="128"
                  focusIndicator
                  resize="vertical"
                  value={this.state.jobDescription}
                  onChange={this.onInputChange}
                />
              </div>

            </form>
          </FormSection>
          <section>
            <header>
              <LabelContainer>
                <label>
                  Profile Preview:
                </label>
              </LabelContainer>
            </header>
            <UserCardPreview userInfo={this.props.userInfo} />
          </section>
        </div>
        <ButtonContainer>
          <div>
            <Link to="/dashboard/projects">Back</Link>
          </div>
          <div>
            <button onClick={this.checkOnSubmit}>Save Info</button>
          </div>
          <div>
            <Link to="/dashboard/education">Next</Link>
          </div>
        </ButtonContainer>
      </MainFormContainer>
    )
  }
}

export default Experience;
