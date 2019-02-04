import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';

import { TextInput, Select, TextArea } from 'grommet';
import {
  FormSection,
  LabelContainer,
  ImageContainer,
} from '../../styles/FormStyles';

var noLeaks;
class QuickstartBasics extends Component {

  state = {
    submitSuccess: false,
    submitFailure: false,
    profileImg: this.props.userInfo.image || "",
    profileImgUploadSuccess: false,
    publicEmail: this.props.userInfo.public_email  || "",
    firstName: this.props.userInfo.first_name  || "",
    lastName: this.props.userInfo.last_name  || "",
    areaOfWork: this.props.userInfo.area_of_work  || "",
    areaOfWorkOptions: ['Full Stack Web', 'iOS', 'Android', 'UI/UX'],
    desiredTitle: this.props.userInfo.desired_title  || "",



    locationAutocomplete: [],
    currentLocationObjArr: [],
    currentLocationInput: this.props.userInfo.current_location_name || "",
    currentLocationName: this.props.userInfo.current_location_name || "",
    currentLocationLat: this.props.userInfo.current_location_lat || "",
    currentLocationLon: this.props.userInfo.current_location_lon || "",



    summary: this.props.userInfo.summary || "",

    topSkillsInput: "",
    topSkillsInputSuccess: false,
    userTopSkills: [],
    additionalSkillsInput: "",
    additionalSkillsInputSuccess: false,
    userAddSkills: [],
    familiarSkillsInput: "",
    familiarSkillsInputSuccess: false,
    userFamSkills: [],
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }


  onLocationChange = (e) => {
    let newObjArr;
    let newAutoArr;
    var self = this;
    axios
    .post(`${process.env.REACT_APP_BACKEND_SERVER}/api/location`, {inputLocation: e})
    .then(response => {
      newObjArr = response.data.predictions.map(location => {
        return {
          name: location.description,
          id: location.place_id
        };
      });
      newAutoArr = newObjArr.map(location => {
        return location.name;
      })
      self.setState({ locationAutocomplete: newAutoArr, currentLocationObjArr: newObjArr });
    })
    .catch(error => {
      console.log(error);
    });
  }

