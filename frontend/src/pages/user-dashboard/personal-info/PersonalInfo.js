import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { inputArea, labelArea } from '../../../global-styles/Mixins';


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
    axios.put(`https://developer-profiles.herokuapp.com/users/${this.props.userId}`, lePackage)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  render() {
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
            
              <div>

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
            {/* Show photo on Photo upload */}
            <div>
              {this.state.profileImg === "" ?
                null
                :
                <img src={this.state.profileImg} alt="P"/>
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
  .container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
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
    ${labelArea()};
  }
  input {
    ${inputArea()};
  }
`;


export default PersonalInfo;
