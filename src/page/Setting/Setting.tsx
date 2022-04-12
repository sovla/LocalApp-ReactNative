import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';

import BackGroundImage from '@assets/image/BG.png';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import LocationWhiteIcon from '@assets/image/location_white.png';
import SearchIcon from '@assets/image/search_white.png';
import MenuIcon from '@assets/image/bar_white.png';
import AlarmIcon from '@assets/image/notice_white.png';
import {DarkBlueText, GrayText, Text, WhiteText} from '@Components/Global/text';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import TrianglePinkIcon from '@assets/image/triangle_pink.png';
import {HeaderProps, ModalMyPageProps} from '@/Types/Components/HomeTypes';
import useBoolean from '@/Hooks/useBoolean';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BackBlackBoxIcon from '@assets/image/back_black_box.png';
import AutoHeightImage from 'react-native-auto-height-image';
import DummyProfileImage from '@assets/image/dummy_profile.png';

import CloseBlueIcon from '@assets/image/close_blue.png';
import NoticeColorIcon from '@assets/image/notice_color.png';
import CommentIcon from '@assets/image/comment.png';
import LockIcon from '@assets/image/lock.png';
import EarthIcon from '@assets/image/earth.png';
import ServiceCenterIcon from '@assets/image/service_center.png';
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
        <ImageWithView image={CloseBlueIcon} content={t('settingMenu4')} />
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
