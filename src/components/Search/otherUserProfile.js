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
  Right,
  Left,
  CardItem,
  Thumbnail
} from "native-base";
import { changeScreen, logout, scheduleFetchHome } from "../../actions";
import profilePictureDisplay from '../profilePictureDisplay';
// import BookedSchedule from "./BookedScheduleList";
// import PostedSchedule from "./PostedScheduleList";

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleLogout: logout,
      handleChangeScreen: changeScreen,
      handleScheduleFetch: scheduleFetchHome
    },
    dispatch
  );

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.handleScheduleFetch();
  }

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  render() {
    const user = this.props.users[this.props.uid];
    if (!user) {
      return <Text>Loading</Text>
    }

    const scheduleArray = [
      { title: "PostedSchedules", content: <BookedSchedule/> },
    ]

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>User Profile</Title>
          </Body>
          <Right>
            <Button onPress={() => {}}>
              <Text>Back</Text>
            </Button>
          </Right>
        </Header>

        <Content>
          <Card>
            <CardItem>
              <Left>
                {profilePictureDisplay(user.profilePic)}
              </Left>
              <Body>
                <Text>{user.username}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{user.about}</Text>
              </Body>
            </CardItem>
          </Card>
          <Accordion dataArray={scheduleArray} renderContent={item => {item.content}} />
        </Content>
      </Container>
    );
  }
}

// export default Home;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
