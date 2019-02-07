import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserCard from '../../../components/user-card/UserCard';
import { TextInput } from 'grommet';

import {
  MainFormContainer,
  FormSection,
  LabelContainer,
  ButtonContainer,
  Validator,
  CardPreviewSection,
  MobileCardPreviewSection
} from '../styles/FormStyles';

var noLeaks;
class Education extends Component {
  state = {
    submitSuccess: false,
    submitFailure: false,
    schoolName: "",
    schoolNameValidation: true,
    schoolCourse: "",
    schoolCourseValidation: true,
    schoolDegree: "",
    schoolDegreeValidation: true,
    schoolDatesFrom: "1936-04",
    schoolDatesFromValidation: true,
    schoolDatesTo: "1950-01",
    schoolDatesToValidation: true,
    education: this.props.userInfo.userEducation || []
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  // Checking package that will be sent for user info
  checkOnSubmit = (e) => {
    e.preventDefault()

    let months = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December',
    }

    const { schoolDatesFrom,schoolDatesTo, schoolName, schoolCourse, schoolDegree } = this.state;

    if (schoolName === "") {
      this.setState({schoolNameValidation: false})
      return
    } else {
      this.setState({schoolNameValidation: true})
    }
    
    if (schoolCourse === "") {
      this.setState({schoolCourseValidation: false})
      return
    } else {
      this.setState({schoolCourseValidation: true})
    }
    
    if (schoolDegree === "") {
      this.setState({schoolDegreeValidation: false})
      return
    } else {
      this.setState({schoolDegreeValidation: true})
    }

    let newSchoolDatesFrom;
    if (schoolDatesFrom !== "1936-04") {
      if (!schoolDatesFrom) {
        this.setState({schoolDatesFromValidation: false})
        return
      } else {
        newSchoolDatesFrom = schoolDatesFrom.split('-');
        newSchoolDatesFrom = `${months[newSchoolDatesFrom[1]]} ${newSchoolDatesFrom[0]}`;
      }
    }
    if (!newSchoolDatesFrom) {
      this.setState({schoolDatesFromValidation: false})
      return
    } else {
      this.setState({schoolDatesFromValidation: true})
    }
    
    let newSchoolDatesTo;
    if (schoolDatesTo !== "1950-01") {
      if (!schoolDatesTo) {
        newSchoolDatesTo = 'Present'
      } else {
        newSchoolDatesTo = schoolDatesTo.split('-');
        newSchoolDatesTo = `${months[newSchoolDatesTo[1]]} ${newSchoolDatesTo[0]}`;
      }
    }
    if (!newSchoolDatesTo) {
      this.setState({schoolDatesToValidation: false})
      return
    } else {
      this.setState({schoolDatesToValidation: true})
    }
    
    let schoolDates = `${newSchoolDatesFrom} to ${newSchoolDatesTo}`

    const lePackage = {
      user_id: this.props.userInfo.id,
      school: schoolName,
      school_dates: schoolDates,
      degree: schoolCourse,
      course: schoolDegree
    }

    axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}/education`, lePackage)
      .then(res => {
        this.setState({
          submitSuccess: true,
          schoolName: "",
          schoolCourse: "",
          schoolDegree: "",
          schoolDatesFrom: "1936-04",
          schoolDatesTo: "1950-01"
        })
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

  componentWillUnmount() {
    clearTimeout(noLeaks)
  }

  editExtra = (edit) => {
    let dates = edit.school_dates.split(" to ")
    let monthMaker = {
      'January': '01',
      'February': '02',
      'March': '03',
      'April': '04',
      'May': '05',
      'June': '06',
      'July': '07',
      'August': '08',
      'September': '09',
      'October': '10',
      'November': '11',
      'December': '12',
    }
    let startFrom = dates[0].split(" ")
    let monthFrom = startFrom[0]
    let yearFrom = startFrom[1]
    let endFrom = `${yearFrom}-${monthMaker[monthFrom]}`
    let startTo = dates[1].split(" ")
    let monthTo = startTo[0]
    let yearTo = startTo[1]
    let endTo = `${yearTo}-${monthMaker[monthTo]}`

    if(this.state.enableEdit){
        this.setState({
          enableEdit: false,
          schoolId: null,
          schoolName: '',
          schoolCourse: '',
          schoolDegree: '',
          schoolDatesFrom: "1936-04",
          schoolDatesTo: "1950-01"
        })
    } else {
        this.setState({
          enableEdit: true,
          schoolId: edit.id,
          schoolName: edit.school,
          schoolCourse: edit.course,
          schoolDegree: edit.degree,
          schoolDatesFrom: endFrom,
          schoolDatesTo: endTo,
          schoolDates: edit.school_dates
        })
    }
  }

  submitEdit = () => {
    const lePackage = {
      user_id: this.props.userInfo.id,
      id: this.state.schoolId,
      school: this.state.schoolName,
      course: this.state.schoolCourse,
      degree: this.state.schoolDegree,
      school_dates: this.state.schoolDates,
    }
    console.log("submitEdit", lePackage, this.state)
    axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}/education/${this.state.schoolId}`, lePackage)
    .then(res => {
      window.location.reload()
    }).catch(err => {
      console.log(err.message)
    })
  }


  render() {
    return (
      <MainFormContainer>
        <header>
          <h1 className="main-heading">Education</h1>
        </header>

        <div className="container">
          <FormSection>
            <form>

              {/* school */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userSchoolName">
                    School Name:
                  </label>
                </LabelContainer>
                <Validator validated={this.state.schoolNameValidation}>
                  <TextInput
                    id="userSchoolName"
                    name="schoolName"
                    className="validated-text-input"
                    placeholder="Lambda School"
                    focusIndicator
                    plain
                    value={this.state.schoolName}
                    onChange={this.onInputChange}
                  />
                </Validator>
              </div>

              {/* schooldates */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userSchoolDatesFrom">
                    Dates Attended From:
                  </label>
                </LabelContainer>
                <Validator validated={this.state.schoolDatesFromValidation}>
                  <TextInput
                    type="month"
                    min="1936-01"
                    id="userSchoolDatesFrom"
                    name="schoolDatesFrom"
                    className="validated-text-input"
                    focusIndicator
                    plain
                    value={this.state.schoolDatesFrom}
                    onChange={this.onInputChange}
                  />
                </Validator>
              </div>

              {/* schooldates */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userSchoolDatesTo">
                    Dates Attended To:
                  </label>
                </LabelContainer>
                <Validator validated={this.state.schoolDatesToValidation}>
                  <TextInput
                    type="month"
                    id="userSchoolDatesTo"
                    name="schoolDatesTo"
                    className="validated-text-input"
                    focusIndicator
                    plain
                    value={this.state.schoolDatesTo}
                    onChange={this.onInputChange}
                  />
                </Validator>
              </div>

              {/* course */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userSchoolCourse">
                    School Course:
                  </label>
                </LabelContainer>
                <Validator validated={this.state.schoolCourseValidation}>
                  <TextInput
                    id="userSchoolCourse"
                    name="schoolCourse"
                    className="validated-text-input"
                    placeholder="Computer Science"
                    focusIndicator
                    plain
                    value={this.state.schoolCourse}
                    onChange={this.onInputChange}
                  />
                </Validator>
              </div>

              {/* degree */}
              <div className="text-input-container">
                <LabelContainer>
                  <label htmlFor="userSchoolDegree">
                    School Degree or Certification:
                  </label>
                </LabelContainer>
                <Validator validated={this.state.schoolDegreeValidation}>
                  <TextInput
                    id="userSchoolDegree"
                    name="schoolDegree"
                    className="validated-text-input"
                    placeholder="Bachelors"
                    focusIndicator
                    plain
                    value={this.state.schoolDegree}
                    onChange={this.onInputChange}
                  />
                </Validator>
              </div>

            </form>
            {this.state.enableEdit ? <button onClick={this.submitEdit}>Submit Edit</button> : null}
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
              canEditEdu
              canEdit
              enableEdit
              delExtra={this.props.delExtra}
              editExtra={this.editExtra}

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
              userEducation={this.props.userInfo.userEducation}
            />
          </CardPreviewSection>
        </div>
        <ButtonContainer>
          <Link to="/dashboard/experience">Back</Link>
          <button onClick={this.checkOnSubmit}>
            {this.state.submitSuccess ?
              <i className="success fa fa-check-circle fa-2x"></i>
              :
              'Save Info'
            }
          </button>
          <Link to="/dashboard/billing">Next</Link>
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

export default Education;