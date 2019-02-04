import React, { Component } from 'react';
import styled from 'styled-components';


class UserDashboardIntro extends Component {
  state = {
    
  }

  render() {
    console.log(this.props.userInfo)
    const { first_name } = this.props.userInfo;

    return (
      <IntroContainer>
        <header>
          <h1>Your Dashboard</h1>
        </header>
        <div className="container">
          <section className="progress-container">
            <div className="progress">
              <div>
                <h2>Profile Strength: <strong>Basic</strong></h2>
              </div>
              <div>
                <canvas id="progress"></canvas>
              </div>
            </div>
          </section>
        </div>
        
      </IntroContainer>
    )
  }
}

const IntroContainer = styled.div`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding-top: 130px;
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
  @media (max-width: 650px) {
    width: 100%;
    margin-left: 0px;
  }
  h1 {
    text-align: left;
    padding-left: 50px;
    font-size: 4rem;
  }
  .container {
    margin-top: 75px;
    padding: 0 50px;
    .progress-container {
      width: 100%;
      .progress {
        width: 75%;
        border: solid;
        padding: 20px;
      }
      hr {
        border: solid .5px;
      }
    }
  }
`;

export default UserDashboardIntro;
