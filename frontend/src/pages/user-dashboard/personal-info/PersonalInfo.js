import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { inputArea, labelArea, centerFlex } from '../../../global-styles/Mixins';
import UserCardPreview from '../UserCardPreview';

import { TextInput } from 'grommet';


class PersonalInfo extends Component {
  state = {
    publicEmail: this.props.userInfo.public_email || "",
    firstName: this.props.userInfo.first_name || "",
    lastName: this.props.userInfo.last_name || "",
    profileImg: this.props.userInfo.image || "",
    desiredTitle: this.props.userInfo.desired_title || "",
    areaOfWork: this.props.userInfo.area_of_work || ""
  }

  componentDidMount() {
    // for new/returning users
    // get user data from session storage
    // hydrate state
    // remove from session storage
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  uploadPhoto = (e) => {
    const file = e.target.files[0];
    let XHR = new XMLHttpRequest();
    let FD  = new FormData();
    FD.append('image', file);

    // Define what happens on successful data submission
    var self = this;
    XHR.addEventListener('load', function(event) {
      let url = JSON.parse(event.target.responseText);
      self.setState({profileImg: url.imgUrl})
      // send URL to DB if you cant before
    });

    // Define what happens in case of error
    XHR.addEventListener('error', function(event) {
      alert('Oops! Something went wrong.');
    });

    XHR.open('POST', `${process.env.REACT_APP_BACKEND_SERVER}/api/image-upload`);

    XHR.send(FD);
  }

  checkOnSubmit = (e) => {
    e.preventDefault()

    console.log("FDFA")

    const {publicEmail, firstName, lastName, profileImg, areaOfWork, desiredTitle} = this.state;
    const lePackage = {
      public_email: publicEmail,
      first_name: firstName,
      last_name: lastName,
      image: profileImg,
      area_of_work: areaOfWork,
      desired_title: desiredTitle
    }

    axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}`, lePackage)
      .then(res => {
        console.log(res.data)
        this.props.updateProgress()
      })
      .catch(err => console.log(err))
  }

  deleteImage = () => {
    // delete from db
    this.setState({profileImg: ""})
  }

  render() {
    console.log('P-info', this.props.userInfo)
    return (
      <MainFormContainer>
        <header>
          <h1>Personal Info</h1>
        </header>

        <div className="container">
          <FormSection>
            <form>


              <div>
                <label htmlFor="userProfileImg">
                  Choose a profile picture:
                </label>
                <input
                  id="userProfileImg"
                  type="file"
                  accept="image/*"
                  encrypt="multipart/form-data"
                  onChange={this.uploadPhoto}
                />
              </div>



              {/* public email */}
              <div>
                <label htmlFor="userPublicEmail">
                  Public Email:
                </label>
                <TextInput
                  id="userPublicEmail"
                  name="publicEmail"
                  placeholder="user@gmail.com"
                  focusIndicator
                  value={this.state.publicEmail}
                  onChange={this.onInputChange}
                />
              </div>



              <div>
                {/* firstname - autofill if auth returns */}
                <label htmlFor="userFirstName">
                  First Name:
                </label>
                <TextInput
                  id="userFirstName"
                  name="firstName"
                  placeholder="john"
                  focusIndicator
                  value={this.state.firstName}
                  onChange={this.onInputChange}
                />
              </div>

              <div>
                {/* lastname - autofill if auth returns */}
                <label htmlFor="userLastName">
                  Last Name:
                </label>
                <TextInput
                  id="userLastName"
                  name="lastName"
                  placeholder="doe"
                  focusIndicator
                  value={this.state.lastName}
                  onChange={this.onInputChange}
                />
              </div>
            
              <div className="selectOptions">
                <label htmlFor="userAreaOfWork">
                  Area of Work:
                </label>
                <select
                  id="userAreaOfWork"
                  name="areaOfWork"
                  value={this.state.areaOfWork}
                  onChange={this.onInputChange}
                  >
                  <option value="default">==Select an Option==</option>
                  <option value="Full Stack Web">Full Stack Web</option>
                  <option value="iOS">iOS</option>
                  <option value="Android">Android</option>
                  <option value="UI/UX">UI/UX</option>
                </select>
              </div>

              <div>
                <label htmlFor="userDesiredTitle">
                  Desired Title:
                </label>
                <TextInput
                  id="userDesiredTitle"
                  name="desiredTitle"
                  placeholder="software engineer"
                  focusIndicator
                  value={this.state.desiredTitle}
                  onChange={this.onInputChange}
                />
              </div>
            </form>
          </FormSection>
          <section>
          <UserCardPreview userInfo={this.props.userInfo} />
          </section>
        </div>
        
        <ButtonContainer>
          <div>
            <Link to="/dashboard">Back Home</Link>
          </div>
          <div>
            <button onClick={this.checkOnSubmit}>Save Info</button>
          </div>
          <div>
            <Link to="/dashboard/where-to-find-you">Next</Link>
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
  .container {
    padding-left: 100px;
    padding-right: 100px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    section {
      width: 45%;
    }
  }
`;

const FormSection = styled.section`
  div {
    margin-bottom: 30px;
  }
  label {
    ${labelArea()};
  }
  input {
    ${inputArea()};
  }
  .selectOptions {
    select {
      appearance: none;
      ${inputArea()};
    }
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

export default PersonalInfo;
