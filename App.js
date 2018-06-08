import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  NativeModules,
  DeviceEventEmitter,
  Animated,
  Easing,
  StatusBar,
  AppState,
} from 'react-native';
import SettingsModal from './src/components/Modal/SettingsModal';
import TunerLayout from './src/components/Tuner/TunerLayout';
import {
  getClosestString,
  colors,
  saveSelectedInstrument,
  getSelectedInstrument,
} from './src/utils/';
import instrumentTypes from './src/utils/instrumentTypes';

const { FrequencyDetector } = NativeModules;

export default class App extends Component {
  state = {
    instrument: 'guitar',
    delta: null,
    activeString: null,
    modalVisible: false,
  };

  _handleAppStateChange = nextState => {
    console.log('App state change', nextState);
    if (nextState === 'active') {
      FrequencyDetector.listen();
    } else {
      FrequencyDetector.stopListening();
    }
  };

  _frequencyListener = event => {
    console.log('Event: ', event);
    const stringData = getClosestString(
      parseInt(event.freq),
      instrumentTypes[this.state.instrument].stringFrequencies,
    );
    if (!stringData) {
      this.setState({
        delta: null,
        activeString: null,
      });
    } else {
      this.setState({
        delta: stringData.delta,
        activeString: stringData.number,
      });
    }
  };

  componentDidMount() {
    getSelectedInstrument().then(instrument => {
      this.setState({ instrument });
    });
    DeviceEventEmitter.addListener('frequency', this._frequencyListener);
    AppState.addEventListener('change', this._handleAppStateChange);
    FrequencyDetector.listen();
  }

  componentWillUnmount() {
    console.log('Unmounting');
    AppState.removeEventListener('change', this._handleAppStateChange);
    DeviceEventEmitter.removeAllListeners();
  }

  onSelectInstrument = selectedInstrument => {
    saveSelectedInstrument(selectedInstrument);
    this.setState({
      instrument: selectedInstrument,
      modalVisible: false,
    });
  };

  onSettingsButtonPress = () => {
    this.setState({
      modalVisible: true,
    });
  };

  render() {
    const instrument = instrumentTypes[this.state.instrument];
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.background} />
        <SettingsModal
          instrumentTypes={Object.keys(instrumentTypes)}
          selectedInstrument={this.state.instrument}
          visible={this.state.modalVisible}
          onClose={() => {
            this.setState({ modalVisible: false });
          }}
          onSelectInstrument={this.onSelectInstrument}
        />
        <TunerLayout
          instrumentName={instrument.displayName}
          onSettingsMenuPress={this.onSettingsMenuPress}
          delta={this.state.delta}
          stringNotes={instrument.stringNotes}
          activeString={this.state.activeString}
          onSettingsButtonPress={this.onSettingsButtonPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
