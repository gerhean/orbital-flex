import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import firebase from 'firebase';
import { View, Card, Body, Text, Right, Left, Thumbnail, SwipeRow, Icon, List, ListItem, Button,
Grid, Row, Col, H2, Form, Item, Label, Input} from 'native-base';

import profilePictureDisplay from '../profilePictureDisplay';
import { changeScreen, fetchSchedule, startChat } from "../../actions";

const mapStateToProps = (state, ownProps) => ({
  schedule: state.schedules[ownProps.scheduleId],
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleFetchSchedule: fetchSchedule,
      handleChangeScreen: changeScreen,
      handleChat: startChat
    },
    dispatch
  );

//component responsible for rendering data returned by scheduleReducer
class ScheduleCard extends Component {
  static propTypes = {
    scheduleId: PropTypes.string.isRequired,
    // Id of schedule to be displayed
    onPressBook: PropTypes.func.isRequired,
    onPressUnbook: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const scheduleId = this.props.scheduleId;
  };

  componentDidMount() {
    this.props.handleFetchSchedule(this.props.scheduleId);
  }

  componentDidUpdate() {
    if (!this.props.schedule) {
      this.props.handleFetchSchedule(this.props.scheduleId);
    }
  }

  render() {
    const schedule = this.props.schedule;
    if (!schedule) return null;
    const scheduleId = this.props.scheduleId;

    let buttonText;
    let onButtonPress;
    let button2Text = "";
    let button3Text = "";
    let onButton2Press = () => {};

    if (schedule.isBooked === -1) {
      buttonText = "Edit Schedule";
      onButtonPress = this.navigate("EditSchedule/" + scheduleId);
      button2Text = "View Offers";
      onButton2Press = this.navigate("ViewOffers/" + scheduleId)

    } else if (schedule.isBooked === 0) {
      buttonText = "Book";
      onButtonPress = () => this.props.onPressBook(scheduleId);
      button3Text = "Message";
      onButton3Press = () => this.props.handleChat(schedule);

    } else if (schedule.isBooked === 1) {
      const uid = firebase.auth().currentUser.uid;
      buttonText = "Unbook";
      onButtonPress = () => this.props.onPressUnbook(scheduleId);
      button2Text = "Edit Offer";
      onButton2Press = () => this.props.onPressBook(scheduleId, schedule.bookers[uid]);
      button3Text = "Message";
      onButton3Press = () => this.props.handleChat(schedule);
    } else {
      console.log("Unable to determine state of schedule");
      return null;
    }

    return (
      <ListItem bordered>
        <Grid>
          <Row>
            <H2>{schedule.name}</H2>
          </Row>
          <Row>
            <Col>
              <Row>
                {profilePictureDisplay(schedule.image, {square: true, large: true})}
              </Row>

              <Row>
                <Text note>Poster:</Text>
              </Row>
              <Row>
                <Button 
                  block rounded bordered 
                  onPress={this.navigate("UserProfile/" + schedule.poster)}>
                  <Text>{schedule.posterName}</Text>
                </Button>
              </Row>
            </Col>

            <Col>
              <Row>
                <Text note>Location:</Text>
              </Row>
              <Row>
                <Text>{schedule.location}</Text>
              </Row>

              <Row>
                <Text note>Time:</Text>
              </Row>
              <Row>
                <Text>{timeToString(schedule.timeStart)} - {timeToString(schedule.timeEnd)}</Text>
              </Row>
        
              <Row>
                <Text note>Price: </Text>
              </Row>
              <Row>
                <Text>${schedule.price}</Text>
              </Row>
      
              <Row>
                <Text note>Type: </Text>
              </Row>
              <Row>
                <Text>{schedule.services}</Text>
              </Row>
      
              <Row>
                <Text note>Remarks: </Text>
              </Row>
              <Row>
                <Text>{schedule.remarks}</Text>
              </Row>
            </Col>
          </Row>
          {button3Text ? 
            <Button block rounded bordered onPress={onButton3Press}>
              <Text>{button3Text}</Text>
            </Button>
            : null
          }
          {button2Text ? 
            <Button block rounded bordered onPress={onButton2Press}>
              <Text>{button2Text}</Text>
            </Button>
            : null
          }
          <Button block rounded bordered onPress={onButtonPress}>
            <Text>{buttonText}</Text>
          </Button>
        </Grid>
      </ListItem>
    )
  }

  navigate = screen => () => {
    this.props.handleChangeScreen(screen);
  };
}

const timeToString = time => {
  const minute = time%60;
  const hour = (time - minute) / 60
  const frontZero = hour < 10 ? '0' : '';
  const backZero = minute < 10 ? '0' : '';
  return frontZero + hour + ":" + minute + backZero
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleCard);
