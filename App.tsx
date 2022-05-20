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
    useChannelManagement();
    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 1500);
    }, []);

    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
};

export default App;
