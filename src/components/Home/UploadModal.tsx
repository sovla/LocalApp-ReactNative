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
import ProductListIcon from '@assets/image/product_list.png';
import UploadWhiteIcon from '@assets/image/upload_white.png';
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

const UploadModal: React.FC<ModalUploadModalProps> = ({onClose}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const navigation = useAppNavigation();
  const onPressReg = () => {
    onClose();
    navigation.navigate('ProductUpdate');
  };
  const onPressSale = () => {
    onClose();
    navigation.navigate('ProfileSellProduct');
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0007',
      }}>
      <TouchableOpacity onPress={onPressReg} style={styles.writeTouch}>
        <WhiteText medium fontSize={`${12 * fontSize}`}>
          {t('productRegistration')}
        </WhiteText>
        <AutoHeightImage source={WriteIcon} width={getPixel(55)} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressSale} style={styles.productListTouch}>
        <WhiteText medium fontSize={`${12 * fontSize}`}>
          {t('profileHomeSaleProduct')}
        </WhiteText>
        <AutoHeightImage source={ProductListIcon} width={getPixel(55)} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose} style={styles.uploadTouch}>
        <AutoHeightImage source={UploadWhiteIcon} width={getPixel(70)} />
      </TouchableOpacity>
    </View>
  );
};

export default UploadModal;

const styles = StyleSheet.create({
  uploadTouch: {
    position: 'absolute',
    right: getPixel(16),
    bottom: getHeightPixel(60),
  },
  productListTouch: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    right: getPixel(16),
    bottom: getHeightPixel(60 + 70 + 20),
  },
  writeTouch: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    right: getPixel(16),
    bottom: getHeightPixel(150 + 55),
  },
});
