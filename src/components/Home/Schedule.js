import React, { Component } from 'react';
import FlatList from 'react-native'; //responsible for rendering a subset of data
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

//component responsible for rendering data returned by scheduleReducer
class Schedule extends Component {
    
    //helper function called with 1 element out of our data
    renderItem = (schedule) => {
        <ListItem 
           // title= {schedule.propertytodisplay}       !
        />
    }
    
    
    render() {
        return(
            <FlatList
                data={ this.props.schedule } //data that is to be rendered
                renderItem={ this.renderItem }
                keyExtractor={schedule => schedule.id} //generate key for each item in the list  !
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        //lhs prop gets schedule property, rhs is store's state(schedule, which has data)
        // now this component's prop includes the state in the store.
        schedule: state.schedule
    };
}

export default connect(mapStateToProps, null)(Schedule);
