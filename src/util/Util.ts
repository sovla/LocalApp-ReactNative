import {Alert, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
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

export const strEmptyCheck = (_item: string | undefined | null) => {
  if (typeof _item === 'string' && _item.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const AlertButton = (
  alertContent: string,
  leftButtonText: string = '확인',
  leftButtonPress: () => void = () => {},
) => {
  Alert.alert('', alertContent, [
    {
      text: leftButtonText,
      onPress: () => leftButtonPress(),
    },
  ]);
};

export const AlertButtons = (
  alertContent: string,
  leftButtonText: string | undefined = '확인',
  RightButtonText: string | undefined = '취소',
  leftButtonPress: () => void,
  RightButtonPress: () => void | undefined = () => {},
) => {
  if (leftButtonText && RightButtonText)
    Alert.alert('', alertContent, [
      {
        text: leftButtonText,
        onPress: () => leftButtonPress(),
      },
      {
        text: RightButtonText,
        onPress: () => RightButtonPress(),
      },
    ]);
};

export const birthDate = (str: string) => {
  if (str.length === 2 || str.length === 5) {
    return str + '/';
  } else {
    return str;
  }
};
