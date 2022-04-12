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
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import TrianglePinkIcon from '@assets/image/triangle_pink.png';
import {HeaderProps, ModalMyPageProps} from '@/Types/Components/HomeTypes';
import useBoolean from '@/Hooks/useBoolean';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BackBlackBoxIcon from '@assets/image/back_black_box.png';
import AutoHeightImage from 'react-native-auto-height-image';
import DummyProfileImage from '@assets/image/dummy_profile.png';

import AnnouncementIcon from '@assets/image/announcement.png';
import NoticeColorIcon from '@assets/image/notice_color.png';
import StoreIcon from '@assets/image/store.png';
import DocumentIcon from '@assets/image/document.png';
import HeartBlueIcon from '@assets/image/heart_blue.png';
import CategoryColorIcon from '@assets/image/category_color.png';
import NoticeOn from '@assets/image/notice_on.png';
import SettingsIcon from '@assets/image/settings.png';
import ServiceCenterIcon from '@assets/image/service_center.png';
import Header from '@/Components/LoginSignUp/Header';
import {Toggle} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';

export default function SettingAlarm() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [messageAlarm, setMessageAlarm] = useState(false);

  const [vibration, setVibration] = useState(false);
  const [isShow, setIsShow] = useState(false);
  return (
    <View>
      <Header title={t('settingMenu2')} />
      <View style={styles.container}>
        <GrayText fontSize={`${12 * fontSize}`}>{t('message')}</GrayText>
        <View style={styles.betweenView}>
          <Text fontSize={`${16 * fontSize}`}>{t('messageAlarm')}</Text>
          <Toggle isOn={messageAlarm} setIsOn={setMessageAlarm} />
        </View>
        <Line isGray width={getPixel(328)} />
        <View style={styles.betweenView}>
          <Text fontSize={`${16 * fontSize}`}>{t('vibration')}</Text>
          <Text color={Theme.color.blue_3D} fontSize={`${16 * fontSize}`}>
            {t('alarmSettingDefault')}
          </Text>
        </View>
        <Line isGray width={getPixel(328)} />
        <View style={styles.betweenView}>
          <Text fontSize={`${16 * fontSize}`}>{t('vibration')}</Text>
          <Toggle isOn={vibration} setIsOn={setVibration} />
        </View>
        <Line isGray width={getPixel(328)} />
        <View style={styles.betweenView}>
          <View>
            <Text fontSize={`${16 * fontSize}`}>{t('alarmShow')}</Text>
            <GrayText fontSize={`${14 * fontSize}`}>
              {t('alarmShowGuide')}
            </GrayText>
          </View>

          <Toggle isOn={isShow} setIsOn={setIsShow} />
        </View>
        <Line isGray width={getPixel(328)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
  },
  betweenView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: getHeightPixel(16),
    borderBottomColor: Theme.color.gray,
    borderBottomWidth: 0.4,
  },
});
