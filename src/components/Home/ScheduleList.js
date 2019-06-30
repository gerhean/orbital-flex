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
  user: state.user,
  schedules: state.schedules,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleViewUserProfile: viewUserProfile,
      handleScheduleEdit: setScheduleEditIndex,
      handleBookSchedule: bookSchedule,
      handleUnbookSchedule: unbookSchedule,
      handleFetchSchedule: fetchSchedule
    },
    dispatch
  );

const initialState = () => ({
  unbookingId: '',
  bookingId: '',
  price: '0',
  remarks: '',
})

//component responsible for rendering data returned by scheduleReducer
class ScheduleList extends Component {
  static propTypes = {
    scheduleArr: PropTypes.array.isRequired,
    // array of schedule references
    isBooked: PropTypes.number,
    // check if certain schedules are booked
  };

  constructor(props) {
    super(props);
    this.state = initialState();
  };

  componentDidMount() {
    for (const id of this.props.scheduleArr) {
      if (!this.props.schedules[id]) {
        this.props.handleFetchSchedule(id, this.props.isBooked);
      }
    }
  }

  setValue = key => value => {
    this.setState({
      [key]: value
    })
  };

  submitBooking = () => {
    const { price, remarks } = this.state;
    this.props.handleBookSchedule(this.state.bookingId, { price, remarks });
    this.setState(initialState())
  };

  submitUnbooking = () => {
    this.props.handleUnbookSchedule(this.state.unbookingId);
    this.setState({ unbookingId: '' })
  };

  bookSchedulePopup = () => (
    <Dialog
    visible={this.state.bookingId !== ''}
    onTouchOutside={() => {
      this.setState(initialState());
    }}
    dialogTitle={<DialogTitle title="Book Schedule" />}
      footer={
        <DialogFooter>
          <DialogButton
            text="Book"
            onPress={this.submitBooking}
          />
          <DialogButton
            text="Cancel"
            onPress={() => this.setState(initialState())}
          />
        </DialogFooter>
      }
  >
    <DialogContent>
      <Form>
        <Item stackedLabel>
          <Label>Offering Price</Label>
          <Input
            value={this.state.price}
            onChangeText={this.setValue("price")}
            keyboardType={'numeric'}
          />
        </Item>
        <Item stackedLabel>
          <Label>Remarks</Label>
          <Input
            value={this.state.remarks}
            onChangeText={this.setValue("remarks")}
          />
        </Item>
      </Form>
    </DialogContent>
  </Dialog>
  );

  unbookScheduleWarning = () => (
    <Dialog
      visible={this.state.unbookingId !== ''}
      onTouchOutside={() => this.setState({ unbookingId: '' })}
      dialogTitle={<DialogTitle title="Unbook Schedule" />}
      footer={
        <DialogFooter>
          <DialogButton
            text="Ok"
            onPress={this.submitUnbooking}
          />
          <DialogButton
            text="Cancel"
            onPress={() => this.setState({ unbookingId: '' })}
          />
        </DialogFooter>
      }
    >
      <DialogContent>
        <Text>Are You Sure You Want To Unbook Schedule?</Text>
      </DialogContent>
    </Dialog>
  );

  makeScheduleCard = (scheduleId, index) => {
    let buttonText;
    let onButtonPress;

    schedule = this.props.schedules[scheduleId];
    if (!schedule) return;
    if (schedule.isBooked === -1) {
      buttonText = "Edit Schedule";
      onButtonPress = () => this.props.handleScheduleEdit(index);
    } else if (schedule.isBooked === 0) {
      buttonText = "Book";
      onButtonPress = () => this.setState({ bookingId: scheduleId });
    } else if (schedule.isBooked === 1) {
      buttonText = "Unbook";
      onButtonPress = () => this.setState({ unbookingId: scheduleId });
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
        {this.bookSchedulePopup()} 
        {this.unbookScheduleWarning()}
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
