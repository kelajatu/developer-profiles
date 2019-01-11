import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

class UserCard extends React.Component{
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
      this.getUserInfo()
    }

    getUserInfo = () => {
        axios
        .get("https://developer-profiles.herokuapp.com/users")
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error);
        });
      }

    render(){
        return (
            <UserCardDiv>
                <div className="left-side">
                    <div className="bio">
                        <div className="photo">
                            photo
                        </div>
                        <div className="user-intro">
                            <h2>Pat Smith</h2>
                            <p>Washington, DC</p>
                            <p>this is a bio of 128 characters or words or something but the point is that a lot of words go here but not to many.</p>
                        </div>
                    </div>
                    <h3>Desired Title</h3>
                    <div className="keywords">
                        {this.state ? this.state.arr.map(word => {
                            return (<div key={word.id} className="keyword" style={{fontSize: word.weight }}>
                                {word.skill}
                            </div>)
                        }) : null}
                    </div>
                </div>
                <div className="links">
                    <div className="link">1</div>
                    <div className="link">2</div>
                    <div className="link">3</div>
                    <div className="link">4</div>
                    <div className="link">5</div>
                </div>
            </UserCardDiv>
        )
    }
}

const UserCardDiv = styled.div`
    border: 1px solid black;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 300px;
    max-width: 500px;
    margin: 20px;
    .left-side {
        /* border: 1px solid green; */
        box-sizing: border-box;
        width: 90%;
        overflow: hidden;
        height: 100%;
        margin: 8px;
        h2 {
            font-size: 30px;
        }
        h3 {
            font-size: 22px;
            padding: 0, 5px;
            border-top: 1px solid black;
            border-bottom: 1px solid black;
        }
        .bio {
            /* border: 1px solid blue; */
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            margin: 0;
            p {
                /* border: 1px solid red; */
                font-size: 13px;
                margin: 3px;
            }
            .user-intro {
                /* border: 1px solid blue; */
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                margin: 0;
                padding: 10px;
            }
            .photo {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 200px;
                height: 130px;
                background: orange;
                margin: 10px;
            }
        }
        .keywords {
            /* border: 1px solid pink; */
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 10px, 0;
            .keyword {
                /* border: 1px solid green; */
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 1px;
                margin: 2px;
            }
        }
    }
    .links {
        /* border: 1px solid purple; */
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 10%;
        height: 100%;
        .link {
            /* border: 1px solid blue; */
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            margin: 2px;
            &:hover{
                background: lightgray;
                cursor: pointer;
            }
        }
    }
`;

export default UserCard;