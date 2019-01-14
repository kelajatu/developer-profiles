
// since user email, firstname, lastname are required, they should be autofilled in billing state
// also for address, since user has to fill out 
// you can verify and give user feedback with onBlur

import React, { Component } from 'react'
import axios from 'axios';

class UserInitBilling extends Component {
  state = {
    email: "",

    addressLineOneInput: "",
    addressLineOneAutocomplete: [],
    addressLineOne: "",

    addressLineTwo: "",
    city: "",
    stateProvReg: "",
    zip: "",
    country: "",

    nameOnCard: "",
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cardCVV: "",
  }

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  

  // current location
  onLocationChange = (e) => {
    let newArr;
    var self = this;
    axios
    .post("http://localhost:7000/location", {inputLocation: e.target.value})
    .then(response => {
      newArr = response.data.predictions.map(location => {
        return {
          name: location.description,
          id: location.id
        };
      });
      self.setState({ addressLineOneAutocomplete: newArr });
    })
    .catch(error => {
      console.log(error);
    });
    this.setState({ [e.target.name]: e.target.value });
  }

  chooseCurrentLocation = (e) => {
    // will need to split address to place in correct locations
    this.setState({ addressLineOne: e.target.value, addressLineOneAutocomplete: [], addressLineOneInput: e.target.value });
  }

  // Checking package that will be sent for user billing
  checkOnSubmit = (e) => {
    e.preventDefault()
    console.log(this.state);
  }


  render() {

    let getUserCardExpirationYear = [];
    let today = new Date();
    let year = today.getFullYear();
    for (let i = 0; i < 21; i++) {
      getUserCardExpirationYear.push(year + i);
    }

    return (
      <div>
        <form onSubmit={this.checkOnSubmit}>

          <fieldset className="user-info">
            {/* email - autofill from userInit */}
            <label htmlFor="userEmail">
              Email:
            </label>
            <input
              type="email"
              id="userEmail"
              placeholder="user@gmail.com"
              name="email"
              value={this.state.email}
              onChange={this.onInputChange}
              required
            />

          </fieldset>


          <br/>
          <br/>
          <br/>


          <fieldset className="location-info">

            {/* addressline(street) - *autofill from userInit from current location if available - required */}
            {/* **Maybe we should have an optional autofill for user - similar to https://www.fossil.com */}
            <label htmlFor="userAddressLineOne">
              Address Line 1:
            </label>
            <input
              type="text"
              id="userAddressLineOne"
              placeholder="555 street address"
              name="addressLineOneInput"
              autoComplete="off"
              value={this.state.addressLineOneInput}
              onChange={this.onLocationChange}
              onBlur="if user types in address, remove the suggestions so they wont stay there"
              required /* if autofilling messes with this, just validate by state instead */
            />
            {this.state.addressLineOneAutocomplete.length === 0 ?
              null
              :
              this.state.addressLineOneAutocomplete.map(location => {
                return (<option onClick={this.chooseCurrentLocation} key={location.id} value={location.name}>{location.name}</option>);
              })
            }

            <br/>

            {/* Not sure what people use this for */}
            <label htmlFor="userAddressLineTwo">
              Address Line 2(apt,suite,etc.):
            </label>
            <input
              type="text"
              id="userAddressLineTwo"
              placeholder="555 Street Address Dr."
              name="addressLineTwo"
              value={this.state.addressLineTwo}
              onChange={this.onInputChange}
            />

            <br/>

            {/* City - *autofill from userInit from current location if available - required */}
            <label htmlFor="userCity">
              City:
            </label>
            <input
              type="text"
              id="userCity"
              placeholder="Los Angeles"
              name="city"
              value={this.state.city}
              onChange={this.onInputChange}
              required
            />

            <br/>

            {/* State - *autofill from userInit from current location if available - required */}
            <label htmlFor="userState">
              State/Province/Region:
            </label>
            <input
              type="text"
              id="userState"
              placeholder="California"
              name="stateProvReg"
              value={this.state.stateProvReg}
              onChange={this.onInputChange}
              required
            />

            <br/>

            {/* Zip - *autofill from userInit from current location if available - required */}
            <label htmlFor="userZip">
              Zip:
            </label>
            <input
              type="number"
              id="userZip"
              placeholder="55555"
              name="zip"
              value={this.state.zip}
              onChange={this.onInputChange}
              required
            />

            <br/>

            {/* Country/Region - *autofill from userInit from current location if available - required */}
            <label htmlFor="userCountryRegion">
              Country/Region:
            </label>
            <input
              type="text"
              id="userCountryRegion"
              placeholder="United States"
              name="country"
              value={this.state.country}
              onChange={this.onInputChange}
              required
            />

          </fieldset>


          <br/>
          <br/>
          <br/>


          <fieldset className="billing-info">

            {/* NameOnCard - required */}
            <label htmlFor="userNameOnCard">
              Name on Card:
            </label>
            <input
              type="text"
              id="userNameOnCard"
              placeholder="john doe"
              name="nameOnCard"
              value={this.state.nameOnCard}
              onChange={this.onInputChange}
              required
            />
            
            <br/>
            
            {/* CardNumber - required */}
            <label htmlFor="userCardNumber">
              Card Number:
            </label>
            <input
              type="number"
              id="userCardNumber"
              placeholder="9999 9999 9999 9999"
              name="cardNumber"
              value={this.state.cardNumber}
              onChange={this.onInputChange}
              required
            />

            <br/>

            {/* CardExpirationMonth - required */}
            <label htmlFor="userCardExpirationMonth">
              Expiration Date:
            </label>
            <select
              id="userCardExpirationMonth"
              name="expirationMonth"
              value={this.state.expirationMonth}
              onChange={this.onInputChange}
              required
            >
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>

            <br/>

            {/* CardExpirationMonth - required */}
            <label htmlFor="userCardExpirationYear">
              Expiration Date:
            </label>
            <select
              id="userCardExpirationYear"
              name="expirationYear"
              value={this.state.expirationYear}
              onChange={this.onInputChange}
              required
            >
              {getUserCardExpirationYear.map(year => {
                return (
                  <option value={year}>{year}</option>
                )
              })}
            </select>

            <br/>
            
            {/* CardCVV - required */}
            {/* info -  Visa, MasterCard or Discover: 3 digit code on the signature panel on the reverse side of the card. 
            American Express: 4 digit code printed on the front of the card.*/}
            <label htmlFor="userCardCVV">
              CVV:
            </label>
            <input
              type="number"
              id="userCardCVV"
              placeholder="555 or 5134"
              name="cardCVV"
              value={this.state.cardCVV}
              onChange={this.onInputChange}
              required
            />

          </fieldset>

        <button type="submit">SUBMIT</button>
        </form>
      </div>
    )
  }
}

export default UserInitBilling;
