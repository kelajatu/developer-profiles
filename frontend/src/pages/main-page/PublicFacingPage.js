import { PublicFacingPageDiv } from './PublicFacingPage.style'
import FilterBox from '../../components/Filter/filter'
import React, { Component } from 'react'
import UserCards from '../../components/user-card/UserCards';
import axios from 'axios';

class PublicFacingPage extends Component {
    constructor(props){
        super(props)
        //All elements that will be sent to the infinite scroll endpoint on the backend are stored in this state.
        //Tho they are not all initialized here. 
        this.state = {
            filters: [],
            numCardsDisplaying: 'all', 
            // updateRequired: false,
            milesFrom: 5,
            numOfResults: 5,
            loading: true,
            allUsers: [],
            modUsers: [],

            // locatedCity: '',
            // locatedLat: '',
            // locatedLon: '',
            // relocateCity: '',
            // relocateLat: '',
            // relocateLon: '',
        }
    }

    componentDidMount(){
        this.filter()
    }

    filter = () => {
        console.log("frontend filter")
        //USE Infinite scroll here and return into modUsers state
        let params = {
            filters: this.state.filters,
            locatedName: this.state.locatedCity,
            locatedLat: this.state.locatedLat,
            locatedLon: this.state.locatedLon,
            relocateName: this.state.relocateName,
            relocateLat: this.state.relocateLat,
            relocateLon: this.state.relocateLon,
            numOfResults: this.state.numOfResult,
        }
        axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/filter`, params).then(response => {
            console.log("response in testInfinite", response)
            this.setState({
                modUsers: response.data.usersArr, 
                usersReturned: response.data.usersReturned,
                usersFound: response.data.usersFound,
                loading: false,
            })
        }).catch(error => {
            console.log(error)
        })
    }

    //this modifies state->filters the checkmarks array
    toggleCheckMarks = (name) => {
        let newArr = this.state.filters 
        if(newArr.includes(name)){
            let index = newArr.indexOf(name)
            newArr.splice(index, 1)
        } else {
            newArr.push(name)
        }
        //this will be trigger new request to filter
        this.filter()
    }

    //this is used in child components to modify publicPageState state
    updatePublicPageState = (update) => {
        this.setState(update)
    }

    render() { 
        // console.log(this.state)
        return (
            <PublicFacingPageDiv>
                <FilterBox 
                    publicPageState={this.state} 
                    toggleCheckMarks={this.toggleCheckMarks} 
                    updatePublicPageState={this.updatePublicPageState}
                    testInfinite={this.testInfinite} />
                <UserCards 
                    modUsers={this.state.modUsers} 
                    loading={this.state.loading} />
            </PublicFacingPageDiv> 
        );
    }
}
 
export default PublicFacingPage;