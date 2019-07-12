import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { changeScreen, scheduleCreate, scheduleUpdate, scheduleFetchHome } from "../../actions";
import Home from "../Home";
import Search from "../Search";
import ScheduleForm from "../Home/ScheduleForm"
import EditUserInfoForm from "../Home/EditUserInfo"
import UserProfile from "../Users/UserProfile"

// export default createBottomTabNavigator({
//   HomeStack,
//   SearchStack,
//   ChatStack,
// });

import { Container, Button, Text, Icon, Footer, FooterTab } from "native-base";
import Groups from "../Chat/Groups";
import ChatRoom from "../Chat/ChatRoom";

const mapStateToProps = state => ({
  screen: state.screen,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleChangeScreen: changeScreen,
      handleScheduleCreate: scheduleCreate,
      handleScheduleUpdate: scheduleUpdate,
      handleOwnScheduleFetch: scheduleFetchHome,
    },
    dispatch
  );

export class AppNav extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.handleOwnScheduleFetch();
  }

  navigate = (screen) => () => {
    this.props.handleChangeScreen(screen)
  };

  renderContent = () => {
    const screen = this.props.screen.split('/');
    switch (screen[0]) {
      case "Home":
        return <Home />;
      case "CreateSchedule":
        return <ScheduleForm 
          handleSubmitSchedule={this.props.handleScheduleCreate}
        />;
      case "EditSchedule":
        return <ScheduleForm 
          handleSubmitSchedule={this.props.handleScheduleUpdate}
          editFormId={screen[1]}
        />;
      case "EditUserInfoForm":
        return <EditUserInfoForm />;
      case "UserProfile":
        return <UserProfile uid={screen[1]}/>
      case "Search":
        return <Search />;
      case "Groups":
        return <Groups />
      case "ChatRoom":
        return <ChatRoom />
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
            active={screen === "Groups"} 
            onPress={this.navigate("Groups")}
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