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
import {Shadow} from 'react-native-shadow-2';

export default function SettingChatting() {
  const {t} = useTranslation();
  const {value: fontSize, size} = useAppSelector(state => state.fontSize);
  const [isOn, setIsOn] = useState(false);

  return (
    <View>
      <Header title={t('settingMenu3')} />
      <View
        style={{
          marginHorizontal: getPixel(16),
        }}>
        <GrayText fontSize={`${12 * fontSize}`}>
          {t('settingChattingTitle')}
        </GrayText>
        <View style={styles.betweenView}>
          <Text fontSize={`${16 * fontSize}`}>{t('fontSize')}</Text>
          <TouchableOpacity
            onPress={() => {
              setIsOn(prev => !prev);
            }}>
            <Text color={Theme.color.blue_3D} fontSize={`${16 * fontSize}`}>
              {t('fontSizeMedium')}
            </Text>
            {isOn && (
              <View
                style={{
                  position: 'absolute',
                  top: getHeightPixel(25),
                  left: -getPixel(90),
                }}>
                <Shadow>
                  <View
                    style={{
                      width: getPixel(107),
                      height: getHeightPixel(190),
                      backgroundColor: '#fff',
                    }}></View>
                  <Text medium fontSize={`${16 * fontSize}`}>
                    {t('fontSize')}
                  </Text>
                </Shadow>
              </View>
            )}
          </TouchableOpacity>
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
