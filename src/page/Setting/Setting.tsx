import {StyleSheet, View} from 'react-native';
import React from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';

import CloseBlueIcon from '@assets/image/close_blue.png';
import NoticeColorIcon from '@assets/image/notice_color.png';
import CommentIcon from '@assets/image/comment.png';
import LockIcon from '@assets/image/lock.png';
import EarthIcon from '@assets/image/earth.png';
import Header from '@/Components/LoginSignUp/Header';
import {ImageWithView} from '@/Components/Home/ModalMyPage';

export default function Setting() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const navigation = useAppNavigation();
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Header title={t('settingTitle')} />
      <View style={styles.settingView}>
        <ImageWithView
          image={LockIcon}
          content={t('settingMenu1')}
          onPress={() => {
            navigation.navigate('SettingPrivacy');
          }}
        />
        <ImageWithView
          image={NoticeColorIcon}
          imageWidth={getPixel(18)}
          content={t('settingMenu2')}
          onPress={() => {
            navigation.navigate('SettingAlarm');
          }}
        />
        <ImageWithView
          image={CommentIcon}
          content={t('settingMenu3')}
          onPress={() => {
            navigation.navigate('SettingChatting');
          }}
        />
        <ImageWithView
          image={CloseBlueIcon}
          content={t('settingMenu4')}
          onPress={() => {
            navigation.navigate('BlockList');
          }}
        />
        <ImageWithView
          image={EarthIcon}
          content={t('settingMenu5')}
          onPress={() => {
            navigation.navigate('SettingLanguage');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingView: {
    width: getPixel(328),
    paddingTop: getHeightPixel(20),
  },
});
