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
               <div className="filters">
                    <h1>Filters</h1>
                    <div className="filters-container">
                        <label class="container">
                            <span class="checkmark"></span>
                            <input type="checkbox"/>One
                        </label>
                        <label class="container">
                            <span class="checkmark"></span>
                            <input type="checkbox"/>Two
                        </label>

                        <label class="container">
                            <span class="checkmark"></span>
                            <input type="checkbox"/>Three
                        </label>

                        <label class="container">
                            <span class="checkmark"></span>
                            <input type="checkbox"/>Four
                        </label>
                    </div>
                </div>
            </JobTitlesDiv>
        )
    }
}

const JobTitlesDiv = styled.div`
    ${filterSection()}
    .filters-container{
        display: flex;
        flex-direction: column;
    }
`