import { PublicFacingPageDiv } from './PublicFacingPage.style'
import UserCard from '../../components/user-card/UserCard'
import React, { Component } from 'react'

class PublicFacingPage extends Component {
    render() { 
        return (
        <PublicFacingPageDiv>
           <UserCard/>
           <UserCard/>
           <UserCard/>
           <UserCard/>
        </PublicFacingPageDiv>  );
    }
}
 
export default PublicFacingPage;