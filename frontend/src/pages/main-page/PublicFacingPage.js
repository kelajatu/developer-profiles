import { PublicFacingPageDiv } from './PublicFacingPage.style'
import FilterBox from '../../components/Filter/filter'
import React, { Component } from 'react'
import UserCards from '../../components/user-card/UserCards';

class PublicFacingPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            filters: [],
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
            newArr.splice(index, 1)
        }else {
            newArr.push(name)
        }
        this.setState({...this.state, [name]:!this.state[name]})
    }

    updateLength(num){
        this.setState({
            number: num
        })
    }

    render() { 
        return (
            <PublicFacingPageDiv>
                <FilterBox params={this.state} updateLength={this.updateLength} toggleCheckMarks={this.toggleCheckMarks} />
                <UserCards params={this.state} />
            </PublicFacingPageDiv> 
        );
    }
}
 
export default PublicFacingPage;