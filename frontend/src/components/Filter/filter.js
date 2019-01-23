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
                <h1>Showing: <strong>{this.props.params.number}</strong> profiles</h1>
                : <h2>null</h2>}
                <JobTitles 
                    updatePublicPageState={this.props.updatePublicPageState}
                    toggleCheckMarks={this.props.toggleCheckMarks}
                    params={this.props.params} />
                <Located 
                    updatePublicPageState={this.props.updatePublicPageState}
                    params={this.props.params} 
                    />
                <Relocate 
                    updatePublicPageState={this.props.updatePublicPageState} 
                    params={this.props.params} />
            </FilterBoxDiv>
        )
    }
}

const FilterBoxDiv = styled.aside`
    background-color: white;
    position: fixed;
    z-index: 10;
    width: 300px;
    height: 100vh;
    padding-top: 130px;
    border-right: solid .5px #dbdee2;
    display: flex;
    flex-direction: column;
`