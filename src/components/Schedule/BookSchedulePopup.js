import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import Dialog, { DialogContent, DialogFooter, DialogButton, DialogTitle } from 'react-native-popup-dialog';

import { Form, Item, Label, Input} from 'native-base';

const initialState = () => ({
  bookingId: '',
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
    initialOffer: PropTypes.object,
    // initial offer, if it exists
  };

  constructor(props) {
    super(props);
    this.state = {
      ...initialState()
    };
  }

  componentDidUpdate() {
    const bookingId = this.props.bookingId; 
    if (bookingId !== this.state.bookingId) {
      if (this.props.initialOffer) {
        this.setState({
          ...this.props.initialOffer,
          bookingId
        });
      } else {
        this.setState({
          bookingId
        });
      }
    }
  }

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