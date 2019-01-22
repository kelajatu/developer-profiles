import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { inputArea, labelArea, centerFlex } from '../../../global-styles/Mixins';


class PersonalInfo extends Component {
  state = {
    email: "",
    firstName: "",
    lastName: "",
    profileImg: "",
    desiredTitle: "", // title vs filter?
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

    XHR.open('POST', 'https://developer-profiles.herokuapp.com/api/image-upload');

    XHR.send(FD);
  }

  // send to db
  // *****  Email can ONLY be changed if user signed up with email/pass  ******
  // ***** Email NEEDS to be updated in Auth as well *****
  // Causes error when email is empty
  checkOnSubmit = (e) => {
    e.preventDefault()
    const {email, firstName, lastName, profileImg, desiredTitle} = this.state;
    const lePackage = {
      email,
      first_name: firstName,
      last_name: lastName,
      image: profileImg,
      title: desiredTitle // title vs filter?
    }
    console.log(lePackage)
    axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}`, lePackage)
      .then(res => console.log(res.data))
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
            <form onSubmit={this.checkOnSubmit}>

              {/* email - autofill if auth returns */}
              <div>
                <label htmlFor="userEmail">
                  Email:
                </label>
                <input
                  type="email"
                  id="userEmail"
                  placeholder="user@gmail.com"
                  name="email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
              </div>

              <div>
                {/* firstname - autofill if auth returns */}
                <label htmlFor="userFirstName">
                  First Name:
                </label>
                <input
                  type="text"
                  id="userFirstName"
                  placeholder="john"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.onInputChange}
                />
              </div>

              <div>
                {/* lastname - autofill if auth returns */}
                <label htmlFor="userLastName">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="userLastName"
                  placeholder="doe"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.onInputChange}
                />
              </div>
            
              <div className="selectOptions">

                {/* title/filter - Possible autocomplete to match other forms */}
                {/* <label htmlFor="userDesiredTitle">
                  Desired Title:
                </label>
                <input
                  type="text"
                  id="userDesiredTitle"
                  placeholder="software engineer"
                  name="desiredTitle"
                  value={this.state.desiredTitle}
                  onChange={this.onInputChange}
                /> */}
                <label htmlFor="userDesiredTitle">
                  Desired Title:
                </label>
                <select
                  id="userDesiredTitle"
                  name="desiredTitle"
                  value={this.state.desiredTitle}
                  onChange={this.onInputChange}
                >
                  <option value="default">==Select an Option==</option>
                  <option value="Full Stack Web">Full Stack Web</option>
                  <option value="iOS">iOS</option>
                  <option value="Android">Android</option>
                  <option value="UI/UX">UI/UX</option>
                </select>
              </div>
              <button type="submit">Save Info</button>
            </form>
          </FormSection>

          <section>
            {/* image */}
            <ImageForm>
              <label htmlFor="userProfileImg">
                Choose a profile picture:
              </label>
              <div className="upload-container">
                {this.state.profileImg === "" ?
                  <div className="input-container">
                    <span><i className="fa fa-upload fa-7x"></i><br/><p>350x350</p></span>
                    <input
                      id="userProfileImg"
                      type="file"
                      accept="image/*"
                      encrypt="multipart/form-data"
                      onChange={this.uploadPhoto}
                    />
                  </div>
                  :
                  null
                }
                {this.state.profileImg === "" ?
                  null
                  :
                  <div className="image-container">
                    <span onClick={this.deleteImage}><i className="fa fa-times-circle fa-3x"></i></span>
                    <img src={this.state.profileImg} alt="P"/>
                  </div>
                }
              </div>
            </ImageForm>
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
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
  h1 {
    font-size: 5rem;
    color: rgb(42,42,42);
    margin-bottom: 50px;
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
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


export default PersonalInfo;
