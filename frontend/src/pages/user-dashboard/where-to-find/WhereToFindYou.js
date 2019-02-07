import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserCard from '../../../components/user-card/UserCard';

import { TextInput, Select } from 'grommet';
import {
  MainFormContainer,
  FormSection,
  LabelContainer,
  ButtonContainer,
  CardPreviewSection,
  MobileCardPreviewSection,
  Validator
} from '../styles/FormStyles';

var noLeaks;
class WhereToFindYou extends Component {
  state = {
    submitSuccess: false,
    submitFailure: false,

    locationAutocomplete: [],
    currentLocationObjArr: [],
    currentLocationInput: this.props.userInfo.current_location_name || "",
    currentLocationName: this.props.userInfo.current_location_name || "",
    currentLocationLat: this.props.userInfo.current_location_lat || "",
    currentLocationLon: this.props.userInfo.current_location_lon || "",

    github: this.props.userInfo.github || "",
    linkedin: this.props.userInfo.linkedin || "",
    portfolio: this.props.userInfo.portfolio || "",
    portfolioValidation: true,
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

  // send to db
  checkOnSubmit = (e) => {
    e.preventDefault()
    const { github, linkedin, portfolio, currentLocationName, currentLocationLat, currentLocationLon } = this.state;

    let normGithub = github;
    let normLinkedin = linkedin;
    if (github !== '') {
      if (github[github.length -1] === '/') {
        normGithub = github.split('');
        normGithub.pop();
        normGithub = normGithub.join('');
      } else {
        normGithub = github;
      }
      normGithub = normGithub.split('/').pop();
      normGithub = `https://github.com/${normGithub}`;
    }
    
    if (linkedin !== '') {
      if (linkedin[linkedin.length -1] === '/') {
        normLinkedin = linkedin.split('');
        normLinkedin.pop();
        normLinkedin = normLinkedin.join('');
      } else {
        normLinkedin = linkedin;
      }
      normLinkedin = normLinkedin.split('/').pop();
      normLinkedin = `https://www.linkedin.com/in/${normLinkedin}`;
    }

    if (portfolio !== '') {
      if (!(portfolio.includes('http://') || portfolio.includes('https://'))) {
        this.setState({portfolioValidation: false});
        return
      } else {
        this.setState({portfolioValidation: true})
      }
    } else {
      this.setState({portfolioValidation: true})
    }

    const lePackage = {
      current_location_name: currentLocationName,
      current_location_lat: currentLocationLat,
      current_location_lon: currentLocationLon,
      github: normGithub,
      linkedin: normLinkedin,
      portfolio,
    }


    // causes bug since it adds url to db on its own, instead of updating with this.props.updateProgress
    // it will be in the db so if you refresh you'll see it
    // also the image url is returned, so it will always fail if kept as input default
    // server needs to create two columns, one for the image url, and one for the acclaim url
    // add both to user, and return the acclaim url
    // ugly quick fix for now..
    if (this.state.acclaim !== "") {
      let acclaimBadge = this.state.acclaim;
      let regex = /https:\/\/www.youracclaim.com\/badges\//;
      let badge = acclaimBadge.replace(regex, '')
      axios
      .put(`${process.env.REACT_APP_BACKEND_SERVER}/api/acclaim/${this.props.userInfo.id}`, {badge})
      .then(response => {
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
      })
      .catch(error => {
        console.log(error);
      });
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
    } else {
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
  }

  componentWillUnmount() {
    clearTimeout(noLeaks)
  }

  render() {
    console.log(this.state.portfolioValidation)
    const {
      currentLocationNameSuccess,
      githubSuccess,
      linkedinSuccess,
      portfolioSuccess,
      acclaimSuccess
    } = this.props.userInfo;
    return (
      <MainFormContainer>
        <header>
          <h1>Where To Find You</h1>
        </header>

        <div className="container">
          <FormSection>
            <form>

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
                  className="text-input"
                  name="currentLocationInput"
                  value={this.state.currentLocationInput}
                  onSearch={this.onLocationChange}
                  onChange={this.chooseCurrentLocation}
                  options={this.state.locationAutocomplete}
                />
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
                  placeholder="URL or Username"
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
                  placeholder="URL or Username"
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
                <Validator validated={this.state.portfolioValidation}>
                  <TextInput
                    id="userPortfolio"
                    name="portfolio"
                    className="validated-text-input"
                    placeholder="https://yourwebsite.com"
                    focusIndicator
                    plain
                    value={this.state.portfolio}
                    onChange={this.onInputChange}
                  />
                </Validator>
                {
                  this.state.portfolioValidation ?
                  null
                  :
                  <LabelContainer>
                    <label htmlFor="userPortfolio">
                      Need to include 'http://' or 'https://'
                    </label>
                  </LabelContainer>
                }
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
          <CardPreviewSection>
            <header>
              <LabelContainer>
                <label htmlFor="userDesiredTitle">
                Profile Preview:
                </label>
              </LabelContainer>
            </header>
            <UserCard
              id={this.props.userInfo.id}
              github={this.props.userInfo.github}
              linkedin={this.props.userInfo.linkedin}
              portfolio={this.props.userInfo.portfolio}
              badge={this.props.userInfo.badge}
              key={this.props.userInfo.id}
              first_name={this.props.userInfo.first_name}
              last_name={this.props.userInfo.last_name}
              image={this.props.userInfo.image}
              summary={this.props.userInfo.summary}
              desired_title={this.props.userInfo.desired_title}
              location={this.props.userInfo.current_location_name}
            />
          </CardPreviewSection>
        </div>
        <ButtonContainer>
          <Link to="/dashboard/personal-info">Back</Link>
          <button onClick={this.checkOnSubmit}>
            {this.state.submitSuccess ?
              <i className="success fa fa-check-circle fa-2x"></i>
              :
              'Save Info'
            }
          </button>
          <Link to="/dashboard/about-you">Next</Link>
        </ButtonContainer>
        <MobileCardPreviewSection>
          <header>
            <LabelContainer>
              <label>
                Profile Preview:
              </label>
            </LabelContainer>
          </header>
          <UserCard
            id={this.props.userInfo.id}
            github={this.props.userInfo.github}
            linkedin={this.props.userInfo.linkedin}
            portfolio={this.props.userInfo.portfolio}
            badge={this.props.userInfo.badge}
            key={this.props.userInfo.id}
            first_name={this.props.userInfo.first_name}
            last_name={this.props.userInfo.last_name}
            image={this.props.userInfo.image}
            summary={this.props.userInfo.summary}
            desired_title={this.props.userInfo.desired_title}
            location={this.props.userInfo.current_location_name}
            userTopSkills={this.props.userInfo.userTopSkills}
            userAddSkills={this.props.userInfo.userAddSkills}
            userFamSkills={this.props.userInfo.userFamSkills}
          />
        </MobileCardPreviewSection>
      </MainFormContainer>
    )
  }
}

export default WhereToFindYou;
