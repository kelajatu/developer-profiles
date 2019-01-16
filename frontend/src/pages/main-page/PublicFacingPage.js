import { PublicFacingPageDiv } from './PublicFacingPage.style'
import UserCard from '../../components/user-card/UserCard'
import FilterBox from '../../components/Filter/filter'
import React, { Component } from 'react'

class PublicFacingPage extends Component {
    render() { 
        return (
        <PublicFacingPageDiv>
            <FilterBox />
            <div className="cards">
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
            </div>
        </PublicFacingPageDiv>  );
    }
}
 
export default PublicFacingPage;