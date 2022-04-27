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
import PushNotification, {Importance} from 'react-native-push-notification';

const App = () => {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
    'react-i18next:: You will need to pass in an i18next instance by using initReactI18next',
  ]);
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'sound1', // (required)
        channelName: 'sound1', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'sound1', // (optional) See `soundName` parameter of `localNotification` function
        vibrate: false, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`),
    ); // (optional) callback returns whether the channel was created, false means it already existed.)
    PushNotification.createChannel(
      {
        channelId: 'sound2', // (required)
        channelName: 'sound2', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'sound2', // (optional) See `soundName` parameter of `localNotification` function
        vibrate: false, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`),
    );
    PushNotification.createChannel(
      {
        channelId: 'sound3', // (required)
        channelName: 'sound3', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'sound3', // (optional) See `soundName` parameter of `localNotification` function
        vibrate: false, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`),
    );
    PushNotification.createChannel(
      {
        channelId: 'sound1_vibrate', // (required)
        channelName: 'sound2_vibrate', // (required)
        playSound: false, // (optional) default: true
        soundName: 'sound1', // (optional) See `soundName` parameter of `localNotification` function
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`),
    );
    PushNotification.createChannel(
      {
        channelId: 'sound2_vibrate', // (required)
        channelName: 'sound2_vibrate', // (required)
        playSound: false, // (optional) default: true
        soundName: 'sound2', // (optional) See `soundName` parameter of `localNotification` function
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`),
    );
    PushNotification.createChannel(
      {
        channelId: 'sound3_vibrate', // (required)
        channelName: 'sound3_vibrate', // (required)
        playSound: false, // (optional) default: true
        soundName: 'sound3', // (optional) See `soundName` parameter of `localNotification` function
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`),
    );
    PushNotification.createChannel(
      {
        channelId: 'vibrate', // (required)
        channelName: 'vibrate', // (required)
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`),
    );
    PushNotification.createChannel(
      {
        channelId: 'no_vibrate', // (required)
        channelName: 'no_vibrate', // (required)
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        vibrate: false, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`),
    );

    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
    // Geolocation.getCurrentPosition(info => console.log(info));
  }, []);

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
