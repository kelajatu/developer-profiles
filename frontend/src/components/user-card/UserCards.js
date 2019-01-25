import React , { Component } from 'react'
import styled from 'styled-components'
import UserCard from '../../components/user-card/UserCard'
import { centerFlex } from '../../global-styles/Mixins';

export default class UserCards extends Component {
    constructor(props){
        super(props)
        this.state = {
            users: [],
            raw: [],
            loading: false
        }
    }

    render(){

      if (this.props.loading) {
        return (
          <LoaderContainer>
            <h1>Loading...</h1>
          </LoaderContainer>
        )
      } else {
        return (
          <UserCardsDiv>
              {this.props.modUsers.map(user => <UserCard 
                  badge={user.badge}
                  key={user.id}
                  first_name={user.first_name} 
                  last_name={user.last_name} 
                  image={`https://picsum.photos/200/300/?image=${user.id % 50}`}
                  summary={user.summary} 
                  desired_title={user.desired_title}
                  location={user.location}/>)}
          </UserCardsDiv>
        )
      }
    }
}

const UserCardsDiv = styled.div`
    width: calc(100% - 300px);
    margin-left: 300px;
    padding-top: 130px;
    ${centerFlex('column')};
`

const LoaderContainer = styled.div`
    width: calc(100% - 300px);
    margin-left: 300px;
    padding-top: 130px;
    ${centerFlex()};
    h1 {
      font-size: 5rem;
    }
`
