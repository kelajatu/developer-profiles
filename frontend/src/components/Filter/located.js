import React , { Component } from 'react'
import styled from 'styled-components'
import { filterSection } from '../../global-styles/Mixins'
import { LocationAuto } from './locationAuto'

export default class Located extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <LocatedDiv>
                 <h1>Located</h1>
                    <label className="container">
                        <input type="checkbox"/>within
                        <input type="number" step="5" placeholder="5" /> miles of
                        <LocationAuto 
                            name="locatedCity"
                            id="locatedCityId"
                            updatePublicPageState={this.props.updatePublicPageState}
                            placeholder='Albuquerque, N.M.'/>
                        <span className="checkmark"></span>
                    </label>
            </LocatedDiv>
        )
    }
}

const LocatedDiv = styled.div`
    ${filterSection()}
`