module.exports = {
  presets: ['module:metro-react-native-babel-preset', [
    '@babel/preset-react', {
      runtime: 'automatic'
    }
  ]],
  plugins: [
    [
      'module-resolver',
      {
        root: ["./src"],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        // alias: {
        //   components: ['./src/components'],
        //   config: ['./src/config'],
        //   hooks: ['./src/hooks'],
        //   navigation: ['./src/navigation'],
        //   schemas: ['./src/schemas'],
        //   screens: ['./src/screens'],
        //   services: ['./src/services'],
        //   styles: ['./src/styles'],
        //   types: ['./src/types'],
        //   utils: ['./src/utils'],
        // }
      },
    ],
  ],
};
