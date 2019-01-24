import { PublicFacingPageDiv } from './PublicFacingPage.style'
import FilterBox from '../../components/Filter/filter'
import React, { Component } from 'react'
import UserCards from '../../components/user-card/UserCards';
import axios from 'axios';
import { unpackLocations } from '../../utilities/locations.utl'

class PublicFacingPage extends Component {
    constructor(props){
        super(props)
        //All elements that will be sent to the infinite scroll endpoint on the backend are stored in this state.
        //Tho they are not all initialized here. 
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
        //Need to make request to our backend with relevant filter parameteres (from state)
        //USE Infinite scroll here and return into modUsers
        axios.get('https://developer-profiles.herokuapp.com/users').then(response => {
            this.setState({
                //all Users wont be necessary because it will be sorted in the back
                allUsers: response.data, 
                modUsers: response.data, 
                loading: false,
                //Number of cards displaying can either be deleted or sent back from backend
                cardsDisplaying: response.data.length
            })
        }).catch(error => {
            console.log(error)
        })
    }

    //this modifies state-> filters the checkmarks array
    //shouldnt move
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

    //this is used in child components to modify PublicFacingPage state
    updatePublicPageState = (update) => {
        // console.log('updatePublicPageState', update)
        this.setState(update)
    }

    //this is going to move to backend
    filter = () => {
        let newArr = this.state.allUsers.filter(item => {
            //this part will not work until the backend has the location id for the users
            // if(this.state.locatedCity){
            //     return item.location.locationId === this.state.locatedCityId
            //     //should def have location Id
            // }
            // if(this.state.relocatedCityId){
            //     return item.location.locationId === this.state.relocatedCityId
            // }
            return this.state.filters.includes(item.area_of_work)
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