import React, { Component } from 'react'
import axios from 'axios';



/*
API / FORMATTING

--------
User should already be in DB from '/register' at this point
When user registers through Auth0/passport, they will return some user info
might need to make name/last/email optional, or only work with 3rd party
Auth that returns at minimum an email
-----

---
all API calls from here will use PUT:'/:id'
---

---
it will not be just one big form

image upload will have own submit to DB(onUpload or hidden save button with feedback)

all user info can go in one submit:
email,fname,lname,title,location,git,linked,portfolio,acclaim,places,summary,skills

projects will have own submit

education will have own submit

experience will have own submit
---

---
Possible Flow
user registers with 3rd party oAuth
oAuth returns token + limited user info
user is created with limited info '/register'
user is sent to profile(seeker) + userId from DB
user can fill out any info - all submits will be PUT

x amount of info must be filled out for user card to be added to the developers list
billing must be completed as well
make a progress bar to publish user profile, progress will include minimum user info + billing
add CTA for billing, maybe button next to save, or a billing tab/link

User is now free to visit any page
---

*/


class UserInitProfile extends Component {

  state = {
    userId: "",
    email: "",
    firstName: "",
    lastName: "",
    profileImg: "",
    desiredTitle: "",

    currentLocationInput: "",
    locationAutocomplete: [],
    currentLocation: "",

    github: "",
    linkedIn: "",
    portfolio: "",
    acclaim: "",

    placesInterestedInput: "",
    placesAutocomplete: [],
    placesInterested: [],

    summary: "",

    topSkillsInput: "",
    topSkillsList: [],
    topSkills: [],

    additionalSkillsInput: "",
    additionalSkillsList: [],
    additionalSkills: [],

    familiarSkillsInput: "",
    familiarSkillsList: [],
    familiarSkills: [],

    projectTitle: "",
    projectImg: "",
    projectLink: "",
    projectDescription: "",

    jobTitle: "",
    jobDates: "",
    jobDescription: "",

    schoolName: "",
    schoolDates: "",
    schoolCourse: "",
    schoolDegree: ""
  };


  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  


  // current location
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



  // places interested
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



  // top skills
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



  // additional skills
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



  // familiar skills
  onFamiliarSkillsChange = e => {
    let newArr;
    var self = this;
    axios
    .post("http://localhost:7000/skills", {skillInput: e.target.value})
    .then(response => {
      // skills will prob get unloaded by this point so you will only need to filter, like the search bar
      // same with all skills
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



  // Photo upload
  uploadPhoto = (e) => {
    const file = e.target.files[0];
    let XHR = new XMLHttpRequest();
    let FD  = new FormData();

    // Push our data into our FormData object
    FD.append('image', file);

    var self = this;
    // Define what happens on successful data submission
    XHR.addEventListener('load', function(event) {
      let url = JSON.parse(event.target.responseText);
      self.setState({profileImg: url.imgUrl})
    });

    // Define what happens in case of error
    XHR.addEventListener('error', function(event) {
      alert('Oops! Something went wrong.');
    });

    // Set up our request
    XHR.open('POST', 'http://localhost:7000/image-upload');

    // Send our FormData object; HTTP headers are set automatically
    XHR.send(FD);
  }



  // Acclaim varification
  checkAcclaim(e) {
    console.log(e.target.value)
    // axios
    // .post("http://localhost:7000/acclaim", {acclaimBadge: e.target.value})
    // .then(response => {
    //   console.log(response.data)
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  }



  // Checking package that will be sent for user info
  checkOnSubmit = (e) => {
    e.preventDefault()
    console.log(this.state);
  }



  render() {
    console.log('STATEEE',this.state)
    return (
      <main>
        <header>
          Hello
        </header>



          {/* image - see if you can send '/:id' param on uploadPhoto */}
          <div>
            <label>
              Choose a profile picture:
            </label>
            <input
              type="file"
              accept="image/*"
              encrypt="multipart/form-data"
              onChange={this.uploadPhoto}
            />
          </div>
          {/* Show photo on Photo upload */}
          <div>
            {this.state.profileImg === "" ?
              null
              :
              <img src={this.state.profileImg} alt="P"/>
            }
          </div>



        {/* Main form - does not have to encapsulate everything, submit will be based on state */}
        <form className="main-form" onSubmit={this.checkOnSubmit}>

          {/* Seperating sections with fieldset*/}
          <fieldset className="user-info">

            {/* email - autofill if auth returns */}
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


            {/* firstname - autofill if auth returns */}
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


            {/* lastname - autofill if auth returns */}
            <label htmlFor="userLastName">
              Last Name:
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


            {/* title/filter - Autocomplete from DB bucket already in state */}
            {/* only one title, maybe use options instead since there won't be many */}
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
                return (<option onClick={this.chooseCurrentLocation} key={location.id} value={location.name}>{location.name}</option>);
              })
            }

          </fieldset>


          <br/>
          <br/>
          <br/>


          <fieldset className="user-social">

            {/* github */}
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


            {/* linkedin */}
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


            {/* portfolio */}
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


            {/* badge - verify onBlur */}
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
              onBlur={this.checkAcclaim}
            />
          
          </fieldset>


          <br/>
          <br/>
          <br/>


          <fieldset className="user-bio">

            {/* places - Autocomplete from google - saves location ID */}
            {/* Multiple Inputs - Normalize for DB, string of place IDs */}
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


            {/* summary - maybe not limit length, and just split it like lambda notes */}
            <label htmlFor="userSummary">
              Summary:
            </label>
            <textarea
              rows="4"
              cols="50"
              maxLength="128"
              id="userSummary"
              placeholder="This is 128 characters or so describing how
              awesome I am and why you should like me. Similar
              to what I put on my LinkedIn!"
              name="summary"
              value={this.state.summary}
              onChange={this.onInputChange}
            />
              

            <br/>


            {/* topskills - Autocomplete from DB bucket already in state */}
            {/* Multiple Inputs - Normalize for DB, string of skill IDs */}
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


            {/* addskills - Autocomplete from DB bucket already in state */}
            {/* Multiple Inputs - Normalize for DB, string of skill IDs */}
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

            
            {/* familiar - Autocomplete from DB bucket already in state */}
            {/* Multiple Inputs - Normalize for DB, string of skill IDs */}
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


          {/* projects table */}
          <fieldset className="user-projects">

          {/* projtitle */}
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

          {/* projimg - Upload Functionality */}
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

          {/* link */}
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

          {/* projdescription */}
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


          {/* experience table */}
          <fieldset className="user-experience">

            {/* jobtitle */}
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
            
            {/* jobdates - year/month options? */}
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
            
            {/* jobdescription */}
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


          {/* education table */}
          <fieldset className="user-education">

            {/* school */}
            <label htmlFor="userSchoolName">
              School Name:
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
            
            {/* schooldates - year/month options? */}
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
            
            {/* course */}
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

            {/* degree */}
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
        
        <button type="submit">SUBMIT</button>
        </form>

      </main>
    )
  }
}

export default UserInitProfile;
