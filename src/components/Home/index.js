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
  H2,
  Icon,
  Separator
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
            <Icon name='log-out' />
          </Button>
          </Right>
        </Header>

        <Content>
          <Card >
            <CardItem header style={{ paddingLeft: 20, paddingTop: 20 }}>
              <Separator bordered>
                <H2 
                  style={{fontStyle: 'italic', fontWeight: '600', textAlign: 'center'}}
                >{user.username}</H2>
              </Separator>
            </CardItem>

            <CardItem>
              {profilePictureDisplay(user.profilePic, {large: true,
                style: {
                  height:150,
                  width: 180
                }})}
              <Right>
                <TouchableOpacity style={{ paddingLeft: 10, margin: 10 }} onPress={()=>Clipboard.setString(user.uid)}>
                  <Text style={{ fontWeight: '500'}}>Tap my user ID to copy:</Text>
                  <Text note>{user.uid}</Text>
                </TouchableOpacity>
                <Button style={{  margin: 5 }} onPress={this.navigate("EditUserInfoForm")}>
                  <Text>Edit</Text>
                  <Icon name='create' />
                </Button>
              </Right>
            </CardItem>

            <CardItem header>
                <Text>About me:</Text>
            </CardItem>
            <CardItem>
              <Text>{user.about}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
