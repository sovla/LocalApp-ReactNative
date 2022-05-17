/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import Router from './src/Page/Router';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from '@/Store/store';
import SplashScreen from 'react-native-splash-screen';
import Geolocation from '@react-native-community/geolocation';
import {Dimensions, LogBox, Platform} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import useChannelManagement from '@/Hooks/useChannelManagement';

const App = () => {
    LogBox.ignoreLogs([
        "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
        'react-i18next:: You will need to pass in an i18next instance by using initReactI18next',
    ]);
    useChannelManagement();
    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 1500);
    }, []);

    console.log(Dimensions.get('window').height);

    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
};

export default App;
