import React , { Component } from 'react'
import styled from 'styled-components'
import JobTitles from './jobTitles'
import Located from './located'
import Relocate from './relocate'

export default class FilterBox extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <FilterBoxDiv> 
                {this.props.params.number ? 
                <h2>Showing: <strong>{this.props.params.number}</strong> profiles</h2>
                : null }
                <JobTitles 
                toggleCheckMarks={this.props.toggleCheckMarks}
                params={this.props.params} />
                <Located params={this.props.params} />
                <Relocate params={this.props.params} />
            </FilterBoxDiv>
        )
    }
}

const FilterBoxDiv = styled.div`
    /* border: 1px solid red; */
    width: 20%;
    height: auto;
    display: flex;
    flex-direction: column;
    margin: 25px;
`