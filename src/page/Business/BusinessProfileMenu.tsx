import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import Header from '@/Components/Profile/Header';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import EditIcon from '@assets/image/edit_ver.png';
import {getHitSlop} from '@/Util/Util';
import {GrayText, Text, WhiteText} from '@/Components/Global/text';
import CameraWhiteIcon from '@assets/image/camera_white.png';
import {ProfileBackground} from '../Profile/ProfileHome';

import StoreIcon from '@assets/image/store.png';
import AdIcon from '@assets/image/ad.png';
import AutoHeightImage from 'react-native-auto-height-image';
import Line from '@/Components/Global/Line';
import ArrowRightIcon from '@assets/image/arrow_right.png';
import Theme from '@/assets/global/Theme';

export default function BusinessProfileMenu() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <ProfileBackground
        height={getHeightPixel(200)}
        style={styles.imageBackground}
      />
      <View style={styles.headerView}>
        <Header isBack title={t('BusinessProfileMenuTitle')} />
        <View style={styles.profileContainer}>
          <View>
            <View style={styles.profileView}>
              <Image
                source={require('@assets/image/dummy.png')}
                style={styles.profileImage}
              />
            </View>
            <Image source={CameraWhiteIcon} style={styles.cameraWhiteImage} />
          </View>
          <View>
            <WhiteText fontSize={`${16 * fontSize}`} medium>
              Leandro
            </WhiteText>
            <GrayText fontSize={`${12 * fontSize}`}>
              Love what you have.
            </GrayText>
          </View>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuTouch}>
          <View style={styles.menuView}>
            <AutoHeightImage source={StoreIcon} width={getPixel(20)} />
            <Text fontSize={`${16 * fontSize}`} style={styles.menuText}>
              {t('businessProfileMenu1')}
            </Text>
          </View>
          <AutoHeightImage
            style={styles.menuArrowImage}
            source={ArrowRightIcon}
            width={getPixel(6)}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuTouch}>
          <View style={styles.menuView}>
            <AutoHeightImage source={AdIcon} width={getPixel(20)} />
            <Text fontSize={`${16 * fontSize}`} style={styles.menuText}>
              {t('businessProfileMenu2')}
            </Text>
          </View>
          <AutoHeightImage
            style={styles.menuArrowImage}
            source={ArrowRightIcon}
            width={getPixel(6)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headerView: {height: getHeightPixel(200), marginBottom: getHeightPixel(10)},
  menuArrowImage: {marginRight: getPixel(10)},
  menuText: {marginLeft: getPixel(12)},
  menuView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuContainer: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    height: getHeightPixel(50),
    justifyContent: 'center',
    borderBottomColor: Theme.color.gray,
    borderBottomWidth: 0.4,
  },
  imageBackground: {
    borderBottomLeftRadius: getPixel(15),
    borderBottomRightRadius: getPixel(15),
  },
  cameraWhiteImage: {
    width: getPixel(22),
    height: getPixel(22),
    position: 'absolute',
    right: getPixel(10),
    bottom: 0,
  },
  profileContainer: {
    flexDirection: 'row',
    marginTop: getHeightPixel(30),
    marginLeft: getPixel(16),
    alignItems: 'center',
  },
  profileView: {
    width: getPixel(80),
    height: getPixel(80),
    overflow: 'hidden',
    borderRadius: getPixel(25),
    marginRight: getPixel(10),
  },
  profileImage: {
    width: getPixel(80),
    height: getPixel(80),
  },
  editImage: {width: getPixel(25), height: getPixel(25)},
  bgView: {
    borderBottomLeftRadius: getPixel(15),
    borderBottomRightRadius: getPixel(15),
  },
});
