import React from 'react';
import 'react-native';
import SettingsModal from '../../../../src/components/Modal/SettingsModal';
import renderer from 'react-test-renderer';
import instrumentTypes from '../../../../src/utils/instrumentTypes';
import expect from 'expect';
import { shallow } from 'enzyme';

describe('SettingsModal', () => {
  let modal;
  let onSelectInstrument;

  it('renders correctly', () => {
    const tree = renderer.create(<SettingsModal />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  beforeEach(() => {
    onSelectInstrument = jest.fn();
    modal = shallow(
      <SettingsModal instrumentTypes onSelectInstrument={onSelectInstrument} />,
    );
  });

  it('Renders buttons for each instrument type', () => {
    const numberOfInstruments = Object.keys(instrumentTypes).length;
    const modalButtons = modal.find('ModalButton');
    expect(modalButtons.length).toEqual(numberOfInstruments);
  });

  it('Renders an Overlay', () => {
    const overlay = modal.find('Overlay');
    expect(overlay.length).toEqual(1);
  });
});
