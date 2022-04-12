import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import {ModalMyPageProps} from '@/Types/Components/HomeTypes';
import {SlideRightModal} from './ModalFilter';
import BackBlackBoxIcon from '@assets/image/back_black_box.png';
import AutoHeightImage from 'react-native-auto-height-image';
import DummyProfileImage from '@assets/image/dummy_profile.png';
import Line from '../Global/Line';

import AnnouncementIcon from '@assets/image/announcement.png';
import NoticeColorIcon from '@assets/image/notice_color.png';
import StoreIcon from '@assets/image/store.png';
import DocumentIcon from '@assets/image/document.png';
import HeartBlueIcon from '@assets/image/heart_blue.png';
import CategoryColorIcon from '@assets/image/category_color.png';
import NoticeOn from '@assets/image/notice_on.png';
import SettingsIcon from '@assets/image/settings.png';
import ServiceCenterIcon from '@assets/image/service_center.png';

const ModalMyPage: React.FC<ModalMyPageProps> = ({onClose}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const isLogin = true;
  const login = {
    name: 'Leandro',
    statusMessage: 'Love what you have',
    image: require('@assets/image/dummy.png'),
  };

  return (
    <View style={modalDim}>
      <SlideRightModal onClose={onClose}>
        <View>
          <TouchableOpacity onPress={onClose}>
            <Image source={BackBlackBoxIcon} style={styles.backImage} />
          </TouchableOpacity>
          <View style={styles.profileView}>
            <View
              style={
                isLogin
                  ? styles.loginImageView
                  : {
                      marginRight: getPixel(12),
                    }
              }>
              <Image
                source={isLogin ? login.image : DummyProfileImage}
                style={styles.loginImage}
                resizeMode={isLogin ? 'cover' : 'contain'}
              />
            </View>
            {isLogin ? (
              <View>
                <Text fontSize={`${16 * fontSize}`} medium>
                  {login.name}
                </Text>
                <GrayText fontSize={`${12 * fontSize}`}>
                  {login.statusMessage}
                </GrayText>
              </View>
            ) : (
              <Text
                medium
                fontSize={`${16 * fontSize}`}
                style={{
                  width: getPixel(92),
                }}>
                {t('modalMyPageLoginGuide')}
              </Text>
            )}
          </View>
          <ImageWithView
            image={AnnouncementIcon}
            content={t('modalMyPageNotice')}
          />
          <ImageWithView
            image={NoticeColorIcon}
            imageWidth={getPixel(15.38)}
            content={t('modalMyPageAlarm')}
          />
          <ImageWithView image={StoreIcon} content={t('modalMyPageBusiness')} />
          <Line
            height={getHeightPixel(10)}
            style={{marginBottom: getHeightPixel(10)}}
          />
          <ImageWithView
            image={DocumentIcon}
            content={t('modalMyPageProduct')}
          />
          <ImageWithView image={HeartBlueIcon} content={t('modalMyPageLike')} />
          <ImageWithView
            image={CategoryColorIcon}
            content={t('modalMyPageCategory')}
          />
          <ImageWithView image={NoticeOn} content={t('modalMyPageKeyword')} />
          <Line
            height={getHeightPixel(10)}
            style={{marginBottom: getHeightPixel(10)}}
          />
          <ImageWithView
            image={SettingsIcon}
            content={t('modalMyPageSettings')}
          />

          <ImageWithView
            image={ServiceCenterIcon}
            content={t('modalMyPageServiceCenter')}
          />
        </View>
        <TouchableOpacity style={styles.loginView}>
          <AutoHeightImage
            source={
              isLogin
                ? require('@assets/image/logout.png')
                : require('@assets/image/login.png')
            }
            width={getPixel(20)}
          />
          <Text
            fontSize={`${18 * fontSize}`}
            bold
            color={Theme.color.blue_3D}
            style={{marginLeft: getPixel(10)}}>
            {isLogin ? t('modalMyPageLogout') : t('modalMyPageLogin')}
          </Text>
        </TouchableOpacity>
      </SlideRightModal>
    </View>
  );
};

const ImageWithView: React.FC<{
  image: any;
  imageWidth?: number;
  fontSize?: number;
  content: string;
}> = ({image, imageWidth = getPixel(20), fontSize, content}) => {
  const fontSizeState = useAppSelector(state => state.fontSize.value);
  const applyFontSize = fontSize ?? 16 * fontSizeState;
  return (
    <>
      <TouchableOpacity style={styles.imageWithViewTouch}>
        <View style={styles.imageWithViewView}>
          <AutoHeightImage source={image} width={imageWidth} />
        </View>
        <Text fontSize={`${applyFontSize}`}>{content}</Text>
      </TouchableOpacity>
      <Line isGray />
    </>
  );
};

export const modalDim: ViewStyle = {
  flex: 1,
  backgroundColor: '#0007',
};

export default ModalMyPage;

const styles = StyleSheet.create({
  loginImage: {
    width: getPixel(56),
    height: getPixel(56),
  },
  loginImageView: {
    width: getPixel(56),
    height: getPixel(56),
    borderRadius: getPixel(20),
    overflow: 'hidden',
    marginRight: getPixel(12),
  },
  loginView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: getPixel(25),
  },
  profileView: {
    flexDirection: 'row',
    marginLeft: getPixel(19),
    marginTop: getHeightPixel(20),
    marginBottom: getHeightPixel(20),
    alignItems: 'center',
  },
  backImage: {
    marginTop: getHeightPixel(14),
    marginLeft: getPixel(19),
    width: getPixel(30),
    height: getPixel(30),
  },
  imageWithViewTouch: {
    width: getPixel(310),

    height: getHeightPixel(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWithViewView: {
    width: getPixel(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: getPixel(20),
    marginRight: getPixel(10),
  },
});
