import {getPixel} from '@/Util/pixelChange';
import {Image} from 'react-native';
import CloseIcon from '@assets/image/close_black.png';
import React from 'react';

export const CloseIconImage: React.FC<{
  width?: number;
  height?: number;
}> = ({width = getPixel(20), height = getPixel(20)}) => {
  return (
    <Image
      source={CloseIcon}
      style={{
        width,
        height,
      }}
    />
  );
};
