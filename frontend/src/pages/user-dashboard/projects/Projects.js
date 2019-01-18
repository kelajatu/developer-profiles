import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';


class Projects extends Component {
  state = {
    projectTitle: "",
    projectImg: "",
    projectLink: "",
    projectDescription: "",
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

  uploadPhotoProj = (e) => {
    const file = e.target.files[0];
    let XHR = new XMLHttpRequest();
    let FD  = new FormData();

    // Push our data into our FormData object
    FD.append('image', file);

    var self = this;
    // Define what happens on successful data submission
    XHR.addEventListener('load', function(event) {
      let url = JSON.parse(event.target.responseText);
      self.setState({projectImg: url.imgUrl})
    });

    // Define what happens in case of error
    XHR.addEventListener('error', function(event) {
      alert('Oops! Something went wrong.');
    });

    // Set up our request
    XHR.open('POST', 'https://developer-profiles.herokuapp.com/api/image-upload');

    // Send our FormData object; HTTP headers are set automatically
    XHR.send(FD);
  }

  checkOnSubmit = (e) => {
    e.preventDefault()
    console.log(this.state);
  }

  render() {
    return (
      <MainFormContainer>
        <header>
          <h1>Projects</h1>
        </header>
        <div className="container">
          <section>
            <form onSubmit={this.checkOnSubmit}>
              {/* projtitle */}
              <label htmlFor="userProjectTitle">
                Project Name:
              </label>
              <input
                type="text"
                id="userProjectTitle"
                placeholder="My Cool Project"
                name="projectTitle"
                value={this.state.projectTitle}
                onChange={this.onInputChange}
              />
              <br/>
              {/* link */}
              <label htmlFor="userProjectLink">
                Project Link:
              </label>
              <input
                type="text"
                id="userProjectLink"
                placeholder="www.mysite.com"
                name="projectLink"
                value={this.state.projectLink}
                onChange={this.onInputChange}
              />
              <br/>
              {/* projdescription */}
              <label htmlFor="userProjectDescription">
                Summary:
              </label>
              <textarea
                rows="4"
                cols="50"
                id="userProjectDescription"
                placeholder="Some Project Description - This is 128 characters or so describing how
                awesome I am and why you should like me. Similar
                to what I put on my LinkedIn!"
                name="projectDescription"
                value={this.state.projectDescription}
                onChange={this.onInputChange}
              />
              <button type="submit">Save Info</button>
            </form>
          </section>
          <section>
            {/* projimg - Upload Functionality */}
            {/* image - see if you can send '/:id' param on uploadPhoto */}
            <div>
              <label htmlFor="userProjectImg">
                Choose a project picture:
              </label>
              <input
                id="userProjectImg"
                type="file"
                accept="image/*"
                encrypt="multipart/form-data"
                onChange={this.uploadPhotoProj}
              />
            </div>
            {/* Show photo on Photo upload */}
            <div>
              {this.state.projectImg === "" ?
                null
                :
                <img src={this.state.projectImg} alt="P"/>
              }
            </div>
          </section>
        </div>
        <div>
          <h1>Your Projects</h1>
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
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 100px;
    section {
      width: 43%;
    }
  }
`;

export default Projects;
