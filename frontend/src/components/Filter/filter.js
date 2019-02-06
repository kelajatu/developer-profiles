import React, { Component } from "react";
import styled from "styled-components";
import JobTitles from "./jobTitles";
import Located from "./located";
import Relocate from "./relocate";
import { Grommet, Select } from 'grommet';
import { ButtonContainer } from "../../pages/user-dashboard/styles/FormStyles";

export default class FilterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  buttons(){
    return(
          <div className="buttons">
            <button onClick={() => this.props.filter(true)}>Search</button>
            <button onClick={() => this.props.updatePublicPageState(false)}>Clear </button>
          </div>
      )
  }
  ham(){
    return(
        <div className="menu-button-container">
          <MenuButton menuOpen={this.state.menuOpen}>
              <i onClick={()=> this.setState({ menuOpen: !this.state.menuOpen })} 
                class="fa fa-bars"></i>
          </MenuButton>
        </div>
      )
  }

  render() {
    console.log(this.state.menuOpen)
    return (
      <Grommet theme={filterTheme}>
        {window.innerWidth < 839 ? this.ham(): null}
        <FilterBoxDiv menu={this.state.menuOpen}>
          {window.innerWidth < 839 ? null :<h2>
            <strong>{this.props.publicPageState.usersFound}</strong>  possible profiles
          </h2>}
          <JobTitles
            updatePublicPageState={this.props.updatePublicPageState}
            toggleCheckMarks={this.props.toggleCheckMarks}
            publicPageState={this.props.publicPageState}
          />
          <Located
            updatePublicPageState={this.props.updatePublicPageState}
            publicPageState={this.props.publicPageState}
            filter={this.props.filter}
          />
          <div className="relocate-container">
            <Relocate
              updatePublicPageState={this.props.updatePublicPageState}
              publicPageState={this.props.publicPageState}
              filter={this.props.filter}
            />
            {window.innerWidth < 839 ? this.buttons() : null}
          </div>
          {window.innerWidth < 839 ? null : this.buttons()}
          {this.state.menuOpen ? this.ham(): null}
        </FilterBoxDiv>
      </Grommet>
    );
  }
}

const filterTheme = {
  global: {
    colors: {
      brand: 'coral',
    },
  },
  textInput: {
    extend: {
      width: '200px',
    }
  },
  rangeInput: {
    extend: {
      width: '250px',
    },
  }
};

const MenuButton = styled.div `
  height: 20px;
  width: 100%;
  top: ${props => props.menuOpen ? 280 : 50}px;
  justify-content: ${props => props.menuOpen ? 'center' : null};
  margin: auto;
  position: fixed;
  z-index: 1;
  cursor: pointer;
  font-size: 20px;
  color: grey;
  @media (max-width: 839px) {
    /* border: 1px solid red; */
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    width: 100%;

  }
`

const FilterBoxDiv = styled.aside`
  padding-left: 20px;
  background-color: white;
  z-index: 10;
  width: 272px;
  height: auto;
  padding-top: 80px;
  border-right: solid 0.5px #dbdee2;
  display: flex;
  position: fixed;
  flex-direction: column;
  /* border: 1px solid blue; */
  overflow: auto;

  .relocate-container {
    @media (max-width: 839px) {
      /* border: 1px solid red; */
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .buttons {
      /* border: 1px solid red; */
      width: 90%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      @media (max-width: 839px) {
        /* border: 1px solid blue; */
        width: 100%;
        justify-content: center;   
      }
      button {
        width: 70%;
        color: black;
        margin: 10px;
        padding: 5px;
        font-size: 20px;
        letter-spacing: 1.5px;
        background: white;
        border: solid 1px black;
        border-radius: 20px;
        /* display: flex;
        align-items: center;
        justify-content: center; */
        outline-style: none;
        &:hover {
          cursor: pointer;
          background: black;
          color: white;
        }
        /* @media (max-width: 839px) {
        width: 20%;
        height: 50px;
        } */
        @media (max-width: 839px) {
          width: 100%;
        }
      }
    }
  }
  h1 {
    font-size: 20px;
    margin-bottom: 5px;
  }
  h2 {
    font-size: 18px;
    margin-bottom: 5px;
  }
  @media (max-width: 839px) {
    /* border: 1px solid red; */
    width: 100%;
    padding-right: 20px;
    height: ${props => props.menu ? 300 : 0 }px;
    z-index: ${props => props.menu ? 1 : -10 };
    font-size: 12px;
    padding-top: 70px;
    border-bottom: solid lightgrey 1px;
    h1 {
      font-size: 15px;
      margin-bottom: 0;
    }
    h2 {
      font-size: 15px;
      margin-bottom: 0;
    }
    @media (max-width: 480px) {
      height: ${props => props.menu ? 100 : 0 }vh;
    }
  } 
`;


// <FormSection>
//               <form>
//                 {/* places */}
//                 <div className="select-input-container">
//                   <LabelContainer>
//                     <label htmlFor="userPlacesInterested">
//                       Places Interested:
//                     </label>
//                     {placesInterestedSuccess ?
//                       <span>
//                         <i className="success fa fa-check-circle"></i>
//                       </span>
//                       :
//                       null
//                     }
//                   </LabelContainer>
//                   <Select
//                     id="userPlacesInterested"
//                     name="placesInterestedInput"
//                     value={this.state.placesInterestedInput}
//                     onSearch={this.onPlacesChange}
//                     onChange={this.choosePlacesInterested}
//                     options={this.state.placesAutocomplete}
//                   />
//                   <div className="showing-places">
//                     {this.state.placesInterestedArr.length === 0 ?
//                       null
//                       :
//                       this.state.placesInterestedArr.map((location) => {
//                         return (
//                           <span className="places" key={location}>
//                             {location}
//                           </span>
//                         );
//                       })
//                     }
//                   </div>