import React, { Component } from "react";
import styled from "styled-components";
import { filterSection } from "../../global-styles/Mixins";
import { CheckBox, TextInput, RangeInput } from "grommet";
import { LocationAuto } from "./locationAuto";

export default class Located extends Component {
  constructor(props) {
    super(props);
    this.state = {
      milesFrom: 5
    };
  }

  changeHandler = e => {
    this.setState({
      milesFrom: e.target.value
    });
    this.props.updatePublicPageState({
      milesFrom: +e.target.value
    });
  };

  render() {
    console.log(this.props)
    return (
      <LocatedDiv>
        <h1>Located</h1>
        <div className="container">
            <span>within {this.props.publicPageState.milesFrom}</span>
            <RangeInput min={5} max={300} step="5" onChange={this.changeHandler} value={this.props.publicPageState.milesFrom} />
            <span>miles of</span>
        </div>
        <label className="container">
          <LocationAuto
            name="locatedCity"
            lat="locatedLat"
            lon="locatedLon"
            // id="locatedCityId"
            value={this.props.publicPageState.locatedName}
            updatePublicPageState={this.props.updatePublicPageState}
            placeholder="Earth"
          />
          <span className="checkmark" />
        </label>
      </LocatedDiv>
    );
  }
}

const LocatedDiv = styled.div`
  ${filterSection()}
`;
