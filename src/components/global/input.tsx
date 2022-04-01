import {StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import Theme from '@/assets/global/Theme';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {RedText, Text} from './text';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {InputProps} from '@/Types/Components/global';
import {Box} from './container';

export default function Input({value, onChange, PlaceHolderComponent, errorText}: InputProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <Box width="288px" alignItems="flex-start" style={styles.boxStyle}>
      <TextInput
        style={[
          styles.textInput,
          {
            fontSize: 12 * fontSize,
          },
        ]}
        onChangeText={onChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}>
        {!isFocus && !value?.length && <PlaceHolderComponent />}
      </TextInput>
      {errorText && errorText?.length > 0 && <RedText fontSize={`${12 * fontSize}px`}>{errorText}</RedText>}
    </Box>
  );
}

const styles = StyleSheet.create({
  boxStyle: {marginBottom: getHeightPixel(5)},
  textInput: {
    width: getPixel(288),
    height: getHeightPixel(40),
    borderBottomColor: Theme.color.gray,
    borderBottomWidth: 0.4,
    color: Theme.color.black,
    marginBottom: getHeightPixel(5),
  },
});
