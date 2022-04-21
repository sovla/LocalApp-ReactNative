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

export const timer = (number: number) => {
  return `${Math.floor(number / 60)}:${
    number % 60 < 10 ? '0' + (number % 60) : number % 60
  }`;
};

export const checkEmpty = (_item: any) => {
  if (_item) {
    return _item;
  }
};
