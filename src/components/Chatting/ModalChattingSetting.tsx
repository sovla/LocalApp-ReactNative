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
import {SlideRightModal} from '../Home/ModalFilter';

import CloseRoundBlackIcon from '@assets/image/close_round_black.png';
import NoticeEmptyBlackIcon from '@assets/image/notice_empty_black.png';
import {
  ModalAlertViewProps,
  ModalChattingSettingProps,
} from '@/Types/Components/ChattingTypes';

const ModalChattingSetting: React.FC<ModalChattingSettingProps> = ({
  onClose,
}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const navigation = useAppNavigation();
  const [isAlarm, setIsAlarm] = useState(false); //  알람 온오프
  const [isBlock, setIsBlock] = useState(false); //  차단 온오프

  const {value: isAlert, on: onIsAlert, off: offIsAlert} = useBoolean(false);
  const [alertModal, setAlertModal] = useState<{
    content: string;
    title: string;
    onPressConfirm: () => void;
    onPressCancle: () => void;
  }>({
    content: '',
    title: '',
    onPressConfirm: () => {},
    onPressCancle: offIsAlert,
  });

  const onPressDeleteChattingContent = () => {
    //   대화내용 지우기
    onIsAlert();
    setAlertModal(prev => ({
      ...prev,
      title: t('deleteChattingContent'),
      content: t('deleteChattingContentGuide'),
    }));
  };
  const onPressChattingDownload = () => {
    //   대화내용 내보내기
    onIsAlert();
    setAlertModal(prev => ({
      ...prev,
      title: t('chattingDownloadAlert'),
      content: t('chattingDownloadGuideAlert'),
    }));
  };
  const onPressUserBlock = () => {
    //   유저 차단
    if (!isBlock) {
      onIsAlert();
      setAlertModal(prev => ({
        ...prev,
        title: t('userBlock'),
        content: t('userBlockAlert'),
        onPressConfirm: () => {
          setIsBlock(true);
          offIsAlert();
        },
      }));
    } else {
      setIsBlock(false);
    }
  };

  const onPressBlockManagement = () => {
    onClose();
    navigation.navigate('BlockList');
  };
  const onPressReport = () => {
    onClose();
    navigation.navigate('ReportCategory');
  };
  return (
    <Modal visible transparent>
      <View
        style={[
          styles.dim,
          isAlert && {
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}>
        {isAlert ? (
          <ModalAlertView
            isBang
            title={alertModal.title}
            content={alertModal.content}
            onClose={onClose}
            onPressConfirm={alertModal.onPressConfirm}
            onPressCancle={alertModal.onPressCancle}
          />
        ) : (
          <SlideRightModal onClose={onClose}>
            <View
              style={{
                paddingHorizontal: getPixel(16),
                paddingTop: getHeightPixel(60),
              }}>
              <View style={styles.rowBox}>
                <View style={styles.rowCenter}>
                  <AutoHeightImage
                    style={{
                      marginRight: getPixel(10),
                    }}
                    source={NoticeEmptyBlackIcon}
                    width={getPixel(30)}
                  />
                  <Text fontSize={`${16 * fontSize}`}>{t('alarmSetting')}</Text>
                </View>
                <Toggle isOn={isAlarm} setIsOn={setIsAlarm} />
              </View>
              <View style={styles.rowBox}>
                <View style={styles.rowCenter}>
                  <AutoHeightImage
                    source={CloseRoundBlackIcon}
                    width={getPixel(20)}
                    style={{
                      marginLeft: getPixel(5),
                      marginRight: getPixel(15),
                    }}
                  />
                  <Text fontSize={`${16 * fontSize}`}>{t('userBlock')}</Text>
                </View>
                <Toggle isOn={isBlock} setIsOn={onPressUserBlock} />
              </View>
              <Line isGray width={getPixel(274)} />
              <TouchableOpacity
                onPress={onPressDeleteChattingContent}
                style={[styles.rowBox, {paddingLeft: getPixel(5)}]}>
                <Text fontSize={`${16 * fontSize}`}>
                  {t('deleteChattingContent')}
                </Text>
              </TouchableOpacity>
              <Line isGray width={getPixel(274)} />
              <TouchableOpacity
                onPress={onPressChattingDownload}
                style={[
                  styles.rowBox,
                  {paddingLeft: getPixel(5), height: getHeightPixel(75)},
                ]}>
                <View>
                  <Text fontSize={`${16 * fontSize}`}>
                    {t('chattingDownload')}
                  </Text>
                  <GrayText fontSize={`${12 * fontSize}`}>
                    {t('chattingDownloadGuide')}
                  </GrayText>
                </View>
              </TouchableOpacity>
              <Line isGray width={getPixel(274)} />
              <TouchableOpacity
                onPress={onPressBlockManagement}
                style={[styles.rowBox, {paddingLeft: getPixel(5)}]}>
                <Text fontSize={`${16 * fontSize}`}>
                  {t('blockUserManagement')}
                </Text>
              </TouchableOpacity>
              <Line isGray width={getPixel(274)} />

              <TouchableOpacity
                onPress={onPressReport}
                style={[styles.rowBox, {paddingLeft: getPixel(5)}]}>
                <Text fontSize={`${16 * fontSize}`}>{t('report')}</Text>
              </TouchableOpacity>
              <Line isGray width={getPixel(274)} />
            </View>
          </SlideRightModal>
        )}
      </View>
    </Modal>
  );
};

export default ModalChattingSetting;

const ModalAlertView: React.FC<ModalAlertViewProps> = ({
  onClose,
  title,
  content,
  onPressConfirm,
  isBang,
  onPressCancle,
}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <View style={styles.alertModalWhitebox}>
      <View style={styles.alertModalView}>
        <View style={styles.rowCenter}>
          {isBang && (
            <Image source={BangBlackIcon} style={styles.alertModalBangImage} />
          )}
          <Text fontSize={`${18 * fontSize}`}>{title}</Text>
        </View>
        <Line isGray width={getPixel(240)} style={styles.alertModalLine} />
        <View style={styles.alertModalContentText}>
          <Text fontSize={`${14 * fontSize}`}>{content}</Text>
        </View>
        <View style={styles.rowCenter}>
          <TouchableOpacity
            onPress={onPressCancle}
            style={styles.alertModalCancleView}>
            <Text color={Theme.color.blue_3D} fontSize={`${16 * fontSize}`}>
              {t('cancle')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressConfirm}
            style={styles.alertModalConfirmView}>
            <Text color={Theme.color.white} fontSize={`${16 * fontSize}`}>
              {t('confirm')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  alertModalBangImage: {
    width: getPixel(20),
    height: getPixel(20),
    marginRight: getPixel(10),
  },
  alertModalWhitebox: {
    width: getPixel(280),
    height: getHeightPixel(185),
    backgroundColor: Theme.color.white,
    borderRadius: getPixel(8),
  },
  alertModalView: {
    width: getPixel(240),
    marginTop: getHeightPixel(20),
    marginLeft: getPixel(20),
  },
  alertModalLine: {
    marginTop: getHeightPixel(10),
    marginBottom: getHeightPixel(20),
  },
  alertModalConfirmView: {
    width: getPixel(114),
    height: getHeightPixel(36),
    borderColor: Theme.color.blue_3D,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: Theme.color.blue_3D,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: getPixel(15),
  },
  alertModalCancleView: {
    width: getPixel(114),
    height: getHeightPixel(36),
    borderColor: Theme.color.blue_3D,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertModalContentText: {
    height: getHeightPixel(40),
    marginBottom: getHeightPixel(10),
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBox: {
    flexDirection: 'row',
    height: getHeightPixel(50),
    justifyContent: 'space-between',
    width: getPixel(274),
    alignItems: 'center',
  },
  dim: {
    flex: 1,
    backgroundColor: '#0007',
  },
});