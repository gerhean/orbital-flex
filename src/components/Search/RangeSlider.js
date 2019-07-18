import React from 'react';
import RangeSlider from 'rn-range-slider';
import { connectRange } from 'react-instantsearch-native';

const Slider = () => {
    return(
        <RangeSlider
            style={{width: 160, height: 80}}
            gravity={'center'}
            step={0.5}
            selectionColor="#3df"
            blankColor="#f618"
            onValueChanged={(low, high, fromUser) => {
                this.setState({rangeLow: low, rangeHigh: high})
            }}/>
    );
}

export default ConnectedRangeSlider = connectRange(Slider);