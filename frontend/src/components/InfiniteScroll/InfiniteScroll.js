import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import request from "superagent";

class InfiniteUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      users: []
    };

    window.onscroll = () => {
      const {
        loadUsers,
        state: { error, isLoading, hasMore }
      } = this;
    };

    if (error || isLoading || !hasMore) return;

    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadUsers();
    }
  }
  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    this.setState({ isLoading: true }, () => {
      request
        .get("https://randomuser.me/api/?results=10")
        .then(results => {
          const nextUsers = results.body.results.map(user => ({
            email: user.email,
            name: Object.values(user.name).join(" "),
            photo: user.picture.medium,
            username: user.login.username,
            uuid: user.login.uuid
          }));

          this.setState({
            hasMore: this.state.users.length < 100,
            isLoading: false,
            users: [...this.state.users, ...nextUsers]
          });
        })
        .catch(err => {
          this.setState({
            error: err.message,
            isLoading: false
          });
        });
    });
  };
  render() {
    const { error, hasMore, isLoading, users } = this.state;
  }
}
