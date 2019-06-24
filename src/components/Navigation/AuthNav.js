import React, { Component } from 'react';
import { connect } from "react-redux";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
// this is an example of a nested view, you might see after logging in
import Home from "../Home";
import MainTab from "./MainTab";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  screen: state.screen
});

export class AuthNav extends Component {
  renderContent = () => {
    if (this.props.isAuthenticated) {
      return <AppNav />;
    } else {
      switch (this.props.screen) {
        case "Login":
          return <Login />;
        case "Register":
          return <Register />;
        default:
          return <Login />;
      }
    }
  }

  render() {
    return(
      <View>
        { this.renderContent() }
      </View>
    );
  }
}

export default connect(
  mapStateToProps
)(AuthNav);