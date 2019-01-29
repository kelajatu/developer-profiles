import React, {Component} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import acclaimplaceholder from './acclaimplaceholder.png'

class UserCard extends Component{
    constructor(props){
        super(props)
        this.state = {
            arr: [],
            expanded: false,
            projects: [],
            education: [],
            experience: []
        }
    }
    makeSkillsArr(){
        let newArr = [];
        let string = 'Lorem ipsum dolor sit persequeris an Et vis possim percipitur appellantur est quas efficiantur theophrastus te tation torquatoss'
        let tempArr = string.split(' ')
        tempArr.forEach((word, index) => {
            let weight = word.length * index % 15 +5
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
       console.log("fire in da hole")
      this.makeSkillsArr()
      this.getUserExtras('projects')
      this.getUserExtras('education')
      this.getUserExtras('experience')
    }

    getUserExtras = (extra) => {
        axios.get(`https://developer-profiles.herokuapp.com/users/${this.props.id}/${extra}`).then(response => {
            this.setState({[extra]: response.data})
        })
    }

    render(){
        return (
            <div>
            <UserCardContainer onClick={()=> this.setState({expanded: !this.state.expanded})} expanded={this.state.expanded ? true : false}>
                <div className="userCardDiv">
                <div className="left-side">
                    <div className="bio">
                        <img className="photo"src={this.props.image} alt="user avatar"/>
                        <div className="user-intro">
                            <h2>{`${this.props.first_name} ${this.props.last_name}`}</h2>
                            <p className="location">{this.props.location? this.props.location.locationName : null}</p>
                            <p>{this.props.summary}</p>
                        </div>
                    </div>
                    <h3>{this.props.desired_title}</h3>
                    <div className="keywords">
                        {this.state.arr.length > 0 ? this.state.arr.map(word => {
                            return (<div key={word.id} className="keyword" style={{fontSize: word.weight }}>
                                {word.skill}
                            </div>)
                        }) : null}
                    </div>
                </div>
                <div className="links">
                    <img className="badge" src={this.props.badge !== null ? this.props.badge !== "acclaim.com" ? this.props.badge : acclaimplaceholder : acclaimplaceholder} alt="acclaim badge"/>
                    <i className="fab fa-github"></i>
                    <i className="fab fa-linkedin"></i>
                    <i className="fas fa-code"></i>
                </div>
                </div>
                <div>
                    {this.state.expanded ? 
                        <div className="projects-etc">
                        {/* ~~~~ projects ~~~~ */}
                            <h2>Projects</h2>
                            {this.state.projects.map(project => <div className="project-container">
                            <div className="extratitle">{project.project_title}</div>
                            <a href={project.link}/>
                            <div className="description">{project.project_description}</div>
                            <img width='200px' src={project.project_img} alt="project"/>
                            </div>)}
                        {/* ~~~~ experience ~~~~ */}
                            <h2>Experience</h2>
                            {this.state.experience.map(experience => <div className="experience-container">
                            <div className="extratitle">{experience.job_title}</div>
                            <div className="dates">{experience.job_dates}</div>
                            <div className="description">{experience.job_description}</div>
                            </div>)}
                        {/* ~~~~ education ~~~~ */}
                            <h2>Education</h2>
                            {this.state.education.map(education => <div className="education-container">
                            <div className="extratitle">{education.school}</div>
                            <div className="dates">{education.school_dates}</div>
                            <div className="degree">{education.degree}</div>
                            <div className="course">{education.course}</div> 
                            </div>)}
                        </div>    
                    : null}
            </div>
            </UserCardContainer>
            
            </div>
        )
    }
}

const UserCardContainer = styled.div`
    border-radius: 5px;
    border: lightgrey solid 1px;
    background: white;
    height: ${props => props.expanded ? 720 : 320}px;
    width: 520px;
    margin-bottom: 30px;
    .userCardDiv {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .left-side {
            width: 90%;
            overflow: hidden;
            height: 100%;
            margin-left: 35px;
            padding-top: 28px;
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
                }
            }
            .keywords {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                flex-wrap: wrap;
                padding: 10px, 0;
                margin-top: 20px;
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
            height: 100%;
            .fab, .fas {
                font-size: 40px;
                /* &:hover{
                    color: gray;
                } */
            }
            .fas {
                font-size: 35px;
                margin-bottom: 40px;
            }
            .badge {
                width: 50px;
            }
        }
    }
    .project-container {
    }
    .experience-container {

    }
    .education-container {

    }
    .extratitle {
        font-size: 25px;
    }
    .dates {
        font-size: 15px;
    }
    .description {

    }
    .degree {
        font-weight: bold;
    }
    .course {

    }
`;

export default UserCard;