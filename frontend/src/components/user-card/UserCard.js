import React, { Component } from 'react';
import axios from 'axios';
import UserCardContainer from './UserCard.styles.js'

class UserCard extends Component{
    constructor(props){
        super(props)
        this.state = {
            arr: [],
            expanded: false,
            projects: [],
            education: [],
            experience: [],
            top_skills: [],
            add_skills: [],
            familiar: [],
        }
    }

    componentDidMount(){
        this.getUserExtras('projects')
        this.getUserExtras('education')
        this.getUserExtras('experience')
        this.getUserSkills('top_skills')
        this.getUserSkills('add_skills')
        this.getUserSkills('familiar')
    }

    getUserExtras = (extra) => {
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.id}/${extra}`).then(response => {
            this.setState({[extra]: response.data})
        }).catch(err => {
            console.log(err)
        })
    }

    getUserSkills = (skilltype) => {
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.id}/skills/${skilltype}`).then(response => {
            this.setState({[skilltype]: response.data})
        }).catch(err => {
            console.log(err)
        })
    }

    deleteUserSkill = (skilltype, skillID) => {
        axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.id}/deleteskill/${skilltype}/${skillID}`).then(response => {
            this.getUserSkills(skilltype);
        }).catch(err => {
            console.log(err)
        })
    }

    render(){
        let topSkillsArr;
        let addSkillsArr;
        let famSkillsArr;
        let userEducationArr;
        let userExperienceArr;
        let userProjectsArr;

        if (this.props.userTopSkills) {
            topSkillsArr = this.props.userTopSkills
        } else {
            topSkillsArr = this.state.top_skills
        }
        if (this.props.userAddSkills) {
            addSkillsArr = this.props.userAddSkills
        } else {
            addSkillsArr = this.state.add_skills
        }
        if (this.props.userFamSkills) {
            famSkillsArr = this.props.userFamSkills
        } else {
            famSkillsArr = this.state.familiar
        }

        if (this.props.userProjects) {
            userProjectsArr = this.props.userProjects
        } else {
            userProjectsArr = this.state.projects
        }
        if (this.props.userExperience) {
            userExperienceArr = this.props.userExperience
        } else {
            userExperienceArr = this.state.experience
        }
        if (this.props.userEducation) {
            userEducationArr = this.props.userEducation
        } else {
            userEducationArr = this.state.education
        }

        return (
                <UserCardContainer 
                  
                    expanded={this.state.expanded ? true : false}>
                    <div className="userCardDiv">

                        <div className="top">
                            <div className="left-side">
                                <div className="bio">
                                    {this.props.image !== null ? 
                                        this.props.image !== "" ?
                                        <img className="photo" src={this.props.image} alt="user avatar"/> : 
                                        <div className="photo"><i className="fas fa-laptop"></i></div> :
                                                <div className="photo"><i className="fas fa-laptop"></i></div>
                                    }
                                    <div className="user-intro">
                                        <h2>{`${this.props.first_name} ${this.props.last_name}`}</h2>
                                        <p className="location">{this.props.location}</p>
                                        <p>{this.props.summary}</p>
                                     </div>
                                </div>
                                <h3>{this.props.desired_title}</h3>
                                <div className="keywords">
                                    {topSkillsArr.length > 0 ? topSkillsArr.map(word => {
                                        return (<div key={word.id} className="keyword topskill">
                                            {word.skill}
                                        </div>)
                                    }) : null}
                                    {addSkillsArr.length > 0 ? addSkillsArr.map(word => {
                                        return (<div key={word.id} className="keyword addskill">
                                            {word.skill}
                                        </div>)
                                    }) : null}
                                    {famSkillsArr.length > 0 ? famSkillsArr.map(word => {
                                        return (<div key={word.id} className="keyword famskill">
                                            {word.skill}
                                        </div>)
                                    }) : null}
                                </div>
                            </div>
                            <div className="links">
                                {this.props.badge !== null ? this.props.badge !== "acclaim.com" ? <img className="badge" src={this.props.badge} alt="acclaim badge"/> : null : null}
                                <a rel="noopener noreferrer" href={this.props.github} target="_blank"><i className="fab fa-github"></i></a>
                                <a rel="noopener noreferrer" href={this.props.linkedin} target="_blank"><i className="fab fa-linkedin"></i></a>
                                <a rel="noopener noreferrer" href={this.props.portfolio} target="_blank"><i className="fas fa-code"></i></a>
                            </div>
                        </div>{/* top */}
                    
                   
                    </div>
                    <div>
                        {this.state.expanded ? 
                            <div className="projects-etc">
                                {/* ~~~~ projects ~~~~ */}
                                <h2>Projects</h2>
                                {userProjectsArr.map(project => 
                                    <div className="proj-etc-container">
                                        <div className="extratitle">{project.project_title}</div>
                                        <a rel="noopener noreferrer" href={project.link} target="_blank">{project.link}</a>
                                        <div className="proj-image-container">
                                            <img width="150px" height="min-height" src={project.project_img} alt="project"/>
                                            <div className="description">{project.project_description}</div>
                                        </div>
                                    </div>
                                )}
                                {/* ~~~~ experience ~~~~ */}
                                <h2>Experience</h2>
                                {userExperienceArr.map(experience => 
                                    <div className="proj-etc-container">
                                        <div className="extratitle">{experience.job_title}</div>
                                        <div className="dates">{experience.job_dates}</div>
                                        <div className="indent">{experience.job_description}</div>
                                    </div>
                                )}
                                {/* ~~~~ education ~~~~ */}
                                <h2>Education</h2>
                                {userEducationArr.map(education => 
                                    <div className="proj-etc-container">
                                        <div className="extratitle">{education.school}</div>
                                        <div className="dates">{education.school_dates}</div>
                                        <div className="indent">{education.degree}</div>
                                        <div className="indent">{education.course}</div> 
                                    </div>
                                )}
                            </div>    
                        : null}
                        <div className="bottom" 
                            onClick={()=> this.setState({expanded: !this.state.expanded})} >
                            <i class={this.state.expanded?"fas fa-caret-up":"fas fa-caret-down"}></i>
                        </div>
                    </div>
                </UserCardContainer>
        )
    }
}

export default UserCard;
