import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import QuickstartBasics from './QuickstartBasics';
import QuickstartBilling from './QuickstartBilling';
import { centerFlex } from '../../../../global-styles/Mixins';

class DashboardQuickstart extends Component {
  state = {
    current: 'basics',
  }

  changeCurrent = (current) => {
    this.setState({current})
  }

  render() {
    return (
      <QuickstartContainer>
        <header>
          <h1>Quickstart</h1>
        </header>
        <div className="container">
          <div className="quickstart-close">
            <Link to="/dashboard">
              <i class="fa fa-times fa-2x"></i>
            </Link>
          </div>
          <nav>
            {this.state.current === 'basics' ?
              <button className="active" onClick={() => this.setState({current: 'basics'})}>Basic Info</button>
              :
              <button onClick={() => this.setState({current: 'basics'})}>Basic Info</button>
            }
            {this.state.current === 'billing' ?
              <button className="active" onClick={() => this.setState({current: 'billing'})}>Billing</button>
              :
              <button onClick={() => this.setState({current: 'billing'})}>Billing</button>
            }
          </nav>
          {this.state.current === 'basics' ?
            <QuickstartBasics changeCurrent={this.changeCurrent} updateProgress={this.props.updateProgress} userInfo={this.props.userInfo} />
            :
            <QuickstartBilling changeCurrent={this.changeCurrent} updateProgress={this.props.updateProgress} userInfo={this.props.userInfo} />
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
    width: 80%;
    padding: 50px;
    border: 1px solid lightgrey;
    border-radius: 5px;
    margin: auto;
    margin-bottom: 50px;
    nav {
      ${centerFlex()}
      button {
        width: 200px;
        height: 80px;
        margin-right: 15px;
        color: white;
        padding: 15px 20px;
        font-size: 2rem;
        letter-spacing: 1.5px;
        background-color: var(--accent-color);
        border: none;
        border-radius: 5px;
        &:hover {
          color: var(--lp_btn_color);
          transform: scale(1.1);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
          cursor: pointer;
        }
        &:active {
          transform: scale(1);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        }
      }
    }
    .active {
      color: var(--lp_btn_color);
      background: none;
      border-top: solid 2px var(--accent-color);
      border-right: solid 2px var(--accent-color);
      border-left: solid 2px var(--accent-color);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      &:hover {
        color: var(--lp_btn_color);
        transform: none;
        box-shadow: none;
        cursor: pointer;
      }
    }
    .quickstart-close {
      position: absolute;
      top: 2%;
      right: 2%;
      height: 50px;
      width: 50px;
      ${centerFlex()};
      a {
        text-decoration: none;
        color: var(--lp_btn_color);
        display: block;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;


export default DashboardQuickstart;