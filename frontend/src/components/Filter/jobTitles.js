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
                    <h1 className="filtersTitle">Filters</h1>
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
                        checked={this.props.publicPageState.filters.includes('UI/UX')}
                        label='UI/UX'
                        onChange={() => this.props.toggleCheckMarks("UI/UX")}  
                      />
                  </form>
            </JobTitlesDiv>
        )
    }
}

const JobTitlesDiv = styled.div`
    span {
        font-size: 15px;
    }
    .filters-container {
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }
    @media (max-width: 839px) {
        .filtersTitle {
            display:none;
        }
    margin-bottom: 10px;
    .filters-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 140px;
      @media (max-width: 839px) {
        flex-direction: row;
        height: 60px;
        h1 {
            font-size: 18px;
        }
        @media (max-width: 480px) {
          
        }
      }
    }
    }
`