import React, { Component } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';

import { colors } from '../../../utils';

export default class Strings extends Component {
  render() {
    console.log(this.props.activeString);
    return (
      <View style={styles.stringsContainer}>
        {this.props.stringNotes.map((note, i) => {
          let image = null;
          if (this.props.activeString === i) {
            image = (
              <Animatable.Image
                animation="shake"
                duration={20}
                easing="ease-in-out-quint"
                iterationCount="infinite"
                source={require('../../../../img/string.jpg')}
                style={styles.string}
              />
            );
          } else {
            image = (
              <Image
                source={require('../../../../img/string.jpg')}
                style={styles.string}
              />
            );
          }
          return (
            <View key={i} style={styles.stringContainer}>
              {image}
              <View
                style={[
                  styles.noteContainer,
                  {
                    borderColor:
                      this.props.activeString === i
                        ? colors.colorPrimary
                        : colors.colorSecondary,
                    borderWidth: this.props.activeString === i ? 4 : 3,
                  },
                ]}
              >
                <Text style={styles.note}>{note}</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}

Strings.propTypes = {
  activeString: PropTypes.number,
};

const styles = StyleSheet.create({
  stringsContainer: {
    borderTopColor: colors.colorSecondary,
    borderTopWidth: 5,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flex: 1,
  },
  stringContainer: {
    alignItems: 'center',
  },
  string: {
    flex: 1,
  },
  note: {
    color: 'white',
    fontSize: 19,
    textAlign: 'center',
  },
  noteContainer: {
    top: 50,
    height: 50,
    width: 50,
    position: 'absolute',
    padding: 10,
    borderColor: colors.colorPrimary,
    borderWidth: 3,
    borderRadius: 25,
    backgroundColor: colors.background,
  },
});
