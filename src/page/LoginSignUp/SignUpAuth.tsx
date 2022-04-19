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

import BackGroundImage from '@assets/image/BG.png';
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
import i18next from 'i18next';
import {languageList} from '@/assets/global/dummy';
import Menu from '@/Components/Profile/Menu';
import ProductWhiteBox from '@/Components/Product/ProductWhiteBox';
import EditModal from '@/Components/Product/EditModal';
import Screen, {
  SignUpAuthProps,
  SignUpTelProps,
  SignUpTOSProps,
} from '@/Types/Screen/Screen';
import ArrowRightIcon from '@assets/image/arrow_right.png';
import ArrowUpGrayIcon from '@assets/image/arrow_up_gray.png';
import ArrowDownGrayIcon from '@assets/image/arrow_down_gray.png';
import ArrowDownIcon from '@assets/image/arrow_down.png';
import BangBlackIcon from '@assets/image/bang_black.png';
import {TextInput} from 'react-native-gesture-handler';

import QuetionIcon from '@assets/image/quetion.png';
import AnswerIcon from '@assets/image/answer.png';
import {FAQItemProps} from '@/Types/Components/SettingTypes';
import SuccessIcon from '@assets/image/success.png';
import {getHitSlop, timer} from '@/Util/Util';
import useInterval from '@/Hooks/useInterval';

export default function SignUpAuth({navigation}: SignUpAuthProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const tel = '+55 11 99999-0000';
  const [authNum, setAuthNum] = useState('0');
  const [count, setCount] = useState(120);

  const onPressNext = useCallback(() => {
    navigation.navigate('SignUpForm', tel);
  }, []);

  useInterval(() => {
    if (count > 0) setCount(prev => prev - 1);
  }, 1000);

  return (
    <View style={styles.container}>
      <Header />
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View style={styles.view}>
          <Text style={styles.titleText} medium fontSize={`${20 * fontSize}`}>
            {tel} {t('signUpAuthGuide1')}
          </Text>

          <Text
            textAlign="center"
            fontSize={`${14 * fontSize}`}
            style={styles.width175}>
            <Text
              textAlign="center"
              color={Theme.color.blue_3D}
              fontSize={`${14 * fontSize}`}>
              {tel}
            </Text>
            {t('signUpAuthGuide2')}
          </Text>
          <View style={styles.authNumView}>
            <TextInput
              caretHidden
              style={styles.textInput}
              onChangeText={setAuthNum}
              maxLength={6}
              keyboardType="number-pad"
            />
            <View style={styles.boxView}>
              <Text fontSize={`${20 * fontSize}`}>{authNum[0]}</Text>
            </View>
            <View style={styles.boxView}>
              <Text fontSize={`${20 * fontSize}`}>{authNum[1]}</Text>
            </View>
            <View style={styles.boxView}>
              <Text fontSize={`${20 * fontSize}`}>{authNum[2]}</Text>
            </View>
            <View style={styles.boxView}>
              <Text fontSize={`${20 * fontSize}`}>{authNum[3]}</Text>
            </View>
            <View style={styles.boxView}>
              <Text fontSize={`${20 * fontSize}`}>{authNum[4]}</Text>
            </View>
            <View style={{...styles.boxView, marginRight: 0}}>
              <Text fontSize={`${20 * fontSize}`}>{authNum[5]}</Text>
            </View>
          </View>
          <View style={styles.authRetryView}>
            <TouchableOpacity>
              <GrayText fontSize={`${12 * fontSize}`}>
                {t('authRetry')}
              </GrayText>
            </TouchableOpacity>
            <GrayText fontSize={`${12 * fontSize}`}>{timer(count)}</GrayText>
          </View>
          <Button onPress={onPressNext} content={t('confirm')} />
          <TouchableOpacity>
            <Text
              textAlign="center"
              color={Theme.color.blue_3D}
              fontSize={`${14 * fontSize}`}
              style={{
                marginTop: getHeightPixel(20),
              }}>
              {t('signUpAuthGuide3')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  authRetryView: {
    width: getPixel(288),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: getHeightPixel(20),
    marginBottom: getHeightPixel(40),
  },
  authNumView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHeightPixel(40),
  },
  textInput: {
    position: 'absolute',
    backgroundColor: '#0000',
    width: getPixel(288),
    height: getHeightPixel(40),
    zIndex: 100,
    color: '#0000',
  },
  boxView: {
    width: getPixel(39),
    height: getPixel(39),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.color.blue_F5,
    borderRadius: 4,
    marginRight: getPixel(10),
  },
  telLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Theme.color.gray,
    borderBottomWidth: 0.5,
    width: getPixel(54),
    height: getHeightPixel(50),
  },
  width175: {
    width: getPixel(175),
  },
  touch: {
    width: getPixel(288),
    height: getHeightPixel(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: getHeightPixel(30),
  },
  titleText: {
    textAlign: 'center',
    marginBottom: getHeightPixel(20),
  },
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    marginTop: getHeightPixel(40),
  },
  mr5: {
    marginRight: getPixel(5),
  },
  width15: {
    width: getPixel(15),
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxView: {
    width: getPixel(288),
    height: getHeightPixel(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
