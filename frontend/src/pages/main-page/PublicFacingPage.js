import { PublicFacingPageDiv } from './PublicFacingPage.style'
import UserCard from '../../components/user-card/UserCard'
import FilterBox from '../../components/Filter/filter'
import React, { Component } from 'react'
import axios from 'axios';

class PublicFacingPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            users: [],
            params: {
                fullStack: false,
                ios: false,
                android: false,
                uiux: false,
                locatedDistance: 25,
                locatedCity: 'Denver',
                relocateCity: 'Albuquerque'
            }
        }
        this.toggleCheckMarks = this.toggleCheckMarks.bind(this)
    }
    componentDidMount() {
        axios.get('https://developer-profiles.herokuapp.com/users').then(response => {
            this.setState({users: response.data})
        }).catch(error => {
            console.log(error);
        })
    }

    toggleCheckMarks(name){
        this.setState({...this.state.params, [name]:!this.state.params[name]})
    }

    render() { 
        console.log(this.state.params)
        return (
        <PublicFacingPageDiv>
            <FilterBox params={this.state.params} toggleCheckMarks={this.toggleCheckMarks} />
            <div>
                {this.state.users.map(user => <UserCard 
                    acclaim={user.badge}
                    key={user.id}
                    first_name={user.first_name} 
                    last_name={user.last_name} 
                    image={`https://picsum.photos/200/300/?image=${user.id % 50}`} 
                    summary={user.summary} 
                    title={user.title}
                    location={user.location}/>)}
            </div>
        </PublicFacingPageDiv>  );
    }
}
 
export default PublicFacingPage;