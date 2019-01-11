import React, { Component } from 'react'
import axios from 'axios';



/*
API / FORMATTING
** /register - If 3rd party Oauth returns email when user registers
might be part of /register
will need to call db.addUser
will need to make fname and lname optional
oAuth returns limited user info(name, email, age, ets), some do not provide info
*Only work with oAuth that returns SOME user info to create user
user will be created in this step
all other steps will be edit user
post('/new')
Add new user, Initial batch
might need to make this initial batch an edit since /register created user
might merge /new with /register
Flow
user registers with 3rd party oAuth
oAuth returns token + limited user info
user is created with limited info '/register'
user is sent to profile(seeker) '/editUser'
this step should be able to handle all user info
projects, skills, location, education, experience
x amount of info MUST be filled out for user card to be added to the developers list
billing MUST be completed as well
User is now free to visit any page
'/users' - main browse page
get all users
'/users/:id' - expanded profile page
get user
---
server.post('/new', (req, res) => db.addUser(req.body)
creates new user, might be part of /register
server.get('/', (req, res) => db.getUsers()
get all users - for card view
excludes projects, experience, education 
"firstname", "lastname", "email", "location",
"summary", "title", "badge", "github",
"linkedin", "portfolio", "topskills",
"addskills", "familiar", "filter"
server.get('/:id', (req, res) => db.getUsers(req.params.id)
get single user - for expanded card view
excludes projects, experience, education
"firstname", "lastname", "email", "location",
"summary", "title", "badge", "github",
"linkedin", "portfolio", "topskills",
"addskills", "familiar", "filter"
might need to get the rest (projects, experience, education)
server.get('/skills/:id/:type', (req, res) => db.getUserPlacesOrSkills(req.params.id, req.params.type)
get skills or places, define in path as "type" either skills or places
get places(id) OR skills(id) - choose by 'type'
will NEED to filter for onChange, so it will not return ALL at every keystroke
similar to Autocomplete
* Places might not work since it already has autocomplete
server.post('/addkeys/:userid/:type', (req, res) => db.createKeywords(req.params.type, req.body)
add a skill to the skill bank
post places(id) OR skills(id) - choose by 'type'
db.createKeywords(req.params.type, req.body) adds to db depending on args(eg. type=places, body=id)
db.addKeywords(req.params.userid, req.params.type, oldKeys) adds skills/places to user table
erver.get('/topskills', (req, res) => db.getAllSkills() ?
*/


class UserInitProfile extends Component {

  state = {
    email: "", // str Required
    firstName: "", // firstname str Required
    lastName: "", // lastname str Required
    profileImg: "", // upload to s3, use img link returned - s3 link will be stored in db
    desiredTitle: "", // title str

    // filter ?

    currentLocationInput: "",
    locationAutocomplete: [],
    currentLocation: "", // str location - Verify - location ID(string)

    github: "", // str
    linkedIn: "", // str linkedin
    portfolio: "", // str
    acclaim: "", // str badge - Verify

    placesInterestedInput: "",
    placesAutocomplete: [],
    placesInterested: [], // Array place - Normalize [{place: 'New York'}, {place: 'Los Angeles'}]

    summary: "", // str

    // Server will have to filter each onChange to return matching, same as autocomplete
    // same with other skills
    topSkillsInput: "",
    topSkillsList: [],
    topSkills: [], // Array topskill - Normalize [{topskill: 'HTML'}, {topskill: 'CSS'}]

    additionalSkillsInput: "",
    additionalSkillsList: [],
    additionalSkills: [], // Array addskill - Normalize [{addskill: 'HTML'}, {addskill: 'CSS'}]

    familiarSkillsInput: "",
    familiarSkillsList: [],
    familiarSkills: [], // Array familiar - Normalize [{familiar: 'HTML'}, {familiar: 'CSS'}]

    // will be wrapped in object
    projectTitle: "", // str projtitle
    projectImg: "", // str projimg - upload to s3, use img link returned - s3 link will be stored in db
    projectLink: "", // str link
    projectDescription: "", // str projdescription

    // will be wrapped in object
    jobTitle: "", // str jobtitle
    jobDates: "", // str jobdates - Datepicker?
    jobDescription: "", // str jobdescription

    // will be wrapped in object
    schoolName: "", // str school
    schoolDates: "", // str schooldates - Datepicker?
    schoolCourse: "", // str course
    schoolDegree: "" // str degree
  };

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



  checkOnchange = (e) => {
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

  checkAcclaim(e) {
    console.log(e.target.value)
    axios
    .post("http://localhost:7000/acclaim", {acclaimBadge: e.target.value})
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  }


  render() {
    console.log('STATEEE',this.state.profileImg)
    return (
      <main>
        <header>
          Hello
        </header>


        <div>
        <label>
          Choose a profile picture:
        </label>
        <input
          type="file"
          accept="image/*"
          encrypt="multipart/form-data"
          onChange={this.checkOnchange}
        />
        </div>

        <div>
          {this.state.profileImg === "" ?
            null
            :
            <img src={this.state.profileImg} alt="P"/>
          }
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
              onBlur={this.checkAcclaim}
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
