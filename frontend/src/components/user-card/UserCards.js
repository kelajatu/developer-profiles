import React, { Component } from "react";
import UserCard from "../../components/user-card/UserCard";
import { UserCardsDiv, LoaderContainer } from "./UserCards.styles";

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
      if (error || loading) {
        return;
      } else {
        if (UserCardsDiv) {
          if (
            window.innerHeight + document.documentElement.scrollTop ===
            UserCardsDiv.scrollHeight
          ) {
            this.props.filter();
          }
        }
      }
    };
   }

  render() {
    if (this.props.publicPageState.scrollToTop) {
      document.documentElement.scrollTop = 0;
    }
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
            location={user.current_location_name}
          />
        ))}
        {this.props.publicPageState.loading ? (
          <LoaderContainer>{/* <h1>Loading...</h1> */}</LoaderContainer>
        ) : null}
        {this.props.publicPageState.error ? (
          <div>
            <p>Oops! There has been an error</p>
            <p>Error: {this.props.publicPageState.errorMsg}</p>
          </div>
        ) : null}
        {this.props.publicPageState.endOfUsers ? (
          <div>
            <p>No more users, modify filters</p>
          </div>
        ) : null}
      </UserCardsDiv>
    );
  }
}

const UserCardsDiv = styled.div`

    display: flex;
    flex-wrap: wrap;
    margin-left: 40px; 
    padding-top: 130px;
    @media (max-width: 1440px) {
      ${centerFlex('column')}; 
    }
    @media (max-width: 839px) {
    margin: 0 auto;
    padding-top: 75px;
    width: 100%;
    @media (max-width: 480px) {
      padding-top: 50px;
    }
  }
`;

const LoaderContainer = styled.div`
  width: calc(100% - 300px);
  margin-left: 300px;
  padding-top: 130px;
  ${centerFlex()};
  h1 {
    font-size: 5rem;
  }
  @media (max-width: 839px) {
    margin: auto;
    @media (max-width: 480px) {
    }
  }
`;
