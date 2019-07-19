import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { changeScreen, scheduleCreate, scheduleUpdate, scheduleFetchHome, fetchRooms } from "../../actions";
import Home from "../Home";
import Search from "../Search";
import Chat from "../Chat";
import ScheduleForm from "../Home/ScheduleForm";
import EditUserInfoForm from "../Home/EditUserInfo";
import UserProfile from "../Users/UserProfile";
import ViewReviews from "../Users/ViewReviews";
import OffersList from '../Schedule/OffersList';
import DefaultHeader from './DefaultHeader';


import { Container, Button, Text, Icon, Footer, FooterTab } from "native-base";
import ChatRoom from "../Chat/ChatRoom";
import ChatRoomNew from "../Chat/ChatRoomNew";

const mapStateToProps = state => ({
  uid: state.user.uid,
  screen: state.screen,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleChangeScreen: changeScreen,
      handleScheduleCreate: scheduleCreate,
      handleScheduleUpdate: scheduleUpdate,
      handleOwnScheduleFetch: scheduleFetchHome,
      handleFetchRooms: fetchRooms,
    },
    dispatch
  );

export class AppNav extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    console.log("AppNav mounted");
    this.props.handleOwnScheduleFetch();
    this.props.handleFetchRooms();
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
        if (this.props.uid === screen[1]) {
          return <Home />;
        } else {
          return <React.Fragment>
            <DefaultHeader title='User Profile'/>
            <UserProfile uid={screen[1]}/>
          </React.Fragment>
        }

      case "ViewReviews":
        return <React.Fragment>
          <DefaultHeader title='View Reviews'/>
          <ViewReviews isOwnReviews={this.props.uid === screen[1]} uid={screen[1]}/>
        </React.Fragment>

      case "ViewOffers":
        return <React.Fragment>
          <DefaultHeader title='View Offers'/>
          <OffersList scheduleId={screen[1]}/>
        </React.Fragment>
      
      case "Search":
        return <Search />;
      
      case "Chat":
        return <React.Fragment>
          <DefaultHeader title='Chat'/>
          <Chat />
        </React.Fragment>
      
      case "Chatroom":
        return <ChatRoom roomId={screen[1]}/>
      
      case "ChatroomNew":
        return <ChatRoomNew otherUid={screen[1]}/>
      
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