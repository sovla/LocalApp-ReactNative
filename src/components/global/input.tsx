import {StyleSheet, TextInput, View} from 'react-native';
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
  keyboardType,
  inputFontSize = 12,
}: InputProps) {
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <>
      <Box
        style={[
          styles.boxStyle,
          {
            width,
            height,
          },
          isLine && {
            borderBottomColor: Theme.color.gray,
            borderBottomWidth: 0.4,
          },
        ]}>
        <TextInput
          style={[
            styles.textInput,
            {
              fontSize: inputFontSize * fontSize,
              width,
            },
          ]}
          keyboardType={keyboardType}
          onChangeText={onChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          value={PlaceHolderComponent === undefined ? value : undefined}>
          {!isFocus && !value?.length && PlaceHolderComponent !== undefined ? (
            <PlaceHolderComponent />
          ) : null}
        </TextInput>
      </Box>
      <View
        style={{
          width: width,
        }}>
        {errorText && errorText?.length > 0 && (
          <RedText fontSize={`${12 * fontSize}px`}>{errorText}</RedText>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  boxStyle: {
    marginBottom: getHeightPixel(5),
    justifyContent: 'center',
  },
  textInput: {
    color: Theme.color.black,
    textAlignVertical: 'center',
  },
});
