import React, { Component } from 'react';
import { connect } from "react-redux";
import { PropTypes } from 'prop-types';
import { FlatList } from 'react-native';

import {List, Container, View, Text, Icon} from 'native-base';
import OfferCard from './OfferCard';

const mapStateToProps = (state, ownProps) => ({
  bookers: state.schedules[ownProps.scheduleId].bookers
});

class OffersList extends Component {
  static propTypes = {
    scheduleId: PropTypes.string.isRequired,
    // schedule id
    bookers: PropTypes.object.isRequired,
    // from redux
  };

  constructor(props) {
    super(props);
  }

  render() {
    const bookerIds = Object.keys(this.props.bookers);
    return(
      <Container>
        <List>
          { (bookerIds.length === 0)
            ? <View style={{ alignItems: "center", justifyContent: "center"}}>
                <View style={{marginTop: 200, marginBottom: 60}}>
                  <Text style={{fontSize: 24, fontWeight: "bold", textAlign: "center"}}>
                    This schedule has no offers at the moment.
                  </Text>
                </View>
                <Icon name='contacts' style={{fontSize: 90, color: '#f08080'}} />
              </View>
            : <FlatList 
              data={bookerIds} 
              renderItem={({ item }) => (
                <OfferCard 
                  uid={item}
                  offer={this.props.bookers[item]}
                />
            )}
            keyExtractor={item => item}
          />
          }
        </List>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(OffersList);