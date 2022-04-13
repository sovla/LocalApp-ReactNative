import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
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
import {EditModalProps} from '@/Types/Components/ProductTypes';
import {TextInput} from 'react-native-gesture-handler';

const EditModal: React.FC<EditModalProps> = ({onClose, isBump}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [isBumpUp, setIsBumpUp] = useState(false);
  const navigation = useAppNavigation();
  const onPressUpdate = () => {
    onClose();
    navigation.navigate('ProductUpdate');
  };

  const title = '나이키 운동화 슬립온 240 여성상의/여름블라우스/펀칭...';
  const price = '$24,00';

  const onPressDelete = () => {
    // 제거 api 추가필요
    onClose();
  };

  const onPressBumpUp = () => {
    // bump-up api 추가필요
    onClose();
  };
  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.dim}>
        <View style={styles.absoluteView}>
          {!isBumpUp ? (
            <View style={styles.container}>
              {isBump && (
                <TouchableOpacity
                  onPress={() => {
                    setIsBumpUp(prev => !prev);
                  }}
                  style={styles.aquaView}>
                  <WhiteText medium fontSize={`${16 * fontSize}`}>
                    {t('bumpUp')}
                  </WhiteText>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={onPressUpdate}
                style={styles.whiteView}>
                <Text medium fontSize={`${16 * fontSize}`}>
                  {t('postUpdate')}
                </Text>
              </TouchableOpacity>
              <Line isGray />
              <TouchableOpacity
                onPress={onPressDelete}
                style={styles.whiteView}>
                <Text medium fontSize={`${16 * fontSize}`}>
                  {t('postDelete')}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.container}>
              <ScrollView>
                <View style={styles.bumpView}>
                  <Text
                    bold
                    fontSize={`${20 * fontSize}`}
                    style={styles.bumpText}>
                    {t('bumpUp')}
                  </Text>
                </View>
                <View style={styles.contentView}>
                  <Image
                    source={require('@assets/image/dummy.png')}
                    style={styles.image}
                  />
                  <View>
                    <Text
                      style={styles.titleText}
                      numberOfLines={2}
                      fontSize={`${14 * fontSize}`}>
                      {title}
                    </Text>
                    <DarkBlueText fontSize={`${16 * fontSize}`} bold>
                      {price}
                    </DarkBlueText>
                  </View>
                </View>
                <View style={styles.guideView}>
                  <Text
                    medium
                    fontSize={`${20 * fontSize}`}
                    style={styles.guideText}>
                    {t('bumpUpModalGuide1')}
                  </Text>
                  <Text fontSize={`${14 * fontSize}`}>
                    {t('bumpUpModalGuide2')}
                  </Text>
                  <TextInput
                    style={[
                      styles.textInput,
                      {
                        fontSize: fontSize * 25,
                      },
                    ]}></TextInput>
                </View>
                <Line isGray />
                <View style={styles.widthView}>
                  <View style={styles.guide3View}>
                    <Text fontSize={`${14 * fontSize}`}>
                      {t('bumpUpModalGuide3')}
                    </Text>
                    <Text
                      fontSize={`${14 * fontSize}`}
                      color={Theme.color.blue_3D}
                      style={{
                        marginHorizontal: getPixel(5),
                      }}>
                      09:39
                    </Text>
                    <Text fontSize={`${14 * fontSize}`}>
                      {t('bumpUpModalGuide4')}
                    </Text>
                  </View>
                  <Button
                    content={t('bumpUp')}
                    width="328px"
                    onPress={onPressBumpUp}
                  />
                  <View
                    style={{
                      height: getHeightPixel(30),
                    }}
                  />
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default EditModal;

const styles = StyleSheet.create({
  widthView: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
  },
  guide3View: {
    flexDirection: 'row',
    marginTop: getHeightPixel(25),
    marginBottom: getHeightPixel(35),
  },
  guideView: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    height: getHeightPixel(190),
  },
  guideText: {
    marginTop: getHeightPixel(26),
    marginBottom: getHeightPixel(16),
  },
  textInput: {
    marginTop: getPixel(10),
    width: getPixel(328),
    height: getHeightPixel(50),
    color: Theme.color.darkBlue,
  },
  bumpView: {
    height: getHeightPixel(80),
    justifyContent: 'flex-end',
  },
  bumpText: {
    marginLeft: getPixel(16),
    marginBottom: getHeightPixel(16),
  },
  contentView: {
    width: getPixel(360),
    height: getHeightPixel(100),
    backgroundColor: Theme.color.whiteBlue_2F,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: getPixel(70),
    height: getPixel(70),
    marginLeft: getPixel(16),
    marginRight: getPixel(14),
  },
  titleText: {
    width: getPixel(244),
    marginBottom: getHeightPixel(7),
  },
  dim: {
    flex: 1,
    backgroundColor: '#0007',
  },
  absoluteView: {position: 'absolute', bottom: 0, left: 0},
  container: {
    width: getPixel(360),
    backgroundColor: Theme.color.white,
    borderTopRightRadius: getPixel(20),
    borderTopLeftRadius: getPixel(20),
    overflow: 'hidden',
  },
  aquaView: {
    width: '100%',
    height: getHeightPixel(54),
    backgroundColor: Theme.color.aqua_04,
    justifyContent: 'center',
    alignItems: 'center',
  },

  whiteView: {
    width: '100%',
    height: getHeightPixel(54),
    backgroundColor: Theme.color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
