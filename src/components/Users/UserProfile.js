import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Clipboard, TouchableOpacity, StyleSheet } from "react-native";
import {
  Accordion,
  Text,
  Container,
  Body,
  Button,
  Card,
  Content,
  CardItem,
  View,
  H2,
  Separator
} from "native-base";
import StarRating from 'react-native-star-rating';

import { changeScreen, fetchUserInfo, startChat, followUser, unfollowUser } from "../../actions";
import profilePictureDisplay from '../profilePictureDisplay';
import ScheduleList from "../Schedule/ScheduleList";

const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.uid],
  isFollowed: state.user.followedUsers[ownProps.uid],
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleChangeScreen: changeScreen,
      handleFetchUserInfo: fetchUserInfo,
      handleChat: startChat,
      handleFollowUser: followUser,
      handleUnfollowUser: unfollowUser
    },
    dispatch
  );

class UserProfile extends Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleFetchUserInfo(this.props.uid);
  }

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  render() {
    const user = this.props.user;
    if (!user) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Loading</Text>
        </View>
      );
    }
    const uid = this.props.uid;
    const postedScheduleList = <ScheduleList 
      scheduleArr={Object.keys(user.postedSchedules)}
    />
    const scheduleArray = [
      { title: "Posted Schedules", content: postedScheduleList },
    ]
    const gender = user.gender === 1 ? 
        "Male" :
      user.gender === 2 ?
        "Female" :
        "None"

    return (
      <Container>

        <Content>
          <Card transparent>

          <CardItem header style={{ paddingTop: 20 }}>
              <Separator bordered>
                <H2 style={styles.username}>{user.username}</H2>
              </Separator>
            </CardItem>

            <CardItem>
              {profilePictureDisplay(user.profilePic, {style: styles.picture})}
              <Body style={{ margin: 5 }}>
                <TouchableOpacity onPress={()=>Clipboard.setString(uid)}>
                  <Text style={styles.bold}>User ID:</Text>
                  <Text note>{uid}</Text>
                </TouchableOpacity>
                <Text style={styles.bold}>Contact:</Text>
                <Text>{user.contact || "None"}</Text>
                <Text style={styles.bold}>Gender:</Text>
                <Text>{gender}</Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Text style={styles.bold}>About me:</Text>
                <Text>{user.about}</Text>
              </Body>
            </CardItem>

            <CardItem>
              <Button
                {...buttonProps} 
                onPress={() => this.props.handleChat(uid)}
              >
                <Text>Message Me!</Text>
              </Button>

              {this.props.isFollowed ? 
                  <Button
                    {...buttonProps} 
                    onPress={() => this.props.handleUnfollowUser(uid)}
                  >
                    <Text>Unfollow</Text>
                  </Button> 
                :
                  <Button
                    {...buttonProps} 
                    onPress={() => this.props.handleFollowUser(uid)}
                  >
                    <Text>Follow</Text>
                  </Button>
              }
            </CardItem>

            <CardItem>
              <Body>
                <H2>User Ratings</H2>
                {!user.numRatings || user.numRatings <= 0 ? 
                  <Text>Oops, this user has no reviews yet</Text> :
                  <StarRating
                    maxStars={5}
                    fullStarColor="#ffd700"
                    rating={user.avgRating}
                    disabled={true}
                  />
                }
                <Button
                  {...buttonProps}
                  onPress={this.navigate("ViewReviews/" + this.props.uid)}
                >
                  <Text>{(user.numRatings || 0).toString()} Reviews</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>

          <Accordion dataArray={scheduleArray} renderContent={item => <View>{item.content}</View>} />

        </Content>
      </Container>
    );
  }
}

const buttonProps = {
  block: true,
  rounded: true,
  bordered: true,
  style:{ margin: 5 }
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
