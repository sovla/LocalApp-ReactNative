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
import React, {Fragment, useEffect, useState} from 'react';

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
import Screen from '@/Types/Screen/Screen';
import ArrowRightIcon from '@assets/image/arrow_right.png';
import ArrowUpGrayIcon from '@assets/image/arrow_up_gray.png';
import ArrowDownGrayIcon from '@assets/image/arrow_down_gray.png';
import BangBlackIcon from '@assets/image/bang_black.png';
import {TextInput} from 'react-native-gesture-handler';

import QuetionIcon from '@assets/image/quetion.png';
import AnswerIcon from '@assets/image/answer.png';
import {FAQItemProps} from '@/Types/Components/SettingTypes';
import SuccessIcon from '@assets/image/success.png';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailOptionBox: React.FC<{
  dataArray?: any[] | object | null;
  fieldName?: string;
  isOption?: boolean;
}> = ({dataArray, fieldName, isOption}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  if (!dataArray) {
    return null;
  }
  const data = Array.isArray(dataArray) ? dataArray : Object.entries(dataArray);
  if (data.length === 0) {
    return null;
  }

  return (
    <View style={styles.rowView}>
      <View style={styles.leftView}>
        {data.map((v, i) => {
          if (i % 2 === 1) {
            return null;
          }
          if (
            `${fieldName}_title` in v &&
            `${fieldName}_type` in v &&
            Array.isArray(dataArray) &&
            !isOption
          ) {
            return (
              <View style={styles.innerView}>
                <GrayText fontSize={`${12 * fontSize}`}>
                  {v[`${fieldName}_title`]}
                </GrayText>
                <Text fontSize={`${14 * fontSize}`} medium>
                  {t(v[`${fieldName}_type`] as string)}
                </Text>
              </View>
            );
          } else if (!Array.isArray(dataArray)) {
            return (
              <View
                style={{
                  width: getPixel(124),
                  marginTop: getHeightPixel(20),
                }}>
                <GrayText fontSize={`${12 * fontSize}`}>{t(v[0])}</GrayText>
                <Text fontSize={`${14 * fontSize}`} medium>
                  {v[1] === 'Y' || v[1] === 'N' ? t(v[1]) : v[1]}
                </Text>
              </View>
            );
          } else if (
            `${fieldName}_title` in v &&
            `${fieldName}_type` in v &&
            isOption
          ) {
            return (
              <View style={styles.innerView}>
                <Text fontSize={`${14 * fontSize}`} medium>
                  {t(v[`${fieldName}_title`] as string)}
                </Text>
              </View>
            );
          }
        })}
      </View>
      <View style={styles.rightView}>
        {data.map((v, i) => {
          if (i % 2 === 0) {
            return null;
          }
          if (
            `${fieldName}_title` in v &&
            `${fieldName}_type` in v &&
            Array.isArray(dataArray)
          ) {
            return (
              <View style={styles.innerView}>
                <GrayText fontSize={`${12 * fontSize}`}>
                  {v[`${fieldName}_title`]}
                </GrayText>
                <Text fontSize={`${14 * fontSize}`} medium>
                  {t(v[`${fieldName}_type`] as string)}
                </Text>
              </View>
            );
          } else if (!Array.isArray(dataArray)) {
            return (
              <View
                style={{
                  width: getPixel(124),
                  marginTop: getHeightPixel(20),
                }}>
                <GrayText fontSize={`${12 * fontSize}`}>{t(v[0])}</GrayText>
                <Text fontSize={`${14 * fontSize}`} medium>
                  {v[1] === 'Y' || v[1] === 'N' ? t(v[1]) : v[1]}
                </Text>
              </View>
            );
          }
        })}
      </View>
    </View>
  );
};

export default ProductDetailOptionBox;

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
  },
  leftView: {
    backgroundColor: '#E0E0E020',
    width: getPixel(165),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center',
    paddingBottom: getHeightPixel(20),
  },
  rightView: {
    backgroundColor: '#E0E0E040',
    width: getPixel(165),
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
  },

  innerView: {
    width: getPixel(124),
    marginTop: getHeightPixel(20),
  },
});
