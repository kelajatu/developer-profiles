import React, { Component } from "react";
import styled from "styled-components";
import UserCard from "../../components/user-card/UserCard";
import { centerFlex } from "../../global-styles/Mixins";
import { filter } from "bluebird";

export default class UserCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      raw: [],
      loading: false
    };

    window.onscroll = () => {
      console.log("start");
      const {
        loadUsers,
        state: { error, loading, hasMore }
      } = this;
      const scroll = document.querySelector("#scroll");
      // if (!error || loading) return;
      console.log("1", window.innerHeight);
      console.log("2", scroll.scrollHeight);
      console.log("3", scroll.scrollTop);
      console.log("4", document.documentElement.scrollTop);

      if (
        window.innerHeight + document.documentElement.scrollTop ==
        scroll.scrollHeight
      ) {
        this.props.filter();
      }
    };
  }

  render() {
    if (this.props.loading) {
      return (
        <LoaderContainer>
          <h1>Loading...</h1>
        </LoaderContainer>
      );
    } else {
      return (
        <UserCardsDiv id="scroll">
          {this.props.modUsers.map(user => (
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
        </UserCardsDiv>
      );
    }
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
