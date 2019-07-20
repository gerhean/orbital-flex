import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import firebase from 'firebase';
import { View, Text, ListItem, Button, Grid, Row, Col, H2} from 'native-base';

import profilePictureDisplay from '../profilePictureDisplay';
import { changeScreen, fetchSchedule, startChat, cancelSchedule } from "../../actions";

const mapStateToProps = (state, ownProps) => ({
  schedule: state.schedules[ownProps.scheduleId],
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleFetchSchedule: fetchSchedule,
      handleChangeScreen: changeScreen,
      handleChat: startChat,
      handleDelete: cancelSchedule
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
  }

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

    let buttonText = "";
    let onButtonPress;
    let button2Text = "";
    let onButton2Press;
    let button3Text = "";
    let onButton3Press;

    if (schedule.isBooked === -1) {
      buttonText = "View Offers";
      onButtonPress = this.navigate("ViewOffers/" + scheduleId);
      button2Text = "Edit Schedule";
      onButton2Press = this.navigate("EditSchedule/" + scheduleId);
      button3Text = "Delete Schedule";
      onButton3Press = () => this.props.handleDelete(scheduleId);

    } else if (schedule.isBooked === 0) {
      button2Text = "Book";
      onButton2Press = () => this.props.onPressBook(scheduleId);
      button3Text = "Message";
      onButton3Press = () => this.props.handleChat(schedule);

    } else if (schedule.isBooked === 1) {
      const uid = firebase.auth().currentUser.uid;
      buttonText = "Edit Offer";
      onButtonPress = () => this.props.onPressBook(scheduleId, schedule.bookers[uid]);
      button2Text = "Unbook";
      onButton2Press = () => this.props.onPressUnbook(scheduleId);
      button3Text = "Message";
      onButton3Press = () => this.props.handleChat(schedule.poster);
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
              <View style={{flexDirection: "column"}}>
                <Text note>District:</Text>
                <Text>{schedule.district}</Text>

                <Text note>Location:</Text>
                <Text>{schedule.location}</Text>
                
                <Text note>Day of the week:</Text>
                <Text>{schedule.day}</Text>

                <Text note>Time:</Text>
                <Text>{timeToString(schedule.timeStart)} - {timeToString(schedule.timeEnd)}</Text>
        
                <Text note>Price: </Text>
                <Text>${schedule.price}</Text>

                <Text note>Workout category:</Text>
                <Text>{schedule.category}</Text>       
                
                <Text note>Type of service: </Text>
                <Text>{schedule.services}</Text>
      
                <Text note>Remarks: </Text>
                <Text>{schedule.remarks}</Text>
              </View>
            </Col>
          </Row>
          {buttonText ? 
            <Button block rounded bordered onPress={onButtonPress}>
              <Text>{buttonText}</Text>
            </Button>
            : null
          }
          <Row>
            <Col>
              {button2Text ? 
                <Button rounded bordered onPress={onButton2Press}>
                  <Text>{button2Text}</Text>
                </Button>
                : null
              }
            </Col>
            <Col>
              {button3Text ? 
                <Button rounded bordered onPress={onButton3Press}>
                  <Text>{button3Text}</Text>
                </Button>
                : null
              }
            </Col>
          </Row>
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
