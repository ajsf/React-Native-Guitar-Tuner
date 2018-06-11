import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import instrumentTypes from '../../../../../src/utils/instrumentTypes';
import { shallow } from 'enzyme';
import Strings from '../../../../../src/components/Tuner/TunerComponents/Strings';
import { Image as AnimatedImage } from 'react-native-animatable';
const instrument = instrumentTypes[Object.keys(instrumentTypes)[0]];

const config = {
  stringNotes: instrument.stringNotes,
  activeString: null,
};

describe('<Strings />', () => {
  const Component = <Strings {...config} />;
  let strings;

  it('renders correctly', () => {
    const tree = renderer.create(Component).toJSON();
    expect(tree).toMatchSnapshot();
  });

  beforeEach(() => {
    strings = shallow(Component);
  });

  it('renders the correct number of strings', () => {
    const images = strings.find('Image');
    expect(images.length).toEqual(instrument.stringNotes.length);
  });

  it('displays each note name', () => {
    const text = strings.find('Text');
    const notes = text.map(t => {
      return t.children().text();
    });
    expect(notes).toEqual(instrument.stringNotes);
  });

  it('animates the active string', () => {
    const clone = React.cloneElement(Component, { activeString: 0 });
    const stringsActivated = shallow(clone);
    const animatable = stringsActivated.find(AnimatedImage);
    expect(animatable.length).toEqual(1);
    expect(stringsActivated.childAt(0).childAt(0)).toEqual(animatable);
  });
});
