import React, { Component } from "react";
import axios from "axios";
import { ButtonContainer, BillingDiv } from "./Billing.style";
import { Link } from "react-router-dom";

var noLeaks;
class Billing extends Component {
  state = {
    monthSubmitLoading: false,
    monthSubmitSuccess: false,
    monthSubmitFailure: false,
    yearSubmitLoading: false,
    yearSubmitSuccess: false,
    yearSubmitFailure: false
  };

  selectPackage = (e, packageSelected) => {
    e.preventDefault();

    var handler = window.StripeCheckout.configure({
      key: "pk_test_V4TVCnAGCgyfBK9pXODIWhfA",
      image: "https://stripe.com/img/documentation/checkout/marketplace.png",
      locale: "auto",
      token: token => {
        if (packageSelected === "month") {
          this.setState({ monthSubmitLoading: true });
        } else if (packageSelected === "year") {
          this.setState({ yearSubmitLoading: true });
        }
        axios
          .post(`${process.env.REACT_APP_BACKEND_SERVER}/api/create-customer`, {
            stripeToken: token.id,
            userEmail: token.email
          })
          .then(res => {
            axios
              .post(
                `${
                  process.env.REACT_APP_BACKEND_SERVER
                }/api/subscribe-customer`,
                { customerId: res.data.id, packageSelected }
              )
              .then(res => {
                axios
                  .put(
                    `${process.env.REACT_APP_BACKEND_SERVER}/users/${
                      this.props.userInfo.id
                    }`,
                    {
                      stripe_customer_id: res.data.customer,
                      stripe_subscription_name: res.data.plan.nickname
                    }
                  )
                  .then(res => {
                    if (packageSelected === "month") {
                      this.setState({
                        monthSubmitLoading: false,
                        monthSubmitSuccess: true
                      });
                      noLeaks = setTimeout(() => {
                        this.setState({ monthSubmitSuccess: false });
                      }, 2000);
                    } else if (packageSelected === "year") {
                      this.setState({
                        yearSubmitLoading: false,
                        yearSubmitSuccess: true
                      });
                      noLeaks = setTimeout(() => {
                        this.setState({ yearSubmitSuccess: false });
                      }, 2000);
                    }

                    this.props.updateProgress();
                  })
                  .catch(err => {
                    console.log(err);
                  });
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
    if (packageSelected === "month") {
      handler.open({
        name: "Developer Profiles",
        description: `Quick Hire Package`
      });
    } else if (packageSelected === "year") {
      handler.open({
        name: "Developer Profiles",
        description: `Always Looking Package`
      });
    }
  };

  componentWillUnmount() {
    clearTimeout(noLeaks);
  }

  render() {
    let yearButtonContent;
    if (this.state.yearSubmitLoading) {
      yearButtonContent = (
        <i className=" loading fas fa-spinner fa-2x fa-spin" />
      );
    } else if (this.state.yearSubmitSuccess) {
      yearButtonContent = <i className="success fa fa-check-circle fa-2x" />;
    } else {
      yearButtonContent = "Choose Package";
    }

    let monthButtonContent;
    if (this.state.monthSubmitLoading) {
      monthButtonContent = (
        <i className=" loading fas fa-spinner fa-2x fa-spin" />
      );
    } else if (this.state.monthSubmitSuccess) {
      monthButtonContent = <i className="success fa fa-check-circle fa-2x" />;
    } else {
      monthButtonContent = "Choose Package";
    }
    return (
      <BillingDiv>
        <header>
          {this.props.userInfo.subscriptionSuccess ? (
            <h1 className="billing-main-success-heading">Billing</h1>
          ) : (
            <h1 className="billing-main-heading">Billing</h1>
          )}
        </header>
        {this.props.userInfo.subscriptionSuccess ? (
          <div className="billing-success-container">
            <main className="billing-success">
              <header>
                <h1 className="sub-active-heading">
                  Subscription Active{" "}
                  <span>
                    <i className="success fa fa-check" aria-hidden="true" />
                  </span>
                </h1>
              </header>
              <section className="package-selected">
                <h3 className="sub-sub-heading">Package Selected:</h3>

                {this.props.userInfo.stripe_subscription_name ===
                "Always looking yearly" ? (
                  <p className="text">ALWAYS LOOKING</p>
                ) : (
                  <p className="text">MONTHH</p>
                )}
              </section>
            </main>
          </div>
        ) : (
          <div className="options">
            <div className="option">
              <header>
                <h3 className="sub-active-heading">Always Looking</h3>
              </header>
              <section className="price-section">
                <h3 className="sub-price-heading">$9.99</h3>
                <label>/yearly</label>
              </section>
              <section className="features-section">
                <p className="text">Live profile for anyone to see</p>
                <p className="text">Be found quickly with advanced filtering</p>
                <p className="text">Simple and live profile customization</p>
                <p className="text">
                  Choose any city in the world for relocation
                </p>
                <p className="text">
                  Keep your doors open to opportunity year-round
                </p>
              </section>
              <section className="btn-section">
                <button onClick={e => this.selectPackage(e, "year")}>
                  {yearButtonContent}
                </button>
              </section>
            </div>
            <div className="option">
              <header>
                <h3 className="sub-active-heading">Quick Hire</h3>
              </header>
              <section className="price-section">
                <h3 className="sub-price-heading">$0.99</h3>
                <label>/monthly</label>
              </section>
              <section className="features-section">
                <div>
                  <p className="text">Live profile for anyone to see</p>
                  <p className="text">
                    Be found quickly with advanced filtering
                  </p>
                  <p className="text">Simple and live profile customization</p>
                  <p className="text">
                    Choose any city in the world for relocation
                  </p>
                </div>
              </section>
              <section className="btn-section">
                <button onClick={e => this.selectPackage(e, "month")}>
                  {monthButtonContent}
                </button>
              </section>
            </div>
          </div>
        )}
        <ButtonContainer>
          <Link to="/dashboard/education">Back</Link>
          <Link to="/dashboard">Home</Link>
        </ButtonContainer>
      </BillingDiv>
    );
  }
}

export default Billing;
