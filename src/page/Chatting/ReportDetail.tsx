import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
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
import {ReportDetailProps} from '@/Types/Screen/Screen';

export default function ReportDetail({
  route: {
    params: {reportType},
  },
  navigation,
}: ReportDetailProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const title = (() => {
    switch (reportType) {
      case 'prohibited':
        return 'reportGuideTitle1';
      case 'scam':
        return 'reportGuideTitle3';
      case 'unmanned':
        return 'reportGuideTitle2';
    }
  })();

  const prohibitedMenuList = [
    t('lifeTrade'),
    t('weapon'),
    t('drugs'),
    t('privacy'),
    t('charityProduct'),
    t('medicalEquipment'),
    t('other'),
  ];

  const userName = 'NETSHOES';
  const [text, setText] = useState<string>('');
  const [selectMenu, setSelectMenu] = useState<number>(0);

  const onPressReport = useCallback(() => {
    // 수정필요 API치기
    navigation.navigate('ChattingHome');
  }, []);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior="padding"
      enabled={Platform.OS === 'android'}>
      <Header title={t(`${title}`)} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          flex: 1,
        }}>
        {reportType === 'prohibited' && (
          <View>
            {prohibitedMenuList.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectMenu(index);
                  }}
                  style={styles.menuListTouch}>
                  <CheckBoxImage isOn={index === selectMenu} />
                  <Text
                    style={styles.menuListText}
                    fontSize={`${16 * fontSize}`}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <Line isGray style={styles.line} />
          </View>
        )}
        {(reportType === 'scam' || reportType === 'unmanned') && (
          <View style={styles.line}>
            <Text fontSize={`${14 * fontSize}`} medium style={styles.textWidth}>
              {`'${userName}'${t('reportGuide2')}`}
            </Text>
            <GrayText fontSize={`${14 * fontSize}`} style={styles.grayText}>
              {reportType === 'scam' ? t('reportGuide4') : t('reportGuide3')}
            </GrayText>
          </View>
        )}
        <View style={styles.line}>
          <Text fontSize={`${14 * fontSize}`} medium>
            {t('reportGuide1')}
          </Text>
          <TextInput
            onChangeText={setText}
            style={[
              styles.reportInput,
              {
                fontSize: fontSize * 14,
              },
            ]}
            multiline
            textAlignVertical="top"
          />
        </View>
      </KeyboardAwareScrollView>
      <Button
        onPress={onPressReport}
        content={t('submit')}
        style={styles.footerButton}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  footerButton: {
    width: getPixel(328),
    position: 'absolute',
    bottom: getHeightPixel(32),
    left: getPixel(16),
  },
  textWidth: {
    width: getPixel(328),
  },
  grayText: {
    width: getPixel(328),
    marginTop: getHeightPixel(20),
  },
  reportInput: {
    width: getPixel(328),
    height: getHeightPixel(72),
    borderWidth: 1,
    borderColor: Theme.color.gray,
    borderRadius: 4,
    marginTop: getHeightPixel(10),
    color: Theme.color.black,
  },
  menuListTouch: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    height: getHeightPixel(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    marginTop: getHeightPixel(30),
    marginHorizontal: getPixel(16),
    width: getPixel(328),
  },
  menuListText: {
    marginLeft: getPixel(20),
    width: getPixel(280),
  },
});
