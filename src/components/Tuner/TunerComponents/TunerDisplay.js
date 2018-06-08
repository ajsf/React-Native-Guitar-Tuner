import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

import PropTypes from 'prop-types';

import { colors } from '../../../utils/';

var { height, width } = Dimensions.get('window');

export default class TunerDisplay extends Component {
  state = {
    xIndicator: new Animated.Value(width / 2),
  };

  componentWillReceiveProps(newProps) {
    if (this.props.delta !== newProps.delta) {
      Animated.timing(this.state.xIndicator, {
        toValue: width / 2 + (newProps.delta * width) / 2 / 100,
        duration: 500,
        easing: Easing.elastic(2),
      }).start();
    }
  }

  render() {
    const { xIndicator } = this.state;

    return (
      <View style={styles.tunerContainer}>
        <Image source={require('../../../../img/tuner.jpg')} style={styles.tuner} />
        <Animated.Image
          source={require('../../../../img/indicator.jpg')}
          style={[styles.indicator, { left: xIndicator }]}
        />
      </View>
    );
  }
}

TunerDisplay.propTypes = {
  delta: PropTypes.number,
};

const styles = StyleSheet.create({
  tunerContainer: {
    backgroundColor: '#1f2025',
    marginBottom: 28,
    alignItems: 'center',
  },
  tuner: {
    width,
    resizeMode: 'contain',
  },
  indicator: {
    position: 'absolute',
    top: 10,
  },
});
