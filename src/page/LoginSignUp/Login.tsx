import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {Fragment, useCallback, useEffect, useState} from 'react';

import ProfileBackGroundImage from '@assets/image/profile_bg.png';
import {fontSizeChange, getHeightPixel, getPixel} from '@/Util/pixelChange';
import LocationWhiteIcon from '@assets/image/location_white.png';
import SearchIcon from '@assets/image/search_white.png';
import MenuIcon from '@assets/image/bar_white.png';
import AlarmIcon from '@assets/image/notice_white.png';
import {DarkBlueText, GrayText, Text, WhiteText} from '@Components/Global/text';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import TrianglePinkIcon from '@assets/image/triangle_pink.png';
import {
  HeaderProps,
  ModalMyPageProps,
  ModalUploadModalProps,
} from '@/Types/Components/HomeTypes';
import useBoolean from '@/Hooks/useBoolean';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BackBlackBoxIcon from '@assets/image/back_black_box.png';
import AutoHeightImage from 'react-native-auto-height-image';
import DummyProfileImage from '@assets/image/dummy_profile.png';

import AnnouncementIcon from '@assets/image/announcement.png';
import NoticeColorIcon from '@assets/image/notice_color.png';
import StoreIcon from '@assets/image/store.png';
import WriteIcon from '@assets/image/write.png';
import TrashWhiteIcon from '@assets/image/trash_white.png';
import BackWhiteIcon from '@assets/image/back_white.png';
import NoticeOn from '@assets/image/notice_on.png';
import SettingsIcon from '@assets/image/settings.png';
import ServiceCenterIcon from '@assets/image/service_center.png';
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
import i18next from 'i18next';
import {languageList} from '@/assets/global/dummy';
import Menu from '@/Components/Profile/Menu';
import ProductWhiteBox from '@/Components/Product/ProductWhiteBox';
import EditModal from '@/Components/Product/EditModal';
import Screen, {LoginProps} from '@/Types/Screen/Screen';
import ArrowRightIcon from '@assets/image/arrow_right.png';
import ArrowUpGrayIcon from '@assets/image/arrow_up_gray.png';
import ArrowDownGrayIcon from '@assets/image/arrow_down_gray.png';
import BangBlackIcon from '@assets/image/bang_black.png';
import {TextInput} from 'react-native-gesture-handler';

import QuetionIcon from '@assets/image/quetion.png';
import AnswerIcon from '@assets/image/answer.png';
import {FAQItemProps} from '@/Types/Components/SettingTypes';
import SuccessIcon from '@assets/image/success.png';
import Header from '@/Components/Profile/Header';
import LoginLogoImage from '@assets/image/login_logo.png';
import Input from '@/Components/Global/Input';
import {getHitSlop} from '@/Util/Util';

