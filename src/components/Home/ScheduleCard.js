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
import { viewUserProfile, setScheduleEditIndex, bookSchedule, unbookSchedule, fetchSchedule } from "../../actions";

const mapStateToProps = state => ({
  schedules: state.schedules,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleViewUserProfile: viewUserProfile,
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
  };

  render() {
    const index = this.props.index;
    const scheduleId = this.props.scheduleId;
    const schedule = this.props.schedules[scheduleId];

    let buttonText;
    let onButtonPress;
    if (!schedule) return null;
    if (schedule.isBooked === -1) {
      buttonText = "Edit Schedule";
      onButtonPress = () => this.props.onPressScheduleEdit(scheduleId, index);
    } else if (schedule.isBooked === 0) {
      buttonText = "Book";
      onButtonPress = () => this.props.onPressBook(scheduleId, index);
    } else if (schedule.isBooked === 1) {
      buttonText = "Unbook";
      onButtonPress = () => this.props.onPressUnbook(scheduleId, index);
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
                  onPress={() => this.props.handleViewUserProfile(schedule.poster)}>
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
}

const timeToString = time => {
  const minute = time%60;
  const hour = (time - minute) / 60
  const frontZero = hour < 10 ? '0' : '';
  const backZero = minute < 10 ? '0' : '';
  return frontZero + hour + ":" + minute + backZero
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleCard);
