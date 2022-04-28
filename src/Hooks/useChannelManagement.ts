import {Dispatch, SetStateAction, useCallback, useState} from 'react';
import PushNotification, {Importance} from 'react-native-push-notification';
function useChannelManagement() {
  PushNotification.getChannels(channels => {
    console.log('channels:::', channels);
    if (Array.isArray(channels)) {
      if (!channels.find(v => v === 'sound1')) {
        PushNotification.createChannel(
          {
            channelId: 'sound1', // (required)
            channelName: 'sound1', // (required)
            channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
            playSound: true, // (optional) default: true
            soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
            vibrate: false, // (optional) default: true. Creates the default vibration pattern if true.
          },
          created => console.log(`createChannel returned '${created}'`),
        );
      }
      if (!channels.find(v => v === 'sound2')) {
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
      }
      if (!channels.find(v => v === 'sound3')) {
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
      }
      if (!channels.find(v => v === 'sound1_vibrate')) {
        PushNotification.createChannel(
          {
            channelId: 'sound1_vibrate', // (required)
            channelName: 'sound1_vibrate', // (required)
            playSound: false, // (optional) default: true
            soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
          },
          created => console.log(`createChannel returned '${created}'`),
        );
      }
      if (!channels.find(v => v === 'sound2_vibrate')) {
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
      }
      if (!channels.find(v => v === 'sound3_vibrate')) {
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
      }
      if (!channels.find(v => v === 'vibrate')) {
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
      }
      if (!channels.find(v => v === 'no_vibrate')) {
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
      }
    }
  });
}

export default useChannelManagement;
