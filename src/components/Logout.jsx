import React, { Component } from "react";
import { logout } from "../auth/authentication";

class Logout extends Component {
  componentDidMount() {
    logout();
    window.location = "/";
  }
  render() {
    return <p>Logging out...</p>;
  }
}

export default Logout;
