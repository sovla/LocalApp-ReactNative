import Theme from '@/assets/global/Theme';
import {useAppSelector} from '@/Hooks/CustomHook';
import pixelChange, {
  getHeightPixel,
  getPixel,
  pixelHeightChange,
} from '@/Util/pixelChange';
import {getHitSlop} from '@/Util/Util';
import {t} from 'i18next';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {
  CheckBoxImageProps,
  CheckBoxProps,
  DefaultButtonProps,
  ToggleProps,
} from 'Types/Components/global';
import {Text} from './text';

const ButtonStyle = styled.TouchableOpacity<any>`
  width: ${p => pixelChange(p.width) ?? pixelChange('288px')};
  height: ${p => pixelHeightChange(p.height) ?? pixelHeightChange('48px')};
  background-color: ${Theme.color.blue};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const Button: React.FC<DefaultButtonProps> = props => {
  const {content} = props;
  const fontSize = useAppSelector(state => state.fontSize.value);

  return (
    <ButtonStyle {...props}>
      <Text
        color={Theme.color.white}
        fontSize={`${Theme.fontSize.fs16 * fontSize}px`}>
        {content}
      </Text>
    </ButtonStyle>
  );
};

export const CheckBox: React.FC<CheckBoxProps> = ({
  setIsOn,
  isOn,
  text,
  isBox,
}) => {
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <TouchableOpacity onPress={setIsOn} style={styles.checkBoxView}>
      <Image
        source={
          isOn
            ? isBox
              ? require('@assets/image/checkbox_on.png')
              : require('@assets/image/radio_on.png')
            : isBox
            ? require('@assets/image/checkbox_off.png')
            : require('@assets/image/radio_off.png')
        }
        style={styles.checkBoxImage}
      />
      <Text fontSize={`${14 * fontSize}`}>{text}</Text>
    </TouchableOpacity>
  );
};
export const CheckBoxImage: React.FC<CheckBoxImageProps> = ({
  isOn,
  isBox,
  width = getPixel(18),
  height = getPixel(18),
}) => {
  return (
    <Image
      source={
        isOn
          ? isBox
            ? require('@assets/image/checkbox_on.png')
            : require('@assets/image/radio_on.png')
          : isBox
          ? require('@assets/image/checkbox_off.png')
          : require('@assets/image/radio_off.png')
      }
      style={{
        width,
        height,
      }}
    />
  );
};

export const Toggle: React.FC<ToggleProps> = ({
  isOn,
  setIsOn,
  width = getPixel(40),
  height = getPixel(22),
}) => {
  const onToggle = () => {
    setIsOn(prev => !prev);
  };
  return (
    <TouchableOpacity onPress={onToggle} hitSlop={getHitSlop(5)}>
      <Image
        source={
          isOn
            ? require('@assets/image/toggle_on.png')
            : require('@assets/image/toggle_off.png')
        }
        style={{
          width,
          height,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkBoxImage: {
    marginRight: getPixel(10),
    width: getPixel(18),
    height: getPixel(18),
  },
  checkBoxView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHeightPixel(10),
  },
});
