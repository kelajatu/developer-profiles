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

    if()
  }
}
