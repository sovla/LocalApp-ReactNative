/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

import {Text, TextInput} from 'react-native';
import Theme from '@/assets/global/Theme';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {
  style: {
    fontFamily: Theme.fontWeight.default,
    letterSpacing: -0.84,
    color: Theme.color.aqua_00,
  },
};
TextInput.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
