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
import {MyChattingProps} from '@/Types/Components/ChattingTypes';

const MyChatting: React.FC<MyChattingProps> = ({date, content, isCheck}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <View style={styles.container}>
      <View style={styles.dateView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {isCheck && isCheck > 0 && (
            <Image
              source={
                isCheck === 1
                  ? require('@assets/image/check.png')
                  : require('@assets/image/check_double.png')
              }
              style={{
                width: getPixel(24),
                height: getPixel(24),
              }}
            />
          )}

          <Text fontSize={`${11 * fontSize}`} color="#59636C">
            {date}
          </Text>
        </View>
      </View>
      <View style={styles.chattingView}>
        <WhiteText fontSize={`${14 * fontSize}`}>{content}</WhiteText>
      </View>
    </View>
  );
};

export default MyChatting;

const styles = StyleSheet.create({
  container: {
    minHeight: getHeightPixel(44),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: getPixel(360),
    paddingHorizontal: getPixel(16),
    marginTop: getHeightPixel(15),
  },
  dateView: {
    marginRight: getPixel(5),
    justifyContent: 'flex-end',
    marginBottom: getHeightPixel(3),
  },
  chattingView: {
    maxWidth: getPixel(220),
    minHeight: getHeightPixel(44),
    borderRadius: getPixel(15),
    borderBottomRightRadius: 0,
    backgroundColor: Theme.color.blue_3D,
    justifyContent: 'center',
    paddingHorizontal: getPixel(14),
    paddingVertical: getHeightPixel(14),
  },
});