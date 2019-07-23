import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import firebase from 'firebase';
import { TouchableOpacity } from "react-native";
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
    this.state = {
      moreDetails: false
    };
  }

  componentDidMount() {
    this.props.handleFetchSchedule(this.props.scheduleId);
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
      button2Text = "Edit";
      onButton2Press = this.navigate("EditSchedule/" + scheduleId);
      button3Text = "Delete";
      onButton3Press = () => this.props.handleDelete(scheduleId);

    } else if (schedule.isBooked === 0) {
      button2Text = "Book";
      onButton2Press = () => this.props.onPressBook(scheduleId);
      button3Text = "Message";
      onButton3Press = () => this.props.handleChat(schedule.poster);

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
            <H2 style={{fontStyle:"italic", backgroundColor: "#d3d3d3"}}>{schedule.name}</H2>
          </Row>
          <Row>

            <Col>
              <View>
                <TouchableOpacity onPress={this.navigate("UserProfile/" + schedule.poster)}>
                  {profilePictureDisplay(schedule.image, { large: true})}
                  <Text style={{fontSize: 10 , fontWeight: "100"}}>
                    Click to see profile...
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text note>Poster's name:</Text>
                <Text style={{fontSize: 16}}>{schedule.posterName}</Text></View>
              <View>
                  <TouchableOpacity onPress={this.toggleMoreDetails}>
                    <Text note style={{ textAlign: "center", "marginTop": 5 }}>
                      {this.state.moreDetails ? "Less" : "More"} Details...
                    </Text>
                  </TouchableOpacity>
                </View>
            </Col>

            <Col>
              <View style={{flexDirection: "column"}}>
                <Text note>Location:</Text>
                <Text>{schedule.location}</Text>
      
                <Text note>Price: </Text>
                <Text>${schedule.price}</Text>
                
                <Text note>Day of the week:</Text>
                <Text>{schedule.day}</Text>

                <Text note>Time:</Text>
                <Text>{timeToString(schedule.timeStart)} - {timeToString(schedule.timeEnd)}</Text>
              </View>
            </Col>
          </Row>

          {this.state.moreDetails ?
            <View style={{flexDirection: "column"}}>
              <View style={{flexDirection: "row", justifyContent: "flex-start"}}>
                <View>
                  <Text note>District:</Text>
                  <Text>{schedule.district}</Text>
                </View>
                <View style={{marginLeft: 60}}>
                  <Text note>Workout category:</Text>
                  <Text>{schedule.category}</Text>
                </View> 
              </View>      
              <Text note>Type of service: </Text>
              <Text>{schedule.services}</Text>
    
              <Text note>Remarks: </Text>
              <Text>{schedule.remarks}</Text>
            </View>
            :null
          }

          {buttonText ? 
            <Button block rounded small onPress={onButtonPress} style={{"marginTop": 5}}>
              <Text>{buttonText}</Text>
            </Button>
            : null
          }
          <Row>
            <Col>
              {button2Text ? 
                <Button block rounded small onPress={onButton2Press} style={{ "margin": 5 }}>
                  <Text>{button2Text}</Text>
                </Button>
                : null
              }
            </Col>
            <Col>
              {button3Text ? 
                <Button block rounded small onPress={onButton3Press} style={{ "margin": 5 }}>
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

  toggleMoreDetails = () => {
    this.setState({moreDetails: !this.state.moreDetails})
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
