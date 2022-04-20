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
}> = ({selectNum, setSelectNum}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const ref = useRef<any>();
  return (
    <View
      style={{
        width: getPixel(328),
      }}>
      <Picker
        ref={ref}
        style={{
          width: getPixel(328),
          height: getHeightPixel(60),
        }}
        selectedValue={selectNum}
        onValueChange={(itemValue, itemIndex) => setSelectNum(itemValue)}>
        {countryNumber.map(item => {
          return (
            <Picker.Item
              style={{
                color: Theme.color.black,
                fontSize: 16 * fontSize,
                fontFamily: Theme.fontWeight.default,
              }}
              key={item.countryName}
              label={t(item.label)}
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
