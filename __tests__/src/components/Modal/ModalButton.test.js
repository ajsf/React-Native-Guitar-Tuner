import React from 'react';
import 'react-native';
import ModalButton from '../../../../src/components/Modal/ModalButton';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('SettingsModal', () => {
  const testText = 'Test Text';
  const Component = <ModalButton text={testText} />;
  let button;
  let pressedSpy;

  it('renders correctly', () => {
    const tree = renderer.create(Component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  beforeEach(() => {
    pressedSpy = jest.fn();
    const clone = React.cloneElement(Component, { pressed: pressedSpy });
    button = shallow(clone);
  });

  it('Renders the text passed as a prop', () => {
    const text = button
      .find('Text')
      .children()
      .text();
    expect(text).toEqual(testText);
  });

  it('Calls the pressed callback when pressed', () => {
    button.simulate('press');
    expect(pressedSpy).toHaveBeenCalledTimes(1);
  });
});
