import React from 'react';
import 'react-native';
import TunerLayout from '../../../../src/components/Tuner/TunerLayout';
import renderer from 'react-test-renderer';
import instrumentTypes from '../../../../src/utils/instrumentTypes';

const instrument = instrumentTypes[Object.keys(instrumentTypes)[0]];

const config = {
  stringNotes: instrument.stringNotes,
  instrumentName: instrument.displayName,
};

test('it renders correctly', () => {
  const tree = renderer.create(<TunerLayout {...config} />).toJSON();
  expect(tree).toMatchSnapshot();
});
