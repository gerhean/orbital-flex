import { AppLoading } from "expo";
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Dialog, { DialogContent, DialogFooter, DialogButton, DialogTitle } from 'react-native-popup-dialog';
// import { SchedulesFetch } from '../../actions/ScheduleActions';
import { View, Card, Body, Text, Right, Left, Thumbnail, SwipeRow, Icon, List, ListItem, Button,
Grid, Row, Col, H2, Form, Item, Label, Input} from 'native-base';

import profilePictureDisplay from '../profilePictureDisplay';
import { changeScreen, fetchSchedule } from "../../actions";

const mapStateToProps = (state, ownProps) => ({
  schedule: state.schedules[ownProps.scheduleId],
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleFetchSchedule: fetchSchedule,
      handleChangeScreen: changeScreen,
    },
    dispatch
  );

//component responsible for rendering data returned by scheduleReducer
class ScheduleCard extends Component {
  static propTypes = {
    scheduleId: PropTypes.string.isRequired,
    // Id of schedule to be displayed
    index: PropTypes.number.isRequired,
    // Index of schedule in scheduleList
    onPressScheduleEdit: PropTypes.func.isRequired,
    onPressBook: PropTypes.func.isRequired,
    onPressUnbook: PropTypes.func.isRequired,
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
    const index = this.props.index;
    const scheduleId = this.props.scheduleId;
    const schedule = this.props.schedule;

    let buttonText;
    let onButtonPress;
    if (!schedule) return null;
    if (schedule.isBooked === -1) {
      buttonText = "Edit Schedule";
      onButtonPress = () => this.props.onPressScheduleEdit(scheduleId);
    } else if (schedule.isBooked === 0) {
      buttonText = "Book";
      onButtonPress = () => this.props.onPressBook(scheduleId);
    } else if (schedule.isBooked === 1) {
      buttonText = "Unbook";
      onButtonPress = () => this.props.onPressUnbook(scheduleId);
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
                  onPress={() => this.viewUserProfile(schedule.poster)}>
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
          <Button block rounded bordered onPress={onButtonPress}>
            <Text>{buttonText}</Text>
          </Button>
        </Grid>
      </ListItem>
    )
  }

  viewUserProfile = (uid) => {
    this.props.handleChangeScreen("UserProfile/" + uid);
  }
}

const timeToString = time => {
  const minute = time%60;
  const hour = (time - minute) / 60
  const frontZero = hour < 10 ? '0' : '';
  const backZero = minute < 10 ? '0' : '';
  return frontZero + hour + ":" + minute + backZero
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleCard);
