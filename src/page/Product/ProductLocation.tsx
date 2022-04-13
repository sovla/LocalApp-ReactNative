import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
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
import CloseGrayIcon from '@assets/image/close_gray.png';
import MoreIcon from '@assets/image/more.png';
import UploadWhiteIcon from '@assets/image/upload_white.png';
import NoticeOn from '@assets/image/notice_on.png';
import SettingsIcon from '@assets/image/settings.png';
import ArrowRightGrayIcon from '@assets/image/arrow_right_gray.png';
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
import i18next, {t} from 'i18next';
import {
  categoryMenu,
  languageList,
  productDummy,
  tierList,
} from '@/assets/global/dummy';
import Menu from '@/Components/Profile/Menu';
import {ProductWhiteBoxProps} from '@/Types/Components/ProductTypes';
import CameraImage from '@/Components/Product/CameraImage';
import {getHitSlop} from '@/Util/Util';
import Input from '@/Components/Global/Input';
import {ProductTypes} from '@/Types/Components/global';
import MenuBulletIcon from '@assets/image/menu_bullet.png';
import MyLocationIcon from '@assets/image/my_location.png';

const ProductLocation = () => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <View>
      <Header title={t('tradingLocationUpdate')} />
      <FlatList
        data={tierList}
        ListHeaderComponent={
          <>
            <View style={styles.headerView}>
              <Text
                medium
                fontSize={`${20 * fontSize}`}
                style={{
                  marginTop: getHeightPixel(30),
                  marginBottom: getHeightPixel(20),
                }}>
                {t('locationUpdateGuide1')}
              </Text>
              <View>
                <TextInput
                  style={[
                    styles.textInput,
                    {
                      fontSize: fontSize * 16,
                    },
                  ]}
                  placeholder="Run Tres Rios"
                  placeholderTextColor={Theme.color.gray_BB}
                />
              </View>
              <TouchableOpacity style={styles.headerLocationTouch}>
                <AutoHeightImage source={MyLocationIcon} width={getPixel(20)} />
                <Text fontSize={`${14 * fontSize}`}>{t('myLocation')}</Text>
              </TouchableOpacity>
            </View>
            <Line height={getHeightPixel(10)} />
          </>
        }
        renderItem={({item, index}) => {
          return (
            <View style={styles.boxContainer}>
              <Shadow distance={5}>
                <View style={styles.boxView}>
                  <Text fontSize={`${16 * fontSize}`} medium>
                    {t(item.name)}
                  </Text>
                  <GrayText
                    fontSize={`${14 * fontSize}`}
                    style={styles.contentText}>
                    {t(item.content)}
                  </GrayText>
                  <View style={styles.tierImageView}>
                    <Image
                      source={item.image}
                      style={styles.tierImage}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </Shadow>
            </View>
          );
        }}
        ListFooterComponent={
          <View
            style={{
              height: getHeightPixel(110),
            }}
          />
        }
      />
    </View>
  );
};

export default ProductLocation;

const styles = StyleSheet.create({
  headerView: {
    marginHorizontal: getPixel(16),
    width: getPixel(328),
  },
  textInput: {
    width: getPixel(328),
    height: getHeightPixel(40),
    backgroundColor: Theme.color.gray_F1,
    borderRadius: getPixel(4),
    color: Theme.color.black,
  },
  headerLocationTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: getHeightPixel(20),
  },
  tierImageView: {
    position: 'absolute',
    bottom: getHeightPixel(0),
    right: getPixel(5),
    width: getPixel(60),
    height: getHeightPixel(60),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  tierImage: {
    width: getPixel(60),
    height: getHeightPixel(67.8),
  },
  boxContainer: {
    marginHorizontal: getPixel(16),
    marginBottom: getHeightPixel(16),
  },
  contentText: {
    width: getPixel(221),
  },
  boxView: {
    width: getPixel(328),
    height: getHeightPixel(100),
    borderRadius: getPixel(10),
    paddingTop: getHeightPixel(16),
    paddingLeft: getPixel(18),
  },
});
