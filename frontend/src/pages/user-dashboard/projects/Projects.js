import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { inputArea, labelArea, centerFlex } from '../../../global-styles/Mixins';


class Projects extends Component {
  state = {
    projectTitle: "",
    projectImg: "",
    projectLink: "",
    projectDescription: "",
    projects: []
  }

  componentDidMount() {
    if (this.props.userInfo.userProjects) {
      this.setState({projects: this.props.userInfo.userProjects})
    }
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

  deleteImage = () => {
    // delete from db
    this.setState({projectImg: ""})
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
            <form onSubmit={this.checkOnSubmit}>

              <div>
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
              </div>

              <div>
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
              </div>

              <div>
                {/* projdescription */}
                <label htmlFor="userProjectDescription">
                  Summary:
                </label>
                <textarea
                  id="userProjectDescription"
                  placeholder="Some Project Description - This is 128 characters or so describing how
                  awesome I am and why you should like me. Similar
                  to what I put on my LinkedIn!"
                  name="projectDescription"
                  value={this.state.projectDescription}
                  onChange={this.onInputChange}
                />
              </div>
            </form>
          </FormSection>
          <section>
            {/* projimg - Upload Functionality */}
            {/* image - see if you can send '/:id' param on uploadPhoto */}
            {/* <ImageForm>
              <label htmlFor="userProjectImg">
                Choose a project picture:
              </label>
              <div className="upload-container">
                {this.state.projectImg === "" ?
                <div className="input-container">
                  <span><i className="fa fa-upload fa-7x"></i><br/><p>350x350</p></span>
                  <input
                    id="userProjectImg"
                    type="file"
                    accept="image/*"
                    encrypt="multipart/form-data"
                    onChange={this.uploadPhotoProj}
                  />
                </div>
                  :
                  null
                }
                {this.state.projectImg === "" ?
                  null
                  :
                  <div className="image-container">
                    <span onClick={this.deleteImage}><i className="fa fa-times-circle fa-3x"></i></span>
                    <img src={this.state.projectImg} alt="P"/>
                  </div>
                }
              </div>
            </ImageForm> */}
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

const MainFormContainer = styled.main`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding-top: 130px;
  padding-left: 100px;
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
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
      width: 45%;
    }
  }
`;

const FormSection = styled.section`
  width: 43%;
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

const ImageForm = styled.form`
  label {
    ${labelArea()};
  }
  .upload-container {
    width: 350px;
    height: 350px;
    border: solid .5px #dbdee2;
    .input-container {
      width: 100%;
      height: 100%;
      input[type=file] {
        width: 100%;
        height: 100%;
        opacity: 0;
        &:hover {
          cursor: pointer;
          color: gray;
        }
      }
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      p {
        text-align: center;
        font-size: 1.4rem;
        line-height: 23px;
        font-family: inherit;
        font-weight: bold;
        color: rgb(42,42,42);
        opacity: .8;
      }
      &:hover {
        cursor: pointer;
        color: gray;
      }
    }
    .image-container {
      width: 100%;
      height: 100%;
      span {
        position: absolute;
        height: 50px;
        width: 50px;
        top: 1%;
        right: 1%;
        z-index: 20;
        ${centerFlex()};
        &:hover {
          cursor: pointer;
          color: gray;
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
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

export default Projects;
