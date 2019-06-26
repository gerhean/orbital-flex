import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FlatList } from 'react-native'; //responsible for rendering a subset of data
import { ListItem, Button } from 'react-native-elements';
// import { SchedulesFetch } from '../../actions/ScheduleActions';
import { View, CardItem, Body, Text, Right, Left, Thumbnail } from 'native-base';
import profilePictureDisplay from '../profilePictureDisplay';

const mapStateToProps = state => ({
  bookedSchedules: state.bookedSchedules
});

//component responsible for rendering data returned by scheduleReducer
class BookedSchedule extends Component {
  constructor(props) {
    super(props);
  }

  makeScheduleCard = schedule => {
    return (
      <CardItem>
        <Left>
          {profilePictureDisplay(schedule.poster.profilePic)}
        </Left>
        <Body>
          <Text>{schedule.poster.name}</Text>
          <Text>{schedule.location}</Text>
          <Text>{schedule.time}</Text>
          <Text>{schedule.price}</Text>
          <Text>{schedule.services}</Text>
          <Text>{schedule.poster.contact}</Text>
          <Text>{schedule.remarks}</Text>
        </Body>
      </CardItem>
    )
  }
    
  render() {
    const bookedCards = this.props.bookedSchedules.map((schedule, index) => this.makeScheduleCard(schedule))
    return(          
      bookedCards
    );
  }
}

export default connect(mapStateToProps)(BookedSchedule);
