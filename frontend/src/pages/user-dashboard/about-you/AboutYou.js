import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserCard from '../../../components/user-card/UserCard';

import { TextArea, Select, TextInput } from 'grommet';
import {
  MainFormContainer,
  FormSection,
  LabelContainer,
  ButtonContainer,
  CardPreviewSection,
  MobileCardPreviewSection
} from '../styles/FormStyles';

var noLeaks;

class AboutYou extends Component {
  state = {
    submitSuccess: false,
    submitFailure: false,

    placesAutocomplete: [],
    placesInterestedArr: this.props.userInfo.placesInterestedArr || [],
    placesInterestedInput: "",
    placesInterested: this.props.userInfo.interested_location_names || "",

    summary: this.props.userInfo.summary || "",

    skillbank: null,

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

  onSkillSearch = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/list/skills/${e.target.value}`)
    .then(response => {
      this.setState({skillbank: response.data})
    })
  }

  // places interested
  onPlacesChange = (e) => {
    let newArr;
    var self = this;
    axios
    .post(`${process.env.REACT_APP_BACKEND_SERVER}/api/location`, {inputLocation: e})
    .then(response => {
      newArr = response.data.predictions.map(location => {
        return location.description
      });
      newArr.unshift('Remote')
      self.setState({ placesAutocomplete: newArr });
    })
    .catch(error => {
      console.log(error);
    });
  }

  choosePlacesInterested = (e) => {
    let newPlacesInterested;
    let newPlacesInterestedArr;
    let dupCheck;
    let dupBool;
    if (this.state.placesInterested === '') {
      newPlacesInterested = '';
      newPlacesInterested = e.value;
      newPlacesInterestedArr = [];
      newPlacesInterestedArr.push(newPlacesInterested)
    } else {
      newPlacesInterested = this.state.placesInterested.slice();
      dupCheck = newPlacesInterested.split('|');
      dupCheck.forEach((place) => {
        if (place === e.value) {
          dupBool = true;
        }
      })
      if (!dupBool) {
        newPlacesInterested = newPlacesInterested + '|' + e.value;
      }
      newPlacesInterestedArr = newPlacesInterested.split('|');
    }

    this.setState({
      placesInterestedArr: newPlacesInterestedArr,
      placesInterested: newPlacesInterested,
      placesAutocomplete: [],
      placesInterestedInput: ""
    });
  }

  // removePlace = (e) => {
  //   let newPlacesInterestedArr = this.state.placesInterested.slice();
  //   newPlacesInterestedArr = newPlacesInterestedArr.filter(place => {
  //     return place.id !== e.target.dataset.id
  //   });
  //   this.setState({ placesInterested: newPlacesInterestedArr });
  // }


    // about you and card are tied to a re-mount(CMD), not update(CDU) lifecycle
    // when skills get added, both the components update and re-render, but not re-mount
    // dashboardcontainer was handling all that by updating, and passing props to all components,
    // GET skills fails when there are no skills, all cards currently send 500s for new users with no skills yet
    // if I do a GET on dashboard container, the entire thing will crash
    // therefore dashboardcontainer can't update and create skillsArr and can't send updated props to about you and card
    // about you and card will have to unmount and mount again for CMDs to run
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

    addSkillsFromBank = (skillID, e) => {
      e.preventDefault()
      axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}/addskills/${e.target.id}`, {"id": `${skillID}`}).then(
        skill => console.log(skill)
        )
    }
    
      
      
      checkOnSubmit = (e) => {
        e.preventDefault()
        const { placesInterested, summary } = this.state;
        const lePackage = {
          interested_location_names: placesInterested,
          summary,
        }
        axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}`, lePackage)
          .then(res => {
            this.props.updateProgress()
          })
          .catch(err => console.log(err))
      }



    render() {
    const {
      placesInterestedSuccess,
      summarySuccess,
      topSkillsSuccess,
      additionalSkillsSuccess,
      familiarSkillsSuccess,
    } = this.props.userInfo;

    return (
      <MainFormContainer>
        <header>
          <h1>About You</h1>
        </header>

        <div className="container">
          <FormSection>
            <form>

              {/* places */}
              <div className="select-input-container">
                <LabelContainer>
                  <label htmlFor="userPlacesInterested">
                    Places Interested:
                  </label>
                  {placesInterestedSuccess ?
                    <span>
                      <i className="success fa fa-check-circle"></i>
                    </span>
                    :
                    null
                  }
                </LabelContainer>
                <Select
                  id="userPlacesInterested"
                  name="placesInterestedInput"
                  value={this.state.placesInterestedInput}
                  onSearch={this.onPlacesChange}
                  onChange={this.choosePlacesInterested}
                  options={this.state.placesAutocomplete}
                />
                <div className="showing-places">
                  {this.state.placesInterestedArr.length === 0 ?
                    null
                    :
                    this.state.placesInterestedArr.map((location) => {
                      return (
                        <span className="places" key={location}>
                          {location}
                        </span>
                      );
                    })
                  }
                </div>
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
                  placeholder="Add a skill from the list or create a new one"
                  // focusIndicator
                  value={this.state.topSkillsInput}
                  onChange={this.onSkillSearch}
                />
                {this.state.skillbank ? <div className="skillbank">{this.state.skillbank.map(skill => <div className="skill" id="top_skills" onClick={this.addSkillsFromBank.bind(this, skill.id)}>{skill.skill}</div>)}</div> : null}
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

              {/* Additional Skills */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="add_skills">
                    Additional Skills:
                  </label>
                  {additionalSkillsSuccess ?
                    <span>
                      <i className="success fa fa-check-circle"></i>
                    </span>
                    :
                    null
                  }
                </LabelContainer>
                <TextInput
                  id="add_skills"
                  name="additionalSkillsInput"
                  className="text-input"
                  placeholder="Put more skills here. They will be medium on your profile"
                  focusIndicator
                  value={this.state.additionalSkillsInput}
                  onChange={this.onInputChange}
                />
                <button className="skills-btn" id="add_skills" name="additionalSkillsInput" onClick={this.addSkillsNew}>
                  {this.state.additionalSkillsInputSuccess ?
                    <i className="success fa fa-check-circle"></i>
                    :
                    'Add New'
                  }
                </button>
              </div>
            
              {/* Familiar Skills */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="familiar">
                  Familiar With:
                  </label>
                  {familiarSkillsSuccess ?
                    <span>
                      <i className="success fa fa-check-circle"></i>
                    </span>
                    :
                    null
                  }
                </LabelContainer>
                <TextInput
                  id="familiar"
                  name="familiarSkillsInput"
                  className="text-input"
                  placeholder="Put remaining skills here. They will be small on your profile"
                  focusIndicator
                  value={this.state.familiarSkillsInput}
                  onChange={this.onInputChange}
                />
                <button className="skills-btn" id="familiar" name="familiarSkillsInput" onClick={this.addSkillsNew}>
                  {this.state.familiarSkillsInputSuccess ?
                    <i className="success fa fa-check-circle fa-2x"></i>
                    :
                    'Add New'
                  }
                </button>
              </div>

            </form>
          </FormSection>
          <CardPreviewSection>
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
          </CardPreviewSection>
        </div>
        <ButtonContainer>
          <div>
            <Link to="/dashboard/where-to-find-you">Back</Link>
          </div>
          <div>
            <button onClick={this.checkOnSubmit}>
            {this.state.submitSuccess ?
              <i className="success fa fa-check-circle fa-2x"></i>
              :
              'Save Info'
            }
            </button>
          </div>
          <div>
            <Link to="/dashboard/projects">Next</Link>
          </div>
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

export default AboutYou;
