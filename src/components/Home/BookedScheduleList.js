import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FlatList } from 'react-native'; //responsible for rendering a subset of data
// import { SchedulesFetch } from '../../actions/ScheduleActions';
import { View, Card, Body, Text, Right, Left, Thumbnail, SwipeRow, Icon, List, ListItem, Button,
Grid, Row, Col } from 'native-base';
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
      <ListItem bordered key={index}>
        <Grid>
          <Row>
            <Col>
              <Row>
                <Text>{schedule.name}</Text>
              </Row>
              <Row>
                {profilePictureDisplay(schedule.image, {square: true, large: true})}
              </Row>
            </Col>
            <Col>
                <Row>
                  <Text note>Location: </Text>
                  <Text>{schedule.location}</Text>
                </Row>

                <Row>
                  <Text note>Time: </Text>
                  <Text>{timeToString(schedule.timeStart)} - {timeToString(schedule.timeEnd)}</Text>
                </Row>
          
                <Row>
                  <Text note>Price: </Text>
                  <Text>${schedule.price}</Text>
                </Row>
        
                <Row>
                  <Text note>Type: </Text>
                  <Text>{schedule.services}</Text>
                </Row>
        
                <Row>
                  <Text note>Remarks: </Text>
                  <Text>{schedule.remarks}</Text>
                </Row>
            </Col>
          </Row>
        </Grid>
      </ListItem>
    )
  }
    
  render() {
    const bookedCards = this.props.bookedSchedules.map((schedule, index) => this.makeScheduleCard(schedule, index));
    return(      
      <List>    
        {bookedCards}
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

export default connect(mapStateToProps)(BookedSchedule);
