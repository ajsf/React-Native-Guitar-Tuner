import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import SettingsButton from './TunerComponents/SettingsButton';
import TunerDisplay from './TunerComponents/TunerDisplay';
import Strings from './TunerComponents/Strings';

const TunerLayout = props => {
  return (
    <Aux>
      <SettingsButton
        text={props.instrumentName}
        pressed={props.onSettingsButtonPress}
      />
      <TunerDisplay delta={props.delta} />
      <Strings
        stringNotes={props.stringNotes}
        activeString={props.activeString}
      />
    </Aux>
  );
};

export default TunerLayout;
