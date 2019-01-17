import React , { Component } from 'react'
import styled from 'styled-components'
import { filterSection } from '../../global-styles/Mixins'

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
                <input type="search" />
            </RelocateDiv>
        )
    }
}

const RelocateDiv = styled.div`
    ${filterSection()}
`