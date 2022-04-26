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
import {LogBox, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SendBird from 'sendbird';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      LogBox.ignoreLogs([
        "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
        'react-i18next:: You will need to pass in an i18next instance by using initReactI18next',
      ]);
    }, 1500);
    // Geolocation.getCurrentPosition(info => console.log(info));
  }, []);

  useEffect(() => {
    (async () => {
      const authorizationStatus = await messaging().requestPermission();
      if (
        authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
      ) {
        if (Platform.OS === 'ios') {
          const token = await messaging().getAPNSToken();
          if (token) {
            AsyncStorage.setItem('token', token);
          }
        } else {
          const token = await messaging().getToken();
          console.log(token);
          if (token) {
            AsyncStorage.setItem('token', token);
          }
        }
      }
    })();
  }, []);
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
