import React, { Component } from 'react';
import { connectRange } from 'react-instantsearch-native';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import { schedule_index } from '../../sagas/backendConstants';

class RangeInput extends Component {
  static propTypes = {
    refine: PropTypes.func.isRequired,
    currentRefinement: PropTypes.object,
    attribute: PropTypes.string.isRequired, 
    minLabel: PropTypes.string,
    maxLabel: PropTypes.string
  }
    
  constructor(props) {
    super(props);
    this.state = {
      facetMin: '0',
      facetMax: '0',
      inputMin: '0',
      inputMax: '0',
    };
  }

  componentDidMount() {
    const attr = this.props.attribute;
    schedule_index.search('' /* match all */, {facets: attr, hitsPerPage: 0})
    .then((content) => {
      // console.log(content.facets_stats.price.min, content.price.myfacet.max);
      const facetMin = content.facets_stats[attr].min.toString();
      const facetMax = content.facets_stats[attr].max.toString();
      this.setState({
        facetMin,
        facetMax,
        inputMin: facetMin,
        inputMax: facetMax,
      })
    });
  }

  submitMin = () => {
    let inputMin = this.state.inputMin;
    const facetMin = this.state.facetMin;
    if (Number(inputMin) < Number(facetMin)) {
      inputMin = facetMin;
      this.setState({ inputMin })
    }
    this.props.refine({
      ...this.props.currentRefinement,
      min: Number(inputMin)
    })
  }

  submitMax = () => {
    let inputMax = this.state.inputMax;
    const facetMax = this.state.facetMax;
    if (Number(inputMax) > Number(facetMax)) {
      inputMax = facetMax;
      this.setState({ inputMax })
    }
    this.props.refine({
      ...this.props.currentRefinement,
      max: Number(inputMax)
    })
  }

  // this.props.currentRefinement.min.toString()

  render() {
    return (
      <View style={styles.viewContainer}>
        <Text>{this.props.minLabel}</Text>
        <TextInput style={styles.textInput}
          keyboardType="numeric"
          onChangeText={text => this.setState({ inputMin: text })}
          value={this.state.inputMin}
          onBlur={this.submitMin}
          underlineColorAndroid="transparent"
        />
        <Text>{this.props.maxLabel}</Text>
        <TextInput style={styles.textInput}
          keyboardType="numeric"
          onChangeText={text => this.setState({ inputMax: text })}
          value={this.state.inputMax}
          onBlur={this.submitMax}
          underlineColorAndroid="transparent"
        />
      </View>    
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
    margin: 5,
    borderBottomColor:'rgb(200, 199, 204)',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
});

export default ConnectedRangeInput = connectRange(RangeInput);