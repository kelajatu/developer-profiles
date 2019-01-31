import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserCardPreview from '../user/UserCardPreview';

import { TextArea, Select, TextInput } from 'grommet';
import {
  MainFormContainer,
  FormSection,
  LabelContainer,
  ButtonContainer
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
    topSkillsInput: "",
    additionalSkillsInput: "",
    familiarSkillsInput: "",
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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

  
  //should only need one function regardless of skill type, can get type info from input or add button id/name
  // addSkillsFromBank = (e) => {
  //   axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}/addskills/${e.target.id}`, {"id": ""}).then(
  //     skill => console.log(skill)
  //     )
  //   }
    
    addSkillsNew = (e) => {
      e.preventDefault()

      let skillInput = e.target.getAttribute('name')
      console.log('TARGET',e.target)
      console.log('ID',e.target.id)
      console.log('SKI',skillInput)
      console.log('STATE',this.state[skillInput])
      console.log('STATE',e.target.value)


      axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}/createskill/${e.target.id}`, {"skill": `${this.state[skillInput]}`})
        .then(id => {
          this.setState({
            topSkillsInput: "",
            additionalSkillsInput: "",
            familiarSkillsInput: "",
          })
          console.log(id)
        })
      }
      
      // skillFilter = () => {
      //   //todo
      // }
      

      checkOnSubmit = (e) => {
        e.preventDefault()


        const { placesInterested, summary } = this.state;

        const lePackage = {
          interested_location_names: placesInterested,
          summary,
        }

        console.log(lePackage)

        axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}`, lePackage)
          .then(res => {
            console.log(res.data)
            this.props.updateProgress()
          })
          .catch(err => console.log(err))
      }



    render() {
    console.log('AboutAAA', this.state)
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

              {/* location */}
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
              </div>
              
              {/* projdescription */}
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
                  {this.state.submitSuccess ?
                    <i className="success fa fa-check-circle fa-2x"></i>
                    :
                    'Add New'
                  }
                </button>
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
                  {this.state.submitSuccess ?
                    <i className="success fa fa-check-circle fa-2x"></i>
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
                  {this.state.submitSuccess ?
                    <i className="success fa fa-check-circle fa-2x"></i>
                    :
                    'Add New'
                  }
                </button>
              </div>



            </form>
          </FormSection>
          <section>
            <header>
              <LabelContainer>
                <label>
                  Profile Preview:
                </label>
              </LabelContainer>
            </header>
            <UserCardPreview userInfo={this.props.userInfo} />
          </section>
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
      </MainFormContainer>
    )
  }
}

export default AboutYou;
