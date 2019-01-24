import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { inputArea, labelArea } from '../../../global-styles/Mixins';


class WhereToFindYou extends Component {
  state = {
    currentLocationInput: "",
    locationAutocomplete: [],
    currentLocationName: '',
    currentLocationLat: '',
    currentLocationLon: '',
    github: "",
    linkedin: "",
    portfolio: "",
    acclaim: "",
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

  onLocationChange = (e) => {
    let newArr;
    var self = this;
    axios
    .post(`${process.env.REACT_APP_BACKEND_SERVER}/api/location`, {inputLocation: e.target.value})
    .then(response => {
      newArr = response.data.predictions.map(location => {
        return {
          name: location.description,
          id: location.place_id
        };
      });
      self.setState({ locationAutocomplete: newArr });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({ [e.target.name]: e.target.value });
  }

  chooseOnEnter = (e) => {
    if (e.keyCode === 13) {
      this.chooseCurrentLocation(e);
    }
  }

  chooseCurrentLocation = (e) => {
    const { id, name } = e.target.dataset
    console.log(id, name)
    axios
    .post(`${process.env.REACT_APP_BACKEND_SERVER}/api/gio`, {placeId: id})
      .then(res => {
        console.log(res.data.result.geometry.location)
        const { lat, lng } = res.data.result.geometry.location;
        this.setState({
          currentLocationName: name,
          currentLocationLat: lat,
          currentLocationLon: lng,
          locationAutocomplete: [],
          currentLocationInput: ''
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


    console.log(this.props.userInfo.id)
    axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}`, lePackage)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  render() {
    console.log('WHERE', this.state)
    return (
      <MainFormContainer>
        <header>
          <h1>Where To Find You</h1>
        </header>
        <div className="container">
          <FormSection>
            <form onSubmit={this.checkOnSubmit}>
              <div>
                {/* location - Autocomplete from google - saves location ID */}
                <label htmlFor="usercurrentLocation">
                  Current Location:
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  id="usercurrentLocation"
                  placeholder="Washington, DC"
                  name="currentLocationInput"
                  value={this.state.currentLocationInput}
                  onChange={this.onLocationChange}
                />
                <div className="option" htmlFor="placeSuggestions">
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
                </div>
              </div>

              <div>
                <label htmlFor="userGithub">
                  Github:
                </label>
                <input
                  type="text"
                  id="userGithub"
                  placeholder="coolProgrammer123"
                  name="github"
                  value={this.state.github}
                  onChange={this.onInputChange}
                />
              </div>

              <div>
                <label htmlFor="userLinkedIn">
                  LinkedIn:
                </label>
                <input
                  type="text"
                  id="userLinkedIn"
                  placeholder="www.linkedIn.com/me"
                  name="linkedin"
                  value={this.state.linkedin}
                  onChange={this.onInputChange}
                />
              </div>

              <div>
                <label htmlFor="userPortfolio">
                  Portfolio:
                </label>
                <input
                  type="text"
                  id="userPortfolio"
                  placeholder="www.myportfolio.com"
                  name="portfolio"
                  value={this.state.portfolio}
                  onChange={this.onInputChange}
                />
              </div>

              <div>
                <label htmlFor="userAcclaimBadge">
                  Acclaim Badge:
                </label>
                <input
                  type="text"
                  id="userAcclaimBadge"
                  placeholder="www.myportfolio.com"
                  name="acclaim"
                  value={this.state.acclaim}
                  onChange={this.onInputChange}
                  onBlur={() => this.checkAcclaim(this.state.acclaim)}
                />
              </div>
              <button type="submit">Save Info</button>
            </form>
          </FormSection>
          <PreviewSection>
            <h3>Your Current Location</h3>
            {this.state.currentLocation === null ?
              <p>No Location Listed</p>
              :
              <p>{this.state.currentLocation.name}</p>
            }
          </PreviewSection>
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
  h3 {
    font-size: 2.8rem;
    color: rgb(42,42,42);
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
  label, span {
    ${labelArea()};
  }
  .option {
    width: 95%;
    span {
      padding: 10px 0 10px 10px;
      width: 95%;
      &:hover {
        background-color: rgba(173,216,230, .5);
        cursor: pointer;
      }
      &:first-child {
        margin-top: 20px;
      }
    }
  }
  input {
    ${inputArea()};
  }
`;

const PreviewSection = styled.section`
  h3 {
    margin-bottom: 30px;
  }
  p {
    font-size: 1.7rem;
    color: rgb(42,42,42);
  }
`;

export default WhereToFindYou;
