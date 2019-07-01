import { AppLoading } from "expo";
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Dialog, { DialogContent, DialogFooter, DialogButton, DialogTitle } from 'react-native-popup-dialog';

import { View, Card, Body, Text, Right, Left, Thumbnail, SwipeRow, Icon, List, ListItem, Button,
Grid, Row, Col, H2, Form, Item, Label, Input} from 'native-base';

import { viewUserProfile, setScheduleEditIndex, bookSchedule, unbookSchedule, fetchSchedule } from "../../actions";
import profilePictureDisplay from '../profilePictureDisplay';
import ScheduleCard from './ScheduleCard';

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
    // sets the initial booking status
  };

  constructor(props) {
    super(props);
    this.state = {
      ...initialState(),
      loading: true,
    };
  };

  componentDidMount() {
    for (const id of this.props.scheduleArr) {
      if (!this.props.schedules[id]) {
        this.props.handleFetchSchedule(id, this.props.isBooked);
      }
    }
    this.setState({ loading: false });
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

  onPressScheduleEdit = (scheduleId, index) => {
    this.props.handleScheduleEdit(index);
  };

  onPressBook = (scheduleId, index) => {
    this.setState({ bookingId: scheduleId });
  };

  onPressUnbook = (scheduleId, index) => {
    this.setState({ unbookingId: scheduleId });
  };
    
  render() {
    if (this.state.loading) {
      return <AppLoading onError={console.warn} />;
    }
    const cards = this.props.scheduleArr.map((scheduleId, index) => 
      <ScheduleCard 
        scheduleId={scheduleId}
        index={index}
        onPressScheduleEdit={this.onPressScheduleEdit}
        onPressBook={this.onPressBook}
        onPressUnbook={this.onPressUnbook}
      />
    );
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
