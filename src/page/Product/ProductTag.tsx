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
import {categoryMenu, languageList, productDummy} from '@/assets/global/dummy';
import Menu from '@/Components/Profile/Menu';
import {ProductWhiteBoxProps} from '@/Types/Components/ProductTypes';
import CameraImage from '@/Components/Product/CameraImage';
import {getHitSlop} from '@/Util/Util';
import Input from '@/Components/Global/Input';
import {ProductTypes} from '@/Types/Components/global';
import MenuBulletIcon from '@assets/image/menu_bullet.png';

const ProductTag = () => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [tag, setTag] = useState(productDummy.tag);
  return (
    <View>
      <Header title={t('tagUpdate')} />
      <View
        style={{
          marginHorizontal: getPixel(16),
        }}>
        <View style={{height: getHeightPixel(30)}} />
        <Input value={tag} onChange={setTag} width={getPixel(328)} />
        <View style={{height: getHeightPixel(30)}} />
        <GrayText fontSize={`${12 * fontSize}`}>
          {'- ' + t('tagGuide1')}
        </GrayText>
        <View style={{height: getHeightPixel(10)}} />
        <GrayText fontSize={`${12 * fontSize}`}>
          {'- ' + t('tagGuide2')}
        </GrayText>
        <View style={{height: getHeightPixel(10)}} />
        <GrayText fontSize={`${12 * fontSize}`}>
          {'- ' + t('tagGuide3')}
        </GrayText>
        <Button
          content={t('confirm')}
          width="328px"
          style={{
            marginTop: getHeightPixel(380),
          }}
        />
      </View>
    </View>
  );
};

export default ProductTag;

const styles = StyleSheet.create({
  menuView: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    height: getHeightPixel(70),
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuImage: {
    marginRight: getPixel(10),
  },
  marginRight: {
    marginRight: getPixel(20),
  },
  line: {
    marginHorizontal: getPixel(16),
  },

  touch: {
    width: getPixel(288),
    height: getHeightPixel(50),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: getPixel(32),
  },
});
