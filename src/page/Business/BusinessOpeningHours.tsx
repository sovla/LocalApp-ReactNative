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
import {languageList, openingHoursInit} from '@/assets/global/dummy';
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
import {openingHoursTypes} from '@/Types/Components/global';

export default function BusinessOpeningHours() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const [openingHours, setOpeningHours] = useState(openingHoursInit);
  const [isFull, setIsFull] = useState<boolean>(false);

  const onPressFull = useCallback(() => {
    // 24시간 영업 클릭
    setIsFull(prev => !prev);
    setOpeningHours(openingHoursInit);
  }, []);

  const onPressCheckBox = useCallback(
    (
      key: keyof openingHoursTypes,
      value?: string,
      innerKey?: keyof openingHoursTypes['mon'],
    ) => {
      if (isFull) {
        setIsFull(false);
      }
      if (!value) {
        // value 없는경우 isOn만 변경
        setOpeningHours(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            isOn: !prev[key].isOn,
          },
        }));
      } else {
        const typeKey = innerKey as keyof openingHoursTypes['mon'];
        setOpeningHours(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            [typeKey]: value,
          },
        }));
      }
    },
    [],
  );

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <Header title={t('businessProfileSettingShopOpeningTime')} />
        <View style={styles.mainView}>
          <View style={styles.height40} />
          <Text fontSize={`${16 * fontSize}`} medium>
            {t('openingTime')}
          </Text>
          <GrayText fontSize={`${12 * fontSize}`}>
            {t('openingTimeGuide1')}
          </GrayText>
          <View style={styles.height40} />
          {Object.entries(openingHours).map(([key, value]) => {
            const confirmedKey = key as keyof openingHoursTypes;
            const confirmedValue = value as openingHoursTypes['mon'];
            return (
              <View style={[styles.rowCenter, styles.marginBottom20]}>
                <TouchableOpacity
                  style={[styles.rowCenter, styles.textWidth]}
                  onPress={() => {
                    onPressCheckBox(confirmedKey);
                  }}>
                  <CheckBoxImage
                    isOn={confirmedValue.isOn}
                    isCheckImage
                    width={getPixel(24)}
                    height={getPixel(24)}
                  />
                  <Text
                    fontSize={`${14 * fontSize}`}
                    style={styles.marginLeft8}
                    color={
                      confirmedValue.isOn ? Theme.color.black : Theme.color.gray
                    }>
                    {t(key)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    onPressCheckBox(confirmedKey, '01:00', 'startTime');
                  }}
                  style={styles.timeTouch}>
                  <Text
                    fontSize={`${14 * fontSize}`}
                    color={
                      confirmedValue.isOn ? Theme.color.black : Theme.color.gray
                    }>
                    {confirmedValue.startTime}
                  </Text>
                  <AutoHeightImage
                    source={ArrowDownGrayIcon}
                    width={getPixel(8)}
                  />
                </TouchableOpacity>

                <Text
                  fontSize={`${14 * fontSize}`}
                  color={
                    confirmedValue.isOn ? Theme.color.black : Theme.color.gray
                  }
                  style={styles.marginHorizontal10}>
                  ~
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    onPressCheckBox(confirmedKey, '01:00', 'endTime');
                  }}
                  style={styles.timeTouch}>
                  <Text
                    fontSize={`${14 * fontSize}`}
                    color={
                      confirmedValue.isOn ? Theme.color.black : Theme.color.gray
                    }>
                    {confirmedValue.endTime}
                  </Text>
                  <AutoHeightImage
                    source={ArrowDownGrayIcon}
                    width={getPixel(8)}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
          <TouchableOpacity
            style={[styles.rowCenter, styles.textWidth]}
            onPress={onPressFull}>
            <CheckBoxImage
              isOn={isFull}
              isCheckImage
              width={getPixel(24)}
              height={getPixel(24)}
            />
            <Text
              style={styles.marginLeft8}
              fontSize={`${14 * fontSize}`}
              color={isFull ? Theme.color.black : Theme.color.gray}>
              {t('open24hours')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <Button content={t('save')} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: getPixel(16),
    marginBottom: getHeightPixel(34),
    width: getPixel(328),
  },
  marginLeft8: {marginLeft: getPixel(8)},
  marginHorizontal10: {
    marginHorizontal: getPixel(10),
  },
  textWidth: {
    width: getPixel(138),
  },
  marginBottom20: {
    marginBottom: getHeightPixel(20),
  },
  container: {
    flex: 1,
  },
  mainView: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
  },
  height40: {
    height: getHeightPixel(40),
  },
  timeTouch: {
    width: getPixel(80),
    height: getHeightPixel(35),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.color.gray,
    borderRadius: 4,
    paddingLeft: getPixel(18),
    paddingRight: getPixel(10),
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
