import React, { Component } from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '../../../env';

class LocationInput extends Component {
  constructor(props) {
    super(props);
    }
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder='Tap here to suggest location...'
        minLength={2}
        autoFocus={false}
        listViewDisplayed='true'
        fetchDetails={true}
        renderDescription={row => row.description || row.formatted_address || row.name}
        onPress={(data, details = null) => {
          this.props.handler(data.description)
        }}
        getDefaultValue={() => ''}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
          types: 'geocode',
          components: "country:sg" // if got error try caps
        }}
        styles={{
          textInputContainer: {
          width: '100%'
          },
          description: {
          fontWeight: 'bold'
          }
        }}
        currentLocation={false}
        nearbyPlacesAPI='GooglePlacesSearch'
        GooglePlacesSearchQuery={{
          rankby: 'prominence'
        }}
        GooglePlacesDetailsQuery={{
          fields: 'formatted_address'
        }}
        debounce={200}
      />
    );
  }
}


export default LocationInput;