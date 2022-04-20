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
const AllCategory = () => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const navigation = useAppNavigation();

  const [isMore, setIsMore] = useState<boolean>(false);
  const [popularList, setPopularList] = useState<Array<string>>([
    '자전거',
    '의자',
    '냉장고',
    '노트북',
    '캠핑',
    '가방',
    '에어팟',
    '아이패드',
    '애플워치',
  ]);

  const onPressCategory = useCallback(() => {
    navigation.navigate('Search');
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F7F7F3',
      }}>
      <Header title={t('allCategoryTitle')} />
      <KeyboardAwareScrollView>
        <Line isGray />
        <View style={styles.categoryContainer}>
          {categoryMenu.map((item, index) => {
            if (!isMore && index > 8) {
              return null;
            }
            return (
              <TouchableOpacity
                onPress={onPressCategory}
                style={{
                  ...styles.itemTouch,
                  marginRight: (index + 1) % 3 !== 0 ? getPixel(10) : 0,
                }}>
                <AutoHeightImage source={item.image} width={getPixel(38)} />
                <Text
                  style={{
                    marginTop: getHeightPixel(7),
                  }}
                  fontSize={`${12 * fontSize}`}>
                  {t(item.name)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {!isMore && (
          <>
            <Line isGray />
            <TouchableOpacity
              onPress={() => setIsMore(prev => !prev)}
              style={styles.moreTouch}>
              <GrayText fontSize={`${16 * fontSize}`}>{t('more')}</GrayText>
              <AutoHeightImage
                style={styles.marginLeft5}
                source={ArrowDownGrayIcon}
                width={getPixel(12)}
              />
            </TouchableOpacity>
          </>
        )}

        <Line height={getHeightPixel(10)} />

        <View style={styles.popularContainer}>
          <Text fontSize={`${18 * fontSize}`} medium>
            {t('popularSearch')}
          </Text>
          <View style={styles.popularListContainer}>
            {popularList.map((item, index) => (
              <TouchableOpacity
                key={item + index}
                style={styles.popularListView}>
                <Text medium fontSize={`${12 * fontSize}`} letterSpacing="0px">
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AllCategory;

const styles = StyleSheet.create({
  moreTouch: {
    width: getPixel(360),
    height: getHeightPixel(58),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  marginLeft5: {
    marginLeft: getPixel(5),
  },
  categoryContainer: {
    flexDirection: 'row',
    width: getPixel(320),
    paddingTop: getHeightPixel(30),
    marginHorizontal: getPixel(20),
    flexWrap: 'wrap',
  },
  itemTouch: {
    width: getPixel(100),
    height: getPixel(100),
    backgroundColor: Theme.color.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getHeightPixel(16),
  },
  searchListTitleView: {
    width: getPixel(328),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getHeightPixel(40),
  },
  searchListRowView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  closeBlack: {
    width: getPixel(12.84),
    height: getPixel(12.84),
  },
  searchListView: {
    width: getPixel(146),
    height: getHeightPixel(44),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.6,
    borderBottomColor: Theme.color.gray,
  },
  isSearchView: {
    width: getPixel(360),
    paddingHorizontal: getPixel(16),
    marginVertical: getHeightPixel(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  checkboxView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getHeightPixel(10),
  },
  checkboxImage: {
    width: getPixel(18),
    height: getPixel(18),
    marginRight: getPixel(4),
  },
  categoryCardView: {
    width: getPixel(46),
    height: getPixel(46),
    backgroundColor: Theme.color.whiteGray_F6,
    borderRadius: getPixel(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryCardContainer: {
    width: getPixel(80),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getHeightPixel(20),
  },
  mainContainer: {flex: 1, backgroundColor: Theme.color.whiteGray_F6},
  subContainer: {
    width: getPixel(360),

    paddingTop: getHeightPixel(26),
    borderBottomLeftRadius: getPixel(20),
    borderBottomRightRadius: getPixel(20),

    backgroundColor: Theme.color.white,
  },
  categoryView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: getPixel(320),
    marginBottom: getHeightPixel(30),
  },
  popularContainer: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    marginTop: getHeightPixel(35),
  },
  popularListContainer: {
    marginTop: getHeightPixel(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: getPixel(328),
  },
  popularListView: {
    paddingHorizontal: getPixel(9),
    paddingVertical: getHeightPixel(8),
    backgroundColor: Theme.color.white,
    borderRadius: getPixel(15),
    marginRight: getPixel(8),
    marginBottom: getHeightPixel(8),
  },
});
