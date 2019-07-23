import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Clipboard, FlatList, TouchableOpacity, StyleSheet } from "react-native";
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
import UserCard from "../Users/UserCard";

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
    const user = this.props.user;

    const followedUserArr = Object.keys(user.followedUsers)
    const followedUserList = <FlatList 
      data={followedUserArr} 
      renderItem={({ item }) => (
        <UserCard 
          uid={item}
        />
      )}
      keyExtractor={item => item}
    />
    const bookedScheduleList = <ScheduleList 
      scheduleArr={this.props.bookedSchedules}
      isBooked={1}
    />
    const postedScheduleList = <ScheduleList 
      scheduleArr={this.props.postedSchedules}
      isBooked={-1}
    />
    const scheduleArray = [
      { title: "Followed Users", content: followedUserList },
      { title: "Booked Schedules", content: bookedScheduleList },
      { title: "Posted Schedules", content: postedScheduleList },
    ]

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Profile</Title>
          </Body>
          <Right>
          <Button small rounded info onPress={() => this.props.handleLogout()}>
            <Text>Log out</Text>
            <Icon name='log-out' />
          </Button>
          </Right>
        </Header>

        <Content>
          <Card transparent>
            <CardItem header style={{ paddingTop: 20 }}>
              <Separator bordered>
                <H2 style={styles.username}>{user.username}</H2>
              </Separator>
            </CardItem>

            <CardItem style={styles.seg}>
              {profilePictureDisplay(user.profilePic, {style: styles.picture})}
              <Right style={{ paddingLeft: 5}}>
                <TouchableOpacity style={{ margin: 5 }} onPress={()=>Clipboard.setString(user.uid)}>
                  <Text style={styles.bold }>Tap user ID to copy:</Text>
                  <Text note>{user.uid}</Text>
                </TouchableOpacity>
                <Button rounded iconRight block style={{ margin: 5 }} onPress={this.navigate("EditUserInfoForm")}>
                  <Text>Edit</Text>
                  <Icon name='create' />
                </Button>
              </Right>
            </CardItem>

            <CardItem style={styles.seg}>
              <Body>
                <Text style={styles.bold}>About me:</Text>
                <View style={styles.about} >
                  <Text>{user.about}</Text>
                </View>
              </Body>
            </CardItem>
            
            <CardItem style={styles.seg3}>
              <Body>
                <H2>User Ratings</H2>
                {!user.numRatings ? 
                  <Text>Oops, you has no reviews yet</Text> :
                  <React.Fragment>
                    <StarRating
                      maxStars={5}
                      fullStarColor="#ffd700"
                      rating={user.avgRating}
                    />
                    <Button rounded bordered onPress={this.navigate("ViewReviews/" + this.props.user.uid)}>
                      <Text>{user.numRatings.toString()} Review</Text>
                    </Button>
                  </React.Fragment>
                }
              </Body>
            </CardItem>
          </Card>
          
          <Accordion dataArray={scheduleArray} renderContent={item => <View>{item.content}</View>} />
          
          <Card transparent>
            <Body>
              <CardItem style={styles.seg2}>
                <Button onPress={this.navigate("CreateSchedule")}>
                  <Text>Create Schedule</Text>
                </Button>
              </CardItem>
            </Body>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  username: {
    fontStyle: 'italic', 
    fontWeight: '600', 
    textAlign: 'center'
  },
  picture: {
    height:150,
    width: 180
  },
  bold: {
    fontWeight: "500"
  },
  seg: {
    borderBottomColor:'rgb(200, 199, 204)',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  seg2: {
    borderTopColor:'rgb(200, 199, 204)',
    borderTopWidth: StyleSheet.hairlineWidth
  },
  seg3: {
    borderTopColor:'rgb(200, 199, 204)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor:'rgb(200, 199, 204)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 45
  },
  about: {
    backgroundColor: "#faf0e6",
    borderRadius: 5,
    padding: 5
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
