import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import {getPixel} from '@/Util/pixelChange';
import CameraIcon from '@assets/image/camera_gray.png';
import ImageCropPicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {useAppNavigation} from '@/Hooks/CustomHook';
import AutoHeightImage from 'react-native-auto-height-image';

interface PhotoProps {
  returnFn: (image?: ImageOrVideo) => void;
  width?: number;
  height?: number;
  imageWidth?: number;

  isNavigation?: boolean;
  selectImage?: ImageOrVideo;
}

const Photo: React.FC<PhotoProps> = ({
  returnFn = () => {},
  width = getPixel(80),
  height = getPixel(80),
  imageWidth = getPixel(25),
  isNavigation = false,
  selectImage,
}) => {
  const navigation = useAppNavigation();
  const onPressImageCropPicker = useCallback(() => {
    if (isNavigation) {
      navigation.navigate('SignUpPhoto');
    } else {
      ImageCropPicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => returnFn(image));
    }
  }, [returnFn, isNavigation]);

  return (
    <TouchableOpacity
      style={{...styles.photoTouch, width, height}}
      onPress={onPressImageCropPicker}>
      <AutoHeightImage
        source={selectImage ? {uri: selectImage.path} : CameraIcon}
        width={selectImage ? width : imageWidth}
        style={
          selectImage
            ? {
                height: height,
              }
            : {}
        }
      />
    </TouchableOpacity>
  );
};

export default Photo;

const styles = StyleSheet.create({
  photoTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    borderRadius: getPixel(22),
  },
});
