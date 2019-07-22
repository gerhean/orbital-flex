import React, { Component } from "react";
import { View, StyleSheet, Text, FlatList, TextInput, Image, Button } from 'react-native';
import PropTypes from 'prop-types';
import { InstantSearch, connectSearchBox,
  connectInfiniteHits, connectRefinementList, connectRange } from 'react-instantsearch-native';
import algoliasearch from 'algoliasearch/reactnative';
import Constants from 'expo-constants'
import layout from './layout';
import Filters from './Filters';
import { ALOGOLIA_API_KEY, ALOGOLIA_APP_ID } from '../../../env';
import ScheduleList from '../Home/ScheduleList';

//  allow you to pre-refine any widget without rendering anything
const searchClient = algoliasearch(ALOGOLIA_APP_ID, ALOGOLIA_API_KEY);

const VirtualRefinementList = connectRefinementList(() => null);
const VirtualRangeInput = connectRange(() => null);

export default class SearchSchedules extends Component {
  
  state = {
    isModalOpen: false,
    searchState: {
      district: ["City", "Central", "North", "South", "East", "West"],
      category: ["Aerobics", "Swimming", "Weight training"
          , "Calisthenics", "Pilates", "Yoga", "Others"]
    }
  };

  toggleModal = () =>
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));

  onSearchStateChange = searchState =>
    this.setState(() => ({
      searchState,
    }));

  render() {

    const { isModalOpen, searchState } = this.state;

    return (
      <View style={styles.mainContainer}>
        <InstantSearch
          // appId={ALOGOLIA_APP_ID}
          // apiKey={ALOGOLIA_API_KEY}
          searchClient={searchClient}
          indexName="trainer_schedules"
          searchState={searchState}
          onSearchStateChange={this.onSearchStateChange}
        >
          <VirtualRefinementList attribute="district" />
          <VirtualRefinementList attribute="category" />
          <VirtualRefinementList attribute="day" />
          <VirtualRangeInput attribute="price" />
          <Filters
                isModalOpen={isModalOpen}
                searchClient={searchClient}
                toggleModal={this.toggleModal}
                searchState={searchState}
                onSearchStateChange={this.onSearchStateChange}
          />
          <View style={styles.searchContainer}>
            <ConnectedSearchBar />
            <Image
              source={require('../../../assets/algolia.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Button
                title="Filters"
                color="#252b33"
                onPress={this.toggleModal}
              />
          <ConnectedHits />
        </InstantSearch>
      </View>
    ) //<ConnectedClearRefinements />
  }
}

class SearchBar extends Component {
  render() {
    return (
      <TextInput 
        onChangeText={text => this.props.refine(text)}
        placeholder='type here to search'
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
    const items = this.props.hits.map(item => item.objectID);
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
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 40
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
    width: 20,
    padding : 5
  },
  textInput: {
    height: 30,
    fontSize: 24,
    width: layout.window.width - 20,
  }
})