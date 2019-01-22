import React, { Component } from 'react';
import styled from 'styled-components';
import {centerFlex} from '../../global-styles/Mixins';

class UserCardPreview extends Component {
  makeSkillsArr(){
    let newArr = [];
    let string = 'Lorem ipsum dolor sit amet agam brute vim ne Id quod vocibus eum ius duis doctus persequeris an Te sea prompta democritum dissentiunt cu quo eros nemore facete Et vis possim percipitur appellantur est quas efficiantur theophrastus ea Cum te tation torquatoss'
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
        arr: newArr
    })
  }

  componentDidMount(){
    this.makeSkillsArr()
  //   this.getUserInfo()
  }

  render() {
    return (
      <PreviewContainer>
          <UserCardDiv>
            <div className="left-side">
                <div className="bio">
                    <img className="photo"src="#" alt="user avatar"/>
                    <div className="user-intro">
                        <h2>User Name</h2>
                        <p className="location">Los Angeles, CA</p>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab, cum! Blanditiis ipsam reprehenderit iusto facere soluta! Ipsa, nulla? Aut cupiditate officiis quisquam quidem quae corrupti tempore culpa veritatis ipsa nam!</p>
                    </div>
                </div>
                <h3>Full Stack Developer</h3>
                <div className="keywords">
                    {this.state ? this.state.arr.map(word => {
                        return (<div key={word.id} className="keyword" style={{fontSize: word.weight }}>
                            {word.skill}
                        </div>)
                    }) : null}
                </div>
            </div>
            <div className="links">
                <div className="badge">
                <img src="#" alt="acclaim badge"/>
                </div>
                <i className="fab fa-github"></i>
                <i className="fab fa-linkedin"></i>
                <i className="fas fa-code"></i>
            </div>
        </UserCardDiv>
      </PreviewContainer>
    )
  }
}

const PreviewContainer = styled.header`
  width: calc(100% - 300px);
  margin-left: 300px;
  margin-bottom: 100px;
  padding-top: 50px;
  ${centerFlex()};
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
`;


const UserCardDiv = styled.div`
    font-family: 'Source Sans Pro', sans-serif;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 300px;
    width: 500px;
    margin-bottom: 30px;
    .left-side {
        width: 90%;
        overflow: hidden;
        height: 100%;
        margin-left: 15px;
        padding-top: 8px;
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
        .fab, .fas, {
            font-size: 40px;
            /* &:hover{
                    color: gray;
                } */
        }
        .fas {
            font-size: 35px;
            margin-bottom: 40px;
        }
    }
`;

export default UserCardPreview;
