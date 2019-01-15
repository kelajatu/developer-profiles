import { PublicFacingPageDiv } from './PublicFacingPage.styles'
import UserCard from '../../components/UserCard/UserCard'
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