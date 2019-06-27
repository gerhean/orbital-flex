import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FlatList } from 'react-native'; //responsible for rendering a subset of data
import { ListItem, Button } from 'react-native-elements';
// import { SchedulesFetch } from '../../actions/ScheduleFormActions';
import { View, Card, CardItem, Body, Text, Right } from 'native-base';


const mapStateToProps = state => {
  return {
    postedSchedules: state.postedSchedules
  };
}

//component responsible for rendering data returned by scheduleReducer
class Schedule extends Component {
  constructor(props) {
    super(props);
  }

  makeScheduleCard = (schedule, index) => {
    return (
      <CardItem key={index}>
        <Body>
          <Text>{schedule.poster.name}</Text>
          <Text>{schedule.location}</Text>
          <Text>{schedule.time}</Text>
          <Text>{schedule.price}</Text>
          <Text>{schedule.services}</Text>
          <Text>{schedule.poster.contact}</Text>
          <Text>{schedule.remarks}</Text>
        </Body>
        <Right>
          <Text>EDIT BUTTON HERE</Text>
        </Right>
      </CardItem>
    )
  }
    
  render() {
    const postedCards = this.props.postedSchedules.map((schedule, index) => this.makeScheduleCard(schedule, index))
    return(   
      <Card>       
        { postedCards }
      </Card>
    );
  }
}

export default connect(mapStateToProps)(Schedule);
