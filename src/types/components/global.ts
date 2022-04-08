import React from 'react';
import {
  GestureResponderEvent,
  TextInputProps,
  TextProps,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {AnyStyledComponent} from 'styled-components';

export interface DefaultButtonProps extends TouchableOpacityProps {
  width?: string;
  height?: string;
  onPress?: () => void;
  content?: string;
}

export interface DefaultTextProps extends TextProps {
  color?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  letterSpacing?: string;
  pd?: string;
  mg?: string;
  textDecoration?: string;
  textAlign?: string;
  bold?: boolean;
  medium?: boolean;
}

export interface ContainerProps {
  justifyContent?: string;
  alignItems?: string;
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
}

export interface InputProps {
  value?: string;
  onChange?: (text: string) => void;
  PlaceHolderComponent?: any;
  errorText?: string;
}

export interface LineProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
  style?: ViewStyle;
}

export interface CheckBoxProps {
  setIsOn: (event: GestureResponderEvent) => void;
  isOn: boolean;
  text: string;
  isBox?: boolean;
}
export interface CheckBoxImageProps {
  isOn?: boolean;
  isBox?: boolean;
  width?: number;
  height?: number;
}

export interface ToggleProps {
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
  isOn: boolean;
  width?: number;
  height?: number;
}

export interface ModalProps {
  onClose: (event?: GestureResponderEvent) => void | (() => void);
}
