import React, { Component } from 'react';
import { connect } from "react-redux";
import { PropTypes } from 'prop-types';
import { FlatList } from 'react-native';

import {List, Container} from 'native-base';
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
          <FlatList 
            data={bookerIds} 
            renderItem={({ item }) => (
              <OfferCard 
                uid={item}
                offer={this.props.bookers[item]}
              />
            )}
            keyExtractor={item => item}
          />
        </List>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(OffersList);