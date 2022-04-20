import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

import {countryNumber} from '@/assets/global/dummy';
import ArrowDownGrayIcon from '@assets/image/arrow_down_gray.png';

import {Picker} from '@react-native-picker/picker';

const CountryPicker: React.FC<{
  selectNum: string;
  setSelectNum: React.Dispatch<React.SetStateAction<string>>;
  width?: number;
  height?: number;
  isLabelNumber?: boolean;
}> = ({
  selectNum,
  setSelectNum,
  width = getPixel(288),
  height = getHeightPixel(60),
  isLabelNumber,
}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const ref = useRef<any>();
  const changeWidth = width + getPixel(20); //  피커 자체 패딩이 지워지지 않아 좀더 큰 크기로 맞춤.

  return (
    <View
      style={{
        width: changeWidth,
      }}>
      <Picker
        ref={ref}
        style={{
          width: changeWidth,
          height: height,
          includeFontPadding: false,
          padding: 0,
          margin: 0,
        }}
        selectedValue={selectNum}
        onValueChange={(itemValue, itemIndex) => setSelectNum(itemValue)}>
        {countryNumber.map(item => {
          const label = isLabelNumber
            ? `${t(item.label)} (${item.value})`
            : t(item.label);
          return (
            <Picker.Item
              style={{...styles.pickerItemAndroid, fontSize: 16 * fontSize}}
              key={item.countryName}
              label={label}
              value={item.value}
            />
          );
        })}
      </Picker>
      <TouchableOpacity
        onPress={() => {
          ref.current.focus();
        }}
        activeOpacity={1}
        style={styles.position}>
        <AutoHeightImage source={ArrowDownGrayIcon} width={getPixel(10)} />
      </TouchableOpacity>
    </View>
  );
};

export default CountryPicker;

const styles = StyleSheet.create({
  pickerItemAndroid: {
    padding: 0,
    margin: 0,
    includeFontPadding: false,
    color: Theme.color.black,
    fontFamily: Theme.fontWeight.default,
    backgroundColor: Theme.color.white,
  },
  position: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: getPixel(50),
    height: getHeightPixel(60),
    backgroundColor: Theme.color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
