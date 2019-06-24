import React, { Component } from "react";
import { Platform } from "react-native";

import Home from "../Home";
import Search from "../Search";
import Chat from "../Chat";

// export default createBottomTabNavigator({
//   HomeStack,
//   SearchStack,
//   ChatStack,
// });

import { Button, Text, Icon, Footer, FooterTab } from "native-base";

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

    navigate = (screen) => () => (
      this.props.handleChangeScreen(screen)
    )

    renderContent = () => {
      switch (this.props.screen) {
          case "Home":
            return <Home />;
          case "Search":
            return <Search />;
          case "Chat":
            return <Chat />
          default:
            return <Home />;
        }
      }
    }

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
        <View>
          { this.renderContent() }
          { footer() }
        </View>
      );
    }
}