import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FlatList } from 'react-native'; //responsible for rendering a subset of data
import { ListItem, Button } from 'react-native-elements';
// import { SchedulesFetch } from '../../actions/ScheduleActions';
import { View, Card, CardItem, Body, Text, Right, Left, Thumbnail } from 'native-base';
import profilePictureDisplay from '../profilePictureDisplay';

const mapStateToProps = state => ({
  bookedSchedules: state.bookedSchedules
});

//component responsible for rendering data returned by scheduleReducer
class BookedSchedule extends Component {
  constructor(props) {
    super(props);
  }

  makeScheduleCard = (schedule, index) => {
    return (
      <CardItem bordered key={index}>
        <Left>
          {profilePictureDisplay(schedule.image)}
        </Left>
        <Body>
          <Card>
            <CardItem header>
              <Text>{schedule.name}</Text>
            </CardItem>

            <CardItem>
              <Text note>Location</Text>
              <Text>{schedule.location}</Text>
            </CardItem>

            <CardItem>
              <Text note>Time</Text>
              <Text>{timeToString(schedule.timeStart)} - {timeToString(schedule.timeEnd)}</Text>
            </CardItem>
      
            <CardItem>
              <Text note>Price</Text>
              <Text>${schedule.price}</Text>
            </CardItem>
    
            <CardItem>
              <Text note>Type</Text>
              <Text>{schedule.services}</Text>
            </CardItem>
    
            <CardItem>
              <Text note>Remarks</Text>
              <Text>{schedule.remarks}</Text>
            </CardItem>
          </Card>
        </Body>
        <Right />
      </CardItem>
    )
  }
    
  render() {
    const bookedCards = this.props.bookedSchedules.map((schedule, index) => this.makeScheduleCard(schedule, index));
    return(      
      <Card>    
        {bookedCards}
      </Card>
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

export default connect(mapStateToProps)(BookedSchedule);
