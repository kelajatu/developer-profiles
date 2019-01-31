import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
    makeSkillsArr(){
        let newArr = [];
        let string = 'Lorem ipsum dolor sit persequeris an Et vis possim percipitur appellantur est quas efficiantur theophrastus te tation torquatoss'
        let tempArr = string.split(' ')
        tempArr.forEach((word, index) => {
            let weight = word.length * index % 15 + 5
            newArr.push({
                id: index,
                skill: word,
                weight: weight
            }) 
        })
        this.setState({
            arr: newArr,
        })
    }

    componentDidMount(){
      this.makeSkillsArr()
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

    render(){
        let topSkillsArr;
        let addSkillsArr;
        let famSkillsArr;

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

        return (
                <UserCardContainer onClick={()=> this.setState({expanded: !this.state.expanded})} expanded={this.state.expanded ? true : false}>
                    <div className="userCardDiv">
                        <div className="left-side">
                            <div className="bio">
                                <img className="photo"src={this.props.image} alt="user avatar"/>
                                <div className="user-intro">
                                    <h2>{`${this.props.first_name} ${this.props.last_name}`}</h2>
                                    <p className="location">{this.props.location}</p>
                                    {/* <p className="location">{this.props.location ? this.props.location.locationName : null}</p> */}
                                    <p>{this.props.summary}</p>
                                </div>
                            </div>
                            <h3>{this.props.desired_title}</h3>
                            <div className="keywords">
                                {topSkillsArr.length > 0 ? topSkillsArr.map(word => {
                                    return (<div key={word.id} className="keyword">
                                        {word.skill}
                                    </div>)
                                }) : null}
                                {addSkillsArr.length > 0 ? addSkillsArr.map(word => {
                                    return (<div key={word.id} className="keyword">
                                        {word.skill}
                                    </div>)
                                }) : null}
                                {famSkillsArr.length > 0 ? famSkillsArr.map(word => {
                                    return (<div key={word.id} className="keyword">
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
                    </div>
                    <div>
                        {this.state.expanded ? 
                            <div className="projects-etc">
                                {/* ~~~~ projects ~~~~ */}
                                <h2>Projects</h2>
                                {this.state.projects.map(project => 
                                    <div className="proj-etc-container">
                                        <div className="extratitle">{project.project_title}</div>
                                        <a rel="noopener noreferrer" href={project.link} target="_blank">{project.link}</a>
                                        <div className="proj-image-container">
                                            <img width="200px" height="min-height" src={project.project_img} alt="project"/>
                                            <div className="description">{project.project_description}</div>
                                        </div>
                                    </div>
                                )}
                                {/* ~~~~ experience ~~~~ */}
                                <h2>Experience</h2>
                                {this.state.experience.map(experience => 
                                    <div className="proj-etc-container">
                                        <div className="extratitle">{experience.job_title}</div>
                                        <div className="dates">{experience.job_dates}</div>
                                        <div className="indent">{experience.job_description}</div>
                                    </div>
                                )}
                                {/* ~~~~ education ~~~~ */}
                                <h2>Education</h2>
                                {this.state.education.map(education => 
                                    <div className="proj-etc-container">
                                        <div className="extratitle">{education.school}</div>
                                        <div className="dates">{education.school_dates}</div>
                                        <div className="indent">{education.degree}</div>
                                        <div className="indent">{education.course}</div> 
                                    </div>
                                )}
                            </div>    
                        : null}
                    </div>
                </div>
                <div className="links">
                    {this.props.badge !== null ? this.props.badge !== "acclaim.com" ? <img className="badge" src={this.props.badge} alt="acclaim badge"/> : null : null}
                    <a rel="noopener noreferrer" href={this.props.github} target="_blank"><i className="fab fa-github"></i></a>
                    <a rel="noopener noreferrer" href={this.props.linkedin} target="_blank"><i className="fab fa-linkedin"></i></a>
                    <a rel="noopener noreferrer" href={this.props.portfolio} target="_blank"><i className="fas fa-code"></i></a>
                </div>
                </div>
                <div>
                    {this.state.expanded ? 
                        <div className="projects-etc">
                        {/* ~~~~ projects ~~~~ */}
                            <h2>Projects</h2>
                            {this.state.projects.map(project => <div className="proj-etc-container">
                            <div className="extratitle">{project.project_title}</div>
                            <a rel="noopener noreferrer" href={project.link} target="_blank">{project.link}</a>
                            <div className="proj-image-container">
                                <img width="200px" height="min-height" src={project.project_img} alt="project"/>
                                <div className="description">{project.project_description}</div>
                            </div>
                            </div>)}
                        {/* ~~~~ experience ~~~~ */}
                            <h2>Experience</h2>
                            {this.state.experience.map(experience => <div className="proj-etc-container">
                            <div className="extratitle">{experience.job_title}</div>
                            <div className="dates">{experience.job_dates}</div>
                            <div className="indent">{experience.job_description}</div>
                            </div>)}
                        {/* ~~~~ education ~~~~ */}
                            <h2>Education</h2>
                            {this.state.education.map(education => <div className="proj-etc-container">
                            <div className="extratitle">{education.school}</div>
                            <div className="dates">{education.school_dates}</div>
                            <div className="indent">{education.degree}</div>
                            <div className="indent">{education.course}</div> 
                            </div>)}
                        </div>    
                    : null}
                </div>
            </UserCardContainer>
        )
    }
}

const UserCardContainer = styled.div`
    border-radius: 5px;
    border: lightgrey solid 1px;
    background: white;
    height: ${props => props.expanded ? null : 320}px;
    min-height: ${props => props.expanded ? 700 : null}px;
    width: 520px;
    margin-bottom: 30px;
    margin-right: 30px;
    padding-bottom: 20px;
    a {
        color: black;
    }
    .userCardDiv {
        box-sizing: border-box;
        padding-top: 20px;
        display: flex;
        justify-content: center;
        .left-side {
            width: 90%;
            overflow: hidden;
            height: 100%;
            margin-left: 28px;
            h2 {
                font-size: 30px;
            }
            h3 {
                font-size: 22px;
                padding: 5px 5px;
                border-top: 1px solid lightgrey;
                border-bottom: 1px solid lightgrey;
            }
            .bio {
                display: flex;
                flex-direction: row;
                margin: 0;
                p {
                    font-size: 13px;
                    margin: 3px;
                }
                .user-intro {
                    display: flex;
                    flex-direction: column;
                    margin: 0;
                    padding: 10px 0 10px 10px;
                    width: 70%;
                }
                .location {
                    color: limegreen;
                    padding: 5px 0;
                }
                .photo {
                    display: flex;
                    border-radius: 100px;
                    justify-content: center;
                    align-items: center;
                    width: 100px;
                    height: 100px;
                    background-image: cover;
                    margin: 10px;
                    margin-left:0;
                }
            }
            .keywords {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                flex-wrap: wrap;
                padding: 10px, 0;
                margin-top: 20px;
                margin-bottom: 20px;
                .keyword {
                    padding: 1px;
                    margin: 2px;
                }
            }
        }
    
        .links {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 15%;
            height: 300px;
            margin-left: 10px;
            margin-right: 10px;
            .fab, .fas {
                font-size: 40px;
                &:hover{
                    color: gray;
                }
                cursor: pointer;
            }
            .fas {
                font-size: 35px;
                margin-bottom: 40px;
            }
            .badge {
                width: 50px;
                margin-top: 25px;
                cursor: pointer;
            }
        }
    }
    .projects-etc {
        margin-left: 28px;
        h2 {
            font-size: 22px;
            padding: 5px 5px;
            margin-bottom: 15px;
            border-top: 1px solid lightgrey;
            border-bottom: 1px solid lightgrey;
            width: 465px;
        }
        a {
            margin-left: 5px;
        }
    }
    .proj-image-container {
        img {
            border-radius: 3px;
        }
        margin-left: 5px;
        display: flex;
        justify-content: space-between;
        align-items:center;
        margin-top: 10px;
     
    }
    .proj-etc-container {
        margin-bottom: 20px;
        margin-right: 28px;
    }
    .extratitle {
        font-size: 20px;
        font-weight: bold;
        padding-left: 5px;
        margin-bottom: 5px;
    }
    .dates {
        font-size: 15px;
        margin: 5px 0 0 10px;
        color: grey;
    }
    .description {
        width: 250px;
        padding-left: 10px;
    }
   .indent {
    margin-left: 5px;
   }
   @media (max-width: 1440px) {
       margin-right: 0;
   }
   @media (max-width: 480px) {
        transform: scale(.7);
    }
`;

export default UserCard;