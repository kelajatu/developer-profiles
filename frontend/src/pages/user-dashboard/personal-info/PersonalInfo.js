import React, { Component } from 'react'
import styled from 'styled-components';


class PersonalInfo extends Component {
  state = {
    email: "",
    firstName: "",
    lastName: "",
    profileImg: "",
    desiredTitle: "",
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // Photo upload
  uploadPhoto = (e) => {
    const file = e.target.files[0];
    let XHR = new XMLHttpRequest();
    let FD  = new FormData();

    // Push our data into our FormData object
    FD.append('image', file);

    var self = this;
    // Define what happens on successful data submission
    XHR.addEventListener('load', function(event) {
      let url = JSON.parse(event.target.responseText);
      self.setState({profileImg: url.imgUrl})
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
          <h1>Personal Info</h1>
        </header>
        <div className="container">
          <section>
            <form onSubmit={this.checkOnSubmit}>
              {/* email - autofill if auth returns */}
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
                required
              />

              <br/>

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
                required
              />

              <br/>

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
                required
              />
            
              <br/>

              {/* title/filter - Autocomplete from DB bucket already in state */}
              {/* only one title, maybe use options instead since there won't be many */}
              <label htmlFor="userDesiredTitle">
                Desired Title:
              </label>
              <input
                type="text"
                id="userDesiredTitle"
                placeholder="software engineer"
                name="desiredTitle"
                value={this.state.desiredTitle}
                onChange={this.onInputChange}
                required
              />
              <button type="submit">Save Info</button>
            </form>
          </section>

          <section>
            {/* image - see if you can send '/:id' param on uploadPhoto */}
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
  width: calc(100% - 220px);
  margin-left: 220px;
  margin-bottom: 100px;
  padding-top: 50px;
  padding-left: 100px;
  h1 {
    font-size: 5rem;
    color: rgb(42,42,42);
  }
  .container {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: wrap;
    section {
      width: 43%;
    }
  }
`;


export default PersonalInfo;
