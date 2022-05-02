import {categoryMenu} from '@/assets/global/dummy';
import {categoryMenuTypes} from '@/Types/Components/global';
import i18next from 'i18next';
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

export const onScrollSlide = (e: NativeSyntheticEvent<NativeScrollEvent>, setState: React.Dispatch<React.SetStateAction<number>>, width?: number) => {
  if (typeof width === 'number') {
    setState(Math.round(e.nativeEvent.contentOffset.x / width));
  } else {
    setState(Math.round(e.nativeEvent.contentOffset.x / getPixel(328)));
  }
};

export const timer = (number: number) => {
  return `${Math.floor(number / 60)}:${number % 60 < 10 ? '0' + (number % 60) : number % 60}`;
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

export const AlertButton = (alertContent: string, leftButtonText: string = '확인', leftButtonPress: () => void = () => {}) => {
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

export const geoLanguage = (str: string) => {
  // geocoding 언어 설정
  return str === 'br' ? 'pt-BR' : str;
};

export const viewCountCheck = (count?: number | null) => {
  // view count 999+표시
  if (count && count > 999) {
    return '999+';
  } else if (count && count > 0) {
    return count.toString();
  } else {
    return '0';
  }
};

export const brPrice = (price: string) => {
  // 가격 3자리 . 표시
  if (price.includes('R$')) {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  } else {
    return 'R$ ' + price.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
};

export const productTimeSetting = (time: number | null, timeType: 'now' | 'minute' | 'hour' | 'day' | 'month' | 'year' | null) => {
  if (!time || !timeType) {
    return '';
  }
  if (timeType === 'now') {
    return i18next.t('nowTime');
  } else if (timeType === 'minute') {
    return time + i18next.t('minuteTime');
  } else if (timeType === 'hour') {
    return time + i18next.t('hourTime');
  } else if (timeType === 'day') {
    return time + i18next.t('dayTime');
  } else if (timeType === 'month') {
    return time + i18next.t('monthTime');
  } else if (timeType === 'year') {
    return time + i18next.t('yearTime');
  }
};

export const dateFormat = (date: string) => {
  if (date) {
    const [year, month, day] = date.split('-');
    return `${year}. ${month}. ${day}.`;
  } else {
    return '';
  }
};

export const findCategory = (str?: categoryMenuTypes['menu'] | null) => {
  if (str) {
    const result = categoryMenu.findIndex(v => v.name === str);
    return result !== -1 ? result : undefined;
  }
};
