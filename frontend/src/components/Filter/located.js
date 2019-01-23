import React , { Component } from 'react'
import styled from 'styled-components'
import { filterSection } from '../../global-styles/Mixins'
import { CheckBox, TextInput, RangeInput } from 'grommet';

export default class Located extends Component {
    constructor(props){
        super(props)
        this.state = {
            distance: 5
        }
    }

    render(){
        return(
            <LocatedDiv> 
                 <h1>Located</h1>
                    <div className="container">
                        <CheckBox onChange="ta-be-continued"/><span>within {this.state.distance}</span>
                        <RangeInput className="range" min={5} max={300} step="5" onChange={(event)=>this.setState({distance:event.target.value})}/> <span>miles of </span>
                    </div>
                    <TextInput/>
            </LocatedDiv>
        )
    }
}

const LocatedDiv = styled.div`
    ${filterSection()}
    .range {
        color: pink;
    }
`
