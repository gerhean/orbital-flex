import React, { Component } from "react";
import {
  StyleSheet,
  Modal,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import { InstantSearch } from 'react-instantsearch-native';
import algoliasearch from 'algoliasearch/reactnative';
import {
  Container,
  Body,
  Button,
  Text,
  Card,
  CardItem,
  Left,
  Right
} from "native-base";
import RefinementList from './RefinementList';
import { ALOGOLIA_API_KEY, ALOGOLIA_APP_ID } from '../../../env';
import RangeInput from './RangeInput';

class Filters extends Component {
  static propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    searchState: PropTypes.object.isRequired,
    searchClient: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired,
    onSearchStateChange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Modal animationType="slide" visible={this.props.isModalOpen}>
        <ScrollView>
          <Container>
            <InstantSearch
              searchClient={this.props.searchClient}
              // appId={ALOGOLIA_APP_ID}
              // apiKey={ALOGOLIA_API_KEY}
              indexName="trainer_schedules"
              searchState={this.props.searchState}
              onSearchStateChange={this.props.onSearchStateChange}
            >
              <RefinementList attribute="district" title="district" />
              <RefinementList attribute="category" title="workout category" />
              <RefinementList attribute="day" title="day of the week" />
              <RangeInput 
                  attribute="price"
                  minLabel="minimum price:" 
                  maxLabel="maximum price:" />
            </InstantSearch>
            <Body>
            <Button
                onPress={this.props.toggleModal}
                bordered dark
              >
                <Text>Apply</Text>
              </Button>
            </Body>
          </Container>
        </ScrollView>
      </Modal>
    );
  }
}

export default Filters;