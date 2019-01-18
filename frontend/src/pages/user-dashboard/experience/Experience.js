import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';


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
        <div className="container">
          <form onSubmit={this.checkOnSubmit}>
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
            <br/>
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
            <br/>
            {/* jobdescription */}
            <label htmlFor="userJobDescription">
              Job Description:
            </label>
            <textarea
              rows="4"
              cols="50"
              id="userJobDescription"
              placeholder="Some Job Description - This is 128 characters or so describing how
              awesome I am and why you should like me. Similar
              to what I put on my LinkedIn!"
              name="jobDescription"
              value={this.state.jobDescription}
              onChange={this.onInputChange}
            />
            <button type="submit">Save Info</button>
          </form>
        </div>
        <div>
          <h1>Your Experience</h1>
        </div>
      </MainFormContainer>
    )
  }
}

const MainFormContainer = styled.main`
  width: calc(100% - 220px);
  margin-left: 220px;
  margin-bottom: 100px;
  padding-top: 50px;
  padding-left: 100px;
  h1 {
    font-size: 5rem;
    color: rgb(42,42,42);
  }
  h3 {
    font-size: 2.8rem;
    color: rgb(42,42,42);
  }
  .container {
    margin-bottom: 100px;
  }
`;
export default Experience;
