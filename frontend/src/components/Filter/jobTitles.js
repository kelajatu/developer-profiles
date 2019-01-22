import React , { Component } from 'react'
import styled from 'styled-components'
import { filterSection } from '../../global-styles/Mixins'
    
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
                      <label>
                          <span 
                              className="checkmark" 
                              checked={this.props.params.fullStack} />
                          <input 
                              onChange={() => this.props.toggleCheckMarks("Full Stack Web")}  
                              type="checkbox" 
                              name="Full Stack Web" />Full Stack Web
                      </label>
                      <label>
                          <span 
                              className="checkmark" 
                              checked={this.props.params.ios} />
                          <input 
                              onChange={() => this.props.toggleCheckMarks("iOS")} 
                              type="checkbox" 
                              name="iOS" />iOS
                      </label>
                      <label>
                          <span 
                              className="checkmark" 
                              checked={this.props.params.android} />
                          <input 
                              onChange={() => this.props.toggleCheckMarks("Android")}  
                              type="checkbox" 
                              name="Android" />Android
                      </label>
                      <label>
                          <span 
                              className="checkmark" 
                              checked={this.props.params.uiux} />
                          <input 
                              onChange={() => this.props.toggleCheckMarks("UI/UX")}  
                              type="checkbox" 
                              name="UI/UX" />UI/UX
                      </label>
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