import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';


class WhereToFindYou extends Component {
  state = {
    currentLocationInput: "",
    locationAutocomplete: [],
    currentLocation: "",
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
    .post("https://developer-profiles.herokuapp.com/api/location", {inputLocation: e.target.value})
    .then(response => {
      console.log(response.data.predictions)
      newArr = response.data.predictions.map(location => {
        return {
          name: location.description,
          id: location.id
        };
      });
      self.setState({ locationAutocomplete: newArr });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({ [e.target.name]: e.target.value });
  }

  chooseCurrentLocation = (e) => {
    console.log(e.target.dataset.name)
    this.setState({ currentLocation: e.target.value, locationAutocomplete: [], currentLocationInput: e.target.value });
  }

  // using put for axios call
  checkAcclaim = (acclaimBadge) => {
    let regex = /https:\/\/www.youracclaim.com\/badges\//;
    let badge = acclaimBadge.replace(regex, '')
    console.log(badge)
    axios
    .put(`https://developer-profiles.herokuapp.com/api/acclaim/${this.props.userId}`, {badge})
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  }

  // send to db
  checkOnSubmit = (e) => {
    e.preventDefault()
    const { currentLocation, github, linkedin, portfolio } = this.state;
    const lePackage = {
      location: currentLocation,
      github,
      linkedin,
      portfolio,
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
          <h1>Where To Find You</h1>
        </header>
        <div className="container">
          <section>
            <form onSubmit={this.checkOnSubmit}>
              <div>
                {/* location - Autocomplete from google - saves location ID */}
                <label htmlFor="usercurrentLocation">
                  Current Location:
                </label>
                <input
                  type="text"
                  id="usercurrentLocation"
                  placeholder="Washington, DC"
                  name="currentLocationInput"
                  value={this.state.currentLocationInput}
                  onChange={this.onLocationChange}
                  required
                />
                {this.state.locationAutocomplete.length === 0 ?
                  null
                  :
                  this.state.locationAutocomplete.map(location => {
                    return (<option onClick={this.chooseCurrentLocation} key={location.id} value={location.id}>{location.name}</option>);
                  })
                }
              </div>
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
              <br/>
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
              <br/>
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
              <br/>
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
              <button type="submit">Save Info</button>
            </form>
          </section>
          <section>
            <h3>Your Current Location</h3>
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
  h3 {
    font-size: 2.8rem;
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

export default WhereToFindYou;
