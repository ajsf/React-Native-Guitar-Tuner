import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingsButton = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.pressed}>
      <View />
      <Text style={styles.text}>{props.text}</Text>
      <Icon name="caret-down" color="white" size={30} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 10,
  },
  icon: {
    marginTop: 2,
    marginLeft: 10,
    alignSelf: 'center',
  },
});

export default SettingsButton;
