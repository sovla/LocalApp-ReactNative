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
import {categoryMenu, languageList} from '@/assets/global/dummy';
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
export default function MyCategory() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const [menuList, setMenuList] = useState(
    categoryMenu.map(v => {
      return {
        ...v,
        isOn: false,
      };
    }),
  );
  const onPressMenu = useCallback(key => {
    setMenuList(prev =>
      prev.map(v => {
        if (v.name === key) {
          return {
            ...v,
            isOn: !v.isOn,
          };
        } else {
          return v;
        }
      }),
    );
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Theme.color.whiteGray_F7,
      }}>
      <Header title={t('modalMyPageCategory')} />
      <View
        style={{
          marginHorizontal: getPixel(16),
        }}>
        <View
          style={{
            marginTop: getHeightPixel(50),
            marginBottom: getHeightPixel(30),
          }}>
          <Text fontSize={`${24 * fontSize}`} bold>
            {t('myCategoryGuide1')}
          </Text>
          <GrayText fontSize={`${14 * fontSize}`}>
            {t('myCategoryGuide2')}
          </GrayText>
        </View>

        <View style={styles.selectCategoryView}>
          {menuList.map(item => {
            return (
              <TouchableOpacity
                onPress={() => {
                  onPressMenu(item.name);
                }}
                style={{
                  ...styles.mapTouch,
                  backgroundColor: item.isOn
                    ? Theme.color.blue_3D
                    : Theme.color.white,
                }}>
                <Text color={item.isOn ? Theme.color.white : Theme.color.gray}>
                  {t(item.name)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapTouch: {
    paddingHorizontal: getPixel(10),
    paddingVertical: getHeightPixel(8),
    marginRight: getPixel(10),
    borderRadius: 50,
    marginBottom: getHeightPixel(14),
  },
  selectCategoryView: {
    width: getPixel(328),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
