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
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';

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
import CameraRoll from '@react-native-community/cameraroll';
import Photo from '@Components/LoginSignUp/Photo';
import {ImageOrVideo} from 'react-native-image-crop-picker';

export default function SignUpPhoto() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [firstImage, setFirstImage] = useState<ImageOrVideo | null>(null);
  const [imageArray, setImageArray] = useState<
    CameraRoll.PhotoIdentifier[] | number
  >([1]);
  const [number, setNumber] = useState<number>(20);
  const getPhotos = useCallback(() => {
    CameraRoll.getPhotos({
      first: number,
    }).then(value => {
      console.log(value);
      setImageArray(value.edges);
      setNumber((prev: number) => {
        if (value.page_info.has_next_page) {
          return prev + 20;
        } else {
          return prev;
        }
      });
    });
  }, []);

  useLayoutEffect(() => {
    getPhotos();
    return () => {};
  }, []);
  return (
    <View style={{flex: 1}}>
      <Header title={t('allPhoto')} />
      <FlatList
        data={imageArray}
        numColumns={3}
        style={{
          marginHorizontal: getPixel(16),
        }}
        onEndReached={() => {
          getPhotos();
        }}
        onEndReachedThreshold={0.3}
        renderItem={({item, index}) => {
          if (index === 0) {
            return (
              <TouchableOpacity
                style={{
                  width: getPixel(106),
                  height: getHeightPixel(112),
                  marginRight: getPixel(4),
                  marginBottom: getHeightPixel(4),
                  borderRadius: 22,
                  overflow: 'hidden',
                }}>
                <Photo
                  returnFn={(image: ImageOrVideo) => setFirstImage(image)}
                  width={getPixel(106)}
                  height={getHeightPixel(112)}
                  selectImage={firstImage}
                />
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={index}
              style={{
                width: getPixel(106),
                height: getHeightPixel(112),
                borderRadius: 22,
                overflow: 'hidden',
                marginRight: (index + 1) % 3 !== 0 ? getPixel(4) : 0,
                marginBottom: getHeightPixel(4),
              }}>
              <Image
                source={{
                  uri: item.node.image.uri,
                }}
                style={{
                  width: getPixel(106),
                  height: getHeightPixel(112),
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
