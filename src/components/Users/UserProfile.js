import React, { Component } from "react";
import { PropTypes } from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Accordion,
  Text,
  Container,
  Body,
  Button,
  Card,
  Content,
  Left,
  CardItem,
  View,
  H1,
  H2
} from "native-base";
import StarRating from 'react-native-star-rating';

import { changeScreen, fetchUserInfo } from "../../actions";
import profilePictureDisplay from '../profilePictureDisplay';
import ScheduleList from "../Home/ScheduleList";

const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.uid]
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleChangeScreen: changeScreen,
      handleFetchUserInfo: fetchUserInfo,
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
      return <Text>Loading</Text>
    }
    const postedScheduleList = <ScheduleList 
      scheduleArr={Object.keys(user.postedSchedules)}
    />
    const scheduleArray = [
      { title: "Posted Schedules", content: postedScheduleList },
    ]

    return (
      <Container>

        <Content>
          <Card>
            <CardItem>
              <Left>
                {profilePictureDisplay(user.profilePic)}
              </Left>
              <Body>
                <H1>{user.username}</H1>
                <Text>Identification number: </Text>
                <Text>{user.uid}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{user.about}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <H2>User Ratings</H2>
                {!user.numRatings || user.numRatings <= 0 ? 
                  <Text>Oops, this user has no reviews yet</Text> :
                  <StarRating
                    maxStars={5}
                    rating={user.avgRating}
                  />
                }
                <Button block rounded bordered onPress={this.navigate("ViewReviews/" + this.props.uid)}>
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

// export default Home;

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
