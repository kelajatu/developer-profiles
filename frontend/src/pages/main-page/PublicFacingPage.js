import { PublicFacingPageDiv } from './PublicFacingPage.style'
import FilterBox from '../../components/Filter/filter'
import React, { Component } from 'react'
import UserCards from '../../components/user-card/UserCards';

class PublicFacingPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            fullStack: false,
            ios: false,
            android: false,
            uiux: false,
            locatedDistance: 25,
            locatedCity: 'Denver',
            relocateCity: 'Albuquerque'
        }
        this.toggleCheckMarks = this.toggleCheckMarks.bind(this)
    }

    toggleCheckMarks(name){
        this.setState({...this.state, [name]:!this.state[name]})
    }

    render() { 
        return (
            <PublicFacingPageDiv>
                <FilterBox params={this.state} toggleCheckMarks={this.toggleCheckMarks} />
                <UserCards />
            </PublicFacingPageDiv> 
        );
    }
}
 
export default PublicFacingPage;