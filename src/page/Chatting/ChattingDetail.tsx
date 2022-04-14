import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {Fragment, useEffect, useRef, useState} from 'react';

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
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';
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
import ChattingBgImage from '@assets/image/chatting_bg.png';
import Header from '@/Components/Profile/Header';

import SearchWhiteIcon from '@assets/image/search_white.png';
import MoreWhiteIcon from '@assets/image/more_white.png';
import StoreWhiteIcon from '@assets/image/store_white.png';
import {getHitSlop} from '@/Util/Util';
import OtherChatting from '@/Components/Chatting/OtherChatting';
import Date from '@/Components/Chatting/Date';
import MyChatting from '@/Components/Chatting/MyChatting';
import ProductChatting from '@/Components/Chatting/ProductChatting';
import SendGrayIcon from '@assets/image/send_gray.png';
import PlusMenuIcon from '@assets/image/plus_menu.png';
import GalleryPurpleIcon from '@assets/image/gallery_purple.png';
import CameraSkyIcon from '@assets/image/camera_sky.png';
import LocationOrangeIcon from '@assets/image/location_orange.png';

export default function ChattingDetail() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [isOn, setIsOn] = useState(false);
  const name = 'Designplus';
  const viewRef = useRef<View>(null);

  return (
    <View style={{flex: 1}} behavior="padding">
      <ImageBackground
        style={styles.headerImageBackground}
        source={ChattingBgImage}>
        <View style={styles.rowCenter}>
          <AutoHeightImage source={BackWhiteIcon} width={getPixel(30)} />
          <WhiteText
            bold
            fontSize={`${16 * fontSize}`}
            style={styles.marginLeft}>
            {name}
          </WhiteText>
        </View>
        <View style={styles.rowCenter}>
          <TouchableOpacity hitSlop={getHitSlop(5)} style={styles.marginRight}>
            <AutoHeightImage width={getPixel(18)} source={StoreWhiteIcon} />
          </TouchableOpacity>
          <TouchableOpacity hitSlop={getHitSlop(5)} style={styles.marginRight}>
            <AutoHeightImage width={getPixel(20)} source={SearchWhiteIcon} />
          </TouchableOpacity>
          <TouchableOpacity hitSlop={getHitSlop(5)}>
            <AutoHeightImage width={getPixel(20)} source={MoreWhiteIcon} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <FlatList
        renderItem={({item, index}) => {
          return (
            <>
              {index === 0 && <Date />}
              {index === 1 && <OtherChatting />}
              {index === 2 && <MyChatting />}
              {index === 3 && <OtherChatting />}
              {index === 4 && <ProductChatting />}
              {index === 5 && <ProductChatting />}
              {index > 5 && <ProductChatting />}
            </>
          );
        }}
        data={[
          1, 2, 3, 4, 5, 6, 7, 81, 2, 3, 4, 5, 6, 7, 81, 2, 3, 4, 5, 6, 7, 81,
          2, 3, 4, 5, 6, 7, 81, 2, 3, 4, 5, 6, 7, 8,
        ]}
      />
      <View>
        <Shadow>
          <>
            <View
              ref={viewRef}
              style={{
                width: getPixel(360),
                height: getHeightPixel(55),
                paddingHorizontal: getPixel(16),
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setIsOn(prev => !prev);
                }}>
                <Image
                  source={PlusMenuIcon}
                  style={{
                    width: getPixel(24),
                    height: getPixel(24),
                    marginRight: getPixel(10),
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: 'red',
                  height: '100%',
                  justifyContent: 'center',
                }}>
                <TextInput
                  // autoFocus={false}
                  // showSoftInputOnFocus={false}

                  style={{
                    width: getPixel(254),
                    height: getHeightPixel(40),
                    includeFontPadding: false,

                    backgroundColor: Theme.color.whiteGray_FA,
                    borderColor: Theme.color.whiteGray_F2,
                    borderWidth: 1,
                    borderRadius: getPixel(10),
                    paddingBottom: getHeightPixel(5),
                  }}
                />
              </View>
              <TouchableOpacity>
                <Image
                  source={SendGrayIcon}
                  style={{
                    width: getPixel(30),
                    height: getPixel(30),
                    marginLeft: getPixel(10),
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            {isOn && (
              <View style={[styles.footerOnContainer]}>
                <TouchableOpacity
                  style={[styles.footerImageTouch, styles.footerMarginRight]}>
                  <Image
                    source={GalleryPurpleIcon}
                    style={styles.footerOnImage}
                  />
                  <Text fontSize={`${14 * fontSize}`}>{t('album')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.footerImageTouch, styles.footerMarginRight]}>
                  <Image source={CameraSkyIcon} style={styles.footerOnImage} />
                  <Text fontSize={`${14 * fontSize}`}>{t('camera')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerImageTouch}>
                  <Image
                    source={LocationOrangeIcon}
                    style={styles.footerOnImage}
                  />
                  <Text fontSize={`${14 * fontSize}`}>
                    {t('locationInformation')}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        </Shadow>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerMarginRight: {
    marginRight: getPixel(55),
  },
  footerOnContainer: {
    width: getPixel(360),
    height: getHeightPixel(150),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  footerImageTouch: {
    width: getPixel(52),
    height: getHeightPixel(75),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerOnImage: {
    width: getPixel(50),
    height: getPixel(50),
  },
  marginRight: {
    marginRight: getPixel(15),
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginLeft: {
    marginLeft: getPixel(15),
  },
  headerImageBackground: {
    width: getPixel(360),
    height: getHeightPixel(50),
    backgroundColor: Theme.color.blue_3D,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getPixel(16),
  },
});
