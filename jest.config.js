module.exports = {
  preset: 'react-native',
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-native-picker|@react-navigation)',
  ],
  collectCoverageFrom: [
    'src/screens/**/*.tsx',
    'src/screens/**/**/*.tsx',
    'src/components/**/*.tsx',
    'src/hooks/*.tsx',
    '!src/hooks/app.tsx',
  ],
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
