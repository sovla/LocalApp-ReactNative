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
import React, {useEffect, useState} from 'react';

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
import ProductListIcon from '@assets/image/product_list.png';
import UploadWhiteIcon from '@assets/image/upload_white.png';
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
const MyProduct = () => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const [selectMenu, setSelectMenu] = useState<string>(t('ProfileSellProduct'));

  return (
    <View
      style={{
        backgroundColor: Theme.color.whiteGray_F3,
        flex: 1,
      }}>
      <ImageBackground
        style={styles.headerContainer}
        source={BackGroundImage}></ImageBackground>

      <FlatList
        ListHeaderComponent={
          <>
            <View style={{height: getHeightPixel(10)}} />
            <Menu
              menuList={[
                t('ProfileSellProduct'),
                t('ProfileSellProductComplete'),
              ]}
              selectMenu={selectMenu}
              setSelectMenu={setSelectMenu}
            />
            <View style={{height: getHeightPixel(20)}} />
          </>
        }
        renderItem={({item, index}) => {
          return (
            <ProductWhiteBox
              selectMenu={selectMenu}
              isComplete={selectMenu === t('ProfileSellProductComplete')}
            />
          );
        }}
        data={[1, 2, 3, 4, 5, 6]}
      />
    </View>
  );
};

export default MyProduct;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: getHeightPixel(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100,
  },
});
