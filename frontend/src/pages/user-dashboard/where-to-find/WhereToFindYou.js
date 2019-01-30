import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserCardPreview from '../user/UserCardPreview';

import { TextInput, Select } from 'grommet';
import {
  MainFormContainer,
  FormSection,
  LabelContainer,
  ButtonContainer
} from '../styles/FormStyles';

class WhereToFindYou extends Component {
  state = {
    locationAutocomplete: [],
    currentLocationObjArr: [],
    currentLocationInput: this.props.userInfo.current_location_name || "",
    currentLocationName: this.props.userInfo.current_location_name || "",
    currentLocationLat: this.props.userInfo.current_location_lat || "",
    currentLocationLon: this.props.userInfo.current_location_lon || "",

    github: this.props.userInfo.github || "",
    linkedin: this.props.userInfo.linkedin || "",
    portfolio: this.props.userInfo.portfolio || "",
    acclaim: this.props.userInfo.badge || "",
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
      console.log('NEWOOAR', newObjArr)

      newAutoArr = newObjArr.map(location => {
        return location.name;
      })
      console.log('NEWAR', newAutoArr)


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
        console.log(res.data.result.geometry.location)
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

  // using put for axios call
  checkAcclaim = (acclaimBadge) => {
    let regex = /https:\/\/www.youracclaim.com\/badges\//;
    let badge = acclaimBadge.replace(regex, '')
    console.log(badge)
    axios
    .put(`${process.env.REACT_APP_BACKEND_SERVER}/api/acclaim/${this.props.userInfo.id}`, {badge})
    .then(response => {
      // add/save aclaim image / validate
      console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  }

  // send to db
  checkOnSubmit = (e) => {
    e.preventDefault()

    const { github, linkedin, portfolio, currentLocationName, currentLocationLat, currentLocationLon } = this.state;
    const lePackage = {
      current_location_name: currentLocationName,
      current_location_lat: currentLocationLat,
      current_location_lon: currentLocationLon,
      github,
      linkedin,
      portfolio,
    }

    // if a user clicks direct from input to button
    this.checkAcclaim(this.state.acclaim)

    console.log(this.props.userInfo.id)
    axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}`, lePackage)
      .then(res => {
        console.log(res.data)
        this.props.updateProgress()
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log('WHERE', this.state)
    const {currentLocationNameSuccess, githubSuccess, linkedinSuccess, portfolioSuccess, acclaimSuccess } = this.props.userInfo;
    return (
      <MainFormContainer>
        <header>
          <h1>Where To Find You</h1>
        </header>

        <div className="container">
          <FormSection>
            <form>









                {/* location - Autocomplete from google - saves location ID */}
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



                {/* <div className="option" htmlFor="placeSuggestions">
                  {this.state.locationAutocomplete.length === 0 ?
                    null
                    :
                    this.state.locationAutocomplete.map(location => {
                      return (
                        <span
                          id="placeSuggestions"
                          key={location.id}
                          tabIndex="0"
                          data-name={location.name}
                          data-id={location.id}
                          onKeyUp={this.chooseOnEnter}
                          onClick={this.chooseCurrentLocation}
                        >
                          {location.name}
                        </span>
                      );
                    })
                  }
                </div> */}
              </div>



















              {/* github */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userGithub">
                  Github:
                  </label>
                  {githubSuccess ?
                    <span>
                      <i className="success fa fa-check-circle"></i>
                    </span>
                    :
                    null
                  }
                </LabelContainer>
                <TextInput
                  id="userGithub"
                  name="github"
                  className="text-input"
                  placeholder="coolProgrammer123"
                  focusIndicator
                  value={this.state.github}
                  onChange={this.onInputChange}
                />
              </div>

              {/* linkedin */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userLinkedIn">
                  LinkedIn:
                  </label>
                  {linkedinSuccess ?
                    <span>
                      <i className="success fa fa-check-circle"></i>
                    </span>
                    :
                    null
                  }
                </LabelContainer>
                <TextInput
                  id="userLinkedIn"
                  name="linkedin"
                  className="text-input"
                  placeholder="www.linkedIn.com/me"
                  focusIndicator
                  value={this.state.linkedin}
                  onChange={this.onInputChange}
                />
              </div>

              {/* portfolio */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userPortfolio">
                  Portfolio:
                  </label>
                  {portfolioSuccess ?
                    <span>
                      <i className="success fa fa-check-circle"></i>
                    </span>
                    :
                    null
                  }
                </LabelContainer>
                <TextInput
                  id="userPortfolio"
                  name="portfolio"
                  className="text-input"
                  placeholder="www.myportfolio.com"
                  focusIndicator
                  value={this.state.portfolio}
                  onChange={this.onInputChange}
                />
              </div>

              {/* acclaim */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userAcclaimBadge">
                    Acclaim Badge:
                  </label>
                  {acclaimSuccess ?
                    <span>
                      <i className="success fa fa-check-circle"></i>
                    </span>
                    :
                    null
                  }
                </LabelContainer>
                <TextInput
                  id="userAcclaimBadge"
                  name="acclaim"
                  className="text-input"
                  placeholder="https://www.youracclaim.com/badges/..."
                  focusIndicator
                  value={this.state.acclaim}
                  onChange={this.onInputChange}
                />
              </div>
            </form>
          </FormSection>
          <section>
            <header>
              <LabelContainer>
                <label htmlFor="userDesiredTitle">
                Profile Preview:
                </label>
              </LabelContainer>
            </header>
            <UserCardPreview userInfo={this.props.userInfo} />
          </section>
        </div>
        <ButtonContainer>
          <div>
            <Link to="/dashboard/personal-info">Back</Link>
          </div>
          <div>
            <button onClick={this.checkOnSubmit}>Save Info</button>
          </div>
          <div>
            <Link to="/dashboard/about-you">Next</Link>
          </div>
        </ButtonContainer>
      </MainFormContainer>
    )
  }
}

export default WhereToFindYou;
