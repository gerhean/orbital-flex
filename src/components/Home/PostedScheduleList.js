import React, { Component } from 'react';
import { FlatList } from 'react-native'; //responsible for rendering a subset of data
import { ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { SchedulesFetch } from '../../actions/ScheduleFormActions';
import { View } from 'native-base';

//component responsible for rendering data returned by scheduleReducer
class Schedule extends Component {
  constructor(props) {
    super(props);
  }

  scheduleCard = schedule => {
    return (
      <CardItem>
        <Left>
          <Thumbnail source={{ uri: schedule.poster.profilePic }} />
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
        return(          
            <View>
                <FlatList
                data={ this.props.schedule } //data that is to be rendered
                renderItem={ this.renderItem }
                keyExtractor={ } //generate key for each item in the list
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        schedule: state.postedSchedules
    };
}

export default connect(mapStateToProps, { SchedulesFetch })(Schedule);
