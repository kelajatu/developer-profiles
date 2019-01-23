import { PublicFacingPageDiv } from './PublicFacingPage.style'
import FilterBox from '../../components/Filter/filter'
import React, { Component } from 'react'
import UserCards from '../../components/user-card/UserCards';
import axios from 'axios';

class PublicFacingPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            filters: [],
            cardsDisplaying: 'all', 
            // updateRequired: false,
            milesFrom: 5,
            loading: true,
            allUsers: [],
            modUsers: [],
        }
        this.toggleCheckMarks = this.toggleCheckMarks.bind(this)
    }

    componentDidMount(){
        axios.get('https://developer-profiles.herokuapp.com/users').then(response => {
            this.setState({
                allUsers: response.data, 
                modUsers: response.data, 
                loading: false,
                cardsDisplaying: response.data.length
            })
        }).catch(error => {
            console.log(error)
        })
    }

    toggleCheckMarks(name){
        let newArr = this.state.filters || []
        if(newArr.includes(name)){
            let index = newArr.indexOf(name)
            newArr.splice(index, 1)
        } else {
            newArr.push(name)
        }
        this.setState({
            ...this.state, 
            [name]:!this.state[name], 
            updateRequired: true
        })
        this.filter()
    }

    updatePublicPageState = (update) => {
        // console.log('updatePublicPageState', update)
        this.setState(update)
    }

    filter = () => {
        let newArr = this.state.allUsers.filter(item => {
            //this part will not work until the backend has the location id for the users
            if(this.state.locatedCity){
                return item.locationId === this.state.locatedCityId
            }
            if(this.state.relocatedCityId){
                return item.locationId === this.state.relocatedCityId
            }
            return this.state.filters.includes(item.filter)
        })
        if(newArr.length === 0){
            newArr = this.state.allUsers
        }
        this.setState({
            modUsers: newArr,
            cardsDisplaying: newArr.length
        })
    }

    render() { 
        console.log(this.state)
        return (
            <PublicFacingPageDiv>
                <FilterBox 
                    params={this.state} 
                    toggleCheckMarks={this.toggleCheckMarks} 
                    updatePublicPageState={this.updatePublicPageState} />
                <UserCards 
                    modUsers={this.state.modUsers} 
                    loading={this.state.loading} />
            </PublicFacingPageDiv> 
        );
    }
}
 
export default PublicFacingPage;