import React , { Component } from 'react'
import styled from 'styled-components'
import { filterSection } from '../../global-styles/Mixins'
import {CheckBox} from 'grommet';

export default class JobTitles extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <JobTitlesDiv> 
                  <header>
                    <h1>Filters</h1>
                  </header>
                  <form className="filters-container">
                      <CheckBox                         
                        checked={this.props.publicPageState.filters.includes('Full Stack Web')} 
                        label='Full Stack Web'
                        onChange={() => this.props.toggleCheckMarks("Full Stack Web")}          
                      />
                      <CheckBox
                        className="checkmark" 
                        checked={this.props.publicPageState.filters.includes('iOS')}
                        label='iOS'
                        onChange={() => this.props.toggleCheckMarks("iOS")} 
                       />
                      <CheckBox
                        className="checkmark" 
                        checked={this.props.publicPageState.filters.includes('Android')}
                        label='Android'
                        onChange={() => this.props.toggleCheckMarks("Android")}  
                      />
                      <CheckBox
                        className="checkmark" 
                        checked={this.props.publicPageState.filters.includes('uiux')}
                        label='UI/UX'
                        onChange={() => this.props.toggleCheckMarks("UI/UX")}  
                      />
                  </form>
            </JobTitlesDiv>
        )
    }
}

const JobTitlesDiv = styled.div`
    ${filterSection()}
    .filters-container {
      display: flex;
      flex-direction: column;
    }
`