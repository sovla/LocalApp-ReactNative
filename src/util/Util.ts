import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {getPixel} from './pixelChange';

export const getHitSlop = (number: number) => {
  return {
    top: number,
    left: number,
    right: number,
    bottom: number,
  };
};

export const onScrollSlide = (
  e: NativeSyntheticEvent<NativeScrollEvent>,
  setState: React.Dispatch<React.SetStateAction<number>>,
  width?: number,
) => {
  if (typeof width === 'number') {
    setState(Math.round(e.nativeEvent.contentOffset.x / width));
  } else {
    setState(Math.round(e.nativeEvent.contentOffset.x / getPixel(328)));
  }
};
