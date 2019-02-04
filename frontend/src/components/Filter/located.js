import React, { Component } from "react";
import styled from "styled-components";
import { RangeInput } from "grommet";
import { LocationAuto } from "./locationAuto";

export default class Located extends Component {
  constructor(props) {
    super(props);
    this.state = {
      milesFrom: 5,
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
    return (
      <LocatedDiv>
        <div className="range-container">
          <h1>Located</h1>
          <span className="within">within {this.props.publicPageState.milesFrom}</span>
          <RangeInput min={5} max={300} step={5} onChange={this.changeHandler} value={this.props.publicPageState.milesFrom} />
          <span className="milesOf">miles of</span>
          <label className="container">
          <LocationAuto
            name="locatedCity"
            lat="locatedLat"
            lon="locatedLon"
            // id="locatedCityId"
            publicPageState={this.props.publicPageState}
            value={this.props.publicPageState.locatedName}
            updatePublicPageState={this.props.updatePublicPageState}
            placeholder="Earth"
            filter={this.props.filter}
          />
          </label>
        </div>

      </LocatedDiv>
    );
  }
}

const LocatedDiv = styled.div`
margin-bottom: 10px;
  h1 {
    font-size: 25px;
  }
  font-size: 15px;
  @media (max-width: 839px) {
       .range-container {
         width: 100%;
         display: flex;
         align-items: center;
         justify-content: space-between;
         span.within {
           width: 90px;
         }
         .milesOf {
           width: 80px;
           margin-left: 10px;
          
         }
       }
       h1 {
         margin-right: 5px;
       }
        @media (max-width: 480px) {
          flex-direction: column;
        }
      }
`;
