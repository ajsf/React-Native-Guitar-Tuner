import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Overlay from 'react-native-modal-overlay';
import { colors } from '../../utils';
import ModalButton from './ModalButton';
import instrumentTypes from '../../utils/instrumentTypes';

const SettingsModal = props => {
  const selectButtons = Object.keys(instrumentTypes).map(instrumentKey => {
    return (
      <ModalButton
        text={instrumentTypes[instrumentKey].displayName}
        key={instrumentKey}
        style={
          instrumentKey === props.selectedInstrument
            ? styles.selectedInstrument
            : styles.text
        }
        pressed={() => props.onSelectInstrument(instrumentKey)}
      />
    );
  });
  return (
    <Overlay
      visible={props.visible}
      animationType="zoomInDown"
      onClose={props.onClose}
      closeOnTouchOutside
      containerStyle={{ backgroundColor: colors.overlay }}
      childrenWrapperStyle={styles.childrenWrapper}
      animationDuration={500}
    >
      <Text style={styles.text}>Select An Instrument:</Text>
      <ScrollView>{selectButtons}</ScrollView>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    padding: 8,
  },
  selectedInstrument: {
    fontSize: 24,
    padding: 8,
    fontWeight: 'bold',
  },
  childrenWrapper: {
    backgroundColor: '#eee',
    alignItems: 'stretch',
    borderRadius: 4,
  },
});

export default SettingsModal;
