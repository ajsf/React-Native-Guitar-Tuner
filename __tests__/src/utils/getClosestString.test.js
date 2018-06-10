import { getClosestString } from '../../../src/utils/index';

const stringFrequencies = [
  { min: 36, max: 96, tuned: 82 },
  { min: 96, max: 128, tuned: 110 },
  { min: 128, max: 171, tuned: 146 },
  { min: 171, max: 221, tuned: 196 },
  { min: 221, max: 287, tuned: 246 },
  { min: 287, max: 371, tuned: 329 },
];

it('returns null for negative frequencies', () => {
  const stringNumber = getClosestString(-1, stringFrequencies);
  expect(stringNumber).toEqual(null);
});

it('returns null for frequencies that are below the range of all the strings', () => {
  const stringData = getClosestString(
    stringFrequencies[0].min - 0.01,
    stringFrequencies,
  );
  expect(stringData).toBeNull();
});

it('returns null for frequencies that are above the range of all the strings', () => {
  const stringData = getClosestString(
    stringFrequencies[5].max + 0.01,
    stringFrequencies,
  );
  expect(stringData).toBeNull();
});

it('returns the correct string number for tuned frequencies', () => {
  stringFrequencies.forEach((string, index) => {
    const stringData = getClosestString(string.tuned, stringFrequencies);
    const stringNumber = stringData.number;
    expect(stringNumber).toEqual(index);
  });
});

test('it returns a delta of 0 for tuned frequencies', () => {
  stringFrequencies.forEach((string, index) => {
    const stringData = getClosestString(string.tuned, stringFrequencies);
    const delta = stringData.delta;
    expect(delta).toEqual(0);
  });
});

test('it returns the correct string number for max frequencies', () => {
  stringFrequencies.forEach((string, index) => {
    const stringData = getClosestString(string.max, stringFrequencies);
    const stringNumber = stringData.number;
    expect(stringNumber).toEqual(index);
  });
});

test('it returns a delta of 75 for max frequencies', () => {
  stringFrequencies.forEach((string, index) => {
    const stringData = getClosestString(string.max, stringFrequencies);
    const delta = stringData.delta;
    expect(delta).toEqual(75);
  });
});

test('it returns the correct string number when the frequency is just above the min frequency', () => {
  stringFrequencies.forEach((string, index) => {
    const stringData = getClosestString(
      string.min + 0.000001,
      stringFrequencies,
    );
    const stringNumber = stringData.number;
    expect(stringNumber).toEqual(index);
  });
});

test('it returns a delta of -75 when the frequency is just above the min frequency', () => {
  stringFrequencies.forEach((string, index) => {
    const stringData = getClosestString(
      string.min + 0.000001,
      stringFrequencies,
    );
    const delta = stringData.delta;
    expect(delta).toEqual(-75);
  });
});
