import { AsyncStorage } from 'react-native';

export function getClosestString(freq, stringFrequencies) {
  if (freq < 0) return null;
  let stringData = null;
  const length = stringFrequencies.length;
  for (let i = 0; i < length; i++) {
    if (stringFrequencies[i].min < freq && stringFrequencies[i].max >= freq) {
      let delta = freq - stringFrequencies[i].tuned;
      if (delta > 0) {
        delta = Math.floor(
          (delta * 100) /
            (stringFrequencies[i].max - stringFrequencies[i].tuned),
        );
      } else {
        delta = Math.floor(
          (delta * 100) /
            (stringFrequencies[i].tuned - stringFrequencies[i].min),
        );
      }
      if (delta > 75) delta = 75;
      if (delta < -75) delta = -75;
      stringData = { number: i, delta };
    }
  }
  return stringData;
}

export const colors = {
  background: '#1f2025',
  overlay: 'rgba(0, 0, 0, 0.68)',
  colorPrimary: '#FFD54F',
  colorSecondary: '#81D4FA',
};

export function saveSelectedInstrument(instrument) {
  try {
    AsyncStorage.setItem('@instrument', instrument);
  } catch (error) {
    console.log('Error saving settings', error);
  }
}

export function getSelectedInstrument() {
  return AsyncStorage.getItem('@instrument');
}
