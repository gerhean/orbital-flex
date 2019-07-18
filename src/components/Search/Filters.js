import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { InstantSearch } from 'react-instantsearch-native';
import algoliasearch from 'algoliasearch/reactnative';
import RefinementList from './RefinementList';
import ConnectedRangeSlider from './RangeSlider';
import { ALOGOLIA_API_KEY, ALOGOLIA_APP_ID } from '../../../env';

const searchClient = algoliasearch(ALOGOLIA_APP_ID, ALOGOLIA_API_KEY);

const Filters = ({
    isModalOpen,
    searchState,
    searchClient,
    toggleModal,
    onSearchStateChange,
  }) => (
    <Modal animationType="slide" visible={isModalOpen}>
      <SafeAreaView>
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

          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>Apply</Text>
          </TouchableOpacity>
        </InstantSearch>
      </SafeAreaView>
    </Modal>
    // <ConnectedRangeSlider attribute="price" />
  );

Filters.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    searchState: PropTypes.object.isRequired,
    searchClient: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired,
    onSearchStateChange: PropTypes.func.isRequired,
  };

const styles = StyleSheet.create({
    closeButton: {
      alignItems: 'center',
      marginTop: 20,
    },
    closeButtonText: {
      fontSize: 18,
    },
  });

export default Filters;