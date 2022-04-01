import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {getPixel} from '@/Util/pixelChange';
import CameraIcon from '@assets/image/camera_gray.png';

interface PhotoProps {
  onPressPhoto?: any;
}

const Photo: React.FC<PhotoProps> = ({onPressPhoto = () => {}}) => {
  return (
    <TouchableOpacity style={styles.photoTouch} onPress={onPressPhoto}>
      <Image source={CameraIcon} style={styles.image} />
    </TouchableOpacity>
  );
};

export default Photo;

const styles = StyleSheet.create({
  image: {
    width: getPixel(25),
    height: getPixel(23),
  },
  photoTouch: {
    width: getPixel(80),
    height: getPixel(80),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    borderRadius: getPixel(22),
  },
});
