import React , { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

export default class ButtonContainer extends Component {
    render(){
        return(
            <ButtonContainerDiv> 
                <div>
                    <Link to="/dashboard/education">Back</Link>
                </div>
                {/* <div>
                    <button onClick={this.props.checkOnSubmit}>
                        {this.props.submitSuccess ?
                        <i className="success fa fa-check-circle fa-2x"></i> : 'Save Info'}
                    </button>
                </div> */}
                <div>
                    <Link to="/dashboard/personal-info">Next</Link>
                </div>
            </ButtonContainerDiv>
        )
    }
}

const ButtonContainerDiv = styled.div`
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 50px;

  div {
    width: 30%;
    text-align: center;
  }

  .success {
    color: green;
  }

  button {
    width: 100%;
    color: black;
    padding: 20px;
    font-size: 1.7rem;
    letter-spacing: 1.5px;
    background: white;
    border: solid 1px black;
    border-radius: 20px;
    &:hover {
      cursor: pointer;
      background: black;
      color: white;
    }
  }

  a {
    width: 70%;
    display: block;
    margin: auto;
    text-decoration: none;
    color: black;
    padding: 20px;
    font-size: 1.7rem;
    letter-spacing: 1.5px;
    background: white;
    border: solid 1px black;
    border-radius: 20px;
    &:hover {
      cursor: pointer;
      background: black;
      color: white;
    }
  }
`