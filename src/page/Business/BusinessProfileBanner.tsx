import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from '@/Components/LoginSignUp/Header';
import {t} from 'i18next';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {GrayText, Text} from '@/Components/Global/text';
import Line from '@/Components/Global/Line';
import CameraGrayIcon from '@assets/image/camera_gray.png';
import AutoHeightImage from 'react-native-auto-height-image';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import Theme from '@/assets/global/Theme';
import {Button} from '@/Components/Global/button';

export default function BusinessProfileBanner() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Header title={t('businessProfileBannerTitle')} />
      <View style={styles.bannerView}>
        <Text
          fontSize={`${20 * fontSize}`}
          medium
          style={{
            marginTop: getHeightPixel(34),
            marginBottom: getHeightPixel(14),
          }}>
          {t('businessProfileBannerSubTitle')}
        </Text>
        <Text fontSize={`${14 * fontSize}`}>
          {t('businessProfileBannerGuideText1')}
        </Text>
        <GrayText fontSize={`${14 * fontSize}`}>
          {t('businessProfileBannerGuideText2')}
        </GrayText>
        <Line
          isGray
          style={{
            marginVertical: getHeightPixel(20),
          }}
        />

        <TouchableOpacity onPress={() => {}} style={styles.cameraImageTouch}>
          <AutoHeightImage source={CameraGrayIcon} width={getPixel(20)} />
          <GrayText fontSize={`${14 * fontSize}`}>1/3</GrayText>
        </TouchableOpacity>
      </View>

      <Button
        style={{
          marginTop: getHeightPixel(390),
          marginHorizontal: getPixel(16),
          borderRadius: getPixel(2),
        }}
        width="328px"
        content={t('save')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bannerView: {
    marginHorizontal: getPixel(16),
    width: getPixel(328),
  },
  cameraImageTouch: {
    width: getPixel(64),
    height: getPixel(64),
    borderRadius: getPixel(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.color.gray,
  },
});
