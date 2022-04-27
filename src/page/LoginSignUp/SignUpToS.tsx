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
import {languageList} from '@/assets/global/dummy';
import Menu from '@/Components/Profile/Menu';
import ProductWhiteBox from '@/Components/Product/ProductWhiteBox';
import EditModal from '@/Components/Product/EditModal';
import Screen, {SignUpTOSProps} from '@/Types/Screen/Screen';
import ArrowRightIcon from '@assets/image/arrow_right.png';
import ArrowUpGrayIcon from '@assets/image/arrow_up_gray.png';
import ArrowDownGrayIcon from '@assets/image/arrow_down_gray.png';
import BangBlackIcon from '@assets/image/bang_black.png';
import {TextInput} from 'react-native-gesture-handler';

import QuetionIcon from '@assets/image/quetion.png';
import AnswerIcon from '@assets/image/answer.png';
import {FAQItemProps} from '@/Types/Components/SettingTypes';
import SuccessIcon from '@assets/image/success.png';
import {AlertButton, getHitSlop} from '@/Util/Util';

export default function SignUpToS({navigation}: SignUpTOSProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [isAllCheck, setIsAllCheck] = useState(false);
  const [agree, setAgree] = useState({
    require1: false,
    require2: false,
    option: false,
  });

  const onPressAll = useCallback(() => {
    setAgree({
      require1: !isAllCheck,
      require2: !isAllCheck,
      option: !isAllCheck,
    });
    setIsAllCheck(prev => !prev);
  }, [isAllCheck]);

  const onPressNext = useCallback(() => {
    if (agree.require1 && agree.require2) {
      navigation.navigate('SignUpTel', {option: agree.option});
    } else {
      AlertButton(t('signUpRequireAlert'));
    }
  }, [agree]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.view}>
        <Text style={styles.titleText} medium fontSize={`${20 * fontSize}`}>
          {t('signUpGuide1')}
        </Text>
        <CheckBoxRow
          onPress={onPressAll}
          isOn={agree.require1 && agree.require2}
          content={t('signUpGuide2')}
          isLine
        />
        <CheckBoxRow
          isOn={agree.require1}
          onPress={() => {
            setAgree(prev => ({...prev, require1: !prev.require1}));
          }}
          content={t('signUpGuide3')}
          onPressRight={() => {
            navigation.navigate('ToU');
          }}
          isRequire
        />
        <CheckBoxRow
          isOn={agree.require2}
          onPress={() => {
            setAgree(prev => ({...prev, require2: !prev.require2}));
          }}
          content={t('signUpGuide4')}
          onPressRight={() => {
            navigation.navigate('ToU');
          }}
          isLine
          isRequire
        />
        <CheckBoxRow
          isOn={agree.option}
          onPress={() => {
            setAgree(prev => ({...prev, option: !prev.option}));
          }}
          content={t('signUpGuide5')}
          onPressRight={() => {
            navigation.navigate('ToU');
          }}
          isOption
        />
        <Button
          onPress={onPressNext}
          content={t('signUpAgreeNext')}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const CheckBoxRow: React.FC<{
  isOn?: boolean;
  onPress: () => void;
  onPressRight?: () => void;
  content: string;
  isRequire?: boolean;
  isOption?: boolean;
  isLine?: boolean;
}> = ({content, isOn, isOption, onPress, onPressRight, isRequire, isLine}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  return (
    <>
      <View style={styles.checkBoxView}>
        <TouchableOpacity
          onPress={onPress}
          hitSlop={getHitSlop(5)}
          style={styles.rowCenter}>
          <CheckBoxImage isOn={isOn} isBox />
          <View style={styles.width15} />
          {isRequire && (
            <Text
              color={Theme.color.red}
              style={styles.mr5}
              medium
              fontSize={`${14 * fontSize}`}>
              {t('require')}
            </Text>
          )}
          {isOption && (
            <GrayText style={styles.mr5} medium fontSize={`${14 * fontSize}`}>
              {t('option')}
            </GrayText>
          )}
          <Text medium fontSize={`${14 * fontSize}`}>
            {content}
          </Text>
        </TouchableOpacity>
        {onPressRight !== undefined && (
          <TouchableOpacity onPress={onPressRight} hitSlop={getHitSlop(5)}>
            <AutoHeightImage source={ArrowRightIcon} width={getPixel(6)} />
          </TouchableOpacity>
        )}
      </View>
      {isLine && <Line isGray />}
    </>
  );
};

const styles = StyleSheet.create({
  titleText: {
    textAlign: 'center',
    marginBottom: getHeightPixel(44),
  },
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: getHeightPixel(32),
    left: getPixel(32),
  },
  mr5: {
    marginRight: getPixel(5),
  },
  width15: {
    width: getPixel(15),
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBoxView: {
    width: getPixel(288),
    height: getHeightPixel(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
