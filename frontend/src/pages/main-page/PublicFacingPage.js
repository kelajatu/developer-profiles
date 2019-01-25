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
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/users`).then(response => {
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
        //this will be trigger new request to filter
        this.filter()
    }

    //this is used in child components to modify publicPageState state
    updatePublicPageState = (update) => {
        this.setState(update)
    }

    //this is going to move to backend
    filter = () => {
        let newArr = this.state.allUsers.filter(item => {
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
                    publicPageState={this.state} 
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