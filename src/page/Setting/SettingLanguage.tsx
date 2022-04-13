import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import BackGroundImage from '@assets/image/BG.png';
import {fontSizeChange, getHeightPixel, getPixel} from '@/Util/pixelChange';
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
import BangGrayIcon from '@assets/image/bang_gray.png';
import NoticeOn from '@assets/image/notice_on.png';
import SettingsIcon from '@assets/image/settings.png';
import ServiceCenterIcon from '@assets/image/service_center.png';
import Header from '@/Components/LoginSignUp/Header';
import {
  Button,
  CheckBox,
  CheckBoxImage,
  Toggle,
} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import {Shadow} from 'react-native-shadow-2';
import {useDispatch} from 'react-redux';
import {fontChange, fontSizeState} from '@/Store/fontSizeState';
import {BetweenText} from '../Profile/ProfileDetail';
import i18next from 'i18next';
import {languageList} from '@/assets/global/dummy';
export default function SettingLanguage() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [selectLanguage, setSelectLanguage] = useState(0);
  useEffect(() => {
    const index = languageList.findIndex(v => v === i18next.language);
    setSelectLanguage(index);
  }, []);
  console.log(i18next.language);
  const onPressSave = () => {
    i18next.changeLanguage(languageList[selectLanguage], (err, t) => {
      console.log(err, t);
    });
  };
  return (
    <View>
      <Header title={t('settingLanguageTitle')} />
      <TouchableOpacity
        style={styles.betweenTouch}
        onPress={() => setSelectLanguage(0)}>
        <Text fontSize={`${16 * fontSize}`}>Portugues (Brasil)</Text>
        <CheckBoxImage isOn={selectLanguage === 0} />
      </TouchableOpacity>
      <Line isGray />
      <TouchableOpacity
        style={styles.betweenTouch}
        onPress={() => setSelectLanguage(1)}>
        <Text fontSize={`${16 * fontSize}`}>Spanish</Text>
        <CheckBoxImage isOn={selectLanguage === 1} />
      </TouchableOpacity>
      <Line isGray />
      <TouchableOpacity
        style={styles.betweenTouch}
        onPress={() => setSelectLanguage(2)}>
        <Text fontSize={`${16 * fontSize}`}>English</Text>
        <CheckBoxImage isOn={selectLanguage === 2} />
      </TouchableOpacity>
      <Line isGray />
      <TouchableOpacity
        style={styles.betweenTouch}
        onPress={() => setSelectLanguage(3)}>
        <Text fontSize={`${16 * fontSize}`}>한국어</Text>
        <CheckBoxImage isOn={selectLanguage === 3} />
      </TouchableOpacity>
      <Line isGray />
      <View style={styles.guideView}>
        <AutoHeightImage source={BangGrayIcon} width={getPixel(14)} />
        <GrayText
          style={{marginLeft: getPixel(5)}}
          fontSize={`${12 * fontSize}`}>
          {t('settingLanguageGuide1')}
        </GrayText>
      </View>
      <View style={styles.saveView}>
        <Button width="288px" content={t('save')} onPress={onPressSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  saveView: {
    width: getPixel(360),
    marginTop: getHeightPixel(380),
    alignItems: 'center',
  },
  guideView: {
    width: getPixel(360),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: getHeightPixel(15),
  },
  betweenTouch: {
    width: getPixel(288),
    height: getHeightPixel(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: getPixel(36),
  },
});
