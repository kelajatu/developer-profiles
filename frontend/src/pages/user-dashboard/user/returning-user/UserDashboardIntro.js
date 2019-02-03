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
          <section>
            <h1>Helloo</h1>
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
    margin-top: 100px;
  }
`;

export default UserDashboardIntro;
