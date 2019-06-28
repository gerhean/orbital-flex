import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Accordion,
  Text,
  Container,
  Header,
  Body,
  Title,
  Button,
  Card,
  Content,
  Footer,
  FooterTab,
  Right,
  Left,
  CardItem,
  Thumbnail,
  View
} from "native-base";
import { changeScreen, logout, scheduleFetchHome } from "../../actions";
import profilePictureDisplay from '../profilePictureDisplay';
import BookedSchedule from "./BookedScheduleList";
import PostedSchedule from "./PostedScheduleList";

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleLogout: logout,
      handleChangeScreen: changeScreen,
      handleScheduleFetch: scheduleFetchHome,
    },
    dispatch
  );

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleScheduleFetch();
  }

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  render() {
    const scheduleArray = [
      { title: "Booked Schedules", content: <BookedSchedule/> },
      { title: "Posted Schedules", content: <PostedSchedule/> },
    ]
    const user = this.props.user;

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Profile</Title>
          </Body>
          <Right>
            <Button onPress={() => this.props.handleLogout()}>
              <Text>Log out</Text>
            </Button>
          </Right>
        </Header>

        <Content>
          <Card>
            <CardItem>
              <Left>
                {profilePictureDisplay(user.profilePic, {large: true})}
              </Left>
              <Body>
                <Text>{user.username}</Text>
                <Text>{user.about}</Text>
                <Button onPress={this.navigate("EditUserInfoForm")}>
                  <Text>Edit Personal Info</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
            <Accordion dataArray={scheduleArray} renderContent={item => <View>{item.content}</View>} />
          <Card>
            <CardItem>
              <Button onPress={this.navigate("CreateSchedule")}>
                <Text>Create Schedule</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

// export default Home;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
