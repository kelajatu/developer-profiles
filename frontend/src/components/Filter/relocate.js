import React , { Component } from 'react'
import styled from 'styled-components'
import { filterSection} from '../../global-styles/Mixins'
import { TextInput } from 'grommet';
import { LocationAuto } from './locationAuto'

export default class Relocate extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        return(
            <RelocateDiv> 
                <h1>Will Relocate to:</h1>
                <LocationAuto 
                    name="relocateCity"
                    id="relocateCityId"
                    placeholder='Anywhere, U.S.A.'
                    updatePublicPageState={this.props.updatePublicPageState} 
                    />
            </RelocateDiv>
        )
    }
}

const RelocateDiv = styled.div`
    ${filterSection()}
`