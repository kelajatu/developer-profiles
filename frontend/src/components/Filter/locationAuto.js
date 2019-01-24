import React , { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'

export class LocationAuto extends Component {
    constructor(props){
        super(props)
        this.state = {
            [this.props.name]: '',
        }
    }

    //THIS COMPONENT needs the following props 
        //placeholder
        //name
        //id - (optional for constructing state to send to a parent component)

    //this call needs to go through backend     
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
           [this.props.name]: e.target.dataset.name,
            locationSuggestions: [],
        });
        this.props.updatePublicPageState({
            [this.props.name]: e.target.dataset.name,
            [this.props.id]: e.target.dataset.id
        }) 
    }

    render(){
        return(
            <LocationAutoDiv> 
                <input 
                    type="text" 
                    autoComplete="off" 
                    value={`${this.state[this.props.name]}`} 
                    placeholder={this.props.placeholder}
                    name={this.props.name} 
                    id={this.props.id}
                    onChange={this.triggerAutoComplete}>{this.value}</input>
                <div className="option" htmlFor="located">
                        {this.state.locationSuggestions && 
                            this.state.locationSuggestions.length > 0 ?
                            this.state.locationSuggestions.map(location => {
                                return (
                                    <span
                                        name={this.props.name}
                                        id={this.props.id}
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