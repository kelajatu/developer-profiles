import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserCardPreview from '../user/UserCardPreview';

import { TextInput, TextArea } from 'grommet';
import {
  MainFormContainer,
  FormSection,
  LabelContainer,
  ImageContainer,
  ButtonContainer
} from '../styles/FormStyles';

class Projects extends Component {
  state = {
    projectImg: "",
    projectTitle: "",
    projectLink: "",
    projectDescription: "",
    projects: this.props.userInfo.userProjects || []
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
    XHR.open('POST', `${process.env.REACT_APP_BACKEND_SERVER}/api/image-upload`);

    // Send our FormData object; HTTP headers are set automatically
    XHR.send(FD);
  }

  checkOnSubmit = (e) => {
    e.preventDefault()
    const { projectTitle, projectImg, projectLink, projectDescription } = this.state;
    const lePackage = {
      user_id: this.props.userInfo.id,
      project_title: projectTitle,
      project_img: projectImg,
      link: projectLink,
      project_description: projectDescription
    }
    console.log(lePackage)
    axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}/projects`, lePackage)
      .then(res => {
        console.log(res.data)
        this.props.updateProgress()
      })
      .catch(err => console.log(err))
  }


  render() {
    console.log('P', this.state)
    return (
      <MainFormContainer>
        <header>
          <h1>Projects</h1>
        </header>

        
        <div className="container">
          <FormSection>
            <form>

              {/* Image */}
              <ImageContainer>
                <LabelContainer>
                  <label htmlFor="userProjectImg">
                    Choose a Project Image:
                  </label>
                </LabelContainer>
                <div className="img-input-sub-container">
                  <div className="img-input-overlay">
                    <i className="fa fa-upload fa-2x"></i>
                  </div>
                  <input
                    id="userProjectImg"
                    type="file"
                    accept="image/*"
                    encrypt="multipart/form-data"
                    onChange={this.uploadPhotoProj}
                  />
                </div>
              </ImageContainer>

              {/* projtitle */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userProjectTitle">
                  Project Name:
                  </label>
                </LabelContainer>
                <TextInput
                  id="userProjectTitle"
                  name="projectTitle"
                  className="text-input"
                  placeholder="My Cool Project"
                  focusIndicator
                  value={this.state.projectTitle}
                  onChange={this.onInputChange}
                />
              </div>

              {/* link */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userProjectLink">
                  Project Link:
                  </label>
                </LabelContainer>
                <TextInput
                  id="userProjectLink"
                  name="projectLink"
                  className="text-input"
                  placeholder="www.mysite.com"
                  focusIndicator
                  value={this.state.projectLink}
                  onChange={this.onInputChange}
                />
              </div>

              {/* projdescription */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userProjectDescription">
                    Summary:
                  </label>
                </LabelContainer>
                <TextArea
                  id="userProjectDescription"
                  name="projectDescription"
                  className="text-input"
                  placeholder="Some Project Description - This is 128 characters or so describing how
                  awesome I am and why you should like me. Similar
                  to what I put on my LinkedIn!"
                  maxLength="128"
                  focusIndicator
                  resize="vertical"
                  value={this.state.projectDescription}
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
            <Link to="/dashboard/about-you">Back</Link>
          </div>
          <div>
            <button onClick={this.checkOnSubmit}>Save Info</button>
          </div>
          <div>
            <Link to="/dashboard/experience">Next</Link>
          </div>
        </ButtonContainer>
      </MainFormContainer>
    )
  }
}

export default Projects;
