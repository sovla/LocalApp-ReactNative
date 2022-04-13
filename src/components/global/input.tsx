import {StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import Theme from '@/assets/global/Theme';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {RedText, Text} from './text';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {InputProps} from '@/Types/Components/global';
import {Box} from './container';

export default function Input({
  value,
  onChange,
  PlaceHolderComponent,
  errorText,
  width = getPixel(288),
  height = getHeightPixel(40),
  isLine = true,
}: InputProps) {
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Box
      alignItems="flex-start"
      style={[
        styles.boxStyle,
        {
          width,
          height,
        },
        isLine && {borderBottomColor: Theme.color.gray, borderBottomWidth: 0.4},
      ]}>
      <TextInput
        style={[
          styles.textInput,
          {
            fontSize: 12 * fontSize,
            width,
            height,
          },
        ]}
        onChangeText={onChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        value={PlaceHolderComponent === undefined ? value : undefined}>
        {!isFocus && !value?.length && PlaceHolderComponent !== undefined ? (
          <PlaceHolderComponent />
        ) : null}
      </TextInput>
      {errorText && errorText?.length > 0 && (
        <RedText fontSize={`${12 * fontSize}px`}>{errorText}</RedText>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  boxStyle: {marginBottom: getHeightPixel(5)},
  textInput: {
    color: Theme.color.black,
    marginBottom: getHeightPixel(5),
  },
});
