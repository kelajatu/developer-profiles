import React , { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { CheckBox, TextInput, RangeInput } from "grommet";


export class LocationAuto extends Component {
    constructor(props){
        super(props)
        // this.state = {
        //     [this.props.name]: '',
            
        // }
        this.state = {
            [this.props.name]: '',
            currentLocationInput: "",
            locationAutocomplete: [],
            currentLocationName: '',
            currentLocationLat: '',
            currentLocationLon: '',
        }
    }

    // THIS COMPONENT needs the following props 
    //     placeholder
    //     name
    //     id - (optional for constructing state to send to a parent component)

    // this call needs to go through backend     
    
    onLocationChange = (e) => {
        let newArr;
        axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/api/location`, {inputLocation: e.target.value}).then(response => {
          newArr = response.data.predictions.map(location => {
            return {
              name: location.description,
              id: location.place_id
            };
          });
          this.setState({ locationAutocomplete: newArr });
        }).catch(error => {
          console.log(error);
        });
        this.setState({ [this.props.name]: e.target.value });
      }
    
      chooseOnEnter = (e) => {
        if (e.keyCode === 13) {
          this.chooseCurrentLocation(e);
        }
      }
    
      chooseCurrentLocation = (e) => {
        const { id, name } = e.target.dataset
        // console.log(id, name)
        axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/api/gio`, {placeId: id}).then(res => {
            // console.log(res.data.result.geometry.location)
            const { lat, lng } = res.data.result.geometry.location;
            this.setState({
              [this.props.name]: name,
              locationAutocomplete: [],
            });
            //send this up the chain
            this.props.updatePublicPageState({
                [this.props.lat]: lat,
                [this.props.lon]: lng,
                [this.props.name]: name,
            }) 
          })
          .catch(err => console.log(err))
      }

    render(){
        console.log(this.state)
          return(
              <LocationAutoDiv> 
                <div>
                  {/* location - Autocomplete from google - saves location ID */}
                  <label htmlFor="usercurrentLocation">
                  </label>
                  {/* change to input if it stops working  */}
                  <TextInput
                    type="text"
                    autoComplete="off"
                    // id="usercurrentLocation"
                    placeholder={this.props.placeholder}
                    name={this.props.name}
                    value={this.state[this.props.name]}
                    onChange={this.onLocationChange}
                  />
                  <div className="option" htmlFor="placeSuggestions">
                    {this.state.locationAutocomplete.length === 0 ?
                      null
                      :
                      this.state.locationAutocomplete.map(location => {
                        return (
                          <span
                            id="placeSuggestions"
                            key={location.id}
                            tabIndex="0"
                            data-name={location.name}
                            data-id={location.id}
                            onKeyUp={this.chooseOnEnter}
                            onClick={this.chooseCurrentLocation}
                          >
                            {location.name}
                          </span>
                        );
                      })
                    }
                  </div>
                </div>
              </LocationAutoDiv>
          )
      }

    // triggerAutoComplete = (e) => {
    //     this.setState({ [e.target.name]: e.target.value });
    //     axios.post(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e.target.value}&key=${process.env.REACT_APP_GOOGLE_AUTO_COMPLETE}`).then(response => {
    //         let newArr = response.data.predictions.map(location => {
    //             return {
    //                 name: location.description,
    //                 id: location.id
    //             };
    //         });
    //         this.setState({ 
    //             locationSuggestions: newArr
    //         });
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // }

    // chooseOnEnter = (e) => {
    //     if (e.keyCode === 13) {
    //       this.selectSuggestion(e);
    //     }
    // }

    // selectSuggestion = (e) => {
    //     this.setState({
    //        [this.props.name]: e.target.dataset.name,
    //         locationSuggestions: [],
    //     });
    //     this.props.updatePublicPageState({
    //         [this.props.name]: e.target.dataset.name,
    //         [this.props.id]: e.target.dataset.id
    //     }) 
    // }

    
    // render(){
    //     return(
    //         <LocationAutoDiv> 
    //             <input 
    //                 type="text" 
    //                 autoComplete="off" 
    //                 value={`${this.state[this.props.name]}`} 
    //                 placeholder={this.props.placeholder}
    //                 name={this.props.name} 
    //                 id={this.props.id}
    //                 onChange={this.triggerAutoComplete}>{this.value}</input>
    //             <div className="option" htmlFor="located">
    //                     {this.state.locationSuggestions && 
    //                         this.state.locationSuggestions.length > 0 ?
    //                         this.state.locationSuggestions.map(location => {
    //                             return (
    //                                 <span
    //                                     name={this.props.name}
    //                                     id={this.props.id}
    //                                     key={location.id}
    //                                     tabIndex="0"
    //                                     data-name={location.name}
    //                                     data-id={location.id}
    //                                     onKeyUp={this.chooseOnEnter}
    //                                     onClick={this.selectSuggestion} >
    //                                 {location.name}
    //                                 </span>
    //                             );
    //                         }) 
    //                     : null}
    //                 </div>
    //         </LocationAutoDiv>
    //     )
    // }
    
}

const LocationAutoDiv = styled.div`
    /* border: 1px solid red; */
`