export default function Login({navigation}: LoginProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [autoLogin, setAutoLogin] = useState<boolean>(false);
  const [isView, setIsView] = useState<boolean>(false);
  const titleFontsize = fontSize * 36;

  const onPressAutoLogin = useCallback(() => {
    setAutoLogin(prev => !prev);
  }, []);
  const onPressIsView = useCallback(() => {
    setIsView(prev => !prev);
  }, []);

  const onPressSignUp = useCallback(() => {
    navigation.navigate('SignUpTOS');
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <ImageBackground
          source={ProfileBackGroundImage}
          style={styles.backGroundImage}
        />
        <Image
          source={require('@assets/image/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Image
          source={require('@assets/image/location.png')}
          style={styles.locationImage}
          resizeMode="contain"
        />
        <Image
          source={require('@assets/image/location_deal.png')}
          style={styles.locationDeal}
          resizeMode="contain"
        />
        <Image
          source={require('@assets/image/people.png')}
          style={styles.peopleImage}
          resizeMode="contain"
        />
        <View style={styles.titleView}>
          <View style={[styles.rowCenter1]}>
            <Text
              color={Theme.color.aqua_00}
              bold
              fontSize={`${titleFontsize}`}>
              {t('localApp')}
            </Text>
            <Text color={Theme.color.white} bold fontSize={`${titleFontsize}`}>
              {t('loginGuide1')}
            </Text>
          </View>
          <View style={[styles.rowCenter1]}>
            <Text color={Theme.color.white} bold fontSize={`${42 * fontSize}`}>
              {t('loginGuide2')}
            </Text>
            <Text
              color={Theme.color.white}
              style={styles.loginGuide3Text}
              bold
              fontSize={`${titleFontsize}`}>
              {t('loginGuide3')}
            </Text>
            <Text
              color={Theme.color.aqua_00}
              bold
              fontSize={`${titleFontsize}`}
              style={{
                marginTop: getHeightPixel(5),
              }}>
              {t('loginGuide4')}
            </Text>
          </View>
        </View>
        <View style={styles.whiteView}>
          <Input
            width={getPixel(270)}
            PlaceHolderComponent={() => (
              <GrayText fontSize={`${14 * fontSize}`}>
                {t('signUpFormEmail')}
              </GrayText>
            )}
          />
          <View>
            <Input
              width={getPixel(270)}
              PlaceHolderComponent={() => (
                <GrayText fontSize={`${14 * fontSize}`}>
                  {t('password')}
                </GrayText>
              )}
            />
            <TouchableOpacity
              onPress={onPressIsView}
              hitSlop={getHitSlop(5)}
              style={styles.viewImageTouch}>
              <AutoHeightImage
                source={
                  isView
                    ? require('@assets/image/view.png')
                    : require('@assets/image/none_view.png')
                }
                width={getPixel(24)}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onPressAutoLogin} style={styles.rowCenter}>
            <CheckBoxImage isBox isOn={autoLogin} />
            <Text
              fontSize={`${12 * fontSize}`}
              style={{marginLeft: getPixel(10)}}>
              {t('autoLogin')}
            </Text>
          </TouchableOpacity>
          <Button content={t('login')} width="270px" />
          <View
            style={{
              ...styles.rowCenter,
              width: 'auto',
              marginTop: getHeightPixel(40),
            }}>
            <Text
              color={Theme.color.whiteBlack_53}
              fontSize={`${12 * fontSize}`}>
              {t('businessSignUpGuide3')}
            </Text>
            <TouchableOpacity
              onPress={onPressSignUp}
              hitSlop={getHitSlop(5)}
              style={styles.marginLeft}>
              <Text fontSize={`${12 * fontSize}`} color={Theme.color.blue_3D}>
                {t('signUp')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleView: {
    width: getPixel(265),
    height: getHeightPixel(96),
    position: 'absolute',
    left: getPixel(36),
    top: getHeightPixel(77.5),
    justifyContent: 'space-around',
    transform: [{rotate: '-5deg'}],
  },
  loginGuide3Text: {marginLeft: getPixel(3), marginTop: getHeightPixel(5)},
  rowCenter1: {flexDirection: 'row', alignItems: 'flex-end'},
  peopleImage: {
    width: getPixel(204),
    height: getHeightPixel(227),
    position: 'absolute',
    left: getPixel(87),
    top: getHeightPixel(158),
    zIndex: 100,
  },
  locationDeal: {
    width: getPixel(125),
    height: getHeightPixel(83),
    position: 'absolute',
    left: getPixel(235),
    top: getHeightPixel(36),
    zIndex: 100,
  },
  locationImage: {
    width: getPixel(154),
    height: getPixel(154),
    position: 'absolute',
    left: getPixel(-53),
    top: getHeightPixel(191),
    zIndex: 100,
  },
  logoImage: {
    width: getPixel(120),
    height: getHeightPixel(25.2),
    position: 'absolute',
    left: getPixel(36),
    top: getHeightPixel(43),
    zIndex: 100,
  },
  marginLeft: {
    marginLeft: getPixel(5),
  },
  viewImageTouch: {
    position: 'absolute',
    right: 0,
    top: getHeightPixel(5),
  },
  rowCenter: {
    width: getPixel(270),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: getHeightPixel(19),
  },
  container: {
    backgroundColor: Theme.color.blue_3D,
    flex: 1,
  },
  backGroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: getPixel(360),
    height: getHeightPixel(300),
  },
  communicationImage: {
    position: 'absolute',
    top: -getHeightPixel(127.3),
    left: -getPixel(53),
    width: getPixel(534.58),
    height: getHeightPixel(512.3),
    zIndex: 105,
  },

  title: {
    width: getPixel(177),
  },
  subTitle: {
    marginTop: getHeightPixel(15),
    width: getPixel(165),
  },
  whiteView: {
    width: getPixel(328),
    height: getHeightPixel(348),
    backgroundColor: Theme.color.white,
    marginHorizontal: getPixel(16),
    marginTop: getHeightPixel(354),
    borderRadius: getPixel(20),

    alignItems: 'center',
    paddingTop: getHeightPixel(40),
  },
});
