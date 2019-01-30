import React, { Component } from "react";
import styled from "styled-components";
import UserCard from "../../components/user-card/UserCard";
import { centerFlex } from "../../global-styles/Mixins";
// import { filter } from "bluebird";

export default class UserCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      raw: [],
      loading: false
    };

    window.onscroll = () => {
      const { error, loading } = this.props.publicPageState;
      const UserCardsDiv = document.querySelector("#scroll");
      if (error || loading){
        return
      } else {
        if(window.innerHeight + document.documentElement.scrollTop === UserCardsDiv.scrollHeight) {
          this.props.filter();
        }
      }
    };
  }

  render() {
    // console.log(this.props.publicPageState.modUsers)
      return (
        <UserCardsDiv id="scroll">
          {this.props.publicPageState.modUsers.map(user => (
            <UserCard
              id={user.id}
              github={user.github}
              linkedin={user.linkedin}
              portfolio={user.portfolio}
              badge={user.badge}
              key={user.id}
              first_name={user.first_name}
              last_name={user.last_name}
              image={user.image}
              summary={user.summary}
              desired_title={user.desired_title}
              location={user.location}
            />
          ))}
          {this.props.publicPageState.loading ? 
            <LoaderContainer>
              <h1>Loading...</h1>
            </LoaderContainer> : null
          }
          {this.props.publicPageState.error ? 
            <div>
              <p>Oops! There has been an error</p>
              <p>Error: {this.props.publicPageState.errorMsg}</p>
            </div> : null
          }
          {this.props.publicPageState.endOfUsers ? 
            <div>
              <p>No more users, modify filters</p>
            </div> : null
          }
        </UserCardsDiv>
      );
  }
}

const UserCardsDiv = styled.div`
  width: calc(100% - 300px);
  margin-left: 200px;
  padding-top: 130px;
  ${centerFlex("column")};
`;

const LoaderContainer = styled.div`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding-top: 130px;
  ${centerFlex()};
  h1 {
    font-size: 5rem;
  }
`;
