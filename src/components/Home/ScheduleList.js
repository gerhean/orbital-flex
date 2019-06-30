import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
// import { SchedulesFetch } from '../../actions/ScheduleActions';
import { View, Card, Body, Text, Right, Left, Thumbnail, SwipeRow, Icon, List, ListItem, Button,
Grid, Row, Col, H2, Form, Item,} from 'native-base';
import profilePictureDisplay from '../profilePictureDisplay';
import { viewUserProfile, setScheduleEditIndex } from "../../actions";

const mapStateToProps = state => ({
  user: state.user,
  schedules: state.schedules,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleViewUserProfile: viewUserProfile,
      handleScheduleEdit: setScheduleEditIndex
    },
    dispatch
  );

//component responsible for rendering data returned by scheduleReducer
class ScheduleList extends Component {
  static propTypes = {
    scheduleArr: PropTypes.array.isRequired,
    // array of schedule references
  }

  constructor(props) {
    super(props);
  };

  // bookSchedulePopup = () => {
  //   <Dialog
  //   visible={this.state.visible}
  //   onTouchOutside={() => {
  //     this.setState({ visible: false });
  //   }}
  // >
  //   <DialogContent>
  //     {...}
  //   </DialogContent>
  // </Dialog>
  // }

  makeScheduleCard = (scheduleId, index) => {
    let buttonText;
    let onButtonPress = () => {};

    schedule = this.props.schedules[scheduleId];
    if (!schedule) return;

    if (schedule.isBooked === -1) {
      buttonText = "Edit Schedule";
      onButtonPress = () => setScheduleEditIndex(index);

    } else if (schedule.isBooked === 0) {
      buttonText = "Book";

    } else if (schedule.isBooked === 1) {
      buttonText = "Unbook";

    } else {
      console.log("Unable to determine state of schedule");
      return;
    }


    return (
      <ListItem bordered key={index}>
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
    
  render() {
    const cards = this.props.scheduleArr.map((scheduleId, index) => this.makeScheduleCard(scheduleId, index));
    return(      
      <List>    
        {cards}
      </List>
    );
  }
}

const timeToString = time => {
  const minute = time%60;
  const hour = (time - minute) / 60
  const frontZero = hour < 10 ? '0' : '';
  const backZero = minute < 10 ? '0' : '';
  return frontZero + hour + ":" + minute + backZero
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleList);
