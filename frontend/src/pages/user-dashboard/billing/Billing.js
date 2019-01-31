import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import { centerFlex } from '../../../global-styles/Mixins';

// import {
//   MainFormContainer,
//   FormSection,
//   LabelContainer,
//   Validator,

// } from '../styles/FormStyles';

import ButtonContainer from '../buttonCointainer'



export default class Billing extends Component {
  constructor(props){
    super(props)
    this.state = {
      paid: false,
      month: false,
      year: true,
      price: 999,
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
        // console.log(token.id)
        // console.log(this.props)
        axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/api/billing`, {stripeToken: token.id})
        .then(res => {
          // console.log(res.data.id)
          this.setState({
            paid: true
          })
          axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}`, {stripe_token: res.data.id})
          .then(res => {
            // console.log(res.data)
            this.props.updateProgress()
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

  render() {
    return (
      <BillingDiv>
          <h1>Billing</h1>
          <div className="body">
          {this.state.paid ? <div>PAID</div> : 
            <form>
              <label>Select your payment options</label>
              <br></br>
              <label>
                <input type="radio" onClick={() => this.setState({month: !this.state.month, year: !this.state.year, price: 999})} name="monthly" value="pay" checked={this.state.year} />
                 1 Year - $9.99
              </label>
              <label>
                <input type="radio" checked={this.state.month} onClick={() => this.setState({year: !this.state.year, month: !this.state.month, price: 99})} name="yearly" value="pay" />
                  1 Month - $0.99
              </label>
              <br></br>
              <br></br>
              <button onClick={this.clickHandler} id="customButton">Pay now</button>
            </form>
          }
          </div>
          <ButtonContainer 
            checkOnSubmit={this.checkOnSubmit} submitSucess={this.state.submitSucess} />
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
  float: right;
  height: auto;
  min-height: 100vh;

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