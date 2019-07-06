import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import Dialog, { DialogContent, DialogFooter, DialogButton, DialogTitle } from 'react-native-popup-dialog';

import { View, Card, Body, Text, Right, Left, Thumbnail, SwipeRow, Icon, List, ListItem, Button,
Grid, Row, Col, H2, Form, Item, Label, Input} from 'native-base';

const initialState = () => ({
  price: '0',
  remarks: '',
})

class BookSchedulePopup extends Component {
  static propTypes = {
    handleBookSchedule: PropTypes.func.isRequired,
    // from redux
    clearBookingId: PropTypes.func.isRequired,
    // reset booking id to ''
    bookingId: PropTypes.string.isRequired,
    // schedule id being booked
  };

  constructor(props) {
    super(props);
    this.state = {
      ...initialState()
    };
  };

  cancelPopup = () => {
    this.props.clearBookingId();
    this.setState(initialState());
  };

  setValue = key => value => {
    this.setState({
      [key]: value
    })
  };

  submitBooking = () => {
    const { price, remarks } = this.state;
    this.props.handleBookSchedule(this.props.bookingId, { price, remarks });
    this.props.clearBookingId();
    this.setState(initialState())
  };

  render() {
    return(
      <Dialog
        visible={this.props.bookingId !== ''}
        onTouchOutside={this.cancelPopup}
        dialogTitle={<DialogTitle title="Book Schedule" />}
        footer={
          <DialogFooter>
            <DialogButton
              text="Book"
              onPress={this.submitBooking}
            />
            <DialogButton
              text="Cancel"
              onPress={this.cancelPopup}
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
  }
}

export default BookSchedulePopup;