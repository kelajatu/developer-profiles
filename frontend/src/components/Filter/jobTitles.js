import React , { Component } from 'react'
import styled from 'styled-components'
import { filterSection } from '../../global-styles/Mixins'
    
export default class JobTitles extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    updateTitles(e){
        console.log(e.target)
    }

    render(){
        return(
            <JobTitlesDiv> 
               <div className="filters">
                    <h1>Filters</h1>
                    <form  onChange={this.updateTitles} className="filters-container">
                        <label className="container">
                            <span className="checkmark"></span>
                            <input type="checkbox"/>Full Stack Web
                        </label>
                        <label className="container">
                            <span className="checkmark"></span>
                            <input type="checkbox"/>iOS
                        </label>
                        <label className="container">
                            <span className="checkmark"></span>
                            <input type="checkbox"/>Android
                        </label>
                        <label className="container">
                            <span className="checkmark"></span>
                            <input type="checkbox"/>UI/UX
                        </label>
                    </form>
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