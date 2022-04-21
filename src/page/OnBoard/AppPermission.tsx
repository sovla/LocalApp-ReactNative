import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text, RedText} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';

import {Button, CheckBoxImage} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';

import {AppPermissionProps} from '@Types/Screen/Screen';

import {
  request,
  PERMISSIONS,
  requestMultiple,
  checkNotifications,
  checkMultiple,
} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';

const AndroidPermission = [
  PERMISSIONS.ANDROID.READ_SMS,
  PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
  PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PERMISSIONS.ANDROID.CAMERA,
  PERMISSIONS.ANDROID.ACCESS_NOTIFICATION_POLICY,
];

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export default function AppPermission({navigation}: AppPermissionProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const [permission, setPermission] = useState({
    call: false,
    storage: false,
    locationInformation: false,
    cameraGallery: false,
    alarm: false,
  });
  const allPermissionCheck = useCallback(() => {
    if (Platform.OS === 'android') {
      checkMultiple(AndroidPermission).then(state => {
        setPermission(prev => ({
          ...prev,
          call: state[AndroidPermission[0]] === 'granted',
          storage:
            state[AndroidPermission[1]] === 'granted' &&
            state[AndroidPermission[2]] === 'granted',
          locationInformation:
            state[AndroidPermission[3]] === 'granted' &&
            state[AndroidPermission[4]] === 'granted',
          cameraGallery: state[AndroidPermission[5]] === 'granted',
          alarm: state[AndroidPermission[6]] === 'granted',
        }));
      });
    }
  }, []);

  const onPressCall = useCallback(() => {
    if (Platform.OS === 'android') {
      requestMultiple([AndroidPermission[0]]).then(statuses => {
        allPermissionCheck();
      });
    }
  }, []);
  const onPressStorage = useCallback(() => {
    if (Platform.OS === 'android') {
      requestMultiple([AndroidPermission[1], AndroidPermission[2]]).then(
        statuses => {
          allPermissionCheck();
        },
      );
    }
  }, []);
  const onPressLocation = useCallback(() => {
    if (Platform.OS === 'android') {
      requestMultiple([AndroidPermission[3], AndroidPermission[4]]).then(
        statuses => {
          allPermissionCheck();
        },
      );
    }
  }, []);
  const onPressCamera = useCallback(() => {
    if (Platform.OS === 'android') {
      requestMultiple([AndroidPermission[5]]).then(statuses => {
        allPermissionCheck();
      });
    }
  }, []);
  const onPressAlarm = useCallback(() => {
    if (Platform.OS === 'android') {
      requestUserPermission();
      requestMultiple([AndroidPermission[6]]).then(statuses => {
        allPermissionCheck();
      });
    }
  }, []);

  const onPressAll = useCallback(async () => {
    if (Platform.OS === 'android') {
      const result = await requestMultiple(AndroidPermission).then(
        statuses => {},
      );
    } else {
      requestUserPermission();
    }
    allPermissionCheck();
  }, []);

  const menuList = [
    {
      title: 'call',
      require: 'require',
      content: 'appPermissionGuide2',
      onPress: onPressCall,
      isOn: permission.call,
    },
    {
      title: 'storage',
      require: 'require',
      content: 'appPermissionGuide3',
      onPress: onPressStorage,
      isOn: permission.storage,
    },
    {
      title: 'locationInformation',
      require: 'require',
      content: 'appPermissionGuide4',
      onPress: onPressLocation,
      isOn: permission.locationInformation,
    },
    {
      title: 'cameraGallery',
      require: 'option',
      content: 'appPermissionGuide5',
      onPress: onPressCamera,
      isOn: permission.cameraGallery,
    },
    {
      title: 'modalMyPageAlarm',
      require: 'option',
      content: 'appPermissionGuide6',
      onPress: onPressAlarm,
      isOn: permission.alarm,
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <Text fontSize={`${24 * fontSize}`} medium>
          {t('appPermissionGuide')}
        </Text>
        <TouchableOpacity
          onPress={onPressAll}
          style={[styles.rowTouch, styles.marginTop30]}>
          <CheckBoxImage isBox />
          <Text style={styles.marginText} fontSize={`${16 * fontSize}`} medium>
            {t('allCheck')}
          </Text>
        </TouchableOpacity>
        <Line isGray style={{marginBottom: getHeightPixel(16)}} />
        {menuList.map(item => {
          return (
            <TouchableOpacity
              onPress={item.onPress}
              style={styles.rowTouch}
              key={item.title}>
              <View style={styles.permissionView}>
                <CheckBoxImage isOn={item.isOn} isBox />
              </View>
              <View>
                <View style={styles.rowCenterView}>
                  <Text
                    style={styles.marginText}
                    fontSize={`${16 * fontSize}`}
                    medium>
                    {t(item.title)}
                  </Text>
                  <Text
                    color={
                      item.require === 'require'
                        ? Theme.color.red
                        : Theme.color.black
                    }
                    fontSize={`${16 * fontSize}`}>
                    {t(item.require)}
                  </Text>
                </View>
                <Text
                  style={[styles.marginText, styles.textWidth]}
                  color={Theme.color.darkGray_78}
                  fontSize={`${13 * fontSize}`}>
                  {t(item.content)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <Button
        content={t('next')}
        onPress={() => {
          navigation.reset({
            routes: [
              {
                name: 'Home',
              },
            ],
          });
        }}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rowCenterView: {flexDirection: 'row', alignItems: 'center'},
  permissionView: {
    alignSelf: 'flex-start',
    paddingTop: getHeightPixel(5),
  },
  button: {
    position: 'absolute',
    bottom: getHeightPixel(32),
    left: getPixel(32),
  },
  mainView: {
    width: getPixel(288),
    paddingTop: getHeightPixel(30),
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textWidth: {
    width: getPixel(232),
  },
  marginTop30: {
    marginTop: getHeightPixel(30),
  },
  rowTouch: {
    width: getPixel(288),
    flexDirection: 'row',
    marginBottom: getHeightPixel(25),
    alignItems: 'center',
  },
  marginText: {
    marginLeft: getPixel(16),
    marginRight: getPixel(5),
  },
});
