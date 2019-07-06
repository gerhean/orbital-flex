import React, { Component } from "react";
import { View, StyleSheet, Text, FlatList, TextInput, Image } from 'react-native';
import PropTypes from 'prop-types';
import {InstantSearch, connectSearchBox, connectInfiniteHits } from 'react-instantsearch-native';
// import {connectSearchBox, connectInfiniteHits} from 'react-instantsearch/connectors';
import { Constants } from 'expo';
import layout from './layout';
import { ALOGOLIA_API_KEY, ALGOLIA_APP_ID } from '../../../env';
import ScheduleList from '../Home/ScheduleList';

export default class UsersList extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <InstantSearch
          appId={ALGOLIA_APP_ID}
          apiKey={ALOGOLIA_API_KEY}
          indexName="trainer_schedules"
        >
        <View style={styles.searchContainer}>
        <Image
          source={require('../../../assets/algolia.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <ConnectedSearchBar />
        </View>
        <ConnectedHits />
        </InstantSearch>
      </View>
    )
  }
}

class SearchBar extends Component {
  render() {
    return (
      <TextInput 
        onChangeText={text => this.props.refine(text)}
        value={this.props.currentRefinement}
        returnKeyType='done'
        clearButtonMode='while-editing'
        style={styles.textInput}
        underlineColorAndroid="transparent"
        autoCorrect={false}
      />
    );
  }
}

SearchBar.propTypes = {
  refine: PropTypes.func.isRequired,
  currentRefinement: PropTypes.string,
}

const ConnectedSearchBar = connectSearchBox(SearchBar);

class Hits extends Component {
  render() {
    // const hits = this.props.hits.length > 0 ?
    //     <FlatList
    //       data={this.props.hits}
    //       renderItem={this.renderItem}
    //       keyExtractor={item => item.objectID}
    //       initialNumToRender={5}
    //     /> : null;
    const items = this.props.hits.map(item => item.objectID);
    console.log(items);
    return <ScheduleList scheduleArr={items}/>;
  };

}

Hits.propTypes = {
  hits: PropTypes.array.isRequired,
  refine: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

const ConnectedHits = connectInfiniteHits(Hits);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: Constants.statusBarHeight
  },
  searchContainer: {
    width: layout.window.width,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgb(200, 199, 204)',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  logo: {
    height: 20,
    width: 20
  },
  textInput: {
    height: 30,
    fontSize: 24,
    width: layout.window.width - 20,
  }
})