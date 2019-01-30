import React, { Component } from "react";
import axios from "axios";
import FilterBox from "../../components/Filter/filter";
import UserCards from "../../components/user-card/UserCards";
import { PublicFacingPageDiv } from "./PublicFacingPage.style";

class PublicFacingPage extends Component {
    constructor(props) {
        super(props);
        //All elements that will be sent to the infinite scroll endpoint on the backend are stored in this state.
        //Tho they are not all initialized here.
        this.state = {
            filters: [],
            numCardsDisplaying: "all",
            // updateRequired: false,
            milesFrom: 5,
            numOfResults: 0,
            loading: true,
            cardsOnScreen: false,
            error: false,
            allUsers: [],
            modUsers: [],
            endOfUsers: false,

            // locatedCity: '',
            // locatedLat: '',
            // locatedLon: '',
            // relocateCity: '',
            // relocateLat: '',
            // relocateLon: '',
        }
    }

    componentDidMount(){
        this.filter(5)
    }

    filter = (num=this.state.numOfResults) => {
        let params = {
            filters: this.state.filters,
            locatedName: this.state.locatedCity,
            locatedLat: this.state.locatedLat,
            locatedLon: this.state.locatedLon,
            relocateName: this.state.relocateName,
            numOfResults: num,
            milesFrom: this.state.milesFrom,
        }
        this.setState({
            loading: true,
        })
        // console.log("filter", params)
        axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/users/filter`, params).then(response => {
            console.log(response)
            switch (response.status){
                case 200:
                    this.setState({
                        modUsers: response.data.usersArr, 
                        usersReturned: response.data.usersReturned,
                        usersFound: response.data.usersFound,
                        numOfResults: num+5,
                        cardsOnScreen: true,
                        loading: false,
                    })
                    break;
                case 204: 
                    this.setState({
                        endOfUsers: true,
                        loading: false,
                    })
            }
        }).catch(error => {
            this.setState({
                error: true,
                loading: false,
                errorMsg: error.message,
            })
            console.log(error)
        })
    }

    //this modifies state->filters the checkmarks array
    toggleCheckMarks = async name => {
        let newArr = this.state.filters;
        let newnew = []
        if(newArr.includes(name)){
            newnew = newArr.filter(item => item !== name);
        } else {
            newnew = newArr.concat(name);
        }
        await this.setState({
            filters: newnew,
            loading: true,
        })
        //this will be trigger new request to filter
        this.filter(5);
    };

    //this is used in child components to modify publicPageState state
    updatePublicPageState = update => {
        this.setState(update);
    };

    render() {
        return (
            <PublicFacingPageDiv>
                <FilterBox
                    publicPageState={this.state}
                    toggleCheckMarks={this.toggleCheckMarks}
                    updatePublicPageState={this.updatePublicPageState}
                    filter={this.filter}
                />
                <UserCards
                    publicPageState={this.state}
                    updatePublicPageState={this.updatePublicPageState}
                    filter={this.filter}
                />
            </PublicFacingPageDiv>
        );
    }
}

export default PublicFacingPage;