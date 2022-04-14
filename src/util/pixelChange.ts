import {Dimensions, StatusBar} from 'react-native';

export default function pixelChange(px?: string) {
  // By Junhan. 폰 사이즈별 px 단위를 변경해서 리턴하는 펑션 11-16

  let result = '';
  if (typeof px === 'string') {
    if (px === 'auto' || px.includes('%')) {
      return px;
    }
    const pxSplit = px.split('px');

    for (const item of pxSplit) {
      if (item !== '') {
        result += getPixel(parseInt(item)) + 'px ';
      }
    }
    return result;
  } else if (px === undefined) {
    return px;
  } else {
    return getPixel(px) + 'px';
  }
}

export function getPixel(px: number) {
  return (px * Dimensions.get('window').width) / 360;
}

export function pixelHeightChange(px: string) {
  let result = '';
  if (typeof px === 'string') {
    if (px === 'auto' || px.includes('%')) {
      return px;
    }
    const pxSplit = px.split('px');

    for (const item of pxSplit) {
      if (item !== '') {
        result += getHeightPixel(parseInt(item)) + 'px ';
      }
    }
    return result;
  } else if (px === undefined) {
    return px;
  } else {
    return getHeightPixel(px) + 'px';
  }
}

export function getHeightPixel(px: number) {
  return (px * Dimensions.get('window').height) / 740;
}

export function fontSizeChange(fontSize: string) {
  if (typeof fontSize === 'string') {
    const fontSizeGetPixel = pixelChange(fontSize);
    if (typeof fontSizeGetPixel === 'string') {
      const fontSizeInt = parseInt(fontSizeGetPixel.split('px')[0]);
      return fontSizeInt * 1.5 + 'px';
    }
  } else {
    const fontSizeInt = fontSize;
    return fontSizeInt * 1.5 + 'px';
  }
}
