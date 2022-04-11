import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getPixel} from '@/Util/pixelChange';

const StarIcon: React.FC<{
  width?: number;
  height?: number;
  isEmpty?: boolean;
  marginRight?: number;
}> = ({
  width = getPixel(24),
  height = getPixel(24),
  isEmpty,
  marginRight = getPixel(5),
}) => {
  return (
    <Image
      source={
        isEmpty
          ? require('@assets/image/star_trans.png')
          : require('@assets/image/star.png')
      }
      style={{
        width,
        height,
        marginRight,
      }}
    />
  );
};

export default StarIcon;
