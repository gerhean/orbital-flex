import React, { Component } from 'react';
import { FlatList } from 'react-native'; //responsible for rendering a subset of data
import { ListItem, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { SchedulesFetch } from '../../actions/ScheduleFormActions';
import { View } from 'native-base';

//component responsible for rendering data returned by scheduleReducer
class Schedule extends Component {
    
    componentWillMount() {
        this.props.SchedulesFetch(); 
    }

    // static getDerivedStateFromProps(props, state)

    //helper function called with 1 element out of our data
    renderItem = (schedule) => {
        <ListItem 
           // title= {schedule.property}       !
        />
    }
    
    
    render() {
        return(           !
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
        schedule: state.schedule
    };
}

export default connect(mapStateToProps, { SchedulesFetch })(Schedule);
