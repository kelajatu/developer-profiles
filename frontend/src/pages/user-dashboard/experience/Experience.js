import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { inputArea, labelArea } from '../../../global-styles/Mixins';


class Experience extends Component {
  state = {
    jobTitle: "",
    jobDates: "",
    jobDescription: "",
    experience: []
  }

  componentDidMount() {
    if (this.props.userInfo.userExperience) {
      this.setState({experience: this.props.userInfo.userExperience})
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
        <FormSection>
          <form onSubmit={this.checkOnSubmit}>

            <div>
              {/* jobtitle */}
              <label htmlFor="userJobTitle">
                Job Title:
              </label>
              <input
                type="text"
                id="userJobTitle"
                placeholder="Software Engineer"
                name="jobTitle"
                value={this.state.jobTitle}
                onChange={this.onInputChange}
              />
            </div>

            <div>
              {/* jobdates - year/month options? */}
              <label htmlFor="userJobDates">
                Job Dates:
              </label>
              <input
                type="text"
                id="userJobDates"
                placeholder="2017-2019"
                name="jobDates"
                value={this.state.jobDates}
                onChange={this.onInputChange}
              />
            </div>

            <div>
              {/* jobdescription */}
              <label htmlFor="userJobDescription">
                Job Description:
              </label>
              <textarea
                id="userJobDescription"
                placeholder="Some Job Description - This is 128 characters or so describing how
                awesome I am and why you should like me. Similar
                to what I put on my LinkedIn!"
                name="jobDescription"
                value={this.state.jobDescription}
                onChange={this.onInputChange}
              />
            </div>
          </form>
        </FormSection>
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

const MainFormContainer = styled.main`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding-left: 100px;
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
  input, textarea {
    ${inputArea()};
  }
  textarea {
    padding: 15px 15px 60px;
    resize: vertical;
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

export default Experience;
