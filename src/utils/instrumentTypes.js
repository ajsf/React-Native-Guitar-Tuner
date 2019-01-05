const guitar = {
  displayName: 'Guitar',
  stringNotes: ['E', 'A', 'D', 'G', 'B', 'E'],
  stringFrequencies: [
    { min: 36, max: 96, tuned: 82 },
    { min: 96, max: 128, tuned: 110 },
    { min: 128, max: 171, tuned: 146 },
    { min: 171, max: 221, tuned: 196 },
    { min: 221, max: 287, tuned: 246 },
    { min: 287, max: 371, tuned: 329 },
  ],
};

const bass4 = {
  displayName: 'Bass (4-String)',
  stringNotes: ['E', 'A', 'D', 'G'],
  stringFrequencies: [
    { min: 30, max: 48.55, tuned: 41.2 },
    { min: 48.56, max: 64.21, tuned: 55 },
    { min: 64.22, max: 86.61, tuned: 73.42 },
    { min: 86.62, max: 110, tuned: 98 },
  ],
};

const bass5low = {
  displayName: 'Bass (5-String, Low-B)',
  stringNotes: ['B', 'E', 'A', 'D', 'G'],
  stringFrequencies: [
    { min: 20, max: 36.48, tuned: 30.87 },
    { min: 36.49, max: 48.55, tuned: 42.1 },
    { min: 48.56, max: 64.21, tuned: 55 },
    { min: 64.22, max: 86.61, tuned: 73.42 },
    { min: 86.62, max: 140, tuned: 98 },
  ],
};

const bass5hi = {
  displayName: 'Bass (5-String, High-C)',
  stringNotes: ['E', 'A', 'D', 'G', 'C'],
  stringFrequencies: [
    { min: 36.49, max: 48.55, tuned: 41.2 },
    { min: 48.56, max: 64.21, tuned: 55 },
    { min: 64.22, max: 86.61, tuned: 73.42 },
    { min: 86.62, max: 114.4, tuned: 98 },
    { min: 114.41, max: 150, tuned: 130.81 },
  ],
};

const ukulele = {
  displayName: 'Ukulele',
  stringNotes: ['G', 'C', 'E', 'A'],
  stringFrequencies: [
    { min: 360.85, max: 416, tuned: 392 },
    { min: 326.81, max: 295.36, tuned: 261.63 },
    { min: 295.37, max: 360.84, tuned: 329.63 },
    { min: 416.1, max: 114.4, tuned: 440 },
  ],
};

const instrumentTypes = {
  guitar,
  bass4,
  bass5low,
  bass5hi,
  ukulele,
};

export default instrumentTypes;
