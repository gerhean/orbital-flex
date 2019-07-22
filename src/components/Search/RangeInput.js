import React, { Component } from 'react';
import { connectRange } from 'react-instantsearch-native';
import PropTypes from 'prop-types';
import { TextInput, View } from 'react-native';

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
            <View>
                <TextInput
                    placeholder={this.props.minLabel}
                    keyboardType="numeric"
                    onChangeText={text => this.props.refine({...this.props.currentRefinement,
                        min: Number(text)})}
                    maxLength={3}
                    value={this.props.currentRefinement.min.toString()}
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    placeholder={this.props.maxLabel}
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

export default ConnectedRangeInput = connectRange(RangeInput);