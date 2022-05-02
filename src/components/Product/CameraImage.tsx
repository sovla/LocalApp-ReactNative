import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import {GrayText} from '../Global/text';
import {useAppNavigation, useAppSelector, useCallbackNavigation} from '@/Hooks/CustomHook';
import {getPixel} from '@/Util/pixelChange';
import Theme from '@/assets/global/Theme';
import CameraGrayIcon from '@assets/image/camera_gray.png';

const CameraImage = ({imageArray, maxNum, onPress}: {imageArray: any[]; maxNum: number; onPress: () => void}) => {
  const fontSize = useAppSelector(state => state.fontSize.value);

  return (
    <TouchableOpacity onPress={onPress} style={styles.cameraImageTouch}>
      <AutoHeightImage source={CameraGrayIcon} width={getPixel(20)} />
      <GrayText fontSize={`${14 * fontSize}`}>{`${imageArray.length}/${maxNum}`}</GrayText>
    </TouchableOpacity>
  );
};

export default CameraImage;

const styles = StyleSheet.create({
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
