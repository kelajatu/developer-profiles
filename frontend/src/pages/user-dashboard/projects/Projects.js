import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';


class Projects extends Component {
  state = {
    projectTitle: "",
    projectImg: "",
    projectLink: "",
    projectDescription: "",
    projects: [{
      projectTitle: "titleOne",
      projectImg: "image",
      projectLink: "linkk",
      projectDescription: "descriptionn",
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
    const { projectTitle, projectImg, projectLink, projectDescription } = this.state;
    const lePackage = {
      project_title: projectTitle,
      project_img: projectImg,
      link: projectLink,
      project_description: projectDescription
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
          <h1>Projects</h1>
        </header>
        <div className="container">
          <FormSection>
            <form onSubmit={this.checkOnSubmit}>

              <div>
                {/* projtitle */}
                <label htmlFor="userProjectTitle">
                  Project Name:
                </label>
                <br/>
                <input
                  type="text"
                  id="userProjectTitle"
                  placeholder="My Cool Project"
                  name="projectTitle"
                  value={this.state.projectTitle}
                  onChange={this.onInputChange}
                />
              </div>

              <div>
                {/* link */}
                <label htmlFor="userProjectLink">
                  Project Link:
                </label>
                <br/>
                <input
                  type="text"
                  id="userProjectLink"
                  placeholder="www.mysite.com"
                  name="projectLink"
                  value={this.state.projectLink}
                  onChange={this.onInputChange}
                />
              </div>

              <div>
                {/* projdescription */}
                <label htmlFor="userProjectDescription">
                  Summary:
                </label>
                <br/>
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
              </div>

              <button type="submit">Save Info</button>
            </form>
          </FormSection>
          <section>
            {/* projimg - Upload Functionality */}
            {/* image - see if you can send '/:id' param on uploadPhoto */}
            <div>
              <label htmlFor="userProjectImg">
                Choose a project picture:
              </label>
              <br/>
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
  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 100px;
    section {
      width: 43%;
    }
  }
`;

const FormSection = styled.section`
  div {
    margin-bottom: 30px;
  }
  label {
    margin-bottom: 5px;
  }
  input {
    padding: 15px;
    width: 90%;
    border: none;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background: white;
    background-color: rgba(255,255,255,.8);
  }
`;

export default Projects;
