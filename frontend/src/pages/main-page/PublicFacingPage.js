import { PublicFacingPageDiv } from './PublicFacingPage.style'
import FilterBox from '../../components/Filter/filter'
import React, { Component } from 'react'
import UserCards from '../../components/user-card/UserCards';

class PublicFacingPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            filters: [],
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
        let newArr = this.state.filters
        if(newArr.includes(name)){
            let index = newArr.indexOf(name)
            console.log(index)
            newArr.splice(index, 1)
            console.log(newArr)
        }else {
            newArr.push(name)
            console.log(newArr)
        }
        this.setState({...this.state, [name]:!this.state[name]})
    }

    render() { 
        return (
            <PublicFacingPageDiv>
                <FilterBox params={this.state} toggleCheckMarks={this.toggleCheckMarks} />
                <UserCards params={this.state} />
            </PublicFacingPageDiv> 
        );
    }
}
 
export default PublicFacingPage;