import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  // inputArea, 
  // labelArea, 
  centerFlex } from '../../../global-styles/Mixins';
import UserCardPreview from '../UserCardPreview';

import { TextInput, Select } from 'grommet';


class PersonalInfo extends Component {
  state = {
    
    profileImg: this.props.userInfo.image || "",

    publicEmail: this.props.userInfo.public_email  || "",

    firstName: this.props.userInfo.first_name  || "",

    lastName: this.props.userInfo.last_name  || "",
    
    areaOfWork: this.props.userInfo.area_of_work  || "",
    areaOfWorkOptions: ['Full Stack Web', 'iOS', 'Android', 'UI/UX'],
    
    desiredTitle: this.props.userInfo.desired_title  || "",
  }

  componentDidMount() {
    // const userInfo = this.props.auth.getProfile();
    console.log(this.props)
    // const {image, public_email, first_name, last_name, area_of_work, desired_title} = this.props.userInfo;
    // this.setState({profileImg: image, publicEmail: public_email, firstName: first_name, lastName: last_name, areaOfWork: area_of_work, desiredTitle: desired_title })

    // const { profileImg } = this.state;

    // let profileImgSuccess;
    // if (profileImg === "" || profileImg === null) {
    //   profileImgSuccess = false;
    // } else {
    //   profileImgSuccess = true;
    // }

    // this.setState({profileImgSuccess})

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
    console.log('P-info', this.state)
    const {profileImgSuccess, publicEmailSuccess, firstNameSuccess, lastNameSuccess, areaOfWorkSuccess, desiredTitleSuccess } = this.props.userInfo;

    return (
      <MainFormContainer>
        <header>
          <h1>Personal Info</h1>
        </header>

        <div className="container">
          <FormSection>



            <form>

              {/* Image */}
              <div className="img-input-container">
                <div className="label-container">
                  <label htmlFor="userProfileImg">
                    Choose a profile picture:
                  </label>
                  {this.state.profileImg ?
                    <span>
                      {profileImgSuccess ?
                        <i className="fa fa-check-circle fa-2x" aria-hidden="true"></i>
                        :
                        <i className="fa fa-check-circle" aria-hidden="true"></i>
                      }
                    </span>
                    :
                    null
                  }
                </div>
                <div className="img-input-sub-container">
                  <div className="img-input-overlay">
                    <i className="fa fa-upload fa-2x" aria-hidden="true"></i>
                  </div>
                  <input
                    id="userProfileImg"
                    className="img-input"
                    type="file"
                    accept="image/*"
                    encrypt="multipart/form-data"
                    onChange={this.uploadPhoto}
                  />
                </div>
              </div>



              {/* public email */}
              <div className="text-input-container">
                <div className="label-container">
                  <label htmlFor="userPublicEmail">
                  Public Email:
                  </label>
                  {publicEmailSuccess ?
                    <span>
                      <i className="fa fa-check-circle" aria-hidden="true"></i>
                    </span>
                    :
                    null
                  }
                </div>
                <TextInput
                  id="userPublicEmail"
                  name="publicEmail"
                  className="text-input"
                  placeholder="user@gmail.com"
                  focusIndicator
                  value={this.state.publicEmail}
                  onChange={this.onInputChange}
                />
              </div>



              {/* firstname */}
              <div className="text-input-container">
                <div className="label-container">
                  <label htmlFor="userFirstName">
                  First Name:
                  </label>
                  {firstNameSuccess ?
                    <span>
                      <i className="fa fa-check-circle" aria-hidden="true"></i>
                    </span>
                    :
                    null
                  }
                </div>
                <TextInput
                  id="userFirstName"
                  name="firstName"
                  className="text-input"
                  placeholder="john"
                  focusIndicator
                  value={this.state.firstName}
                  onChange={this.onInputChange}
                />
              </div>



              {/* lastname */}
              <div className="text-input-container">
                <div className="label-container">
                  <label htmlFor="userLastName">
                  Last Name:
                  </label>
                  {lastNameSuccess ?
                    <span>
                      <i className="fa fa-check-circle" aria-hidden="true"></i>
                    </span>
                    :
                    null
                  }
                </div>
                <TextInput
                  id="userLastName"
                  name="lastName"
                  className="text-input"
                  placeholder="doe"
                  focusIndicator
                  value={this.state.lastName}
                  onChange={this.onInputChange}
                />
              </div>



              {/* areaOfWork */}
              <div className="select-input-container">
                <div className="label-container">
                  <label htmlFor="userAreaOfWork">
                  Area of Work:
                  </label>
                  {areaOfWorkSuccess ?
                    <span>
                      <i className="fa fa-check-circle" aria-hidden="true"></i>
                    </span>
                    :
                    null
                  }
                </div>
                <Select
                  id="userAreaOfWork"
                  name="areaOfWork"
                  className="select-input"
                  value={this.state.areaOfWork}
                  onChange={e => this.setState({
                    areaOfWork: e.value,
                  })}
                  options={this.state.areaOfWorkOptions}
                />
              </div>


              {/* desiredTitle */}
              <div className="text-input-container">
                <div className="label-container">
                  <label htmlFor="userDesiredTitle">
                  Desired Title:
                  </label>
                  {desiredTitleSuccess ?
                    <span>
                      <i className="fa fa-check-circle" aria-hidden="true"></i>
                    </span>
                    :
                    null
                  }
                </div>
                <TextInput
                  id="userDesiredTitle"
                  name="desiredTitle"
                  className="text-input"
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
  label {
    color: rgba(42,42,42,.8);
    font-size: 1.7rem;
    margin-bottom: 8px;
    font-weight: bold;
    line-height: 23px;
    letter-spacing: 1px;
    margin-right: 5px;
  }

  .text-input-container,
  .img-input-container,
  .select-input-container {
    margin-bottom: 30px;
  }

  .img-input-sub-container,
  .text-input,
  .select-input,
  #userAreaOfWork {
    width: 85%;
  }

  .label-container {
    display: flex;
    align-items: baseline;
  }
  .img-input-sub-container {
    border: solid 1px rgba(0,0,0,.33);
    border-radius: 4px;
    .img-input-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      ${centerFlex()};
    }
    .img-success-overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      ${centerFlex()};
      z-index: 20;
      .close-overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        &:hover {
          opacity: 1;
        }
        .close-btn {
          position: absolute;
          top: 1%;
          right: 1%;
          z-index: 21;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    input[type=file] {
      padding: 11px 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;


// const ImageForm = styled.form`
//   label {
//     ${labelArea()};
//   }
//   .upload-container {
//     width: 350px;
//     height: 350px;
//     border: solid .5px #dbdee2;
//     .input-container {
//       width: 100%;
//       height: 100%;
//       span {
//         position: absolute;
//         top: 50%;
//         left: 50%;
//         transform: translate(-50%, -50%);
//       }
//       p {
//         text-align: center;
//         font-size: 1.4rem;
//         line-height: 23px;
//         font-family: inherit;
//         font-weight: bold;
//         color: rgb(42,42,42);
//         opacity: .8;
//       }
//       &:hover {
//         cursor: pointer;
//         color: gray;
//       }
//     }
//     .image-container {
//       width: 100%;
//       height: 100%;
//       span {
//         position: absolute;
//         height: 50px;
//         width: 50px;
//         top: 1%;
//         right: 1%;
//         z-index: 20;
//         ${centerFlex()};
//         &:hover {
//           cursor: pointer;
//           color: gray;
//         }
//       }
//       img {
//         width: 100%;
//         height: 100%;
//       }
//     }
//   }
// `;

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
