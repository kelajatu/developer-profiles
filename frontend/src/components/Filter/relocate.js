import React , { Component } from 'react'
import styled from 'styled-components'
import { filterSection } from '../../global-styles/Mixins'
import { LocationAuto } from './locationAuto'

export default class Relocate extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <RelocateDiv> 
                <h1>Will Relocate to:</h1>
                <LocationAuto placeholder='Anywhere, U.S.A.' />
            </RelocateDiv>
        )
    }
}

const RelocateDiv = styled.div`
    ${filterSection()}
`