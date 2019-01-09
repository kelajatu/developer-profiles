import React, { Component } from 'react'


class UserProfile extends Component {

  state = {
    email: "",
    firstName: "",
    lastName: "",
    desiredTitle: "",
    currentLocation: "",
    github: "",
    linkedIn: "",
    portfolio: "",
    acclaim: "",
    placesInterested: "",
    summary: "",
    topSkills: "",
    additionalSkills: "",
    familiarSkills: "",
    projectTitle: "",
    projectImg: "",
    projectLink: "",
    projectDescription: ""
  }

  onInputChange = (e) => {
    console.log(e.target.name)
    console.log(e.target.value)
    this.setState({ [e.target.name]: e.target.value });
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
        <form className="main-form">


          <fieldset className="user-info">

            {/* Required */}
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
            />
            
            <br/>

            {/* Required */}
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
            />
          
            <br/>
            {/* Optional */}
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
            />
          
            <br/>
            {/* Optional */}
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
            />
            
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
              name="currentLocation"
              value={this.state.currentLocation}
              onChange={this.onInputChange}
            />

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
              placeholder="www.linkedin.com/me"
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
              name="placesInterested"
              value={this.state.placesInterested}
              onChange={this.onInputChange}
            />

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
              name="topSkills"
              value={this.state.topSkills}
              onChange={this.onInputChange}
            />
          
            <br/>

            {/* Multiple Inputs - Normalize for DB - Optional */}
            <label htmlFor="userAdditionalSkills">
              Additional Skills:
            </label>
            <input
              type="text"
              id="userAdditionalSkills"
              placeholder="Put more skills here. They will be medium on your profile"
              name="additionalSkills"
              value={this.state.additionalSkills}
              onChange={this.onInputChange}
            />
          
            <br/>

            {/* Multiple Inputs - Normalize for DB - Optional */}
            <label htmlFor="userFamiliarSkills">
              Familiar With:
            </label>
            <input
              type="text"
              id="userFamiliarSkills"
              placeholder="Put remaining skills here. They will be small on your profile"
              name="familiarSkills"
              value={this.state.familiarSkills}
              onChange={this.onInputChange}
            />

          </fieldset>



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

          {/* Upload Functionality */}
          <label htmlFor="userProjectLink">
            Project Image Upload:
          </label>
          <input
            type="text"
            id="userProjectLink"
            placeholder="Upload Meee"
            name="projectLink"
            value={this.state.projectLink}
            onChange={this.onInputChange}
          />

          <br/>

          <label htmlFor="userprojectDescription">
            Summary:
          </label>
          <textarea
            rows="4"
            cols="50"
            id="userprojectDescription"
            placeholder="Some Project Description - This is 128 characters or so describing how
            awesome I am and why you should like me. Similar
            to what I put on my LinkedIn!"
            name="projectDescription"
            value={this.state.projectDescription}
            onChange={this.onInputChange}
          />
          </fieldset>


          {/* Optional */}
          <fieldset className="user-experience">

            {/* company name, job Description, Img(optional), Dates worked */}


          </fieldset>


          {/* Optional */}
          <fieldset className="user-education">

          {/* school name, Subjects, degree/diploma, Dates */}

          </fieldset>


        </form>

      </main>
    )
  }
}

export default UserProfile;