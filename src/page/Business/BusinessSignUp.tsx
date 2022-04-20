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
import Screen, {BusinessSignUpProps} from '@/Types/Screen/Screen';
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
import CommunicationImage from '@assets/image/communication.png';
import Input from '@/Components/Global/Input';
import {getHitSlop} from '@/Util/Util';

export default function BusinessSignUp({navigation}: BusinessSignUpProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [autoLogin, setAutoLogin] = useState<boolean>(false);
  const [isView, setIsView] = useState<boolean>(false);

  const onPressAutoLogin = useCallback(() => {
    setAutoLogin(prev => !prev);
  }, []);
  const onPressIsView = useCallback(() => {
    setIsView(prev => !prev);
  }, []);
  const onPressLogin = useCallback(() => {
    navigation.navigate('Home');
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <ImageBackground
          source={ProfileBackGroundImage}
          style={styles.backGroundImage}
        />
        <Image source={CommunicationImage} style={styles.communicationImage} />
        <Header isBack />
        <View style={styles.titleView}>
          <WhiteText bold style={styles.title} fontSize={`${20 * fontSize}`}>
            {t('businessSignUpGuide1')}
          </WhiteText>
          <WhiteText style={styles.subTitle} fontSize={`${14 * fontSize}`}>
            {t('businessSignUpGuide2')}
          </WhiteText>
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
          <Button
            onPress={onPressLogin}
            content={t('login')}
            width="270px"
            style={styles.button}
            fontColor={Theme.color.whiteBlack_53}
          />
          <View
            style={{
              ...styles.rowCenter,
              width: 'auto',
              marginTop: getHeightPixel(40),
            }}>
            <GrayText fontSize={`${12 * fontSize}`}>
              {t('businessSignUpGuide3')}
            </GrayText>
            <TouchableOpacity hitSlop={getHitSlop(5)} style={styles.marginLeft}>
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
  marginLeft: {
    marginLeft: getPixel(5),
  },
  button: {
    backgroundColor: Theme.color.whiteBlue_F0,
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
    top: getHeightPixel(10),
    right: getPixel(32),
    height: getHeightPixel(360),
    width: getPixel(150),
    zIndex: 100,
  },
  titleView: {
    marginLeft: getPixel(32),
    marginTop: getHeightPixel(50),
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
    marginTop: getHeightPixel(30),
    borderRadius: getPixel(20),

    alignItems: 'center',
    paddingTop: getHeightPixel(40),
  },
});
