import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { centerFlex } from '../../../global-styles/Mixins';


class Billing extends Component {
  state = {
    
  }

  componentDidMount() {
    // for returning users
    // get data from session storage
    // hydrate state
    // remove from session storage
    var handler = window.StripeCheckout.configure({
      key: 'pk_test_V4TVCnAGCgyfBK9pXODIWhfA',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: token => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token.id)
        console.log(this.props)
        axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/api/billing`, {stripeToken: token.id})
        .then(res => {
          console.log(res.data.id)
          axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}`, {stripe_token: res.data.id})
          .then(res => {
            console.log(res.data)
            this.props.updateProgress()
          })
          .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
      }
    });
    
    document.getElementById('customButton').addEventListener('click', function(e) {
      // Open Checkout with further options:
      handler.open({
        name: 'Demo Site',
        description: '2 widgets',
        amount: 2000
      });
      e.preventDefault();
    });
  }

  render() {
    return (
      <MainFormContainer>
        <button id="customButton">Purchase</button>
        <ButtonContainer>
          <div>
            <Link to="/dashboard/education">Back</Link>
          </div>
          <div>
            <button onClick={this.checkOnSubmit}>Save Info</button>
          </div>
          <div>
            <Link to="/dashboard">Home</Link>
          </div>
        </ButtonContainer>
      </MainFormContainer>
    )
  }
}

const MainFormContainer = styled.main`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding-top: 130px;
  ${centerFlex()};
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
`;

const ButtonContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 10px;

  div {
    width: 30%;
    text-align: center;
  }

  button {
    color: black;
    padding: 20px;
    width: 300px;
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
    display: block;
    margin: auto;
    width: 200px;
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
`;

export default Billing;
