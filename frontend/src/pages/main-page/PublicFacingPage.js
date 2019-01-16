import { PublicFacingPageDiv } from './PublicFacingPage.style'
import UserCard from '../../components/user-card/UserCard'
import React, { Component } from 'react'
import axios from 'axios';

class PublicFacingPage extends Component {
    state = {
        users: []
    }
    componentDidMount() {
        console.log("hi")
        axios.get('https://developer-profiles.herokuapp.com/users').then(response => {
            this.setState({users: response.data})
            console.log(response.data)
        }) .catch(error => {
            console.log(error);
          });
    }
    render() { 
        return (
        <PublicFacingPageDiv>
           {this.state.users.map(user => <UserCard 
           first_name={user.first_name} 
           last_name={user.last_name} 
           image={`https://picsum.photos/200/300/?image=${user.id+10}`} 
           summary={user.summary} 
           title={user.title}
           location={user.location}/>)}
        </PublicFacingPageDiv>  );
    }
}
 
export default PublicFacingPage;