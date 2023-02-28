module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@c': './src/components',
          '@p': './src/pages',
          '@n': './src/navigator',
          '@u': './src/utils',
          '@m': './src/models',
          '@conf': './src/config',
          '@cons': './src/constants',
          '@t': './src/types',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
