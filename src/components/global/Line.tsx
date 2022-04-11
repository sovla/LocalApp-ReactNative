import {View, Text} from 'react-native';
import React from 'react';
import {getPixel} from '@/Util/pixelChange';
import Theme from '@/assets/global/Theme';
import {LineProps} from '@/Types/Components/global';

export default function Line({
  width,
  height,
  backgroundColor,
  style,
}: LineProps): JSX.Element {
  return (
    <View
      style={{
        width: width ?? getPixel(360),
        height: height ?? 0.4,
        backgroundColor: backgroundColor ?? Theme.color.gray_F5,
        ...style,
      }}
    />
  );
}