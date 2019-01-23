import React , { Component } from 'react'
import styled from 'styled-components'
import { filterSection } from '../../global-styles/Mixins'
import { LocationAuto } from './locationAuto'

export default class Located extends Component {
    constructor(props){
        super(props)
        this.state = {
            milesFrom: 5
        }
    }

    changeHandler = (e) => {
        this.setState({
            milesFrom: e.target.value
        })
        this.props.updatePublicPageState({
            milesFrom: +e.target.value
        })
    }

    render(){
        return(
            <LocatedDiv>
                 <h1>Located</h1>
                    <label className="container">
                        {/* <input type="checkbox"/>within */}
                        <input 
                            onChange={this.changeHandler} 
                            type="number" 
                            step="5" 
                            value={this.state.milesFrom} 
                            name='milesFrom'
                            /> miles of
                        <LocationAuto 
                            name="locatedCity"
                            id="locatedCityId"
                            updatePublicPageState={this.props.updatePublicPageState}
                            placeholder='Earth'/>
                        <span className="checkmark"></span>
                    </label>
            </LocatedDiv>
        )
    }
}

const LocatedDiv = styled.div`
    ${filterSection()}
`