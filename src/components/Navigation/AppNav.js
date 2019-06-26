import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { changeScreen } from "../../actions";

import Home from "../Home";
import Search from "../Search";
import Chat from "../Chat";
import ScheduleForm from "../Home/ScheduleForm"

// export default createBottomTabNavigator({
//   HomeStack,
//   SearchStack,
//   ChatStack,
// });

import { Container, Button, Text, Icon, Footer, FooterTab } from "native-base";

const mapStateToProps = state => ({
  screen: state.screen
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleChangeScreen: changeScreen,
    },
    dispatch
  );

export class AppNav extends Component {
  constructor(props) {
    super(props);
  };

  navigate = (screen) => () => {
    this.props.handleChangeScreen(screen)
  };

  renderContent = () => {
    switch (this.props.screen) {
      case "Home":
        return <Home />;
      case "ScheduleForm":
        return <ScheduleForm />;
      case "Search":
        return <Search />;
      case "Chat":
        return <Chat />
      default:
        return <Home />;
    }
  };

  footer = () => {
    const screen = this.props.screen;
    return (
      <Footer>
        <FooterTab>
          <Button
            vertical
            active={screen === "Home"}
            onPress={this.navigate("Home")}
          >
            <Icon name="home" />
            <Text>Home</Text>
          </Button>
          <Button
            vertical
            active={screen === "Search"}
            onPress={this.navigate("Search")}
          >
            <Icon name="search" />
            <Text>Search</Text>
          </Button>
          <Button
            vertical
            active={screen === "Chat"}
            onPress={this.navigate("Chat")}
          >
            <Icon name="chatbubbles" />
            <Text>Chat</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }

  render() {
    return(
      <Container>
      { this.renderContent() }
      { this.footer() }
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNav);