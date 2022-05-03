import {StyleSheet, TextInputProps, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import AutoHeightImage from 'react-native-auto-height-image';

import Line from '@/Components/Global/Line';

import ArrowUpDownGrayIcon from '@assets/image/arrow_updown_gray.png';
import {TextInput} from 'react-native-gesture-handler';
import Theme from '@/assets/global/Theme';

const TitleInput: React.FC<{
  title?: string;
  placeHolder?: string;
  isSelect?: boolean;
  width?: number;
  onPress?: () => void;
  unitText?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: TextInputProps['keyboardType'];
}> = ({
  isSelect,
  title,
  onPress,
  unitText,
  placeHolder,
  width = getPixel(328),
  value,
  onChangeText,
  keyboardType,
}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <View style={{marginBottom: getHeightPixel(25)}}>
      <Text fontSize={`${12 * fontSize}`} medium>
        {title}
      </Text>
      {onPress ? (
        <>
          <TouchableOpacity
            disabled={!isSelect}
            onPress={onPress}
            style={{
              width: width,
              ...styles.touch,
              paddingLeft: getPixel(5),
            }}>
            {value && value?.length > 0 ? (
              <Text fontSize={`${16 * fontSize}`}>{value}</Text>
            ) : (
              <GrayText fontSize={`${16 * fontSize}`}>{placeHolder}</GrayText>
            )}

            {isSelect && (
              <AutoHeightImage
                source={ArrowUpDownGrayIcon}
                width={getPixel(8)}
              />
            )}
            {unitText && unitText.length > 0 && (
              <Text fontSize={`${16 * fontSize}`}>{unitText}</Text>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <View
          style={{
            width: width,
            flexDirection: 'row',
          }}>
          <TextInput
            keyboardType={keyboardType}
            style={{
              flex: 1,
              ...styles.touch,
              color: Theme.color.black,
              fontSize: fontSize * 16,
              includeFontPadding: false,
            }}
            placeholder={placeHolder}
            placeholderTextColor={Theme.color.gray}
            onChangeText={onChangeText}
          />
          {unitText && unitText.length > 0 && (
            <Text
              style={{marginRight: getPixel(5)}}
              fontSize={`${16 * fontSize}`}>
              {unitText}
            </Text>
          )}
        </View>
      )}

      <Line isGray width={width} />
    </View>
  );
};

export default TitleInput;

const styles = StyleSheet.create({
  touch: {
    minHeight: getHeightPixel(35),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
