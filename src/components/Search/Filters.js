import React from 'react';
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

const Filters = ({
    isModalOpen,
    searchState,
    searchClient,
    toggleModal,
    onSearchStateChange,
  }) => (
    <Modal animationType="slide" visible={isModalOpen}>
      <ScrollView>
        <Container>
          <InstantSearch
            searchClient={searchClient}
            // appId={ALOGOLIA_APP_ID}
            // apiKey={ALOGOLIA_API_KEY}
            indexName="trainer_schedules"
            searchState={searchState}
            onSearchStateChange={onSearchStateChange}
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
              onPress={toggleModal}
              bordered dark
            >
              <Text>Apply</Text>
            </Button>
          </Body>
        </Container>
      </ScrollView>
    </Modal>
  );


Filters.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    searchState: PropTypes.object.isRequired,
    searchClient: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired,
    onSearchStateChange: PropTypes.func.isRequired,
  };

const styles = StyleSheet.create({
    
  });

export default Filters;