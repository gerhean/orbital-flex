import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FlatList } from 'react-native'; //responsible for rendering a subset of data
// import { SchedulesFetch } from '../../actions/ScheduleActions';
import { View, Card, Body, Text, Right, Left, Thumbnail, SwipeRow, Icon, List, ListItem, Button,
Grid, Row, Col, H2 } from 'native-base';
import profilePictureDisplay from '../profilePictureDisplay';
import { viewUserProfile } from "../../actions";

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleViewUserProfile: viewUserProfile
    },
    dispatch
  );

//component responsible for rendering data returned by scheduleReducer
class ScheduleList extends Component {
  static propTypes = {
    scheduleArr: PropTypes.array.isRequired,
    // array of schedule
    buttonText: PropTypes.string.isRequired,
    // Text displayed on button
    onButtonPress: PropTypes.func.isRequired,
    // Function to call when button is pressed
    // onButtonPress: (index) => () => void
  }

  constructor(props) {
    super(props);
  }

  makeScheduleCard = (schedule, index) => {
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
          <Button block rounded bordered onPress={this.props.onButtonPress(index)}>
            <Text>{this.props.buttonText}</Text>
          </Button>
        </Grid>
      </ListItem>
    )
  }
    
  render() {
    const cards = this.props.scheduleArr.map((schedule, index) => this.makeScheduleCard(schedule, index));
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
