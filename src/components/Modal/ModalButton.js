import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ModalButton = props => {
  return (
    <TouchableOpacity onPress={props.pressed}>
      <Text style={props.style}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default ModalButton;
