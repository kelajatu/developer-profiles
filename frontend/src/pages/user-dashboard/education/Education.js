import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { inputArea, labelArea } from '../../../global-styles/Mixins';

class Education extends Component {
  state = {
    schoolName: "",
    schoolDates: "",
    schoolCourse: "",
    schoolDegree: "",
    education: []
  }

  componentDidMount() {
    if (this.props.userInfo.userEducation) {
      this.setState({education: this.props.userInfo.userEducation})
    }
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
          </form>
        </FormSection>
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

const MainFormContainer = styled.main`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding-top: 130px;
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

const ButtonContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 10px;

  div {
    width: 30%;
    text-align: center;
  }

  button {
    color: black;
    padding: 20px;
    width: 300px;
    font-size: 1.7rem;
    letter-spacing: 1.5px;
    background: white;
    border: solid 1px black;
    border-radius: 20px;
    &:hover {
      cursor: pointer;
      background: black;
      color: white;
    }
  }

  a {
    display: block;
    margin: auto;
    width: 200px;
    text-decoration: none;
    color: black;
    padding: 20px;
    font-size: 1.7rem;
    letter-spacing: 1.5px;
    background: white;
    border: solid 1px black;
    border-radius: 20px;
    &:hover {
      cursor: pointer;
      background: black;
      color: white;
    }
  }
`;

export default Education;
