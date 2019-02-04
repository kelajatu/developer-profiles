import React, { Component } from 'react';
import styled from 'styled-components';

import QuickstartBasics from './QuickstartBasics';
import QuickstartBilling from './QuickstartBilling';
import { centerFlex } from '../../../../global-styles/Mixins';

class DashboardQuickstart extends Component {
  state = {
    current: 'basics',
  }
  render() {
    
    return (
      <QuickstartContainer>
        <header>
          <h1>Quickstart</h1>
        </header>
        <div className="container">
          <nav>
            <button onClick={() => this.setState({current: 'basics'})}>Basic Info</button>
            <button onClick={() => this.setState({current: 'billing'})}>Billing</button>
          </nav>
          {this.state.current === 'basics' ?
            <QuickstartBasics userInfo={this.state} />
            :
            <QuickstartBilling userInfo={this.state} />
          }
        </div>
      </QuickstartContainer>
    )
  }
}


const QuickstartContainer = styled.div`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding-top: 130px;
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
  h1 {
    font-size: 5rem;
    color: rgb(42,42,42);
    margin-bottom: 50px;
    text-align: center;
    @media (max-width: 1100px) {
      text-align: left;
      padding-left: 50px;
      font-size: 4rem;
    }
  }
  .container {
    width: 100%;
    padding: 0 50px;
    border: solid;
    margin:auto;
    nav {
      height: 50px;
      ${centerFlex()}
    }
  }
`;


export default DashboardQuickstart;