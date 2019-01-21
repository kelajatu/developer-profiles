import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { inputArea, labelArea } from '../../../global-styles/Mixins';

class Education extends Component {
  state = {
    schoolName: "",
    schoolDates: "",
    schoolCourse: "",
    schoolDegree: "",
    education: [{
      schoolName: "titleOne",
      schoolDates: "dates",
      schoolCourse: "course",
      schoolDegree: "degree",
    }]
  }

  componentDidMount() {
    // for returning users
    // get data from session storage
    // hydrate state
    // remove from session storage
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  // Checking package that will be sent for user info
  checkOnSubmit = (e) => {
    e.preventDefault()
    const { schoolName, schoolDates, schoolCourse, schoolDegree } = this.state;
    const lePackage = {
      school: schoolName,
      school_dates: schoolDates,
      degree: schoolCourse,
      course: schoolDegree
    }
    console.log(lePackage)
    axios.put(`https://developer-profiles.herokuapp.com/users/${this.props.userId}`, lePackage)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <MainFormContainer>
        <header>
          <h1>Education</h1>
        </header>
        <FormSection>
          <form onSubmit={this.checkOnSubmit}>

            <div>
              {/* school */}
              <label htmlFor="userSchoolName">
                School Name:
              </label>
              <input
                type="text"
                id="userSchoolName"
                placeholder="Lambda School"
                name="schoolName"
                value={this.state.schoolName}
                onChange={this.onInputChange}
              />
            </div>

            <div>
              {/* schooldates - year/month options? */}
              <label htmlFor="userSchoolDates">
                Dates Attended:
              </label>
              <input
                type="text"
                id="userSchoolDates"
                placeholder="2017-2019"
                name="schoolDates"
                value={this.state.schoolDates}
                onChange={this.onInputChange}
              />
            </div>
            
            <div>
              {/* course */}
              <label htmlFor="userSchoolCourse">
                School Course:
              </label>
              <input
                type="text"
                id="userSchoolCourse"
                placeholder="Computer Science"
                name="schoolCourse"
                value={this.state.schoolCourse}
                onChange={this.onInputChange}
              />
            </div>

            <div>
              {/* degree */}
              <label htmlFor="userSchoolDegree">
                Dates Attended:
              </label>
              <input
                type="text"
                id="userSchoolDegree"
                placeholder="Bachelors"
                name="schoolDegree"
                value={this.state.schoolDegree}
                onChange={this.onInputChange}
              />
            </div>

            <button type="submit">Save Info</button>
          </form>
        </FormSection>
      </MainFormContainer>
    )
  }
}

const MainFormContainer = styled.main`
  width: calc(100% - 300px);
  margin-left: 300px;
  margin-bottom: 100px;
  padding-top: 50px;
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
  h1 {
    font-size: 5rem;
    color: rgb(42,42,42);
    margin-bottom: 50px;
    text-align: center;
  }
  h3 {
    font-size: 2.8rem;
    color: rgb(42,42,42);
  }
`;

const FormSection = styled.section`
  width: 50%;
  margin-bottom: 100px;
  margin: auto;
  div {
    margin-bottom: 30px;
  }
  label {
    ${labelArea()};
  }
  input {
    ${inputArea()};
  }
`;

export default Education;