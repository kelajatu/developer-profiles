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
                    <form className="filters-container">
                        <label>
                            <span 
                                className="checkmark" 
                                checked={this.props.params.fullStack} />
                            <input 
                                onChange={() => this.props.toggleCheckMarks("fullStack")}  
                                type="checkbox" 
                                name="fullStack" />Full Stack Web
                        </label>
                        <label>
                            <span 
                                className="checkmark" 
                                checked={this.props.params.ios} />
                            <input 
                                onChange={() => this.props.toggleCheckMarks("ios")} 
                                type="checkbox" 
                                name="ios" />iOS
                        </label>
                        <label>
                            <span 
                                className="checkmark" 
                                checked={this.props.params.android} />
                            <input 
                                onChange={() => this.props.toggleCheckMarks("android")}  
                                type="checkbox" 
                                name="android" />Android
                        </label>
                        <label>
                            <span 
                                className="checkmark" 
                                checked={this.props.params.uiux} />
                            <input 
                                onChange={() => this.props.toggleCheckMarks("uiux")}  
                                type="checkbox" 
                                name="uiux" />UI/UX
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