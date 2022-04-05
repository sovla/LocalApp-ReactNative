module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
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
        alias: {
          '@': './src',
          '@Components': './src/Components',
          '@Page': './src/Page',
          '@Util': './src/Util',
          '@Types': './src/Types',
          '@assets': './src/assets',
          '@image/*': './src/assets/image',
        },
      },
    ],
  ],
};
