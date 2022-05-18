/**
 * @format
 */

import {AppRegistry, TouchableOpacity, Image, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

import {Text, TextInput} from 'react-native';
import Theme from '@/assets/global/Theme';
import {getHitSlop} from '@/Util/Util';

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
TouchableOpacity.defaultProps = TouchableOpacity.defaultProps || {
    hitSlop: getHitSlop(5),
};
Image.defaultProps = Image.defaultProps || {
    resizeMethod: 'resize',
};

LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
    'react-i18next:: You will need to pass in an i18next instance by using initReactI18next',
    'Remote debugger is in a background tab which may cause apps to perform slowly',
    'Require cycle: node_modules/rn-fetch-blob/index.js',
    'Require cycle: node_modules/react-native/Libraries/Network/fetch.js',
    'Require cycle: node_modules\rn-fetch-blobindex.js -> node_modules\rn-fetch-blobpolyfillindex.js -> node_modules\rn-fetch-blobpolyfillFetch.js -> node_modules\rn-fetch-blobindex.js',
]);

AppRegistry.registerComponent(appName, () => App);
