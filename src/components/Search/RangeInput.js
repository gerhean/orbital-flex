import React, { Component } from 'react';
import { connectRange } from 'react-instantsearch-native';
import { View, StyleSheet, Text, FlatList, TextInput, Image, Button } from 'react-native';
import PropTypes from 'prop-types';

class RangeInput extends Component {
    static propTypes = {
        refine: PropTypes.func.isRequired,
        currentRefinement: PropTypes.object,
        minLabel: PropTypes.string,
        maxLabel: PropTypes.string
    }
      
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.viewContainer}>
                <Text>{this.props.minLabel}</Text>
                <TextInput style={styles.textInput}
                    keyboardType="numeric"
                    onChangeText={text => this.props.refine({...this.props.currentRefinement,
                        min: Number(text)})}
                    maxLength={3}
                    value={this.props.currentRefinement.min.toString()}
                    underlineColorAndroid="transparent"
                />
                <Text>{this.props.maxLabel}</Text>
                <TextInput style={styles.textInput}
                    keyboardType="numeric"
                    onChangeText={text => this.props.refine({...this.props.currentRefinement,
                        max: Number(text)})}
                    maxLength={3}
                    value={this.props.currentRefinement.max.toString()}
                    underlineColorAndroid="transparent"
                />
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textInput: {
        fontSize: 20,
        textAlign: 'center',
        padding: 5,
        margin: 5,
    }
});

export default ConnectedRangeInput = connectRange(RangeInput);