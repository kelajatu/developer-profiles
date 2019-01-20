import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { inputArea, labelArea } from '../../../global-styles/Mixins';


class Experience extends Component {
  state = {
    jobTitle: "",
    jobDates: "",
    jobDescription: "",
    experience: [{
      jobTitle: "titleOne",
      jobDates: "dates",
      jobDescription: "descr"
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
    const { jobTitle, jobDates, jobDescription } = this.state;
    const lePackage = {
      job_title: jobTitle,
      job_dates: jobDates,
      job_description: jobDescription,
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
  padding-left: 100px;
  h1 {
    font-size: 5rem;
    color: rgb(42,42,42);
    margin-bottom: 50px;
  }
  h3 {
    font-size: 2.8rem;
    color: rgb(42,42,42);
  }
`;

const FormSection = styled.section`
  width: 43%; 
  margin-bottom: 100px;
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

export default Experience;
