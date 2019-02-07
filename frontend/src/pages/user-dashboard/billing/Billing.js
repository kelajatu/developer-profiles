import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { centerFlex } from '../../../global-styles/Mixins';


var noLeaks;
class Billing extends Component {
  state = {
    monthSubmitSuccess: false,
    monthSubmitFailure: false,
    yearSubmitSuccess: false,
    yearSubmitFailure: false,
  }

  selectPackage = (e, packageSelected) => {
    e.preventDefault();

    var handler = window.StripeCheckout.configure({
      key: 'pk_test_V4TVCnAGCgyfBK9pXODIWhfA',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: token => {
        axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/api/create-customer`, {stripeToken: token.id, userEmail: token.email})
        .then(res => {
          axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/api/subscribe-customer`, {customerId: res.data.id, packageSelected})
          .then(res => {
            axios.put(`${process.env.REACT_APP_BACKEND_SERVER}/users/${this.props.userInfo.id}`, {stripe_customer_id: res.data.customer, stripe_subscription_name: res.data.plan.nickname})
            .then(res => {
              if (packageSelected === 'month') {
                this.setState({monthSubmitSuccess: true})
                noLeaks = setTimeout(() => {
                  this.setState({ monthSubmitSuccess: false })
                }, 2000)
              } else if (packageSelected === 'year') {
                this.setState({yearSubmitSuccess: true})
                noLeaks = setTimeout(() => {
                  this.setState({ yearSubmitSuccess: false })
                }, 2000)
              }

              this.props.updateProgress()
            })
            .catch(err => {
              console.log(err)
            })
          })
          .catch(err => {
            console.log(err)
          })
        })
        .catch(err => {
          console.log(err)
        })
      }
    });
    if (packageSelected === 'month') {
      handler.open({
        name: 'Developer Profiles',
        description: `You selected the 'Quick Hire' Package`,
      });
    } else if (packageSelected === 'year') {
      handler.open({
        name: 'Developer Profiles',
        description: `You selected the 'Always Looking' Package`,
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(noLeaks)
  }

  render() {
    return (
      <BillingDiv>
          <header>
            <h1>Billing</h1>
          </header>
          {this.props.userInfo.subscriptionSuccess ?
            <div className="billing-success-container">
              <main className="billing-success">
                <header>
                  <h2>Subscription Active <span><i className="success fa fa-check" aria-hidden="true"></i></span></h2>
                </header>
                <section className="package-selected">

                  <h3>Package Selected:</h3>


                  {this.props.userInfo.stripe_subscription_name === 'Always looking yearly' ?
                    <h1>ALWAYS LOOKING</h1>
                    :
                    <h1>MONTHH</h1>
                  }



                </section>
              </main>
            </div>
            :
            <div className="options">
              <div className="option">
                <header>
                  <h2>Always Looking</h2>
                </header>
                <section className="price-section">
                  <h3>$9.99</h3>
                  <label>/yearly</label>
                </section>
                <section className="features-section">
                  <p>Live profile for anyone to see</p>
                  <p>Be found quickly with advanced filtering</p>
                  <p>Simple and live profile customization</p>
                  <p>Choose any city in the world for relocation</p>
                  <p>Keep your doors open to opportunity year-round</p>
                </section>
                <section className="btn-section">
                  <button onClick={(e) => this.selectPackage(e, 'year')}>
                    {this.state.yearSubmitSuccess ?
                      <i className="success fa fa-check-circle fa-2x"></i>
                      :
                      'Choose Package'
                    }
                  </button>
                </section>
              </div>
              <div className="option">
                <header>
                  <h2>Quick Hire</h2>
                </header>
                <section className="price-section">
                  <h3>$0.99</h3>
                  <label>/monthly</label>
                </section>
                <section className="features-section">
                  <div>
                    <p>Live profile for anyone to see</p>
                    <p>Be found quickly with advanced filtering</p>
                    <p>Simple and live profile customization</p>
                    <p>Choose any city in the world for relocation</p>
                  </div>
                </section>
                <section className="btn-section">
                  <button onClick={(e) => this.selectPackage(e, 'month')}>
                    {this.state.monthSubmitSuccess ?
                      <i className="success fa fa-check-circle fa-2x"></i>
                      :
                      'Choose Package'
                    }
                  </button>
                </section>
              </div>
            </div>
          }

          <ButtonContainer>
            <Link to="/dashboard/education">Back</Link>
            <Link to="/dashboard">Home</Link>
          </ButtonContainer>
      </BillingDiv>
    )
  }
}

export const BillingDiv = styled.div`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding-top: 130px;
  padding-left: 50px;
  padding-right: 50px;
  @media (max-width: 1400px) {
    width: calc(100% - 80px);
    margin-left: 80px;
  }
  @media (max-width: 1150px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  @media (max-width: 650px) {
    width: 100%;
    margin-left: 0px;
  }
  h1 {
    font-size: 5rem;
    color: rgb(42,42,42);
    margin-bottom: 50px;
    text-align: center;
    @media (max-width: 1100px) {
      text-align: left;
      font-size: 4rem;
    }
  }
  h2{
    font-size: 4rem;
    color: var(--accent-color);
    @media (max-width: 1100px) {
      font-size: 3.5rem;
    }
  }
  h3 {
    font-size: 3.2rem;
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
    padding: 8px;
  }
  .success {
    color: var(--lp_btn_color);
  }


  .billing-success-container {
    ${centerFlex()}
    @media (max-width: 950px) {
      margin-bottom: 75px;
    }
    .billing-success {
      padding: 20px;
      border: 1px solid lightgrey;
      border-radius: 5px;
      height: 550px;
      width: 700px;
    }
    h2 {
      margin-bottom: 50px;
    }
    h3 {
      margin-bottom: 50px;
    }
    .success {
      color: var(--lp_btn_color);
    }
  }



  .options{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    @media (max-width: 1100px) {
      justify-content: space-between;
    }
    @media (max-width: 950px) {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
    .option {
      width: 45%;
      max-width: 550px;
      height: 650px;
      padding: 40px 20px 0;
      text-align: center;
      border: 1px solid lightgrey;
      border-radius: 5px;
      @media (max-width: 1100px) {
        height: 700px;
        width: 49%;
      }
      @media (max-width: 950px) {
        width: 100%;
        margin-bottom: 75px;
      }
      header {
        margin-bottom: 50px;
      }
      h2{
        font-size: 4rem;
      }
      h3 {
        font-size: 3.2rem;
        border: none;
      }
      p {
        color: rgba(42,42,42,.8);
        font-size: 1.7rem;
        font-weight: bold;
        letter-spacing: 1px;
        margin-bottom: 25px;
        line-height: 23px;
      }
      label {
        color: rgba(42,42,42,.8);
        font-size: 1.7rem;
        margin-bottom: 8px;
        font-weight: bold;
        line-height: 23px;
        letter-spacing: 1px;
        margin-right: 5px;
      }
      .price-section {
        margin-bottom: 40px;
      }
      .btn-section {
        position: absolute;
        bottom: 7%;
        left: 50%;
        transform: translateX(-50%);
        button {
          width: 260px;
          height: 70px;
          color: white;
          padding: 20px 30px;
          font-size: 2rem;
          letter-spacing: 1.5px;
          background-color: var(--accent-color);
          border: none;
          border-radius: 100px;
          ${centerFlex()};
          margin-left: 25px;
          margin-right: 25px;
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
    }
  }
`;

export const ButtonContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 75px;
  margin-bottom: 50px;
  @media (max-width: 950px) {
    margin-top: 0;
  }
  a {
    width: 230px;
    height: 55px;
    display: block;
    text-decoration: none;
    color: white;
    padding: 20px 30px;
    font-size: 2rem;
    letter-spacing: 1.5px;
    background-color: var(--lp_btn_color);
    border: none;
    border-radius: 100px;
    ${centerFlex()};
    &:hover {
      color:var(--accent-color);
      transform: scale(1.1);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      cursor: pointer;
    }
    &:active {
      transform: scale(1);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }
    &:first-child {
      margin-right: 50px;
    }
  }
  .success {
    color: green;
  }
`;

export default Billing;