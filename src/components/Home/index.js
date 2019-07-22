import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Clipboard, TouchableOpacity } from "react-native";
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
  View,
  H2
} from "native-base";
import StarRating from 'react-native-star-rating';
import { changeScreen, logout, setScheduleEditIndex } from "../../actions";
import profilePictureDisplay from '../profilePictureDisplay';
import ScheduleList from "./ScheduleList";

const mapStateToProps = state => ({
  user: state.user,
  bookedSchedules: state.bookedSchedules,
  postedSchedules: state.postedSchedules,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleLogout: logout,
      handleChangeScreen: changeScreen,
      handleSetScheduleEdit: setScheduleEditIndex
    },
    dispatch
  );

class Home extends Component {
  constructor(props) {
    super(props);
  }

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  render() {
    const bookedScheduleList = <ScheduleList 
      scheduleArr={this.props.bookedSchedules}
      isBooked={1}
    />
    const postedScheduleList = <ScheduleList 
      scheduleArr={this.props.postedSchedules}
      isBooked={-1}
    />
    const scheduleArray = [
      { title: "Booked Schedules", content: bookedScheduleList },
      { title: "Posted Schedules", content: postedScheduleList },
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
          <Card transparent>
            <CardItem>
              {profilePictureDisplay(user.profilePic, {large: true})}
              <Body>
                <H2>{user.username}</H2>
                <TouchableOpacity onPress={()=>Clipboard.setString(user.uid)}>
                  <Text>User Id (Tap to copy):</Text>
                  <Text note>{user.uid.substring(0, 20)}...</Text>
                </TouchableOpacity>
              </Body>
            </CardItem>
              
            <CardItem>
              <Body>
                <Text>About:</Text>
                <Text note>{user.about}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Button block rounded onPress={this.navigate("EditUserInfoForm")}>
                <Text>Edit Personal Info</Text>
              </Button>
            </CardItem>

            <CardItem>
              <Body>
                <H2>User Ratings</H2>
                {!user.numRatings ? 
                  <Text>Oops, you has no reviews yet</Text> :
                  <React.Fragment>
                    <StarRating
                      maxStars={5}
                      rating={user.avgRating}
                    />
                    <Button block rounded bordered onPress={this.navigate("ViewReviews/" + this.props.user.uid)}>
                      <Text>{user.numRatings.toString()} Reviews</Text>
                    </Button>
                  </React.Fragment>
                }
              </Body>
            </CardItem>
          </Card>
          
          <Accordion dataArray={scheduleArray} renderContent={item => <View>{item.content}</View>} />
          
          <Card transparent>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
