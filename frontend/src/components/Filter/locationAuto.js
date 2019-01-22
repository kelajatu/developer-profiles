import React , { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

export class LocationAuto extends Component {
    state = {}

    triggerAutoComplete = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        axios.post(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e.target.value}&key=${process.env.REACT_APP_GOOGLE_AUTO_COMPLETE}`).then(response => {
            let newArr = response.data.predictions.map(location => {
                return {
                    name: location.description,
                    id: location.id
                };
            });
            this.setState({ 
                locationSuggestions: newArr
            });
        }).catch(err => {
            console.log(err)
        })
    }

    chooseOnEnter = (e) => {
        if (e.keyCode === 13) {
          this.selectSuggestion(e);
        }
    }

    selectSuggestion = (e) => {
        this.setState({
            located: e.target.dataset.name,
            locationSuggestions: [],
        });
    }

    render(){
        return(
            <LocationAutoDiv> 
                <input 
                    type="text" 
                    autoComplete="off" 
                    value={this.state.located} 
                    placeholder="Albuquerque, NM"
                    name='located' 
                    onChange={this.triggerAutoComplete} />
                <div className="option" htmlFor="located">
                        {this.state.locationSuggestions && 
                            this.state.locationSuggestions.length > 0 ?
                            this.state.locationSuggestions.map(location => {
                                return (
                                    <span
                                        id="locationSuggestions"
                                        key={location.id}
                                        tabIndex="0"
                                        data-name={location.name}
                                        data-id={location.id}
                                        onKeyUp={this.chooseOnEnter}
                                        onClick={this.selectSuggestion} >    
                                    {location.name}
                                    </span>
                                );
                            }) 
                        : null}
                    </div>
            </LocationAutoDiv>
        )
    }
}

const LocationAutoDiv = styled.div`
    /* border: 1px solid red; */
`