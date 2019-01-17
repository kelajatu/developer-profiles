import { PublicFacingPageDiv } from './PublicFacingPage.style'
import UserCard from '../../components/user-card/UserCard'
import FilterBox from '../../components/Filter/filter'
import React, { Component } from 'react'
import axios from 'axios';

class PublicFacingPage extends Component {
    state = {
        users: []
    }
    componentDidMount() {
        axios.get('https://developer-profiles.herokuapp.com/users').then(response => {
            this.setState({users: response.data})
        }).catch(error => {
            console.log(error);
        })
    }

    render() { 
        return (
        <PublicFacingPageDiv>
            <FilterBox users={this.state.users} />
            <div>
                {this.state.users.map(user => <UserCard 
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