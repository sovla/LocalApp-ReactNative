import {TextProps, TouchableOpacityProps} from 'react-native';
import {AnyStyledComponent} from 'styled-components';

export interface DefaultButtonProps extends TouchableOpacityProps {
  width?: number;
  height?: number;
  onPress?: any;
  content?: string;
}

export interface DefaultTextProps {
  color?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  letterSpacing?: string;
  pd?: string;
  mg?: string;
  textDecoration?: string;
  textAlign?: string;
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
