import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Dialog, { DialogContent, DialogFooter, DialogButton, DialogTitle } from 'react-native-popup-dialog';

import { View, Text } from 'native-base';
import { FlatList } from 'react-native';

import { changeScreen, bookSchedule, unbookSchedule, fetchSchedule } from "../../actions";
import ScheduleCard from './ScheduleCard';
import BookSchedulePopup from './BookSchedulePopup';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleBookSchedule: bookSchedule,
      handleUnbookSchedule: unbookSchedule,
      handleFetchSchedule: fetchSchedule,
      handleChangeScreen: changeScreen,
    },
    dispatch
  );

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
      unbookingId: '',
      bookingId: '',
    }
  }

  submitUnbooking = () => {
    this.props.handleUnbookSchedule(this.state.unbookingId);
    this.setState({ unbookingId: '' })
  };

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

  onPressBook = (scheduleId, bookingOffer = {}) => {
    this.setState({ bookingId: scheduleId, bookingOffer });
  };

  onPressUnbook = (scheduleId) => {
    this.setState({ unbookingId: scheduleId });
  };
    
  render() {
    return(   
      <View>   
        <BookSchedulePopup 
          handleBookSchedule={this.props.handleBookSchedule}
          clearBookingId={() => {this.setState({ bookingId: '' })}}
          bookingId={this.state.bookingId}
          initialOffer={this.state.bookingOffer}
        />
        {this.unbookScheduleWarning()}
        <FlatList 
          data={this.props.scheduleArr} 
          renderItem={({ item }) => (
            <ScheduleCard 
              scheduleId={item}
              onPressBook={this.onPressBook}
              onPressUnbook={this.onPressUnbook}
            />
          )}
          keyExtractor={item => item}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleList);
