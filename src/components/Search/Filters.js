import React from 'react';
import {
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Button
} from 'react-native';
import PropTypes from 'prop-types';
import { InstantSearch } from 'react-instantsearch-native';
import algoliasearch from 'algoliasearch/reactnative';
import {
  Container,
  Body
} from "native-base";
import RefinementList from './RefinementList';
import { ALOGOLIA_API_KEY, ALOGOLIA_APP_ID } from '../../../env';
import RangeInput from './RangeInput';

const searchClient = algoliasearch(ALOGOLIA_APP_ID, ALOGOLIA_API_KEY);

const Filters = ({
    isModalOpen,
    searchState,
    searchClient,
    toggleModal,
    onSearchStateChange,
  }) => (
    <Modal animationType="slide" visible={isModalOpen}>
      <Container>
        <Body>
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
                min={0}
                max={999}
                minLabel="minimum price:" 
                maxLabel="maximum price:" />

            <Button 
              onPress={toggleModal}
              title="Apply"
            >

            </Button>
          </InstantSearch>
        </Body>
      </Container>
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