  chooseCurrentLocation = (e) => {
    let locationHolder = this.state.currentLocationObjArr.filter(location => {
      return location.name === e.value;
    })
    let id = locationHolder[0].id
    axios
    .post(`${process.env.REACT_APP_BACKEND_SERVER}/api/gio`, {placeId: id})
      .then(res => {
        const { lat, lng } = res.data.result.geometry.location;
        this.setState({
          currentLocationInput: e.value,
          currentLocationName: e.value,
          currentLocationLat: lat,
          currentLocationLon: lng,
          currentLocationObjArr: [],
          locationAutocomplete: []
        });
      })
      .catch(err => console.log(err))
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
      self.setState({profileImg: url.imgUrl, profileImgUploadSuccess: true})
      setTimeout(() => {
        self.setState({profileImgUploadSuccess: false})
      }, 2000)
    });

    // Define what happens in case of error
    XHR.addEventListener('error', function(event) {
      alert('Oops! Something went wrong.');
    });

    XHR.open('POST', `${process.env.REACT_APP_BACKEND_SERVER}/api/image-upload`);

    XHR.send(FD);
  }

  addSkillsNew = (e) => {
    e.preventDefault()

    let skillInput = e.target.getAttribute('name')

    axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}/createskill/${e.target.id}`, {"skill": `${this.state[skillInput]}`})
      .then(res => {
        let skillInputSuccess = `${skillInput}Success`
        this.setState({ [skillInput]: "", [skillInputSuccess]: true })
        this.props.updateProgress()
        noLeaks = setTimeout(() => {
          this.setState({ [skillInputSuccess]: false })
        }, 1000)
      })
    }

  checkOnSubmit = (e) => {
    e.preventDefault()
    const {publicEmail, firstName, lastName, profileImg, areaOfWork, desiredTitle,    github, linkedin, portfolio, currentLocationName, currentLocationLat, currentLocationLon,    summary} = this.state;
    const lePackage = {
      public_email: publicEmail,
      first_name: firstName,
      last_name: lastName,
      image: profileImg,
      area_of_work: areaOfWork,
      desired_title: desiredTitle,

      current_location_name: currentLocationName,
      current_location_lat: currentLocationLat,
      current_location_lon: currentLocationLon,
      summary
    }
    axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}`, lePackage)
      .then(res => {
        this.setState({ submitSuccess: true })
        noLeaks = setTimeout(() => {
          this.setState({ submitSuccess: false })
        }, 2000)
        this.props.updateProgress()
      })
      .catch(err => {
        this.setState({ submitFailure: true })
        noLeaks = setTimeout(() => {
          this.setState({ submitFailure: false })
        }, 2000)
        console.log(err)
      })
  }

  componentWillUnmount() {
    clearTimeout(noLeaks)
  }




  render() {


    const {profileImgSuccess, publicEmailSuccess, firstNameSuccess, lastNameSuccess, areaOfWorkSuccess, desiredTitleSuccess,      currentLocationNameSuccess,
      githubSuccess,
      linkedinSuccess,
      portfolioSuccess,
      acclaimSuccess,             summarySuccess,
      topSkillsSuccess,
      additionalSkillsSuccess,
      familiarSkillsSuccess,
} = this.props.userInfo;




    return (
      <div>
        <h2>Let's Start With the Basics</h2>
        <FormSection>
          <form>




            {/* Image */}
            <ImageContainer>
              <LabelContainer>
                <label htmlFor="userProfileImg">
                  Choose a profile picture:
                </label>
                {profileImgSuccess ?
                  <span>
                    <i className="success fa fa-check-circle"></i>
                  </span>
                  :
                  null
                }
              </LabelContainer>
              <div className="img-input-sub-container">
                {this.state.profileImgUploadSuccess ?
                  <div className="img-input-overlay">
                    <i className="fa fa-check-circle fa-2x"></i>
                  </div>
                  :
                  <div className="img-input-overlay">
                    <i className="fa fa-upload fa-2x"></i>
                  </div>
                }

                <input
                  id="userProfileImg"
                  type="file"
                  accept="image/*"
                  encrypt="multipart/form-data"
                  onChange={this.uploadPhoto}
                />
              </div>
            </ImageContainer>





            {/* firstname */}
            <div className="text-input-container">
              <LabelContainer>
                <label htmlFor="userFirstName">
                First Name:
                </label>
                {firstNameSuccess ?
                  <span>
                    <i className="success fa fa-check-circle"></i>
                  </span>
                  :
                  null
                }
              </LabelContainer>
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




            {/* desiredTitle */}
            <div className="text-input-container">
              <LabelContainer>
                <label htmlFor="userDesiredTitle">
                Desired Title:
                </label>
                {desiredTitleSuccess ?
                  <span>
                    <i className="success fa fa-check-circle"></i>
                  </span>
                  :
                  null
                }
              </LabelContainer>
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




            {/* location */}
            <div className="select-input-container">
              <LabelContainer>
                <label htmlFor="usercurrentLocation">
                Current Location:
                </label>
                {currentLocationNameSuccess ?
                  <span>
                    <i className="success fa fa-check-circle"></i>
                  </span>
                  :
                  null
                }
              </LabelContainer>
              <Select
                id="usercurrentLocation"
                name="currentLocationInput"
                value={this.state.currentLocationInput}
                onSearch={this.onLocationChange}
                onChange={this.chooseCurrentLocation}
                options={this.state.locationAutocomplete}
              />
            </div>




            {/* summary */}
            <div className="text-input-container">
              <LabelContainer>
                <label htmlFor="userSummary">
                  Summary:
                </label>
                {summarySuccess ?
                  <span>
                    <i className="success fa fa-check-circle"></i>
                  </span>
                  :
                  null
                }
              </LabelContainer>
              <TextArea
                id="userSummary"
                name="summary"
                className="text-input"
                placeholder="Here you can give a quick summary about yourself, your personal elevator pitch! Max length is 128 characters"
                maxLength="128"
                style={{height: '120px'}}
                focusIndicator
                resize={false}
                value={this.state.summary}
                onChange={this.onInputChange}
              />
            </div>




            {/* Top Skills */}
            <div className="text-input-container">
              <LabelContainer>
                <label htmlFor="top_skills">
                  Top Skills:
                </label>
                {topSkillsSuccess ?
                  <span>
                    <i className="success fa fa-check-circle"></i>
                  </span>
                  :
                  null
                }
              </LabelContainer>
              <TextInput
                id="top_skills"
                name="topSkillsInput"
                className="text-input"
                placeholder="Put 5 skills here, they are the biggest on your profile"
                focusIndicator
                value={this.state.topSkillsInput}
                onChange={this.onInputChange}
              />
              <button className="skills-btn" id="top_skills" name="topSkillsInput" onClick={this.addSkillsNew}>
                {this.state.topSkillsInputSuccess ?
                  <i className="success fa fa-check-circle"></i>
                  :
                  'Add New'
                }
              </button>
              <div>
                {

                }
              </div>
            </div>




          </form>
        </FormSection>
        <ButtonContainer>
          <div>
            <button onClick={this.checkOnSubmit}>
            {this.state.submitSuccess ?
              <i className="success fa fa-check-circle fa-2x"></i>
              :
              'Save Info'
            }
            </button>
          </div>
        </ButtonContainer>

      </div>
    )
  }
}

export const ButtonContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 50px;

  div {
    width: 40%;
    text-align: center;
  }

  .success {
    color: green;
  }

  button {
    width: 100%;
    color: black;
    padding: 30px;
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

export default QuickstartBasics;
