import React, { Component } from 'react'
import axios from 'axios'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { centerFlex } from '../../../global-styles/Mixins';


var noLeaks;
export default class Billing extends Component {
  state = {
    monthSubmitSuccess: false,
    monthSubmitFailure: false,
    yearSubmitSuccess: false,
    yearSubmitFailure: false,
    selected: "",
    description: ""
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
    handler.open({
      name: 'Developer Profiles',
      description: `You selected the ${this.state.description} Package`,
    });
  }

  toggler = (name, description) => {
      this.setState({selected: name, description})
  }

  componentWillUnmount() {
    clearTimeout(noLeaks)
  }

  render() {
    console.log(this.props.userInfo.stripe_subscription_name)
    return (
      <BillingDiv>
          <header>
            <h1>Billing</h1>
          </header>
          {this.props.userInfo.subscriptionSuccess ?
            <div className="billing-success-container">
              <main className="billing-success">
                <header>
                  <h2>Subscription Active <span><i class="success fa fa-check" aria-hidden="true"></i></span></h2>
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
              <div 
                className="option" 
                style={{border: this.state.selected === "year" ? '3px solid var(--accent-color)' : '1px solid lightgrey' }}
                onClick={() => this.toggler("year", "'Always Looking'")}
              >
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
              <div
                className="option" 
                style={{border: this.state.selected === "month" ? '3px solid var(--accent-color)' : '1px solid lightgrey' }} 
                onClick={() => this.toggler("month", "'Quick Hire'")}
              >
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
            <div>
              <Link to="/dashboard/education">Back</Link>
            </div>
            <div>
              <Link to="/dashboard">Home</Link>
            </div>
          </ButtonContainer>
      </BillingDiv>
    )
  }
}

export const BillingDiv = styled.div`
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


  .billing-success-container {
    ${centerFlex()}
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
    .option{
      width: 45%;
      max-width: 550px;
      min-height: 580px;
      padding: 40px 20px 0;
      text-align: center;
      border-radius: 5px;
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
          min-width: 190px;
          height: 60px;
          color: white;
          font-size: 1.7rem;
          letter-spacing: 1.5px;
          background-color: var(--accent-color);
          border: none;
          border-radius: 100px;
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
          .success {
            color: var(--lp_btn_color);
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
  div {
    width: 30%;
    text-align: center;
  }
  a {
    width: 70%;
    display: block;
    margin: auto;
    text-decoration: none;
    color: white;
    padding: 15px 20px;
    font-size: 2rem;
    letter-spacing: 1.5px;
    background-color: var(--lp_btn_color);
    border: none;
    border-radius: 100px;

    &:hover {
      color:var(--accent-color);
      transform: scale(1.1);
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }
    &:active {
      transform: scale(1);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

    }
  }
  .success {
    color: green;
  }
`;
