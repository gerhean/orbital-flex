import React, { Component } from "react";
import { PropTypes } from 'prop-types';
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
  Thumbnail,
  View
} from "native-base";
import { changeScreen, fetchUserReviews } from "../../actions";
import profilePictureDisplay from '../profilePictureDisplay';
import ScheduleList from "../Home/ScheduleList";

const mapStateToProps = (state, ownProps) => ({
  user: state.users[ownProps.uid]
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleChangeScreen: changeScreen,
      handleFetchUserReviews: fetchUserReviews,
    },
    dispatch
  );

class ViewReviews extends Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleFetchUserReviews(this.props.uid);
  }

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };

  render() {
    const reviews = this.props.user.reviews;
    if (!reviews) {
      return <Text>Loading</Text>
    }
    const ownReview = this.props.user.ownReview;
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
                <Text>{user.username}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{user.about}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewReviews);