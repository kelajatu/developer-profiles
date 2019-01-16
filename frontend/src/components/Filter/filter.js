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
                <JobTitles />
                <Located />
                <Relocate />
            </FilterBoxDiv>
        )
    }
}

const FilterBoxDiv = styled.div`
    border: 1px solid red;
    width: 20%;
    height: auto;
    display: flex;
    flex-direction: column;
    margin: 25px;
    .filter-section{
        padding: 10px;
    }

`