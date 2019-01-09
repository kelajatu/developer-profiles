import React, { Component } from 'react'
import axios from 'axios';


class UserInitProfile extends Component {

  state = {
    email: "", // str
    firstName: "", // firstname str
    lastName: "", // lastname str
    desiredTitle: "", // title str

    currentLocationInput: "",
    locationAutocomplete: [],
    currentLocation: "", // str location - Verify - maybe location ID

    github: "", // str
    linkedIn: "", // str linkedin
    portfolio: "", // str
    acclaim: "", // str badge - Verify

    placesInterestedInput: "",
    placesAutocomplete: [],
    placesInterested: [], // Array place - Normalize [{place: 'New York'}, {place: 'Los Angeles'}]

    summary: "", // str

    topSkillsInput: "",
    topSkillsList: [],
    topSkills: [], // Array topskill - Normalize [{topskill: 'HTML'}, {topskill: 'CSS'}]
    
    additionalSkillsInput: "",
    additionalSkillsList: [],
    additionalSkills: [], // Array addskill - Normalize [{addskill: 'HTML'}, {addskill: 'CSS'}]

    familiarSkillsInput: "",
    familiarSkillsList: [],
    familiarSkills: [], // Array familiar - Normalize [{familiar: 'HTML'}, {familiar: 'CSS'}]



    projectTitle: "", // str projtitle
    projectImg: "", // str projimg
    projectLink: "", // str link
    projectDescription: "", // str projdescription

    jobTitle: "", // str jobtitle
    jobDates: "", // str jobdates
    jobDescription: "", // str jobdescription

    schoolName: "", // str school
    schoolDates: "", // str schooldates
    schoolCourse: "", // str course
    schoolDegree: "", // str degree


  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  






  
  onLocationChange = (e) => {
    let newArr;
    var self = this;
    axios
    .post("http://localhost:7000/location", {inputLocation: e.target.value})
    .then(response => {
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
    this.setState({ currentLocation: e.target.value, locationAutocomplete: [], currentLocationInput: e.target.value });
  }



  onPlacesChange = (e) => {
    let newArr;
    var self = this;
    axios
    .post("http://localhost:7000/location", {inputLocation: e.target.value})
    .then(response => {
      newArr = response.data.predictions.map(location => {
        return {
          name: location.description,
          id: location.id
        };
      });
      self.setState({ placesAutocomplete: newArr });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({ [e.target.name]: e.target.value });
  }

  choosePlacesInterested = (e) => {
    let newplacesInterested;

    if (this.state.placesInterested.length === 0) {
      newplacesInterested = [];
      newplacesInterested.push(e.target.value);
    } else {
      newplacesInterested = this.state.placesInterested.slice();
      newplacesInterested.push(e.target.value);
    }

    this.setState({ placesInterested: newplacesInterested, placesAutocomplete: [], placesInterestedInput: e.target.value });
  }
  
  
  
  onTopSkillsChange = e => {
    let newArr;
    var self = this;
    axios
    .post("http://localhost:7000/skills", {skillInput: e.target.value})
    .then(response => {
      newArr = response.data.map(skill => skill);
      self.setState({ topSkillsList: newArr });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({ [e.target.name]: e.target.value });
  }
  
  chooseTopSkills = (e) => {
    let newtopSkills;

    if (this.state.topSkills.length === 0) {
      newtopSkills = [];
      newtopSkills.push(e.target.value);
    } else {
      newtopSkills = this.state.topSkills.slice();
      newtopSkills.push(e.target.value);
    }

    this.setState({ topSkills: newtopSkills, topSkillsList: [], topSkillsInput: e.target.value });
  }


  onAdditionalSkillsChange = e => {
    let newArr;
    var self = this;
    axios
    .post("http://localhost:7000/skills", {skillInput: e.target.value})
    .then(response => {
      newArr = response.data.map(skill => skill);
      self.setState({ additionalSkillsList: newArr });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({ [e.target.name]: e.target.value });
  }
  
  chooseAdditionalSkills = (e) => {
    let newadditionalSkills;

    if (this.state.additionalSkills.length === 0) {
      newadditionalSkills = [];
      newadditionalSkills.push(e.target.value);
    } else {
      newadditionalSkills = this.state.additionalSkills.slice();
      newadditionalSkills.push(e.target.value);
    }

    this.setState({ additionalSkills: newadditionalSkills, additionalSkillsList: [], additionalSkillsInput: e.target.value });
  }


  onFamiliarSkillsChange = e => {
    let newArr;
    var self = this;
    axios
    .post("http://localhost:7000/skills", {skillInput: e.target.value})
    .then(response => {
      newArr = response.data.map(skill => skill);
      self.setState({ familiarSkillsList: newArr });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({ [e.target.name]: e.target.value });
  }
  
  chooseFamiliarSkills = (e) => {
    let newfamiliarSkills;

    if (this.state.familiarSkills.length === 0) {
      newfamiliarSkills = [];
      newfamiliarSkills.push(e.target.value);
    } else {
      newfamiliarSkills = this.state.familiarSkills.slice();
      newfamiliarSkills.push(e.target.value);
    }

    this.setState({ familiarSkills: newfamiliarSkills, familiarSkillsList: [], familiarSkillsInput: e.target.value });
  }




  render() {
    return (
      <main>
        <header>
          Hello
        </header>


        <div>
          <h1>Upload Your Image</h1>
        </div>
        <form className="main-form" onSubmit={this.submitForm}>


          <fieldset className="user-info">

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

            <label htmlFor="userLastName">
              Last Name: *
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
            
            <br/>
            <br/>
            <br/>
            <br/>

            {/* Will Need Autocomplete - Auto Verification - Required - 
            might not need another fn to verify, might be able to verify on input change/location select */}
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
                return (<option onClick={this.chooseCurrentLocation} key={location.id} value={location.name}>{location.name}</option>);
              })
            }

          </fieldset>



          <fieldset className="user-social">

            {/* Optional */}
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
            {/* Optional */}
            <label htmlFor="userLinkedIn">
              LinkedIn:
            </label>
            <input
              type="text"
              id="userLinkedIn"
              placeholder="www.linkedIn.com/me"
              name="linkedIn"
              value={this.state.linkedIn}
              onChange={this.onInputChange}
            />
            
            <br/>
            {/* Optional */}
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

            {/* Will Need Verification - Optional - run fn once user submits */}
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
            />
          
          </fieldset>

          <br/>
          <br/>
          <br/>
          <br/>

          <fieldset className="user-bio">

            {/* Multiple Inputs - Normalize for DB - Optional - this will be a combination
            of location verification + skills tag structure */}
            <label htmlFor="userPlacesInterested">
              Places Interested:
            </label>
            <input
              type="text"
              id="userPlacesInterested"
              placeholder="Remote, Atlanta, Washington, San Francisco"
              name="placesInterestedInput"
              value={this.state.placesInterestedInput}
              onChange={this.onPlacesChange}
            />
            {this.state.placesAutocomplete.length === 0 ?
              null
              :
              this.state.placesAutocomplete.map(location => {
                return (<option onClick={this.choosePlacesInterested} key={location.id} value={location.name}>{location.name}</option>);
              })
            }


            <br/>
            {/* Required */}
            <label htmlFor="userSummary">
              Summary:
            </label>
            <textarea
              rows="4"
              cols="50"
              id="userSummary"
              placeholder="This is 128 characters or so describing how
              awesome I am and why you should like me. Similar
              to what I put on my LinkedIn!"
              name="summary"
              value={this.state.summary}
              onChange={this.onInputChange}
            />
              
            <br/>

            {/* Multiple Inputs - Normalize for DB - Optional */}
            <label htmlFor="userTopSkills">
              Top Skills:
            </label>
            <input
              type="text"
              id="userTopSkills"
              placeholder="Put 5 skills here, they are the biggest on your profile"
              name="topSkillsInput"
              value={this.state.topSkillsInput}
              onChange={this.onTopSkillsChange}
            />
            {this.state.topSkillsList.length === 0 ?
              null
              :
              this.state.topSkillsList.map(skill => {
                return (<option onClick={this.chooseTopSkills} key={skill} value={skill}>{skill}</option>);
              })
            }
          
            <br/>

            {/* Multiple Inputs - Normalize for DB - Optional */}
            <label htmlFor="userAdditionalSkills">
              Additional Skills:
            </label>
            <input
              type="text"
              id="userAdditionalSkills"
              placeholder="Put more skills here. They will be medium on your profile"
              name="additionalSkillsInput"
              value={this.state.additionalSkillsInput}
              onChange={this.onAdditionalSkillsChange}
            />
            {this.state.additionalSkillsList.length === 0 ?
              null
              :
              this.state.additionalSkillsList.map(skill => {
                return (<option onClick={this.chooseAdditionalSkills} key={skill} value={skill}>{skill}</option>);
              })
            }
          
            <br/>

            {/* Multiple Inputs - Normalize for DB - Optional */}
            <label htmlFor="userFamiliarSkills">
              Familiar With:
            </label>
            <input
              type="text"
              id="userFamiliarSkills"
              placeholder="Put remaining skills here. They will be small on your profile"
              name="familiarSkillsInput"
              value={this.state.familiarSkillsInput}
              onChange={this.onFamiliarSkillsChange}
            />
            {this.state.familiarSkillsList.length === 0 ?
              null
              :
              this.state.familiarSkillsList.map(skill => {
                return (<option onClick={this.chooseFamiliarSkills} key={skill} value={skill}>{skill}</option>);
              })
            }

          </fieldset>

          <br/>
          <br/>
          <br/>
          <br/>

          {/* Optional */}
          <fieldset className="user-projects">

          <label htmlFor="userProjectTitle">
            Project Name:
          </label>
          <input
            type="text"
            id="userProjectTitle"
            placeholder="My Cool Project"
            name="projectTitle"
            value={this.state.projectTitle}
            onChange={this.onInputChange}
          />
          
          <br/>

          {/* Upload Functionality */}
          <label htmlFor="userProjectImg">
            Project Image Upload:
          </label>
          <input
            type="text"
            id="userProjectImg"
            placeholder="Upload Meee"
            name="projectImg"
            value={this.state.projectImg}
            onChange={this.onInputChange}
          />
          
          <br/>

          <label htmlFor="userProjectLink">
            Project Link:
          </label>
          <input
            type="text"
            id="userProjectLink"
            placeholder="www.mysite.com"
            name="projectLink"
            value={this.state.projectLink}
            onChange={this.onInputChange}
          />

          <br/>

          <label htmlFor="userProjectDescription">
            Summary:
          </label>
          <textarea
            rows="4"
            cols="50"
            id="userProjectDescription"
            placeholder="Some Project Description - This is 128 characters or so describing how
            awesome I am and why you should like me. Similar
            to what I put on my LinkedIn!"
            name="projectDescription"
            value={this.state.projectDescription}
            onChange={this.onInputChange}
          />
          </fieldset>

          <br/>
          <br/>
          <br/>
          <br/>

          {/* Optional */}
          <fieldset className="user-experience">

            <label htmlFor="userJobTitle">
              Job Title:
            </label>
            <input
              type="text"
              id="userJobTitle"
              placeholder="Software Engineer"
              name="jobTitle"
              value={this.state.jobTitle}
              onChange={this.onInputChange}
            />
            
            <br/>
            
            <label htmlFor="userJobDates">
              Job Dates:
            </label>
            <input
              type="text"
              id="userJobDates"
              placeholder="2017-2019"
              name="jobDates"
              value={this.state.jobDates}
              onChange={this.onInputChange}
            />
            
            <br/>
            
            <label htmlFor="userJobDescription">
              Job Description:
            </label>
            <textarea
              rows="4"
              cols="50"
              id="userJobDescription"
              placeholder="Some Job Description - This is 128 characters or so describing how
              awesome I am and why you should like me. Similar
              to what I put on my LinkedIn!"
              name="jobDescription"
              value={this.state.jobDescription}
              onChange={this.onInputChange}
            />


          </fieldset>

          <br/>
          <br/>
          <br/>
          <br/>

          {/* Optional */}
          <fieldset className="user-education">

            <label htmlFor="userSchoolName">
              Job Title:
            </label>
            <input
              type="text"
              id="userSchoolName"
              placeholder="Lambda School"
              name="schoolName"
              value={this.state.schoolName}
              onChange={this.onInputChange}
            />
            
            <br/>
            
            <label htmlFor="userSchoolDates">
              Dates Attended:
            </label>
            <input
              type="text"
              id="userSchoolDates"
              placeholder="2017-2019"
              name="schoolDates"
              value={this.state.schoolDates}
              onChange={this.onInputChange}
            />
            
            <br/>
            
            <label htmlFor="userSchoolCourse">
              School Course:
            </label>
            <input
              type="text"
              id="userSchoolCourse"
              placeholder="Computer Science"
              name="schoolCourse"
              value={this.state.schoolCourse}
              onChange={this.onInputChange}
            />
            
            <br/>
            
            <label htmlFor="userSchoolDegree">
              Dates Attended:
            </label>
            <input
              type="text"
              id="userSchoolDegree"
              placeholder="Bachelors"
              name="schoolDegree"
              value={this.state.schoolDegree}
              onChange={this.onInputChange}
            />

          
          </fieldset>


        </form>

      </main>
    )
  }
}

export default UserInitProfile;
