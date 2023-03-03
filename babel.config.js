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
          '@const': './src/customConstants',
          '@t': './src/types',
          '@api': './src/api',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
