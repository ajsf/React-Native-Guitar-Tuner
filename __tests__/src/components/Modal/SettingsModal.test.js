import React from 'react';
import 'react-native';
import SettingsModal from '../../../../src/components/Modal/SettingsModal';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const tree = renderer.create(<SettingsModal />).toJSON();
  expect(tree).toMatchSnapshot();
});
