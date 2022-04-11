import {getPixel} from '@/Util/pixelChange';
import {Image} from 'react-native';
import React from 'react';

export const CloseIconImage: React.FC<{
  width?: number;
  height?: number;
  isGray?: boolean;
  isWhite?: boolean;
}> = ({width = getPixel(20), height = getPixel(20), isGray, isWhite}) => {
  return (
    <Image
      source={
        isGray
          ? require('@assets/image/close.png')
          : isWhite
          ? require('@assets/image/close_white.png')
          : require('@assets/image/close_black.png')
      }
      style={{
        width,
        height,
      }}
    />
  );
};
