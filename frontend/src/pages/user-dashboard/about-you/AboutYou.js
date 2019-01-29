import React, { Component } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { inputArea, labelArea } from '../../../global-styles/Mixins';

class AboutYou extends Component {
  state = {
    placesInterestedInput: "",
    placesAutocomplete: [],
    placesInterested: this.props.userInfo.interested_location_names || "",
    placesInterestedArr: [],
    summary: this.props.userInfo.summary || "",
    topSkillsInput: "",
    additionalSkillsInput: "",
    familiarSkillsInput: "",
  }

  componentDidMount() {
    console.log('FVVVVVVV',this.props.userInfo.placesInterestedArr)
    if (this.props.userInfo.placesInterestedArr) {
      this.setState({placesInterestedArr: this.props.userInfo.placesInterestedArr})
    }
    // for returning users
    // get data from session storage
    // hydrate state
    // remove from session storage
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // places interested
  onPlacesChange = (e) => {
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
      self.setState({ placesAutocomplete: newArr });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({ [e.target.name]: e.target.value });
  }

  chooseOnEnter = (e) => {
    if (e.keyCode === 13) {
      this.choosePlacesInterested(e);
    }
  }

  choosePlacesInterested = (e) => {
    const { name } = e.target.dataset

    let newPlacesInterested;
    let newPlacesInterestedArr;
    if (this.state.placesInterested === '') {
      newPlacesInterested = '';
      newPlacesInterested = name
      newPlacesInterestedArr = [];
      newPlacesInterestedArr.push(newPlacesInterested)
    } else {
      newPlacesInterested = this.state.placesInterested.slice();
      newPlacesInterested = newPlacesInterested + '|' + name;
      newPlacesInterestedArr = newPlacesInterested.split('|');
    }

    this.setState({ placesInterestedArr: newPlacesInterestedArr, placesInterested: newPlacesInterested, placesAutocomplete: [], placesInterestedInput: "" });
  }

  // removePlace = (e) => {
  //   let newPlacesInterestedArr = this.state.placesInterested.slice();
  //   newPlacesInterestedArr = newPlacesInterestedArr.filter(place => {
  //     return place.id !== e.target.dataset.id
  //   });
  //   this.setState({ placesInterested: newPlacesInterestedArr });
  // }

  
  //should only need one function regardless of skill type, can get type info from input or add button id/name
  addSkillsFromBank = (e) => {
    axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}/addskills/${e.target.id}`, {"id": ""}).then(
      skill => console.log(skill)
      )
    }
    
    addSkillsNew = (e) => {
      let skillInput = e.target.getAttribute('name')
      axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}/createskill/${e.target.id}`, {"skill": `${this.state[skillInput]}`}).then(
        skill => console.log(skill)
        )
      }
      
      skillFilter = () => {
        //todo
      }
      
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
    return (
      <MainFormContainer>
        <header>
          <h1>About You</h1>
        </header>
        <div className="container">
          <FormSection>
            <form onSubmit={this.checkOnSubmit}>

              <div>
                {/* places - Autocomplete from google - saves location ID */}
                {/* Multiple Inputs - Normalize for DB, string of place IDs */}
                <label htmlFor="userPlacesInterested">
                Places Interested:
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  id="userPlacesInterested"
                  placeholder="Remote, Atlanta, Washington, San Francisco"
                  name="placesInterestedInput"
                  value={this.state.placesInterestedInput}
                  onChange={this.onPlacesChange}
                />
                <div className="option">
                  {this.state.placesAutocomplete.length === 0 ?
                    null
                    :
                    this.state.placesAutocomplete.map(location => {
                      return (
                        <span onKeyUp={this.chooseOnEnter} tabIndex="0" onClick={this.choosePlacesInterested} key={location.id} data-id={location.id} data-name={location.name}>
                          {location.name}
                        </span>
                      );
                    })
                  }
                </div>
              </div>

              
              <div>
                {/* summary - maybe not limit length, and just split it like lambda notes */}
                <label htmlFor="userSummary">
                  Summary:
                </label>
                <textarea
                  maxLength="128"
                  id="userSummary"
                  placeholder="This is 128 characters or so describing how
                  awesome I am and why you should like me. Similar
                  to what I put on my LinkedIn!"
                  name="summary"
                  value={this.state.summary}
                  onChange={this.onInputChange}
                />
              </div>
                
              <div>
                {/* topskills - Autocomplete from DB bucket already in state */}
                {/* Multiple Inputs - Normalize for DB, string of skill IDs */}
                <label htmlFor="userTopSkills">
                  Top Skills:
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  id="top_skills"
                  placeholder="Put 5 skills here, they are the biggest on your profile"
                  name="topSkillsInput"
                  value={this.state.topSkillsInput}
                  onChange={this.onInputChange}
                /><span id="top_skills" name="topSkillsInput" onClick={this.addSkillsNew}>Add New</span>
                {/* {this.state.topSkillsList.length === 0 ?
                  null
                  :
                  this.state.topSkillsList.map(skill => {
                    return (<option onClick={this.chooseTopSkills} key={skill} value={skill}>{skill}</option>);
                  })
                } */}
              </div>
            
              <div>
                {/* addskills - Autocomplete from DB bucket already in state */}
                {/* Multiple Inputs - Normalize for DB, string of skill IDs */}
                <label htmlFor="userAdditionalSkills">
                  Additional Skills:
                </label>
                <input
                  type="text"
                  id="add_skills"
                  placeholder="Put more skills here. They will be medium on your profile"
                  name="additionalSkillsInput"
                  value={this.state.additionalSkillsInput}
                  onChange={this.onAdditionalSkillsChange}
                /><span id="add_skills" name="additionalSkillsInput" onClick={this.addSkillsNew}>Add New</span>
                {/* {this.state.additionalSkillsList.length === 0 ?
                  null
                  :
                  this.state.additionalSkillsList.map(skill => {
                    return (<option onClick={this.chooseAdditionalSkills} key={skill} value={skill}>{skill}</option>);
                  })
                } */}
              </div>
            
              <div>
                {/* familiar - Autocomplete from DB bucket already in state */}
                {/* Multiple Inputs - Normalize for DB, string of skill IDs */}
                <label htmlFor="userFamiliarSkills">
                  Familiar With:
                </label>
                <input
                  type="text"
                  id="familiar"
                  placeholder="Put remaining skills here. They will be small on your profile"
                  name="familiarSkillsInput"
                  value={this.state.familiarSkillsInput}
                  onChange={this.onFamiliarSkillsChange}
                /><span id="familiar" name="familiarSkillsInput" onClick={this.addSkillsNew}>Add New</span>
                {/* {this.state.familiarSkillsList.length === 0 ?
                  null
                  :
                  this.state.familiarSkillsList.map(skill => {
                    return (<option onClick={this.chooseFamiliarSkills} key={skill} value={skill}>{skill}</option>);
                  })
                } */}
              </div>
            </form>
          </FormSection>
          {/* <PreviewSection>
            <div>
              <h3>Your Places Interested</h3>
              {this.state.placesInterestedArr.length === 0 ?
                <p>No places listed</p>
                :
                this.state.placesInterestedArr.map(place => {
                  return (
                    <p className="selection" key={place}>
                      <span><i onClick={this.removePlace} className="fa fa-times-circle"></i></span> {place}
                    </p>
                  )
                })
              }
            </div>
            <div>
              <h3>Your Top Skills</h3>
            </div>
            <div>
              <h3>Your Additional Skills</h3>
            </div>
            <div>
              <h3>Your Familiar Skills</h3>
            </div>
          </PreviewSection> */}
        </div>
        <ButtonContainer>
          <div>
            <Link to="/dashboard/where-to-find-you">Back</Link>
          </div>
          <div>
            <button onClick={this.checkOnSubmit}>Save Info</button>
          </div>
          <div>
            <Link to="/dashboard/projects">Next</Link>
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
  input, textarea {
    ${inputArea()};
  }
  textarea {
    padding: 15px 15px 60px;
    resize: none;
  }
`;

const PreviewSection = styled.section`
  div {
    padding: 20px;
    width: 100%;
    margin-bottom: 50px;
  }
  h3 {
    margin-bottom: 25px;
  }
  p {
    font-size: 1.7rem;
    color: rgb(42,42,42);
    line-height: 23px;
    margin-bottom: 15px;
  }
  span {
    &:hover {
      cursor: pointer;
    }
  }
  .selection {
    &:hover {
      background-color: rgba(173,216,230, .5);
      cursor: pointer;
    }
  }
`;

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

export default AboutYou;
