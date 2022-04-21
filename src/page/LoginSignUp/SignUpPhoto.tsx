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
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';

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
import Screen, {SignUpPhotoProps} from '@/Types/Screen/Screen';
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

export default function SignUpPhoto({navigation}: SignUpPhotoProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [firstImage, setFirstImage] = useState<ImageOrVideo | undefined>(
    undefined,
  );
  const [imageArray, setImageArray] = useState<any>([1]);
  const [number, setNumber] = useState<number>(100);
  const [selectNumber, setSelectNumber] = useState<number>(0);

  const getPhotos = () => {
    CameraRoll.getPhotos({
      first: number,
    }).then(value => {
      console.log(value);
      setImageArray(value.edges);
      setNumber((prev: number) => {
        if (value.page_info.has_next_page) {
          return prev + 100;
        } else {
          return prev;
        }
      });
    });
  };

  const onPressComplete = () => {
    console.log(imageArray[selectNumber - 1]);
    navigation.navigate('SignUpForm', {
      imagePath:
        selectNumber === 1
          ? firstImage?.path
          : imageArray[selectNumber - 1]?.node?.image?.uri,
    });
  };

  const _renderItem = useCallback(
    ({item, index}) => {
      const select = index + 1 === selectNumber;
      if (index === 0) {
        return (
          <TouchableOpacity
            onPress={() => setSelectNumber(index + 1)}
            style={styles.firstTouchImage}>
            <Photo
              returnFn={image => {
                setFirstImage(image);
                setSelectNumber(1);
              }}
              width={getPixel(106)}
              height={getHeightPixel(112)}
              selectImage={firstImage}
            />
            {firstImage && (
              <View style={select ? styles.selectDot : styles.noneSelectDot}>
                <WhiteText fontSize={`${12 * fontSize}`}>1</WhiteText>
              </View>
            )}
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity
          onPress={() => setSelectNumber(index + 1)}
          key={index}
          style={{
            ...styles.touchImage,
            marginRight: (index + 1) % 3 !== 0 ? getPixel(4) : 0,
          }}>
          <View style={select ? styles.selectDot : styles.noneSelectDot}>
            <WhiteText fontSize={`${12 * fontSize}`}>1</WhiteText>
          </View>
          <Image
            source={{
              uri: item.node.image.uri,
            }}
            style={styles.imageBox}
          />
        </TouchableOpacity>
      );
    },
    [selectNumber],
  );

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  useLayoutEffect(() => {
    getPhotos();
    return () => {};
  }, []);
  return (
    <View style={{flex: 1}}>
      <Header title={t('allPhoto')}>
        <TouchableOpacity onPress={onPressComplete}>
          <Text fontSize={`${16 * fontSize}`} medium>
            {t('complete')}
          </Text>
        </TouchableOpacity>
      </Header>
      <FlatList
        data={imageArray}
        numColumns={3}
        keyExtractor={keyExtractor}
        style={{
          paddingTop: getHeightPixel(20),
          marginHorizontal: getPixel(16),
          paddingBottom: getHeightPixel(40),
        }}
        getItemLayout={(data, index) => ({
          length: getPixel(106),
          offset: getHeightPixel(112) * index,
          index,
        })}
        onEndReached={() => {
          getPhotos();
        }}
        onEndReachedThreshold={0.3}
        renderItem={_renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  firstTouchImage: {
    width: getPixel(106),
    height: getHeightPixel(112),
    marginRight: getPixel(4),
    marginBottom: getHeightPixel(4),
    borderRadius: 22,
    overflow: 'hidden',
  },
  imageBox: {
    width: getPixel(106),
    height: getHeightPixel(112),
  },
  touchImage: {
    width: getPixel(106),
    height: getHeightPixel(112),
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: getHeightPixel(4),
  },
  noneSelectDot: {
    width: getPixel(18),
    height: getPixel(18),
    backgroundColor: Theme.color.white,
    borderWidth: 1,
    borderColor: Theme.color.gray,
    position: 'absolute',
    top: getHeightPixel(6),
    right: getHeightPixel(6),
    zIndex: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectDot: {
    width: getPixel(18),
    height: getPixel(18),
    backgroundColor: Theme.color.aqua_00,
    position: 'absolute',
    top: getHeightPixel(6),
    right: getHeightPixel(6),
    zIndex: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
