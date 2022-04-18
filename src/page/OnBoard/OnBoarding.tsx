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
import Logo2Image from '@assets/image/logo2.png';
import CityImage from '@assets/image/city.png';
import HandshakeImage from '@assets/image/handshake.png';
import MapImage from '@assets/image/map.png';
import {onScrollSlide} from '@/Util/Util';

export default function OnBoarding() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [page, setPage] = useState(0);

  const color = ['#F3D3DE', '#F5C634', '#716EF3', '#88D9E0'];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color[page],
      }}>
      <Image source={Logo2Image} style={styles.logoImage} />
      <Image source={CityImage} style={styles.cityImage} />
      <Image source={HandshakeImage} style={styles.handshakeImage} />
      <Image source={MapImage} style={styles.mapImage} />
      <View style={styles.contentView}>
        <WhiteText bold fontSize={`${28 * fontSize}`}>
          {t(`onBoardingGuide${page * 2 + 1}`)}
        </WhiteText>
        <WhiteText fontSize={`${16 * fontSize}`}>
          {t(`onBoardingGuide${page * 2 + 2}`)}
        </WhiteText>
      </View>
      <View style={styles.betweenView}>
        <TouchableOpacity style={styles.skipButton}>
          <Text fontSize={`${16 * fontSize}`} color={color[page]}>
            {t('Skip')}
          </Text>
        </TouchableOpacity>
        <View style={styles.dotView}>
          {[1, 2, 3, 4].map((v, i) => {
            return <View style={page === i ? styles.onDot : styles.offDot} />;
          })}
        </View>
      </View>
      <FlatList
        data={[1, 2, 3, 4]}
        style={{
          width: '100%',
        }}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={e => {
          onScrollSlide(e, setPage, getPixel(360));
        }}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: getPixel(360),
                height: getHeightPixel(720),
              }}></View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentView: {
    position: 'absolute',
    left: getPixel(36),
    top: getHeightPixel(412),
  },
  dotView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offDot: {
    width: getPixel(8),
    height: getPixel(8),
    borderRadius: 100,
    backgroundColor: Theme.color.white + '40',
    marginLeft: getPixel(5),
  },
  onDot: {
    width: getPixel(13),
    height: getPixel(13),
    borderRadius: 100,
    backgroundColor: Theme.color.white,
    marginLeft: getPixel(5),
  },
  betweenView: {
    position: 'absolute',
    top: getHeightPixel(600),
    left: getPixel(36),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: getPixel(360 - 32 - 32),
  },
  skipButton: {
    width: getPixel(91),
    height: getHeightPixel(30),
    backgroundColor: Theme.color.white,
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
  },
  mapImage: {
    width: getPixel(182),
    height: getPixel(182),
    position: 'absolute',
    top: getHeightPixel(260),
    left: getPixel(180),
  },
  handshakeImage: {
    width: getPixel(448),
    height: getHeightPixel(152),
    position: 'absolute',
    top: getHeightPixel(105),
    left: -getPixel(50),
  },
  cityImage: {
    width: getPixel(360),
    height: getHeightPixel(123),
    position: 'absolute',
    left: 0,
    top: getHeightPixel(260),
  },
  logoImage: {
    width: getPixel(120),
    height: getPixel(26.46),
    position: 'absolute',
    top: getHeightPixel(36),
    left: getPixel(36),
  },
});
