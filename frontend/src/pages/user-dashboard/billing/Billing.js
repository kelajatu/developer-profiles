import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  ButtonContainer
} from '../styles/FormStyles';

export default class Billing extends Component {
  constructor(props){
    super(props)
    this.state = {
      paid: false,
      selected: "free",
      price: 0,
    }
  }

  componentDidMount() {
    // for returning users
    // get data from session storage
    // hydrate state
    // remove from session storage
    
    
    // document.getElementById('customButton').addEventListener('click', function(e) {
    //   // Open Checkout with further options:
    //   e.preventDefault();
    //   let price = state.price
    //   handler.open({
    //     name: 'Demo Site',
    //     description: '2 widgets',
    //     amount: [this.state.price]
    //   });
    // });

    
  }

  clickHandler = (e) => {
    e.preventDefault();
    // let price = this.state.price

    var handler = window.StripeCheckout.configure({
      key: 'pk_test_V4TVCnAGCgyfBK9pXODIWhfA',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: token => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        // console.log(this.props)
        axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/api/create-customer`, {stripeToken: token.id, userEmail: token.email})
        .then(res => {
          axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/api/subscribe-customer`, {customerId: res.data.id, packageSelected: this.state.selected})
          .then(res => {
            console.log(res.data.customer)
            axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}`, {stripe_token: res.data.customer})
            .then(res => {
              console.log('SUCCEESSSSS',res.data)
              this.setState({
                paid: true
              })
              this.props.updateProgress()
            })
            .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
      }
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: [this.state.price]
    });
  }

  toggler = (name) => {
      this.setState({selected: name})
  }

  render() {
    console.log(this.state)
    return (
      <BillingDiv>
          <h1>Billing</h1>
          {/* <div className="body"> */}
          <div className="options">
            <div 
              className="option" 
              style={{border: this.state.selected === "year" ? '3px solid green' : '1px solid gray' }}
              onClick={() => this.toggler("year")}>
              <h2>Always Looking</h2>
              <li>1 Year - $9.99</li>
              <li>reason 2</li>
              <li>reason 3</li>
            </div>
            <div 
              className="option" 
              style={{border: this.state.selected === "month" ? '3px solid green' : '1px solid gray' }} 
              onClick={() => this.toggler("month")}>
              <h2>Quick Hire</h2>
              <li>1 Month - $0.99</li>
              <li>reason 2</li>
              <li>reason 3</li>
            </div>
            <div 
              className="option" 
              style={{border: this.state.selected === "free" ? '3px solid green' : '1px solid gray' }}
              onClick={() => this.toggler("free")}>
              <h2>Free</h2>
              <li>1 Day = $0.00</li>
              <li>Unlimited Browsing</li>
              <li>reason 3</li>
            </div>
          </div>
          <ButtonContainer> 
              <div>
                  <Link to="/dashboard/education">Back</Link>
              </div>
              <button onClick={this.clickHandler} id="customButton">{this.state.paid || this.state.selected === "free" ?
                      <i className="success fa fa-check-circle fa-2x"></i> : 'Pay now'}</button>
              <div>
                  <Link to="/dashboard">Home</Link>
              </div>
          </ButtonContainer>
      </BillingDiv>
    )
  }
}

export const BillingDiv = styled.div`
  /* border: 1px solid red; */
  width: 92%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  float: right;
  height: auto;
  min-height: 100vh;
  .options{
    /* border: 1px solid red; */
    margin: 20px 0;
    display: flex;
    flex-direction: row;
    width: 80%;
    .option{
      border: 1px solid green;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 20px;
      border-radius: 25px;
      height: 300px;
      h2{
        font-size: 30px;
      }
    }
  }
      /* from FormStyles */
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
      }

  form {
    /* border: 1px solid green; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* max-width: 50% */
    padding-left: 150px;
  }
  #customButton {
    width: 20%;
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