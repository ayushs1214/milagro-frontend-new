module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // You can add additional plugins here if needed, for example:
      // 'react-native-reanimated/plugin',
    ],
  };
};