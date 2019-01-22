import React , { Component } from 'react'
import styled from 'styled-components'
import UserCard from '../../components/user-card/UserCard'
import axios from 'axios';
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

    componentDidMount() {
        this.setState({loading: true})
        axios.get('https://developer-profiles.herokuapp.com/users').then(response => {
            this.setState({raw: response.data, users: response.data, loading: false})
        }).catch(error => {
            console.log(error)
        })
    }

    // componentWillReceiveProps(){
    //     let tempArr = this.state.raw.filter(item => {
    //         return this.props.params.filters.includes(item.filter)
    //     })
    //     if(tempArr.length === 0){
    //         tempArr = this.state.raw
    //     }
    //     this.setState({
    //         users: tempArr,
    //     })
    //     this.props.updateLength(tempArr.length)
    // }

    render(){

      if (this.state.loading) {
        return (
          <LoaderContainer>
            <h1>Loading...</h1>
          </LoaderContainer>
        )
      } else {
        return (
          <UserCardsDiv>
              {this.state.users.map(user => <UserCard 
                  acclaim={user.badge}
                  key={user.id}
                  first_name={user.first_name} 
                  last_name={user.last_name} 
                  image={`https://picsum.photos/200/300/?image=${user.id % 50}`} 
                  summary={user.summary} 
                  title={user.title}
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
