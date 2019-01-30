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


class Education extends Component {
  state = {
    schoolName: "",
    schoolDatesFrom: "2000-05",
    schoolDatesTo: "2010-08",
    schoolCourse: "",
    schoolDegree: "",
    education: this.props.userInfo.userEducation || []
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  // Checking package that will be sent for user info
  checkOnSubmit = (e) => {
    e.preventDefault()
    const { schoolName, schoolDates, schoolCourse, schoolDegree } = this.state;
    const lePackage = {
      user_id: this.props.userInfo.id,
      school: schoolName,
      school_dates: schoolDates,
      degree: schoolCourse,
      course: schoolDegree
    }
    console.log(lePackage)
    axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}/education`, lePackage)
      .then(res => {
        console.log(res.data)
        this.props.updateProgress()
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log('ED', this.props.userInfo)
    return (
      <MainFormContainer>
        <header>
          <h1>Education</h1>
        </header>

        <div className="container">
          <FormSection>
            <form>



              {/* school */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userSchoolName">
                    School Name:
                  </label>
                </LabelContainer>
                <TextInput
                  id="userSchoolName"
                  name="schoolName"
                  className="text-input"
                  placeholder="Lambda School"
                  focusIndicator
                  value={this.state.schoolName}
                  onChange={this.onInputChange}
                />
              </div>






              {/* schooldates */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userSchoolDatesFrom">
                    Dates Attended From:
                  </label>
                </LabelContainer>
                <TextInput
                  type="month"
                  id="userSchoolDatesFrom"
                  name="schoolDatesFrom"
                  className="text-input"
                  focusIndicator
                  value={this.state.schoolDatesFrom}
                  onChange={this.onInputChange}
                />
              </div>

              {/* schooldates */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userSchoolDatesTo">
                    Dates Attended To:
                  </label>
                </LabelContainer>
                <TextInput
                  type="month"
                  id="userSchoolDatesTo"
                  name="schoolDatesTo"
                  className="text-input"
                  focusIndicator
                  value={this.state.schoolDatesTo}
                  onChange={this.onInputChange}
                />
              </div>






              {/* course */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userSchoolCourse">
                    School Course:
                  </label>
                </LabelContainer>
                <TextInput
                  id="userSchoolCourse"
                  name="schoolCourse"
                  className="text-input"
                  placeholder="Computer Science"
                  focusIndicator
                  value={this.state.schoolCourse}
                  onChange={this.onInputChange}
                />
              </div>



              {/* degree */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userSchoolDegree">
                    School Degree:
                  </label>
                </LabelContainer>
                <TextInput
                  id="userSchoolDegree"
                  name="schoolDegree"
                  className="text-input"
                  placeholder="Bachelors"
                  focusIndicator
                  value={this.state.schoolDegree}
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
            <Link to="/dashboard/experience">Back</Link>
          </div>
          <div>
            <button onClick={this.checkOnSubmit}>Save Info</button>
          </div>
          <div>
            <Link to="/dashboard/billing">Next</Link>
          </div>
        </ButtonContainer>
      </MainFormContainer>
    )
  }
}

export default Education;
