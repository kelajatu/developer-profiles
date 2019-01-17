import React , { Component } from 'react'
import styled from 'styled-components'
import { filterSection } from '../../global-styles/Mixins'

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
                        <input type="number" step="10" /> miles of
                        <input type="search" />
                        <span className="checkmark"></span>
                    </label>
            </LocatedDiv>
        )
    }
}

const LocatedDiv = styled.div`
    ${filterSection()}
`