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
import Screen, {SignUpTelProps, SignUpTOSProps} from '@/Types/Screen/Screen';
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
import {getHitSlop} from '@/Util/Util';

export default function SignUpTel({navigation}: SignUpTelProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [tel, setTel] = useState('');

  const onPressNext = useCallback(() => {
    return navigation.navigate('SignUpAuth', tel);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <KeyboardAwareScrollView style={{flex: 1}}>
        <View style={styles.view}>
          <Text style={styles.titleText} medium fontSize={`${20 * fontSize}`}>
            {t('signUpTelGuide1')}
          </Text>

          <Text fontSize={`${14 * fontSize}`} style={styles.width220}>
            {t('signUpTelGuide2')}
            <Text color={Theme.color.blue_3D} fontSize={`${14 * fontSize}`}>
              {t('signUpTelGuide3')}
            </Text>
          </Text>
          <TouchableOpacity style={styles.touch}>
            <Text fontSize={`${14 * fontSize}`}>브라질</Text>
            <AutoHeightImage source={ArrowDownIcon} width={getPixel(12)} />
          </TouchableOpacity>
          <Line isGray width={getPixel(288)} />
          <View style={styles.touch}>
            <View style={styles.telLeftView}>
              <GrayText fontSize={`${16 * fontSize}`}>+</GrayText>
              <Text fontSize={`${16 * fontSize}`}> 55</Text>
            </View>
            <TextInput
              style={{
                ...styles.textInput,
                fontSize: 15 * fontSize,
              }}
              placeholder={t('telPh')}
              placeholderTextColor={Theme.color.gray}
            />
          </View>
          <Button
            onPress={onPressNext}
            content={t('next')}
            style={styles.button}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: getPixel(222),
    height: getHeightPixel(50),
    borderBottomColor: Theme.color.gray,
    borderBottomWidth: 0.5,
    color: Theme.color.black,
  },
  telLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Theme.color.gray,
    borderBottomWidth: 0.5,
    width: getPixel(54),
    height: getHeightPixel(50),
  },
  width220: {
    width: getPixel(220),
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
